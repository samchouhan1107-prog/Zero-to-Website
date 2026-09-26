// ==================================================
// GAMIFICATION SYSTEM - Enhanced from W3Schools & Waaree
// ==================================================

class GamificationEngine {
    constructor() {
        this.userProgress = this.loadProgress();
        this.achievements = this.initAchievements();
        this.challenges = this.initChallenges();
        this.community = this.initCommunity();
        this.init();
    }

    // Load user progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('webzonebw_progress');
        return saved ? JSON.parse(saved) : {
            level: 1,
            xp: 0,
            totalXP: 0,
            streak: 0,
            lastActive: new Date().toISOString(),
            completedLessons: [],
            earnedBadges: [],
            currentPath: '01-getting-started'
        };
    }

    // Initialize achievements system
    initAchievements() {
        return [
            {
                id: 'first-lesson',
                name: 'First Steps',
                icon: '🚀',
                description: 'Complete your first lesson',
                requirement: { type: 'lessons', count: 1 },
                xp: 50,
                unlocked: false
            },
            {
                id: 'css-master',
                name: 'CSS Master',
                icon: '🎨',
                description: 'Complete all CSS lessons',
                requirement: { type: 'css', count: 7 },
                xp: 200,
                unlocked: false
            },
            {
                id: 'javascript-ninja',
                name: 'JavaScript Ninja',
                icon: '⚡',
                description: 'Complete all JavaScript lessons',
                requirement: { type: 'javascript', count: 10 },
                xp: 300,
                unlocked: false
            },
            {
                id: 'week-streak',
                name: 'Week Warrior',
                icon: '🔥',
                description: '7-day learning streak',
                requirement: { type: 'streak', count: 7 },
                xp: 150,
                unlocked: false
            },
            {
                id: 'project-builder',
                name: 'Project Builder',
                icon: '🏗️',
                description: 'Complete final project',
                requirement: { type: 'project', count: 1 },
                xp: 400,
                unlocked: false
            }
        ];
    }

    // Initialize daily challenges
    initChallenges() {
        return [
            {
                id: 'daily-css',
                title: 'CSS Flexbox Challenge',
                description: 'Build a responsive navigation menu using Flexbox',
                xp: 50,
                streak: 2,
                difficulty: 'medium',
                category: 'css'
            },
            {
                id: 'daily-js',
                title: 'JavaScript DOM Manipulation',
                description: 'Create an interactive todo list',
                xp: 75,
                streak: 3,
                difficulty: 'hard',
                category: 'javascript'
            },
            {
                id: 'daily-html',
                title: 'Semantic HTML Practice',
                description: 'Structure a blog post with proper semantic tags',
                xp: 40,
                streak: 1,
                difficulty: 'easy',
                category: 'html'
            }
        ];
    }

    // Initialize community features
    initCommunity() {
        return {
            recentActivity: [
                {
                    user: 'Alex Chen',
                    avatar: 'https://picsum.photos/seed/alex/40/40.jpg',
                    action: 'completed',
                    lesson: 'CSS Box Model',
                    time: '2 minutes ago'
                },
                {
                    user: 'Sarah Johnson',
                    avatar: 'https://picsum.photos/seed/sarah/40/40.jpg',
                    action: 'started',
                    lesson: 'JavaScript Functions',
                    time: '15 minutes ago'
                },
                {
                    user: 'Mike Davis',
                    avatar: 'https://picsum.photos/seed/mike/40/40.jpg',
                    action: 'earned',
                    badge: 'CSS Master',
                    time: '1 hour ago'
                }
            ],
            globalLeaderboard: [
                { name: 'Emma Wilson', xp: 1250, level: 8 },
                { name: 'John Smith', xp: 980, level: 7 },
                { name: 'Lisa Brown', xp: 750, level: 6 }
            ]
        };
    }

    // Initialize the gamification system
    init() {
        this.updateUI();
        this.startStreakTracking();
        this.loadDailyChallenges();
        this.initEventListeners();
    }

    // Update UI with current progress
    updateUI() {
        this.updateProgressBar();
        this.updateLevel();
        this.updateAchievements();
        this.updateChallenges();
        this.updateCommunity();
    }

    // Update XP progress bar
    updateProgressBar() {
        const xpBar = document.querySelector('.xp-fill');
        const xpInfo = document.querySelector('.xp-needed');
        
        if (xpBar && xpInfo) {
            const currentLevelXP = this.getLevelXP(this.userProgress.level);
            const nextLevelXP = this.getLevelXP(this.userProgress.level + 1);
            const progress = ((this.userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
            
            xpBar.style.width = `${Math.min(progress, 100)}%`;
            xpInfo.textContent = `${this.userProgress.xp}/${nextLevelXP} XP`;
        }
    }

    // Calculate XP needed for level
    getLevelXP(level) {
        return (level - 1) * 500 + 100; // 100 XP for level 1, 600 for level 2, etc.
    }

    // Update level display
    updateLevel() {
        const levelDisplay = document.querySelector('.current-level');
        if (levelDisplay) {
            levelDisplay.textContent = `Level ${this.userProgress.level}: ${this.getLevelTitle()}`;
        }
    }

    // Get level title based on progress
    getLevelTitle() {
        const titles = [
            'Web Beginner', 'HTML Learner', 'CSS Apprentice', 'JavaScript Novice',
            'Frontend Developer', 'Web Engineer', 'Full Stack Developer', 'Senior Developer'
        ];
        return titles[Math.min(this.userProgress.level - 1, titles.length - 1)];
    }

    // Update achievements display
    updateAchievements() {
        const achievementsContainer = document.querySelector('.achievements');
        if (!achievementsContainer) return;

        achievementsContainer.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const isEarned = this.userProgress.earnedBadges.includes(achievement.id);
            const badge = document.createElement('div');
            badge.className = `badge ${isEarned ? 'earned' : 'locked'}`;
            badge.innerHTML = `
                <span class="badge-icon">${achievement.icon}</span>
                <span class="badge-name">${achievement.name}</span>
            `;
            
            if (isEarned) {
                badge.addEventListener('click', () => this.showAchievementDetails(achievement));
            }
            
            achievementsContainer.appendChild(badge);
        });
    }

    // Update challenges display
    updateChallenges() {
        const challengesContainer = document.querySelector('.challenges-container');
        if (!challengesContainer) return;

        challengesContainer.innerHTML = '';
        
        this.challenges.forEach(challenge => {
            const challengeCard = document.createElement('div');
            challengeCard.className = 'challenge-card';
            challengeCard.innerHTML = `
                <h3>🎯 ${challenge.title}</h3>
                <p>${challenge.description}</p>
                <div class="challenge-rewards">
                    <span class="reward-item xp">🎁 +${challenge.xp} XP</span>
                    <span class="reward-item streak">⭐ ${challenge.streak}x Streak</span>
                </div>
                <button class="start-challenge" onclick="gameEngine.startChallenge('${challenge.id}')">
                    Start Challenge
                </button>
            `;
            
            challengesContainer.appendChild(challengeCard);
        });
    }

    // Update community section
    updateCommunity() {
        const activityContainer = document.querySelector('.recent-activity');
        if (!activityContainer) return;

        activityContainer.innerHTML = '';
        
        this.community.recentActivity.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <img src="${activity.avatar}" class="user-avatar" alt="${activity.user}">
                <div class="activity-text">
                    <span class="user-name">${activity.user}</span>
                    ${activity.action === 'completed' ? 'completed' : activity.action === 'started' ? 'started' : 'earned'} 
                    <span class="lesson-title">${activity.lesson || activity.badge}</span>
                </div>
            `;
            
            activityContainer.appendChild(activityItem);
        });
    }

    // Start tracking learning streak
    startStreakTracking() {
        const now = new Date();
        const lastActive = new Date(this.userProgress.lastActive);
        const daysDiff = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
            this.userProgress.streak++;
            this.addXP(10, 'Daily streak bonus!');
        } else if (daysDiff > 1) {
            this.userProgress.streak = 1;
        }

        this.userProgress.lastActive = now.toISOString();
        this.saveProgress();
    }

    // Load daily challenges
    loadDailyChallenges() {
        const today = new Date().toDateString();
        const lastChallengeLoad = localStorage.getItem('last_challenge_load');
        
        if (lastChallengeLoad !== today) {
            this.shuffleChallenges();
            localStorage.setItem('last_challenge_load', today);
        }
    }

    // Shuffle challenges for variety
    shuffleChallenges() {
        for (let i = this.challenges.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.challenges[i], this.challenges[j]] = [this.challenges[j], this.challenges[i]];
        }
    }

    // Initialize event listeners
    initEventListeners() {
        // Lesson completion
        document.addEventListener('lessonCompleted', (e) => {
            this.completeLesson(e.detail.lessonId, e.detail.xp);
        });

        // Challenge completion
        document.addEventListener('challengeCompleted', (e) => {
            this.completeChallenge(e.detail.challengeId, e.detail.xp);
        });
    }

    // Complete a lesson
    completeLesson(lessonId, xp = 50) {
        if (!this.userProgress.completedLessons.includes(lessonId)) {
            this.userProgress.completedLessons.push(lessonId);
            this.addXP(xp, `Completed lesson: ${lessonId}`);
            this.checkAchievements();
            this.saveProgress();
            this.updateUI();
            
            // Show celebration
            this.showCelebration('Lesson Completed! 🎉');
        }
    }

    // Complete a challenge
    completeChallenge(challengeId, xp = 100) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            this.addXP(challenge.xp, `Completed challenge: ${challenge.title}`);
            this.userProgress.streak += challenge.streak;
            this.checkAchievements();
            this.saveProgress();
            this.updateUI();
            
            // Show celebration
            this.showCelebration('Challenge Completed! 🏆');
        }
    }

    // Add XP to user
    addXP(amount, reason = '') {
        this.userProgress.xp += amount;
        this.userProgress.totalXP += amount;
        
        // Check for level up
        const nextLevelXP = this.getLevelXP(this.userProgress.level + 1);
        if (this.userProgress.xp >= nextLevelXP) {
            this.levelUp();
        }
        
        if (reason) {
            console.log(`+${amount} XP: ${reason}`);
        }
    }

    // Level up the user
    levelUp() {
        this.userProgress.level++;
        this.showCelebration(`Level Up! You are now Level ${this.userProgress.level} 🎊`);
        this.checkAchievements();
    }

    // Check for unlocked achievements
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.userProgress.earnedBadges.includes(achievement.id)) {
                if (this meetsRequirement(achievement.requirement)) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }

    // Check if user meets achievement requirement
    meetsRequirement(requirement) {
        switch (requirement.type) {
            case 'lessons':
                return this.userProgress.completedLessons.length >= requirement.count;
            case 'css':
                return this.getCompletedLessonsByCategory('css').length >= requirement.count;
            case 'javascript':
                return this.getCompletedLessonsByCategory('javascript').length >= requirement.count;
            case 'streak':
                return this.userProgress.streak >= requirement.count;
            case 'project':
                return this.userProgress.completedLessons.includes('final-project');
            default:
                return false;
        }
    }

    // Get completed lessons by category
    getCompletedLessonsByCategory(category) {
        return this.userProgress.completedLessons.filter(lessonId => 
            lessonId.includes(category.toLowerCase())
        );
    }

    // Unlock an achievement
    unlockAchievement(achievement) {
        this.userProgress.earnedBadges.push(achievement.id);
        this.addXP(achievement.xp, `Achievement unlocked: ${achievement.name}`);
        this.showCelebration(`Achievement Unlocked: ${achievement.name} ${achievement.icon}`);
        
        // Show achievement notification
        this.showAchievementNotification(achievement);
    }

    // Show achievement details
    showAchievementDetails(achievement) {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                <p><strong>Reward:</strong> +${achievement.xp} XP</p>
                <button class="royal-btn royal-btn-primary" onclick="this.parentElement.parentElement.remove()">
                    Close
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="notification-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievement.name}</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Start a challenge
    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            this.showChallengeModal(challenge);
        }
    }

    // Show challenge modal
    showChallengeModal(challenge) {
        const modal = document.createElement('div');
        modal.className = 'challenge-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🎯 ${challenge.title}</h3>
                <p>${challenge.description}</p>
                <div class="challenge-info">
                    <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
                    <p><strong>Rewards:</strong> +${challenge.xp} XP, ${challenge.streak}x Streak</p>
                </div>
                <div class="challenge-actions">
                    <button class="royal-btn royal-btn-secondary" onclick="this.parentElement.parentElement.remove()">
                        Cancel
                    </button>
                    <button class="royal-btn royal-btn-primary" onclick="gameEngine.acceptChallenge('${challenge.id}'); this.parentElement.parentElement.remove();">
                        Accept Challenge
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Accept a challenge
    acceptChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            this.showCelebration(`Challenge accepted: ${challenge.title}! Good luck! 🚀`);
            // Here you would typically redirect to the challenge workspace
        }
    }

    // Show celebration animation
    showCelebration(message) {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h3>${message}</h3>
            </div>
        `;
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem('webzonebw_progress', JSON.stringify(this.userProgress));
    }

    // Export user progress
    exportProgress() {
        return {
            ...this.userProgress,
            exportDate: new Date().toISOString()
        };
    }

    // Import user progress
    importProgress(progressData) {
        this.userProgress = progressData;
        this.saveProgress();
        this.updateUI();
    }
}

// Initialize the gamification engine when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.gameEngine = new GamificationEngine();
});

// Global functions for external use
window.completeLesson = function(lessonId, xp = 50) {
    if (window.gameEngine) {
        window.gameEngine.completeLesson(lessonId, xp);
    }
};

window.completeChallenge = function(challengeId, xp = 100) {
    if (window.gameEngine) {
        window.gameEngine.completeChallenge(challengeId, xp);
    }
};