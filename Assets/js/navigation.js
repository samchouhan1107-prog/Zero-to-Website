/**
 * WebZoneBW.shop Navigation System
 * Handles lesson-first navigation, progress tracking, and user experience
 */

class LessonNavigation {
    constructor() {
        this.currentLesson = null;
        this.currentChapter = null;
        this.lessonData = null;
        this.initializeNavigation();
    }

    /**
     * Initialize navigation system
     */
    initializeNavigation() {
        this.detectCurrentLesson();
        this.setupEventListeners();
        this.updateProgress();
    }

    /**
     * Detect current lesson and chapter from URL
     */
    detectCurrentLesson() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part);
        
        // Extract chapter and lesson from path
        // Expected format: /Chapters/Chapter-XX/Lesson-XX-Y/lesson.html
        if (pathParts.length >= 4 && pathParts[0] === 'Chapters') {
            this.currentChapter = pathParts[1];
            const lessonFolder = pathParts[2];
            this.currentLesson = lessonFolder.replace('/', '');
            
            // Load lesson data
            this.loadLessonData();
        }
    }

    /**
     * Load lesson data from localStorage
     */
    loadLessonData() {
        if (!this.currentLesson || !this.currentChapter) return;

        const saved = localStorage.getItem(`lesson_${this.currentLesson}`);
        if (saved) {
            this.lessonData = JSON.parse(saved);
        } else {
            this.lessonData = {
                id: this.currentLesson,
                chapter: this.currentChapter,
                progress: 0,
                completed: false,
                startedAt: new Date().toISOString(),
                lastAccessed: new Date().toISOString(),
                quizAnswers: {},
                practiceAttempts: 0,
                timeSpent: 0
            };
            this.saveLessonData();
        }
    }

    /**
     * Save lesson data to localStorage
     */
    saveLessonData() {
        if (this.lessonData) {
            localStorage.setItem(`lesson_${this.currentLesson}`, JSON.stringify(this.lessonData));
            this.updateChapterProgress();
        }
    }

    /**
     * Update chapter progress based on lesson completion
     */
    updateChapterProgress() {
        if (!this.currentChapter) return;

        const chapterData = this.getChapterData();
        const lessonIndex = chapterData.lessons.findIndex(l => l.id === this.currentLesson);
        
        if (lessonIndex !== -1 && this.lessonData.completed) {
            chapterData.lessons[lessonIndex].status = 'completed';
        } else if (lessonIndex !== -1 && this.lessonData.progress > 0) {
            chapterData.lessons[lessonIndex].status = 'in-progress';
        }

        localStorage.setItem(`progress_${this.currentChapter}`, JSON.stringify(chapterData));
    }

    /**
     * Get chapter data from localStorage
     */
    getChapterData() {
        const saved = localStorage.getItem(`progress_${this.currentChapter}`);
        if (saved) {
            return JSON.parse(saved);
        } else {
            // Initialize chapter data
            const chapterData = {
                chapter: this.currentChapter,
                lessons: this.initializeLessons()
            };
            localStorage.setItem(`progress_${this.currentChapter}`, JSON.stringify(chapterData));
            return chapterData;
        }
    }

    /**
     * Initialize lessons for current chapter
     */
    initializeLessons() {
        // This should be customized per chapter
        return [
            { id: "Lesson-01-Your-First-Webpage", title: "Your First Webpage", status: "not-started" },
            { id: "Lesson-02-Code-Editor-Setup", title: "Code Editor Setup", status: "not-started" },
            { id: "Lesson-03-Browser-Developer-Tools", title: "Browser Developer Tools", status: "not-started" },
            { id: "Lesson-04-Files-Folders-Project-Structure", title: "Project Structure", status: "not-started" },
            { id: "Lesson-05-Running-and-Testing-a-Website", title: "Running & Testing", status: "not-started" }
        ];
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
        
        // Navigation buttons
        document.addEventListener('click', (e) => this.handleNavigationClick(e));
        
        // Track time spent
        this.startTimeTracking();
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case 'ArrowRight':
                this.goToNextLesson();
                break;
            case 'ArrowLeft':
                this.goToPreviousLesson();
                break;
            case 'Home':
                e.preventDefault();
                this.goToChapterOverview();
                break;
            case 'End':
                e.preventDefault();
                this.goToLastLesson();
                break;
        }
    }

    /**
     * Handle navigation clicks
     */
    handleNavigationClick(e) {
        // Handle navigation buttons
        if (e.target.id === 'prevBtn' || e.target.closest('#prevBtn')) {
            this.goToPreviousLesson();
        } else if (e.target.id === 'nextBtn' || e.target.closest('#nextBtn')) {
            this.goToNextLesson();
        }
    }

    /**
     * Navigate to next lesson
     */
    goToNextLesson() {
        if (!this.lessonData || !this.lessonData.completed) {
            this.showCompletionMessage();
            return;
        }

        const chapterData = this.getChapterData();
        const currentLessonIndex = chapterData.lessons.findIndex(l => l.id === this.currentLesson);
        
        if (currentLessonIndex < chapterData.lessons.length - 1) {
            const nextLesson = chapterData.lessons[currentLessonIndex + 1];
            window.location.href = `../${nextLesson.id}/lesson.html`;
        } else {
            // Go to next chapter or completion
            this.handleChapterCompletion();
        }
    }

    /**
     * Navigate to previous lesson
     */
    goToPreviousLesson() {
        const chapterData = this.getChapterData();
        const currentLessonIndex = chapterData.lessons.findIndex(l => l.id === this.currentLesson);
        
        if (currentLessonIndex > 0) {
            const prevLesson = chapterData.lessons[currentLessonIndex - 1];
            window.location.href = `../${prevLesson.id}/lesson.html`;
        } else {
            window.location.href = '../index.html';
        }
    }

    /**
     * Navigate to chapter overview
     */
    goToChapterOverview() {
        window.location.href = '../index.html';
    }

    /**
     * Handle chapter completion
     */
    handleChapterCompletion() {
        const chapterData = this.getChapterData();
        const completedLessons = chapterData.lessons.filter(l => l.status === 'completed').length;
        
        if (completedLessons === chapterData.lessons.length) {
            // Chapter completed - navigate to next chapter or capstone
            this.showChapterCompletionMessage();
        } else {
            // Some lessons not completed
            this.showIncompleteChapterMessage();
        }
    }

    /**
     * Show completion message
     */
    showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <div class="completion-overlay">
                <div class="completion-dialog">
                    <h3>Complete the Lesson First</h3>
                    <p>Please finish all activities and quizzes before proceeding to the next lesson.</p>
                    <button onclick="this.closest('.completion-overlay').remove()">Got it</button>
                </div>
            </div>
        `;
        document.body.appendChild(message);
    }

    /**
     * Show chapter completion message
     */
    showChapterCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <div class="completion-overlay">
                <div class="completion-dialog">
                    <h3>Chapter Complete! 🎉</h3>
                    <p>Congratulations! You've completed all lessons in this chapter.</p>
                    <button onclick="this.closest('.completion-overlay').remove()">Continue</button>
                </div>
            </div>
        `;
        document.body.appendChild(message);
    }

    /**
     * Show incomplete chapter message
     */
    showIncompleteChapterMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <div class="completion-overlay">
                <div class="completion-dialog">
                    <h3>Complete All Lessons First</h3>
                    <p>Please complete all lessons in this chapter before proceeding.</p>
                    <button onclick="this.closest('.completion-overlay').remove()">Got it</button>
                </div>
            </div>
        `;
        document.body.appendChild(message);
    }

    /**
     * Update progress display
     */
    updateProgress() {
        if (!this.lessonData) return;

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${this.lessonData.progress}%`;
            progressText.textContent = `${this.lessonData.progress}% Complete`;
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            const chapterData = this.getChapterData();
            const currentLessonIndex = chapterData.lessons.findIndex(l => l.id === this.currentLesson);
            prevBtn.disabled = currentLessonIndex === 0;
        }

        if (nextBtn) {
            nextBtn.disabled = !this.lessonData.completed;
            if (this.lessonData.completed) {
                nextBtn.innerHTML = 'Continue to Next Lesson ➡';
            }
        }
    }

    /**
     * Track time spent on lesson
     */
    startTimeTracking() {
        if (!this.lessonData) return;

        const startTime = Date.now();
        
        // Save time when page unloads
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            this.lessonData.timeSpent += timeSpent;
            this.lessonData.lastAccessed = new Date().toISOString();
            this.saveLessonData();
        });

        // Update last accessed time periodically
        setInterval(() => {
            this.lessonData.lastAccessed = new Date().toISOString();
            this.saveLessonData();
        }, 30000); // Every 30 seconds
    }

    /**
     * Mark lesson as started
     */
    startLesson() {
        if (!this.lessonData) return;

        if (this.lessonData.progress === 0) {
            this.lessonData.progress = 10;
            this.lessonData.startedAt = new Date().toISOString();
            this.saveLessonData();
            this.updateProgress();
        }
    }

    /**
     * Update lesson progress
     */
    updateLessonProgress(progress, completed = false) {
        if (!this.lessonData) return;

        this.lessonData.progress = Math.min(100, progress);
        this.lessonData.completed = completed;
        
        if (completed) {
            this.lessonData.completedAt = new Date().toISOString();
        }
        
        this.saveLessonData();
        this.updateProgress();
    }

    /**
     * Add quiz answer
     */
    addQuizAnswer(questionId, answer, isCorrect) {
        if (!this.lessonData) return;

        this.lessonData.quizAnswers[questionId] = {
            answer: answer,
            isCorrect: isCorrect,
            timestamp: new Date().toISOString()
        };

        // Check if all quiz questions are answered correctly
        const quizQuestions = Object.keys(this.lessonData.quizAnswers);
        if (quizQuestions.length > 0) {
            const allCorrect = quizQuestions.every(q => 
                this.lessonData.quizAnswers[q].isCorrect
            );
            
            if (allCorrect) {
                this.updateLessonProgress(100, true);
            }
        }

        this.saveLessonData();
    }

    /**
     * Log practice activity
     */
    logPracticeActivity(type, details = {}) {
        if (!this.lessonData) return;

        this.lessonData.practiceAttempts += 1;
        
        if (!this.lessonData.activities) {
            this.lessonData.activities = [];
        }

        this.lessonData.activities.push({
            type: type,
            details: details,
            timestamp: new Date().toISOString()
        });

        this.saveLessonData();
    }

    /**
     * Get user statistics
     */
    getUserStats() {
        const stats = {
            totalLessons: 0,
            completedLessons: 0,
            totalTimeSpent: 0,
            averageProgress: 0,
            lastActivity: null
        };

        // Get all chapter data
        for (let i = 1; i <= 10; i++) {
            const chapterKey = `Chapter-0${i}-Development Environment`.replace('-0', '-');
            const chapterData = this.getChapterDataForKey(chapterKey);
            
            if (chapterData) {
                stats.totalLessons += chapterData.lessons.length;
                stats.completedLessons += chapterData.lessons.filter(l => l.status === 'completed').length;
                stats.totalTimeSpent += this.getLessonTimeSpent(chapterKey);
            }
        }

        stats.averageProgress = stats.totalLessons > 0 ? 
            Math.round((stats.completedLessons / stats.totalLessons) * 100) : 0;

        return stats;
    }

    /**
     * Get chapter data by key
     */
    getChapterDataForKey(chapterKey) {
        const saved = localStorage.getItem(`progress_${chapterKey}`);
        return saved ? JSON.parse(saved) : null;
    }

    /**
     * Get time spent for chapter
     */
    getLessonTimeSpent(chapterKey) {
        let totalTime = 0;
        const chapterData = this.getChapterDataForKey(chapterKey);
        
        if (chapterData) {
            chapterData.lessons.forEach(lesson => {
                const lessonData = JSON.parse(localStorage.getItem(`lesson_${lesson.id}`) || '{}');
                totalTime += lessonData.timeSpent || 0;
            });
        }
        
        return totalTime;
    }
}

