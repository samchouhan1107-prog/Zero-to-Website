/**
 * WebZoneBW.shop Learning Analytics System
 * Tracks user progress, learning patterns, and provides insights
 */

class LearningAnalytics {
    constructor() {
        this.userStats = this.loadUserStats();
        this.initializeAnalytics();
    }

    /**
     * Initialize analytics system
     */
    initializeAnalytics() {
        this.setupEventListeners();
        this.startSessionTracking();
        this.updateDashboard();
    }

    /**
     * Load user statistics from localStorage
     */
    loadUserStats() {
        const saved = localStorage.getItem('learningAnalytics');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            userId: this.generateUserId(),
            sessions: [],
            lessonsCompleted: 0,
            totalTimeSpent: 0,
            averageScore: 0,
            streakDays: 0,
            lastActivity: new Date().toISOString(),
            learningPath: [],
            weakAreas: [],
            strongAreas: [],
            achievements: []
        };
    }

    /**
     * Generate unique user ID
     */
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    /**
     * Setup event listeners for tracking
     */
    setupEventListeners() {
        // Track page views
        window.addEventListener('load', () => this.trackPageView());
        
        // Track time spent
        window.addEventListener('beforeunload', () => this.trackSessionEnd());
        
        // Track interactions
        document.addEventListener('click', (e) => this.trackInteraction(e));
        document.addEventListener('scroll', (e) => this.trackScroll(e));
    }

    /**
     * Start session tracking
     */
    startSessionTracking() {
        this.sessionStart = Date.now();
        this.currentSession = {
            startTime: new Date().toISOString(),
            pages: [],
            interactions: 0,
            scrollDepth: 0,
            completedLessons: [],
            quizScores: []
        };
    }

    /**
     * Track page view
     */
    trackPageView() {
        const currentPage = window.location.pathname;
        const timestamp = new Date().toISOString();
        
        this.currentSession.pages.push({
            page: currentPage,
            timestamp: timestamp,
            referrer: document.referrer
        });
        
        this.saveCurrentSession();
    }

    /**
     * Track user interactions
     */
    trackInteraction(event) {
        if (event.target.matches('button, a, input, select, textarea')) {
            this.currentSession.interactions++;
            
            // Track specific interactions
            if (event.target.matches('.quiz-option input')) {
                this.trackQuizInteraction(event);
            } else if (event.target.matches('.lesson-link')) {
                this.trackLessonNavigation(event);
            }
        }
    }

    /**
     * Track quiz interactions
     */
    trackQuizInteraction(event) {
        const questionElement = event.target.closest('.quiz-question');
        if (questionElement) {
            const questionId = questionElement.dataset.question;
            
            if (!this.currentSession.quizData) {
                this.currentSession.quizData = {};
            }
            
            this.currentSession.quizData[questionId] = {
                timestamp: new Date().toISOString(),
                interactionType: event.type,
                value: event.target.value
            };
        }
    }

    /**
     * Track lesson navigation
     */
    trackLessonNavigation(event) {
        const lessonElement = event.target.closest('.lesson-card');
        if (lessonElement) {
            const lessonId = lessonElement.dataset.lessonId;
            
            if (!this.currentSession.lessonNavigation) {
                this.currentSession.lessonNavigation = [];
            }
            
            this.currentSession.lessonNavigation.push({
                lessonId: lessonId,
                timestamp: new Date().toISOString(),
                direction: event.target.textContent.includes('Next') ? 'forward' : 'backward'
            });
        }
    }

    /**
     * Track scroll depth
     */
    trackScroll(event) {
        const scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercentage > this.currentSession.scrollDepth) {
            this.currentSession.scrollDepth = scrollPercentage;
            
            // Track scroll milestones
            if ([25, 50, 75, 90].includes(scrollPercentage)) {
                this.trackScrollMilestone(scrollPercentage);
            }
        }
    }

    /**
     * Track scroll milestones
     */
    trackScrollMilestone(percentage) {
        if (!this.currentSession.scrollMilestones) {
            this.currentSession.scrollMilestones = [];
        }
        
        this.currentSession.scrollMilestones.push({
            percentage: percentage,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
    }

    /**
     * Track lesson completion
     */
    trackLessonCompletion(lessonId, score = 100) {
        this.currentSession.completedLessons.push({
            lessonId: lessonId,
            timestamp: new Date().toISOString(),
            score: score,
            timeSpent: this.calculateTimeSpent()
        });
        
        this.userStats.lessonsCompleted++;
        this.updateLearningPath(lessonId);
        this.saveUserStats();
    }

    /**
     * Track quiz completion
     */
    trackQuizCompletion(quizId, score, totalQuestions) {
        this.currentSession.quizScores.push({
            quizId: quizId,
            score: score,
            totalQuestions: totalQuestions,
            timestamp: new Date().toISOString(),
            timeSpent: this.calculateTimeSpent()
        });
        
        this.updateAverageScore(score, totalQuestions);
        this.saveUserStats();
    }

    /**
     * Calculate time spent in current session
     */
    calculateTimeSpent() {
        return Math.floor((Date.now() - this.sessionStart) / 1000);
    }

    /**
     * Track session end
     */
    trackSessionEnd() {
        if (this.sessionStart) {
            const sessionDuration = Date.now() - this.sessionStart;
            
            this.currentSession.duration = sessionDuration;
            this.currentSession.endTime = new Date().toISOString();
            
            this.userStats.sessions.push({
                ...this.currentSession,
                sessionId: this.generateSessionId()
            });
            
            this.updateTotalTimeSpent(sessionDuration);
            this.updateStreak();
            this.saveUserStats();
        }
    }

    /**
     * Generate session ID
     */
    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    /**
     * Update total time spent
     */
    updateTotalTimeSpent(duration) {
        this.userStats.totalTimeSpent += duration;
    }

    /**
     * Update average score
     */
    updateAverageScore(score, totalQuestions) {
        const currentAverage = this.userStats.averageScore;
        const newScore = (score / totalQuestions) * 100;
        
        if (this.userStats.quizScores) {
            const totalScore = (currentAverage * this.userStats.quizScores.length) + newScore;
            this.userStats.averageScore = totalScore / (this.userStats.quizScores.length + 1);
        } else {
            this.userStats.averageScore = newScore;
        }
    }

    /**
     * Update learning path
     */
    updateLearningPath(lessonId) {
        if (!this.userStats.learningPath.includes(lessonId)) {
            this.userStats.learningPath.push(lessonId);
        }
    }

    /**
     * Update streak tracking
     */
    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = new Date(this.userStats.lastActivity).toDateString();
        
        if (today === lastActivity) {
            // Same day, no change to streak
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActivity === yesterday.toDateString()) {
            // Consecutive day, increase streak
            this.userStats.streakDays++;
        } else {
            // Reset streak
            this.userStats.streakDays = 1;
        }
        
        this.userStats.lastActivity = new Date().toISOString();
    }

    /**
     * Save user statistics
     */
    saveUserStats() {
        localStorage.setItem('learningAnalytics', JSON.stringify(this.userStats));
    }

    /**
     * Save current session
     */
    saveCurrentSession() {
        localStorage.setItem('currentSession', JSON.stringify(this.currentSession));
    }

    /**
     * Update dashboard display
     */
    updateDashboard() {
        this.updateProgressOverview();
        this.updateLearningInsights();
        this.updateAchievements();
    }

    /**
     * Update progress overview
     */
    updateProgressOverview() {
        const overviewElement = document.getElementById('progress-overview');
        if (!overviewElement) return;
        
        const totalLessons = this.getTotalLessons();
        const completedLessons = this.userStats.lessonsCompleted;
        const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        const timeSpentFormatted = this.formatTime(this.userStats.totalTimeSpent);
        const averageScoreFormatted = Math.round(this.userStats.averageScore);
        
        overviewElement.innerHTML = `
            <div class="progress-grid">
                <div class="progress-item">
                    <span class="progress-number">${completedLessons}</span>
                    <span class="progress-label">Lessons Completed</span>
                </div>
                <div class="progress-item">
                    <span class="progress-number">${completionRate}%</span>
                    <span class="progress-label">Overall Progress</span>
                </div>
                <div class="progress-item">
                    <span class="progress-number">${timeSpentFormatted}</span>
                    <span class="progress-label">Time Spent</span>
                </div>
                <div class="progress-item">
                    <span class="progress-number">${averageScoreFormatted}%</span>
                    <span class="progress-label">Average Score</span>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${completionRate}%"></div>
            </div>
        `;
    }

    /**
     * Update learning insights
     */
    updateLearningInsights() {
        const insightsElement = document.getElementById('learning-insights');
        if (!insightsElement) return;
        
        const insights = this.generateInsights();
        
        insightsElement.innerHTML = `
            <div class="insights-grid">
                ${insights.map(insight => `
                    <div class="insight-item">
                        <div class="insight-icon">${insight.icon}</div>
                        <div class="insight-content">
                            <h4>${insight.title}</h4>
                            <p>${insight.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Generate learning insights
     */
    generateInsights() {
        const insights = [];
        
        // Learning pace insight
        const avgSessionTime = this.getAverageSessionTime();
        if (avgSessionTime > 3600) { // More than 1 hour
            insights.push({
                icon: '⏱️',
                title: 'Deep Learner',
                description: 'You spend quality time on each lesson. Great dedication!'
            });
        } else if (avgSessionTime < 300) { // Less than 5 minutes
            insights.push({
                icon: '🚀',
                title: 'Quick Learner',
                description: 'You complete lessons quickly. Consider more challenging content!'
            });
        }
        
        // Consistency insight
        if (this.userStats.streakDays >= 7) {
            insights.push({
                icon: '🔥',
                title: 'Consistent Learner',
                description: `${this.userStats.streakDays} day streak! Keep up the great work!`
            });
        }
        
        // Performance insight
        if (this.userStats.averageScore >= 80) {
            insights.push({
                icon: '🎯',
                title: 'High Performer',
                description: 'Your quiz scores are excellent! You\'re mastering the content.'
            });
        }
        
        return insights;
    }

    /**
     * Update achievements
     */
    updateAchievements() {
        const achievementsElement = document.getElementById('achievements');
        if (!achievementsElement) return;
        
        const achievements = this.checkAchievements();
        
        achievementsElement.innerHTML = `
            <div class="achievements-grid">
                ${achievements.map(achievement => `
                    <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-content">
                            <h4>${achievement.title}</h4>
                            <p>${achievement.description}</p>
                            ${achievement.unlocked ? '<span class="achievement-status">✅ Unlocked</span>' : '<span class="achievement-status">🔒 Locked</span>'}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Check and unlock achievements
     */
    checkAchievements() {
        const achievements = [
            {
                id: 'first_lesson',
                icon: '🎓',
                title: 'First Steps',
                description: 'Complete your first lesson',
                unlocked: this.userStats.lessonsCompleted >= 1
            },
            {
                id: 'week_streak',
                icon: '🔥',
                title: 'Week Warrior',
                description: 'Learn for 7 consecutive days',
                unlocked: this.userStats.streakDays >= 7
            },
            {
                id: 'score_master',
                icon: '🎯',
                title: 'Score Master',
                description: 'Achieve 90% average quiz score',
                unlocked: this.userStats.averageScore >= 90
            },
            {
                id: 'time_investor',
                icon: '⏱️',
                title: 'Time Investor',
                description: 'Spend 10+ hours learning',
                unlocked: this.userStats.totalTimeSpent >= 36000
            },
            {
                id: 'chapter_complete',
                icon: '📚',
                title: 'Chapter Champion',
                description: 'Complete an entire chapter',
                unlocked: this.getCompletedChapters().length > 0
            },
            {
                id: 'quick_learner',
                icon: '⚡',
                title: 'Quick Learner',
                description: 'Complete 50 lessons',
                unlocked: this.userStats.lessonsCompleted >= 50
            }
        ];
        
        return achievements;
    }

    /**
     * Get total lessons count
     */
    getTotalLessons() {
        // This should be calculated based on actual lessons in the system
        // For now, using an estimate
        return 60; // Estimated total lessons across all chapters
    }

    /**
     * Get average session time
     */
    getAverageSessionTime() {
        if (this.userStats.sessions.length === 0) return 0;
        
        const totalTime = this.userStats.sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
        return totalTime / this.userStats.sessions.length;
    }

    /**
     * Get completed chapters
     */
    getCompletedChapters() {
        const completedLessons = this.userStats.learningPath;
        const chapters = new Set();
        
        completedLessons.forEach(lessonId => {
            const chapterMatch = lessonId.match(/Chapter-(\d+)/);
            if (chapterMatch) {
                chapters.add(chapterMatch[1]);
            }
        });
        
        return Array.from(chapters);
    }

    /**
     * Format time in HH:MM:SS format
     */
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    }

    /**
     * Export user data
     */
    exportUserData() {
        const data = {
            userStats: this.userStats,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `webzonebw-learning-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    /**
     * Get user insights summary
     */
    getUserInsights() {
        return {
            totalSessions: this.userStats.sessions.length,
            averageSessionTime: this.formatTime(this.getAverageSessionTime()),
            learningPace: this.getLearningPace(),
            strengths: this.getStrengths(),
            areasForImprovement: this.getAreasForImprovement()
        };
    }

    /**
     * Get learning pace
     */
    getLearningPace() {
        const daysSinceStart = this.getDaysSinceStart();
        if (daysSinceStart === 0) return 'Just started';
        
        const lessonsPerDay = this.userStats.lessonsCompleted / daysSinceStart;
        
        if (lessonsPerDay >= 2) return 'Fast learner';
        if (lessonsPerDay >= 1) return 'Moderate pace';
        return 'Taking your time';
    }

    /**
     * Get days since start
     */
    getDaysSinceStart() {
        if (this.userStats.sessions.length === 0) return 0;
        
        const firstSession = new Date(this.userStats.sessions[0].startTime);
        const now = new Date();
        return Math.floor((now - firstSession) / (1000 * 60 * 60 * 24));
    }

    /**
     * Get learning strengths
     */
    getStrengths() {
        // Analyze quiz scores and completion patterns
        const strengths = [];
        
        if (this.userStats.averageScore >= 80) {
            strengths.push('High quiz performance');
        }
        
        if (this.userStats.streakDays >= 3) {
            strengths.push('Consistent learning habits');
        }
        
        if (this.userStats.totalTimeSpent >= 7200) { // 2+ hours
            strengths.push('Time commitment');
        }
        
        return strengths;
    }

    /**
     * Get areas for improvement
     */
    getAreasForImprovement() {
        const improvements = [];
        
        if (this.userStats.averageScore < 60) {
            improvements.push('Quiz performance - review material more thoroughly');
        }
        
        if (this.userStats.streakDays < 3) {
            improvements.push('Learning consistency - try to learn daily');
        }
        
        if (this.userStats.totalTimeSpent < 1800) { // Less than 30 minutes
            improvements.push('Time investment - consider longer study sessions');
        }
        
        return improvements;
    }
}

// Global analytics instance
let learningAnalytics;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    learningAnalytics = new LearningAnalytics();
});

// Global functions for analytics interaction
window.learningAnalytics = {
    trackLessonCompletion: function(lessonId, score) {
        if (learningAnalytics) learningAnalytics.trackLessonCompletion(lessonId, score);
    },
    trackQuizCompletion: function(quizId, score, totalQuestions) {
        if (learningAnalytics) learningAnalytics.trackQuizCompletion(quizId, score, totalQuestions);
    },
    exportData: function() {
        if (learningAnalytics) learningAnalytics.exportUserData();
    },
    getInsights: function() {
        if (learningAnalytics) return learningAnalytics.getUserInsights();
        return null;
    }
};

// CSS for analytics styling
const analyticsStyles = `
.progress-overview {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
}

.progress-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.progress-item {
    text-align: center;
    padding: 1rem;
    background: var(--background);
    border-radius: 8px;
    border: 1px solid var(--border);
}

.progress-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.progress-label {
    font-size: 0.875rem;
    color: var(--muted);
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 4px;
    transition: width 0.5s ease;
}

.insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.insight-item {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--border);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.insight-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.insight-content h4 {
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.insight-content p {
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.5;
}

.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.achievement-item {
    background: var(--background);
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid var(--border);
    text-align: center;
}

.achievement-item.unlocked {
    background: #f0fdf4;
    border-color: #22c55e;
}

.achievement-item.locked {
    opacity: 0.6;
}

.achievement-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.achievement-content h4 {
    color: var(--text);
    margin-bottom: 0.25rem;
}

.achievement-content p {
    color: var(--muted);
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
}

.achievement-status {
    font-size: 0.75rem;
    font-weight: bold;
}

@media (max-width: 768px) {
    .progress-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .insights-grid,
    .achievements-grid {
        grid-template-columns: 1fr;
    }
}
`;

// Add analytics styles to head
const analyticsStyleElement = document.createElement('style');
analyticsStyleElement.textContent = analyticsStyles;
document.head.appendChild(analyticsStyleElement);