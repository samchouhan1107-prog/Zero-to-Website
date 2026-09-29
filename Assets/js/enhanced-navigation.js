/**
 * WebZoneBW.shop Enhanced Navigation System
 * Advanced navigation with cross-chapter progression, smart recommendations, and user experience optimization
 */

class EnhancedNavigation {
    constructor() {
        this.currentPosition = this.detectCurrentPosition();
        this.userProgress = this.loadUserProgress();
        this.navigationHistory = this.loadNavigationHistory();
        this.initializeEnhancedNavigation();
    }

    /**
     * Initialize enhanced navigation system
     */
    initializeEnhancedNavigation() {
        this.setupSmartNavigation();
        this.setupKeyboardShortcuts();
        this.setupProgressIndicators();
        this.setupCrossChapterNavigation();
        this.setupRecommendationEngine();
    }

    /**
     * Detect current position in the learning system
     */
    detectCurrentPosition() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part);
        
        if (pathParts.length >= 4 && pathParts[0] === 'Chapters') {
            return {
                chapter: pathParts[1],
                lesson: pathParts[2],
                type: 'lesson'
            };
        } else if (pathParts.length >= 2 && pathParts[0] === 'Chapters') {
            return {
                chapter: pathParts[1],
                type: 'chapter'
            };
        }
        
        return {
            type: 'home'
        };
    }

    /**
     * Load user progress from localStorage
     */
    loadUserProgress() {
        const saved = localStorage.getItem('enhancedNavigationProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            currentChapter: 'Chapter-01-Development Environment',
            currentLesson: null,
            completedLessons: [],
            unlockedChapters: ['Chapter-01-Development Environment'],
            lastActivity: new Date().toISOString(),
            totalPoints: 0,
            level: 1,
            preferences: {
                speed: 'normal',
                difficulty: 'auto',
                focus: 'balanced'
            }
        };
    }

    /**
     * Load navigation history
     */
    loadNavigationHistory() {
        const saved = localStorage.getItem('navigationHistory');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return [];
    }

    /**
     * Setup smart navigation features
     */
    setupSmartNavigation() {
        this.setupIntelligentNavigation();
        this.setupContextAwareNavigation();
        this.setupProgressBasedNavigation();
    }

    /**
     * Setup intelligent navigation recommendations
     */
    setupIntelligentNavigation() {
        this.updateNavigationRecommendations();
        this.setupSmartButtons();
    }

    /**
     * Update navigation recommendations based on user progress
     */
    updateNavigationRecommendations() {
        const recommendations = this.generateRecommendations();
        this.renderRecommendations(recommendations);
    }

    /**
     * Generate personalized recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        
        // Next lesson recommendation
        const nextLesson = this.getNextRecommendedLesson();
        if (nextLesson) {
            recommendations.push({
                type: 'next_lesson',
                title: 'Continue Learning',
                description: `Next: ${nextLesson.title}`,
                action: () => this.navigateToLesson(nextLesson.id),
                priority: 1
            });
        }
        
        // Review recommendation
        const reviewLesson = this.getReviewRecommendation();
        if (reviewLesson) {
            recommendations.push({
                type: 'review',
                title: 'Review Previous',
                description: `Review: ${reviewLesson.title}`,
                action: () => this.navigateToLesson(reviewLesson.id),
                priority: 2
            });
        }
        
        // Chapter completion recommendation
        const chapterProgress = this.getChapterProgress();
        if (chapterProgress.completion >= 80 && chapterProgress.completion < 100) {
            recommendations.push({
                type: 'chapter_complete',
                title: 'Complete Chapter',
                description: 'Finish this chapter to unlock the next one',
                action: () => this.showChapterCompletion(),
                priority: 3
            });
        }
        
        // New chapter unlock
        const nextChapter = this.getNextChapter();
        if (nextChapter && this.userProgress.unlockedChapters.includes(nextChapter.id)) {
            recommendations.push({
                type: 'new_chapter',
                title: 'New Chapter Available',
                description: `Start ${nextChapter.title}`,
                action: () => this.navigateToChapter(nextChapter.id),
                priority: 4
            });
        }
        
        return recommendations.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Get next recommended lesson
     */
    getNextRecommendedLesson() {
        const currentChapter = this.getCurrentChapterData();
        if (!currentChapter) return null;
        
        // Find the next incomplete lesson in current chapter
        for (const lesson of currentChapter.lessons) {
            if (!this.userProgress.completedLessons.includes(lesson.id)) {
                return lesson;
            }
        }
        
        return null;
    }

    /**
     * Get review recommendation
     */
    getReviewRecommendation() {
        const completedLessons = this.userProgress.completedLessons.slice(-3);
        if (completedLessons.length === 0) return null;
        
        // Get the most recent completed lesson
        const lastLesson = completedLessons[completedLessons.length - 1];
        const currentChapter = this.getCurrentChapterData();
        
        if (currentChapter) {
            const lesson = currentChapter.lessons.find(l => l.id === lastLesson);
            return lesson || null;
        }
        
        return null;
    }

    /**
     * Get current chapter data
     */
    getCurrentChapterData() {
        // This should be loaded from a chapter data source
        // For now, using a mock structure
        const chapters = this.getAllChapters();
        return chapters.find(chapter => chapter.id === this.userProgress.currentChapter);
    }

    /**
     * Get all chapters data
     */
    getAllChapters() {
        return [
            {
                id: 'Chapter-01-Development Environment',
                title: 'Development Environment',
                lessons: [
                    { id: 'Lesson-01-Your-First-Webpage', title: 'Your First Webpage' },
                    { id: 'Lesson-02-Code-Editor-Setup', title: 'Code Editor Setup' },
                    { id: 'Lesson-03-Browser-Developer-Tools', title: 'Browser Developer Tools' },
                    { id: 'Lesson-04-Files-Folders-Project-Structure', title: 'Project Structure' },
                    { id: 'Lesson-05-Running-and-Testing-a-Website', title: 'Running & Testing' }
                ]
            },
            {
                id: 'Chapter-02-HTML',
                title: 'HTML Fundamentals',
                lessons: [
                    { id: 'Lesson-01-HTML-Basics', title: 'HTML Basics' },
                    { id: 'Lesson-02-Semantic-Elements', title: 'Semantic Elements' },
                    // ... more lessons
                ]
            },
            {
                id: 'Chapter-03-CSS',
                title: 'CSS Styling',
                lessons: [
                    { id: 'Lesson-01-Box-Model', title: 'Box Model' },
                    { id: 'Lesson-02-Selectors-Specificity', title: 'Selectors & Specificity' },
                    // ... more lessons
                ]
            }
            // ... more chapters
        ];
    }

    /**
     * Get chapter progress
     */
    getChapterProgress() {
        const currentChapter = this.getCurrentChapterData();
        if (!currentChapter) return { completion: 0, total: 0 };
        
        const completed = currentChapter.lessons.filter(lesson => 
            this.userProgress.completedLessons.includes(lesson.id)
        ).length;
        
        const total = currentChapter.lessons.length;
        const completion = Math.round((completed / total) * 100);
        
        return { completion, total, completed };
    }

    /**
     * Get next chapter
     */
    getNextChapter() {
        const chapters = this.getAllChapters();
        const currentIndex = chapters.findIndex(ch => ch.id === this.userProgress.currentChapter);
        
        if (currentIndex >= 0 && currentIndex < chapters.length - 1) {
            return chapters[currentIndex + 1];
        }
        
        return null;
    }

    /**
     * Render navigation recommendations
     */
    renderRecommendations(recommendations) {
        const container = document.getElementById('navigation-recommendations');
        if (!container) return;
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item priority-${rec.priority}">
                <div class="recommendation-icon">${this.getRecommendationIcon(rec.type)}</div>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
                <button onclick="enhancedNavigation.executeRecommendation('${rec.type}')" 
                        class="btn-primary recommendation-action">
                    Go
                </button>
            </div>
        `).join('');
    }

    /**
     * Get recommendation icon
     */
    getRecommendationIcon(type) {
        const icons = {
            next_lesson: '➡️',
            review: '🔄',
            chapter_complete: '🎯',
            new_chapter: '🚀',
            practice: '🧪',
            achievement: '🏆'
        };
        
        return icons[type] || '💡';
    }

    /**
     * Execute recommendation action
     */
    executeRecommendation(type) {
        const recommendations = this.generateRecommendations();
        const recommendation = recommendations.find(r => r.type === type);
        
        if (recommendation) {
            recommendation.action();
        }
    }

    /**
     * Setup smart navigation buttons
     */
    setupSmartButtons() {
        this.setupAdaptiveNextButton();
        this.setupContextAwareBackButton();
        this.setupQuickNavigation();
    }

    /**
     * Setup adaptive next button
     */
    setupAdaptiveNextButton() {
        const nextButton = document.getElementById('smart-next-button');
        if (!nextButton) return;
        
        const nextLesson = this.getNextRecommendedLesson();
        
        if (nextLesson) {
            nextButton.textContent = `Next: ${nextLesson.title}`;
            nextButton.onclick = () => this.navigateToLesson(nextLesson.id);
            nextButton.disabled = false;
        } else {
            nextButton.textContent = 'Chapter Complete';
            nextButton.disabled = true;
        }
    }

    /**
     * Setup context-aware back button
     */
    setupContextAwareBackButton() {
        const backButton = document.getElementById('smart-back-button');
        if (!backButton) return;
        
        if (this.currentPosition.type === 'lesson') {
            backButton.textContent = 'Back to Chapter';
            backButton.onclick = () => this.navigateToChapter(this.currentPosition.chapter);
        } else {
            backButton.textContent = 'Back to Home';
            backButton.onclick = () => this.navigateToHome();
        }
    }

    /**
     * Setup quick navigation menu
     */
    setupQuickNavigation() {
        const quickNav = document.getElementById('quick-navigation');
        if (!quickNav) return;
        
        const chapters = this.getAllChapters();
        const unlockedChapters = this.userProgress.unlockedChapters;
        
        quickNav.innerHTML = chapters.map(chapter => {
            const isUnlocked = unlockedChapters.includes(chapter.id);
            const progress = this.getChapterProgressForChapter(chapter);
            
            return `
                <div class="chapter-nav-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="chapter-info">
                        <h4>${chapter.title}</h4>
                        <div class="chapter-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <span>${progress}%</span>
                        </div>
                    </div>
                    ${isUnlocked ? `
                        <button onclick="enhancedNavigation.navigateToChapter('${chapter.id}')" 
                                class="btn-secondary">
                            ${progress === 100 ? 'Review' : 'Start'}
                        </button>
                    ` : `
                        <button class="btn-secondary locked" disabled>
                            🔒 Locked
                        </button>
                    `}
                </div>
            `;
        }).join('');
    }

    /**
     * Get chapter progress for specific chapter
     */
    getChapterProgressForChapter(chapter) {
        const completed = chapter.lessons.filter(lesson => 
            this.userProgress.completedLessons.includes(lesson.id)
        ).length;
        
        return Math.round((completed / chapter.lessons.length) * 100);
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        this.setupNavigationShortcuts();
        this.setupPowerUserShortcuts();
    }

    /**
     * Setup navigation keyboard shortcuts
     */
    setupNavigationShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + N for next lesson
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                this.navigateToNext();
            }
            
            // Alt + P for previous lesson
            if (e.altKey && e.key === 'p') {
                e.preventDefault();
                this.navigateToPrevious();
            }
            
            // Alt + H for home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                this.navigateToHome();
            }
            
            // Alt + C for chapter overview
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.navigateToChapter(this.currentPosition.chapter);
            }
        });
    }

    /**
     * Setup power user shortcuts
     */
    setupPowerUserShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for quick search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showQuickSearch();
            }
            
            // Ctrl/Cmd + L for learning analytics
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                this.showLearningAnalytics();
            }
            
            // Ctrl/Cmd + R for recommendations
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                this.showRecommendations();
            }
        });
    }

    /**
     * Setup progress indicators
     */
    setupProgressIndicators() {
        this.setupVisualProgress();
        this.setupProgressNotifications();
    }

    /**
     * Setup visual progress indicators
     */
    setupVisualProgress() {
        this.updateProgressBar();
        this.updateProgressIndicator();
        this.updateAchievementIndicator();
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progressBar = document.getElementById('overall-progress-bar');
        if (!progressBar) return;
        
        const totalLessons = this.getTotalLessons();
        const completedLessons = this.userProgress.completedLessons.length;
        const percentage = Math.round((completedLessons / totalLessons) * 100);
        
        progressBar.innerHTML = `
            <div class="progress-info">
                <span class="progress-text">Overall Progress</span>
                <span class="progress-percentage">${percentage}%</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="progress-stats">
                <span>${completedLessons}/${totalLessons} lessons</span>
                <span>Level ${this.userProgress.level}</span>
            </div>
        `;
    }

    /**
     * Update progress indicator
     */
    updateProgressIndicator() {
        const indicator = document.getElementById('current-progress-indicator');
        if (!indicator) return;
        
        const chapterProgress = this.getChapterProgress();
        const lessonProgress = this.getCurrentLessonProgress();
        
        indicator.innerHTML = `
            <div class="progress-chapter">
                <span class="chapter-name">${this.getChapterTitle(this.currentPosition.chapter)}</span>
                <span class="chapter-progress">${chapterProgress.completion}%</span>
            </div>
            <div class="progress-lesson">
                <span class="lesson-name">${lessonProgress.title}</span>
                <span class="lesson-progress">${lessonProgress.progress}%</span>
            </div>
        `;
    }

    /**
     * Update achievement indicator
     */
    updateAchievementIndicator() {
        const indicator = document.getElementById('achievement-indicator');
        if (!indicator) return;
        
        const recentAchievements = this.getRecentAchievements();
        
        if (recentAchievements.length > 0) {
            indicator.innerHTML = `
                <div class="achievement-notification">
                    <div class="achievement-icon">🏆</div>
                    <div class="achievement-text">
                        <strong>Achievement Unlocked!</strong>
                        <p>${recentAchievements[0].title}</p>
                    </div>
                </div>
            `;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                indicator.innerHTML = '';
            }, 5000);
        }
    }

    /**
     * Setup cross-chapter navigation
     */
    setupCrossChapterNavigation() {
        this.setupChapterUnlockSystem();
        this.setupProgressionPath();
        this.setupPrerequisites();
    }

    /**
     * Setup chapter unlock system
     */
    setupChapterUnlockSystem() {
        this.updateChapterAccessibility();
        this.setupUnlockNotifications();
    }

    /**
     * Update chapter accessibility
     */
    updateChapterAccessibility() {
        const chapters = this.getAllChapters();
        const unlockedChapters = this.userProgress.unlockedChapters;
        
        chapters.forEach((chapter, index) => {
            const isAccessible = unlockedChapters.includes(chapter.id) || index === 0;
            
            // Update UI elements for chapter accessibility
            this.updateChapterUI(chapter.id, isAccessible);
        });
    }

    /**
     * Update chapter UI elements
     */
    updateChapterUI(chapterId, isAccessible) {
        const chapterElements = document.querySelectorAll(`[data-chapter="${chapterId}"]`);
        
        chapterElements.forEach(element => {
            if (isAccessible) {
                element.classList.remove('locked');
                element.classList.add('unlocked');
                element.disabled = false;
            } else {
                element.classList.remove('unlocked');
                element.classList.add('locked');
                element.disabled = true;
            }
        });
    }

    /**
     * Setup prerequisites system
     */
    setupPrerequisites() {
        const prerequisites = this.getLessonPrerequisites();
        this.validatePrerequisites(prerequisites);
    }

    /**
     * Get lesson prerequisites
     */
    getLessonPrerequisites() {
        return {
            'Lesson-02-Code-Editor-Setup': ['Lesson-01-Your-First-Webpage'],
            'Lesson-03-Browser-Developer-Tools': ['Lesson-02-Code-Editor-Setup'],
            'Lesson-04-Files-Folders-Project-Structure': ['Lesson-03-Browser-Developer-Tools'],
            'Lesson-05-Running-and-Testing-a-Website': ['Lesson-04-Files-Folders-Project-Structure']
        };
    }

    /**
     * Validate prerequisites for current lesson
     */
    validatePrerequisites(prerequisites) {
        const currentLessonId = this.getCurrentLessonId();
        if (!currentLessonId || !prerequisites[currentLessonId]) return;
        
        const requiredLessons = prerequisites[currentLessonId];
        const completedRequirements = requiredLessons.filter(lessonId => 
            this.userProgress.completedLessons.includes(lessonId)
        );
        
        if (completedRequirements.length !== requiredLessons.length) {
            this.showPrerequisiteWarning(currentLessonId, requiredLessons);
        }
    }

    /**
     * Show prerequisite warning
     */
    showPrerequisiteWarning(lessonId, requiredLessons) {
        const warning = document.getElementById('prerequisite-warning');
        if (!warning) return;
        
        warning.innerHTML = `
            <div class="prerequisite-warning">
                <div class="warning-icon">⚠️</div>
                <div class="warning-content">
                    <h4>Complete prerequisites first</h4>
                    <p>Please complete the following lessons before continuing:</p>
                    <ul>
                        ${requiredLessons.map(lessonId => `
                            <li>${this.getLessonTitle(lessonId)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        warning.style.display = 'block';
    }

    /**
     * Setup recommendation engine
     */
    setupRecommendationEngine() {
        this.setupPersonalizedRecommendations();
        this.setupAdaptiveDifficulty();
        this.setupLearningPathOptimization();
    }

    /**
     * Setup personalized recommendations
     */
    setupPersonalizedRecommendations() {
        const userPreferences = this.userProgress.preferences;
        const recommendations = this.generatePersonalizedRecommendations(userPreferences);
        
        this.renderPersonalizedRecommendations(recommendations);
    }

    /**
     * Generate personalized recommendations based on user preferences
     */
    generatePersonalizedRecommendations(preferences) {
        const recommendations = [];
        
        // Speed-based recommendations
        if (preferences.speed === 'fast') {
            recommendations.push({
                type: 'intensive_mode',
                title: 'Intensive Learning Mode',
                description: 'Accelerated pace for quick learners',
                action: () => this.enableIntensiveMode()
            });
        }
        
        // Difficulty-based recommendations
        if (preferences.difficulty === 'advanced') {
            recommendations.push({
                type: 'advanced_content',
                title: 'Advanced Topics',
                description: 'Challenge yourself with advanced concepts',
                action: () => this.showAdvancedContent()
            });
        }
        
        // Focus-based recommendations
        if (preferences.focus === 'practice') {
            recommendations.push({
                type: 'practice_focus',
                title: 'Practice-Oriented Path',
                description: 'More hands-on coding exercises',
                action: () => this.enablePracticeFocus()
            });
        }
        
        return recommendations;
    }

    /**
     * Render personalized recommendations
     */
    renderPersonalizedRecommendations(recommendations) {
        const container = document.getElementById('personalized-recommendations');
        if (!container || recommendations.length === 0) return;
        
        container.innerHTML = recommendations.map(rec => `
            <div class="personalized-recommendation">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <button onclick="enhancedNavigation.executePersonalizedRecommendation('${rec.type}')" 
                        class="btn-primary">
                    Try It
                </button>
            </div>
        `).join('');
    }

    /**
     * Execute personalized recommendation
     */
    executePersonalizedRecommendation(type) {
        const recommendations = this.generatePersonalizedRecommendations(this.userProgress.preferences);
        const recommendation = recommendations.find(r => r.type === type);
        
        if (recommendation) {
            recommendation.action();
        }
    }

    // Navigation methods
    navigateToLesson(lessonId) {
        const lesson = this.findLessonById(lessonId);
        if (lesson) {
            this.recordNavigation('lesson', lessonId);
            window.location.href = this.getLessonPath(lessonId);
        }
    }

    navigateToChapter(chapterId) {
        this.recordNavigation('chapter', chapterId);
        window.location.href = this.getChapterPath(chapterId);
    }

    navigateToNext() {
        const nextLesson = this.getNextRecommendedLesson();
        if (nextLesson) {
            this.navigateToLesson(nextLesson.id);
        } else {
            const nextChapter = this.getNextChapter();
            if (nextChapter) {
                this.navigateToChapter(nextChapter.id);
            }
        }
    }

    navigateToPrevious() {
        const previousLesson = this.getPreviousLesson();
        if (previousLesson) {
            this.navigateToLesson(previousLesson.id);
        } else {
            this.navigateToChapter(this.currentPosition.chapter);
        }
    }

    navigateToHome() {
        this.recordNavigation('home', 'home');
        window.location.href = '/';
    }

    // Helper methods
    findLessonById(lessonId) {
        const chapters = this.getAllChapters();
        for (const chapter of chapters) {
            const lesson = chapter.lessons.find(l => l.id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    }

    getLessonPath(lessonId) {
        const lesson = this.findLessonById(lessonId);
        if (!lesson) return '/';
        
        const chapter = this.getCurrentChapterForLesson(lessonId);
        return `/Chapters/${chapter.id}/${lessonId}/lesson.html`;
    }

    getChapterPath(chapterId) {
        return `/Chapters/${chapterId}/index.html`;
    }

    getCurrentChapterForLesson(lessonId) {
        const chapters = this.getAllChapters();
        for (const chapter of chapters) {
            if (chapter.lessons.some(l => l.id === lessonId)) {
                return chapter;
            }
        }
        return chapters[0];
    }

    getChapterTitle(chapterId) {
        const chapter = this.getAllChapters().find(ch => ch.id === chapterId);
        return chapter ? chapter.title : 'Unknown Chapter';
    }

    getLessonTitle(lessonId) {
        const lesson = this.findLessonById(lessonId);
        return lesson ? lesson.title : 'Unknown Lesson';
    }

    getCurrentLessonId() {
        return this.currentPosition.lesson;
    }

    getCurrentLessonProgress() {
        const lessonId = this.getCurrentLessonId();
        if (!lessonId) {
            return { title: 'Unknown', progress: 0 };
        }
        
        const lesson = this.findLessonById(lessonId);
        const progress = this.getLessonProgress(lessonId);
        
        return {
            title: lesson ? lesson.title : 'Unknown',
            progress: progress
        };
    }

    getLessonProgress(lessonId) {
        // This should be calculated from actual lesson progress data
        // For now, returning a mock value
        return 0;
    }

    getRecentAchievements() {
        // Mock achievement data
        return [
            { title: 'First Steps', description: 'Completed your first lesson' },
            { title: 'Quick Learner', description: 'Completed 5 lessons' },
            { title: 'Consistent', description: 'Learned for 3 days in a row' }
        ].slice(0, 1); // Return most recent
    }

    getTotalLessons() {
        const chapters = this.getAllChapters();
        return chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
    }

    getPreviousLesson() {
        const currentChapter = this.getCurrentChapterData();
        if (!currentChapter) return null;
        
        const currentIndex = currentChapter.lessons.findIndex(l => l.id === this.getCurrentLessonId());
        if (currentIndex > 0) {
            return currentChapter.lessons[currentIndex - 1];
        }
        
        return null;
    }

    recordNavigation(type, target) {
        this.navigationHistory.push({
            type: type,
            target: target,
            timestamp: new Date().toISOString(),
            currentPosition: { ...this.currentPosition }
        });
        
        // Keep only last 100 navigation entries
        if (this.navigationHistory.length > 100) {
            this.navigationHistory = this.navigationHistory.slice(-100);
        }
        
        localStorage.setItem('navigationHistory', JSON.stringify(this.navigationHistory));
    }

    saveUserProgress() {
        localStorage.setItem('enhancedNavigationProgress', JSON.stringify(this.userProgress));
    }

    // Utility methods
    showQuickSearch() {
        // Implement quick search functionality
        console.log('Quick search activated');
    }

    showLearningAnalytics() {
        // Show learning analytics dashboard
        console.log('Learning analytics activated');
    }

    showRecommendations() {
        // Show recommendations panel
        console.log('Recommendations activated');
    }

    enableIntensiveMode() {
        this.userProgress.preferences.speed = 'intensive';
        this.saveUserProgress();
        this.updateUI();
    }

    showAdvancedContent() {
        this.userProgress.preferences.difficulty = 'advanced';
        this.saveUserProgress();
        this.updateUI();
    }

    enablePracticeFocus() {
        this.userProgress.preferences.focus = 'practice';
        this.saveUserProgress();
        this.updateUI();
    }

    showChapterCompletion() {
        // Show chapter completion modal
        console.log('Chapter completion activated');
    }

    updateUI() {
        this.updateNavigationRecommendations();
        this.setupSmartButtons();
        this.setupQuickNavigation();
    }
}

// Global enhanced navigation instance
let enhancedNavigation;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    enhancedNavigation = new EnhancedNavigation();
});

// Global functions for enhanced navigation
window.enhancedNavigation = {
    navigateToLesson: function(lessonId) {
        if (enhancedNavigation) enhancedNavigation.navigateToLesson(lessonId);
    },
    navigateToChapter: function(chapterId) {
        if (enhancedNavigation) enhancedNavigation.navigateToChapter(chapterId);
    },
    navigateToNext: function() {
        if (enhancedNavigation) enhancedNavigation.navigateToNext();
    },
    navigateToPrevious: function() {
        if (enhancedNavigation) enhancedNavigation.navigateToPrevious();
    },
    executeRecommendation: function(type) {
        if (enhancedNavigation) enhancedNavigation.executeRecommendation(type);
    },
    executePersonalizedRecommendation: function(type) {
        if (enhancedNavigation) enhancedNavigation.executePersonalizedRecommendation(type);
    }
};

// CSS for enhanced navigation styling
const enhancedNavigationStyles = `
.navigation-recommendations {
    display: grid;
    gap: 1rem;
    margin: 1rem 0;
}

.recommendation-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--border);
    transition: all 0.3s ease;
}

.recommendation-item.priority-1 {
    border-left: 4px solid #22c55e;
}

.recommendation-item.priority-2 {
    border-left: 4px solid #3b82f6;
}

.recommendation-item.priority-3 {
    border-left: 4px solid #f59e0b;
}

.recommendation-item.priority-4 {
    border-left: 4px solid #8b5cf6;
}

.recommendation-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recommendation-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
}