// Global navigation instance
let lessonNavigation;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    lessonNavigation = new LessonNavigation();
});

// Global functions for lesson interaction
window.lessonNavigation = {
    startLesson: function() {
        if (lessonNavigation) lessonNavigation.startLesson();
    },
    updateProgress: function(progress, completed) {
        if (lessonNavigation) lessonNavigation.updateLessonProgress(progress, completed);
    },
    addQuizAnswer: function(questionId, answer, isCorrect) {
        if (lessonNavigation) lessonNavigation.addQuizAnswer(questionId, answer, isCorrect);
    },
    logPractice: function(type, details) {
        if (lessonNavigation) lessonNavigation.logPracticeActivity(type, details);
    },
    goToNext: function() {
        if (lessonNavigation) lessonNavigation.goToNextLesson();
    },
    goToPrevious: function() {
        if (lessonNavigation) lessonNavigation.goToPreviousLesson();
    }
};

// CSS for completion messages
const completionStyles = `
    .completion-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .completion-dialog {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .completion-dialog h3 {
        color: var(--primary);
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .completion-dialog p {
        color: var(--text);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .completion-dialog button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .completion-dialog button:hover {
        background: var(--secondary);
    }
`;

// Add completion styles to head
const styleElement = document.createElement('style');
styleElement.textContent = completionStyles;
document.head.appendChild(styleElement);