.recommendation-content h4 {
    color: var(--text);
    margin-bottom: 0.25rem;
}

.recommendation-content p {
    color: var(--muted);
    font-size: 0.875rem;
}

.recommendation-action {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.recommendation-action:hover {
    background: var(--secondary);
}

.chapter-nav-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--background);
    border-radius: 8px;
    border: 1px solid var(--border);
    margin-bottom: 0.5rem;
}

.chapter-nav-item.unlocked {
    border-color: var(--primary);
}

.chapter-nav-item.locked {
    opacity: 0.6;
    cursor: not-allowed;
}

.chapter-info h4 {
    color: var(--text);
    margin-bottom: 0.5rem;
}

.chapter-progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--muted);
}

.chapter-progress .progress-bar {
    flex: 1;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
}

.chapter-progress .progress-fill {
    height: 100%;
    background: var(--primary);
    border-radius: 2px;
}

.overall-progress-bar {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
}

.progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.progress-text {
    font-weight: 600;
    color: var(--text);
}

.progress-percentage {
    background: var(--primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
}

.progress-track {
    width: 100%;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--muted);
}

.current-progress-indicator {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.progress-chapter,
.progress-lesson {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.progress-chapter .chapter-name,
.progress-lesson .lesson-name {
    font-weight: 600;
}

.progress-chapter .chapter-progress,
.progress-lesson .lesson-progress {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
}

.achievement-notification {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.achievement-icon {
    font-size: 2rem;
}

.achievement-text strong {
    color: #92400e;
    display: block;
    margin-bottom: 0.25rem;
}

.achievement-text p {
    color: #92400e;
    margin: 0;
    font-size: 0.875rem;
}

.prerequisite-warning {
    background: #fef2f2;
    border: 1px solid #ef4444;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.warning-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.warning-content h4 {
    color: #991b1b;
    margin-bottom: 0.5rem;
}

.warning-content p {
    color: #991b1b;
    margin-bottom: 0.5rem;
}

.warning-content ul {
    color: #991b1b;
    margin-left: 1rem;
}

.personalized-recommendation {
    background: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.personalized-recommendation h4 {
    color: #0369a1;
    margin-bottom: 0.5rem;
}

.personalized-recommendation p {
    color: #0369a1;
    margin-bottom: 1rem;
    font-size: 0.875rem;
}

@media (max-width: 768px) {
    .recommendation-item {
        flex-direction: column;
        text-align: center;
    }
    
    .chapter-nav-item {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .progress-stats {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }
}
`;

// Add enhanced navigation styles to head
const enhancedNavigationStyleElement = document.createElement('style');
enhancedNavigationStyleElement.textContent = enhancedNavigationStyles;
document.head.appendChild(enhancedNavigationStyleElement);