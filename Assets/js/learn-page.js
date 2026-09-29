/**
 * WebZoneBW Learn Page - Classroom Experience
 * Handles dynamic content, progress tracking, and user experience
 */

class LearnPageManager {
    constructor() {
        this.currentPage = 'learn';
        this.userProgress = this.loadUserProgress();
        this.totalLessons = this.calculateTotalLessons();
        this.initializePage();
    }

    /**
     * Initialize the learn page
     */
    initializePage() {
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    /**
     * Initialize all components
     */
    initializeComponents() {
        this.updateHeroSection();
        this.updateLearningJourney();
        this.updateLearningPath();
        this.updateSearchSection();
        this.updateQuickExplore();
        this.updateCurriculum();
        this.setupEventListeners();
        this.updateDarkMode();
        
        // Initialize after a small delay to ensure all elements are rendered
        setTimeout(() => {
            this.updateProgressFromStorage();
        }, 100);
    }

    /**
     * Load user progress from localStorage
     */
    loadUserProgress() {
        const saved = localStorage.getItem('webzonebw_progress');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initialize progress data
        return {
            totalLessons: 0,
            completedLessons: 0,
            currentChapter: null,
            currentLesson: null,
            lastAccessed: new Date().toISOString(),
            streak: 0,
            totalTimeSpent: 0
        };
    }

    /**
     * Save user progress to localStorage
     */
    saveUserProgress() {
        localStorage.setItem('webzonebw_progress', JSON.stringify(this.userProgress));
    }

    /**
     * Calculate total lessons across all chapters
     */
    calculateTotalLessons() {
        const chapters = [
            'Chapter-01-Development Environment',
            'Chapter-02-HTML',
            'Chapter-03-CSS',
            'Chapter-04-Flexbox',
            'Chapter-05-CSS Grid',
            'Chapter-06-JavaScript',
            'Chapter-07-Responsive Design',
            'Chapter-08-Bootstrap',
            'Chapter-09-Git & GitHub',
            'Chapter-10-Final Project'
        ];

        let total = 0;
        chapters.forEach(chapter => {
            const chapterData = this.getChapterData(chapter);
            if (chapterData && chapterData.lessons) {
                total += chapterData.lessons.length;
            }
        });

        return total;
    }

    /**
     * Get chapter data from localStorage
     */
    getChapterData(chapterName) {
        const saved = localStorage.getItem(`progress_${chapterName}`);
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Initialize chapter data
        return {
            chapter: chapterName,
            lessons: this.getDefaultLessons(chapterName),
            progress: 0,
            completed: false
        };
    }

    /**
     * Get default lessons for a chapter
     */
    getDefaultLessons(chapterName) {
        const lessonDefaults = {
            'Chapter-01-Development Environment': [
                { id: 'Lesson-01-Your-First-Webpage', title: 'Your First Webpage', status: 'not-started' },
                { id: 'Lesson-02-Code-Editor-Setup', title: 'Code Editor Setup', status: 'not-started' },
                { id: 'Lesson-03-Browser-Developer-Tools', title: 'Browser Developer Tools', status: 'not-started' },
                { id: 'Lesson-04-Files-Folders-Project-Structure', title: 'Project Structure', status: 'not-started' },
                { id: 'Lesson-05-Running-and-Testing-a-Website', title: 'Running & Testing', status: 'not-started' }
            ],
            'Chapter-02-HTML': [
                { id: 'lesson-01-what-is-html', title: 'What is HTML?', status: 'not-started' }
            ],
            'Chapter-03-CSS': [
                { id: 'Lesson-01-Box-Model', title: 'Box Model', status: 'not-started' },
                { id: 'Lesson-02-Selectors-Specificity', title: 'Selectors & Specificity', status: 'not-started' },
                { id: 'Lesson-03-Colors-Typography', title: 'Colors & Typography', status: 'not-started' },
                { id: 'Lesson-04-Display-Positioning', title: 'Display & Positioning', status: 'not-started' },
                { id: 'Lesson-05-Spacing-Visual-Styling', title: 'Spacing & Visual Styling', status: 'not-started' },
                { id: 'Lesson-06-Practical-CSS-Page-Build', title: 'Practical Page Build', status: 'not-started' },
                { id: 'Lesson-07-Advanced-Selectors', title: 'Advanced Selectors', status: 'not-started' }
            ],
            'Chapter-04-Flexbox': [
                { id: 'Lesson-01-Introduction', title: 'Introduction', status: 'not-started' },
                { id: 'Lesson-02-Flex-Container', title: 'Flex Container', status: 'not-started' },
                { id: 'Lesson-03-Flex-Items', title: 'Flex Items', status: 'not-started' },
                { id: 'Lesson-04-Justify-Content', title: 'Justify Content', status: 'not-started' },
                { id: 'Lesson-05-Align-Items', title: 'Align Items', status: 'not-started' },
                { id: 'Lesson-06-Flex-Wrap', title: 'Flex Wrap', status: 'not-started' },
                { id: 'Lesson-07-Mini-Project', title: 'Mini Project', status: 'not-started' }
            ],
            'Chapter-05-CSS Grid': [
                { id: 'Lesson-01-Introduction-Grid', title: 'Introduction', status: 'not-started' },
                { id: 'Lesson-02-Grid-Container', title: 'Grid Container', status: 'not-started' },
                { id: 'Lesson-03-Rows-Columns', title: 'Rows & Columns', status: 'not-started' },
                { id: 'Lesson-04-Grid-Areas', title: 'Grid Areas', status: 'not-started' },
                { id: 'Lesson-05-Auto-Fit-Minmax', title: 'Auto Fit & Minmax', status: 'not-started' },
                { id: 'Lesson-06-Grid-Alignment', title: 'Grid Alignment', status: 'not-started' }
            ],
            'Chapter-06-JavaScript': [
                { id: 'Lesson-01-JavaScript-Introduction', title: 'Introduction', status: 'not-started' },
                { id: 'Lesson-02-Variables-Data-Types', title: 'Variables & Data Types', status: 'not-started' },
                { id: 'Lesson-03-Operators-Conditions', title: 'Operators & Conditions', status: 'not-started' },
                { id: 'Lesson-04-Functions', title: 'Functions', status: 'not-started' },
                { id: 'Lesson-05-Arrays-Objects', title: 'Arrays & Objects', status: 'not-started' },
                { id: 'Lesson-06-Loops', title: 'Loops', status: 'not-started' },
                { id: 'Lesson-07-DOM-Manipulation', title: 'DOM Manipulation', status: 'not-started' },
                { id: 'Lesson-08-Events', title: 'Events', status: 'not-started' },
                { id: 'Lesson-09-Forms-Validation', title: 'Forms & Validation', status: 'not-started' },
                { id: 'Lesson-10-Mini-Project', title: 'Mini Project', status: 'not-started' }
            ],
            'Chapter-07-Responsive Design': [
                { id: 'Lesson-02-Viewport-Media-Queries', title: 'Viewport & Media Queries', status: 'not-started' },
                { id: 'Lesson-03-Fluid-Units-Clamp', title: 'Fluid Units & Clamp', status: 'not-started' },
                { id: 'Lesson-04-Responsive-Images-Media', title: 'Responsive Images & Media', status: 'not-started' },
                { id: 'Lesson-05-Responsive-Typography', title: 'Responsive Typography', status: 'not-started' },
                { id: 'Lesson-06-Responsive-Navigation', title: 'Responsive Navigation', status: 'not-started' },
                { id: 'Lesson-07-Responsive-Portfolio-Build', title: 'Portfolio Build', status: 'not-started' }
            ],
            'Chapter-08-Bootstrap': [
                { id: 'Lesson-01-Bootstrap-Introduction', title: 'Introduction', status: 'not-started' },
                { id: 'Lesson-02-Bootstrap-Grid-System', title: 'Grid System', status: 'not-started' },
                { id: 'Lesson-03-Typography-Colors-Spacing', title: 'Typography & Colors', status: 'not-started' },
                { id: 'Lesson-04-Buttons-Cards-Badges', title: 'Buttons & Cards', status: 'not-started' },
                { id: 'Lesson-05-Navbars-Headers', title: 'Navbars & Headers', status: 'not-started' },
                { id: 'Lesson-06-Modals-Forms-Alerts', title: 'Modals & Forms', status: 'not-started' },
                { id: 'Lesson-07-Bootstrap-Landing-Page', title: 'Landing Page', status: 'not-started' }
            ],
            'Chapter-09-Git & GitHub': [
                { id: 'Lesson-01-Git-Basics', title: 'Git Basics', status: 'not-started' },
                { id: 'Lesson-02-Git-Branching', title: 'Git Branching', status: 'not-started' },
                { id: 'Lesson-03-Git-Collaboration', title: 'Git Collaboration', status: 'not-started' },
                { id: 'Lesson-04-GitHub-Workflow', title: 'GitHub Workflow', status: 'not-started' }
            ],
            'Chapter-10-Final Project': [
                { id: 'Lesson-01-Project-Planning', title: 'Project Planning', status: 'not-started' },
                { id: 'Lesson-02-Project-Build', title: 'Project Build', status: 'not-started' },
                { id: 'Lesson-03-Project-Deployment', title: 'Project Deployment', status: 'not-started' }
            ]
        };

        return lessonDefaults[chapterName] || [];
    }

    /**
     * Update hero section with dynamic content
     */
    updateHeroSection() {
        const hero = document.querySelector('.learn-hero');
        if (!hero) return;

        const progressPercentage = this.userProgress.totalLessons > 0 ? 
            Math.round((this.userProgress.completedLessons / this.userProgress.totalLessons) * 100) : 0;

        // Update hero content based on progress
        const heroContent = `
            <div class="badge">WebZoneBW SC • LEARNING STUDIO</div>
            <h1>Learn to Build Real Websites</h1>
            <h1 class="subtitle">From Zero to Professional</h1>
            <p>
                Master modern web development through structured lessons, hands-on practice, 
                and real-world projects. Your journey to becoming a web developer starts here.
            </p>
        `;

        hero.innerHTML = heroContent;
    }

    /**
     * Update learning journey section
     */
    updateLearningJourney() {
        const journey = document.querySelector('.learning-journey');
        if (!journey) return;

        const progressPercentage = this.userProgress.totalLessons > 0 ? 
            Math.round((this.userProgress.completedLessons / this.userProgress.totalLessons) * 100) : 0;

        const ctaText = this.userProgress.completedLessons > 0 ? 'Continue Learning' : 'Start Learning';
        const ctaIcon = this.userProgress.completedLessons > 0 ? '▶' : '🚀';

        const journeyContent = `
            <h2>Your Learning Journey</h2>
            <div class="journey-stats">
                <div class="journey-progress">
                    <h3>Progress Overview</h3>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="progress-text">${this.userProgress.completedLessons} / ${this.userProgress.totalLessons} Lessons</div>
                </div>
                <div class="journey-cta">
                    <a href="#curriculum" class="btn">${ctaIcon} ${ctaText}</a>
                </div>
            </div>
        `;

        journey.innerHTML = journeyContent;
    }

    /**
     * Update learning path section
     */
    updateLearningPath() {
        const path = document.querySelector('.learning-path');
        if (!path) return;

        const pathContent = `
            <h2>Your Learning Path</h2>
            <div class="path-stages">
                <div class="path-stage ${this.getCurrentStage() === 'html' ? 'active' : ''}">
                    <div class="stage-icon">📄</div>
                    <div class="stage-title">HTML</div>
                    <div class="stage-description">Structure & Content</div>
                </div>
                <div class="path-stage ${this.getCurrentStage() === 'css' ? 'active' : ''}">
                    <div class="stage-icon">🎨</div>
                    <div class="stage-title">CSS</div>
                    <div class="stage-description">Styling & Design</div>
                </div>
                <div class="path-stage ${this.getCurrentStage() === 'javascript' ? 'active' : ''}">
                    <div class="stage-icon">⚡</div>
                    <div class="stage-title">JavaScript</div>
                    <div class="stage-description">Interactivity & Logic</div>
                </div>
                <div class="path-stage ${this.getCurrentStage() === 'projects' ? 'active' : ''}">
                    <div class="stage-icon">🚀</div>
                    <div class="stage-title">Projects</div>
                    <div class="stage-description">Real-world Applications</div>
                </div>
                <div class="path-stage ${this.getCurrentStage() === 'portfolio' ? 'active' : ''}">
                    <div class="stage-icon">💼</div>
                    <div class="stage-title">Portfolio</div>
                    <div class="stage-description">Showcase Your Work</div>
                </div>
            </div>
        `;

        path.innerHTML = pathContent;
    }

    /**
     * Get current learning stage
     */
    getCurrentStage() {
        if (this.userProgress.completedLessons === 0) return 'html';
        if (this.userProgress.completedLessons < 15) return 'html';
        if (this.userProgress.completedLessons < 35) return 'css';
        if (this.userProgress.completedLessons < 55) return 'javascript';
        if (this.userProgress.completedLessons < 70) return 'projects';
        return 'portfolio';
    }

    /**
     * Update search section
     */
    updateSearchSection() {
        const search = document.querySelector('.search-section');
        if (!search) return;

        const searchContent = `
            <h2>🔍 Find a lesson or tool</h2>
            <p>Search lessons, HTML, CSS, JavaScript, tools, and more...</p>
            <div class="search-container">
                <span class="search-icon">🔍</span>
                <input 
                    type="text" 
                    class="search-input" 
                    placeholder="Search lessons, HTML, CSS, JavaScript, tools..."
                    aria-label="Search lessons and tools"
                >
            </div>
        `;

        search.innerHTML = searchContent;
    }

    /**
     * Update quick explore section
     */
    updateQuickExplore() {
        const explore = document.querySelector('.quick-explore');
        if (!explore) return;

        const exploreItems = [
            { icon: '🎨', title: 'CSS Flexbox', description: 'Interactive Flexbox Visualizer', href: '/developertools.html#flexbox' },
            { icon: '🧩', title: 'CSS Grid', description: 'Grid Layout Builder', href: '/developertools.html#grid' },
            { icon: '💻', title: 'Web REPL', description: 'JavaScript Console', href: '/developertools.html#repl' },
            { icon: '🌳', title: 'DOM Inspector', description: 'DOM Tree Visualizer', href: '/developertools.html#dom' },
            { icon: '🌐', title: 'HTTP & DNS', description: 'Network Tracer', href: '/developertools.html#http' },
            { icon: '📦', title: 'CSS Box Model', description: 'Box Model Explainer', href: '/developertools.html#boxmodel' }
        ];

        const itemsHTML = exploreItems.map(item => `
            <a href="${item.href}" class="explore-item">
                <div class="explore-icon">${item.icon}</div>
                <div class="explore-title">${item.title}</div>
                <div class="explore-description">${item.description}</div>
            </a>
        `).join('');

        const exploreContent = `
            <h2>Quick Explore</h2>
            <div class="explore-grid">
                ${itemsHTML}
            </div>
        `;

        explore.innerHTML = exploreContent;
    }

    /**
     * Update curriculum section
     */
    updateCurriculum() {
        const curriculum = document.querySelector('.curriculum-grid');
        if (!curriculum) return;

        const chapters = [
            {
                number: '00',
                title: 'Introduction',
                icon: '🚀',
                description: 'Get started with web development fundamentals',
                lessons: 2,
                difficulty: 1,
                progress: 100,
                completed: true,
                href: '/Chapters/Chapter-00-Introduction/index.html'
            },
            {
                number: '01',
                title: 'Development Environment',
                icon: '💻',
                description: 'Set up your development workspace',
                lessons: 5,
                difficulty: 1,
                progress: 80,
                completed: false,
                href: '/Chapters/Chapter-01-Development Environment/index.html'
            },
            {
                number: '02',
                title: 'HTML',
                icon: '📄',
                description: 'Master semantic HTML5 and accessibility',
                lessons: 8,
                difficulty: 2,
                progress: 60,
                completed: false,
                href: '/Chapters/Chapter-02-HTML/index.html'
            },
            {
                number: '03',
                title: 'CSS',
                icon: '🎨',
                description: 'Learn modern CSS techniques and styling',
                lessons: 7,
                difficulty: 2,
                progress: 40,
                completed: false,
                href: '/Chapters/Chapter-03-CSS/index.html'
            },
            {
                number: '04',
                title: 'Flexbox',
                icon: '📐',
                description: 'Master CSS Flexbox for responsive layouts',
                lessons: 7,
                difficulty: 3,
                progress: 20,
                completed: false,
                href: '/Chapters/Chapter-04-Flexbox/index.html'
            },
            {
                number: '05',
                title: 'CSS Grid',
                icon: '🔲',
                description: 'Create complex 2D layouts with CSS Grid',
                lessons: 6,
                difficulty: 3,
                progress: 0,
                completed: false,
                href: '/Chapters/Chapter-05-CSS Grid/index.html'
            },
            {
                number: '06',
                title: 'JavaScript',
                icon: '⚡',
                description: 'Learn programming fundamentals and DOM manipulation',
                lessons: 10,
                difficulty: 4,
                progress: 0,
                completed: false,
                href: '/Chapters/Chapter-06-JavaScript/index.html'
            },
            {
                number: '07',
                title: 'Responsive Design',
                icon: '📱',
                description: 'Create websites that work on all devices',
                lessons: 7,
                difficulty: 3,
                progress: 0,
                completed: false,
                href: '/Chapters/Chapter-07-Responsive Design/index.html'
            },
            {
                number: '08',
                title: 'Bootstrap',
                icon: '🎭',
                description: 'Learn the Bootstrap framework',
                lessons: 5,
                difficulty: 2,
                progress: 0,
                completed: false,
                href: '/Chapters/Chapter-08-Bootstrap/index.html'
            },
            {
                number: '09',
                title: 'Git & GitHub',
                icon: '🌳',
                description: 'Version control and collaboration',
                lessons: 4,
                difficulty: 3,
                progress: 0,
                completed: false,
                href: '/Chapters/Chapter-09-Git & GitHub/index.html'
            },
            {
                number: '10',
                title: 'Final Project',
                icon: '🚀',
                description: 'Build and deploy your portfolio website',
                lessons: 3,
                difficulty: 5,
                progress: 0,
                completed: false,
                href: '/Chapters/Chapter-10-Final Project/index.html'
            }
        ];

        const chaptersHTML = chapters.map(chapter => {
            const difficultyDots = Array(5).fill(0).map((_, i) => 
                `<span class="difficulty-dot ${i < chapter.difficulty ? 'active' : ''}"></span>`
            ).join('');

            const buttonText = chapter.completed ? '✓ Completed' : 
                              chapter.progress > 0 ? 'Continue Learning' : 'Start Learning';
            const buttonClass = chapter.completed ? 'completed' : '';

            return `
                <div class="chapter-card">
                    <div class="chapter-number">${chapter.number}</div>
                    <div class="chapter-icon">${chapter.icon}</div>
                    <h3 class="chapter-title">${chapter.title}</h3>
                    <p class="chapter-description">${chapter.description}</p>
                    <div class="chapter-meta">
                        <div class="lessons-count">
                            <span>${chapter.lessons} lessons</span>
                        </div>
                        <div class="difficulty">
                            ${difficultyDots}
                        </div>
                    </div>
                    <div class="chapter-progress">
                        <div class="progress-fill" style="width: ${chapter.progress}%"></div>
                    </div>
                    <a href="${chapter.href}" class="chapter-btn ${buttonClass}">
                        ${buttonText} →
                    </a>
                </div>
            `;
        }).join('');

        curriculum.innerHTML = chaptersHTML;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Track page visibility for session time
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.userProgress.lastAccessed = new Date().toISOString();
                this.saveUserProgress();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    /**
     * Handle search functionality
     */
    handleSearch(query) {
        if (!query.trim()) return;

        // Convert query to lowercase for case-insensitive search
        const searchQuery = query.toLowerCase();
        
        // Define searchable content
        const searchableContent = [
            { title: 'HTML', href: '/Chapters/Chapter-02-HTML/index.html', keywords: ['html', 'markup', 'semantic', 'accessibility'] },
            { title: 'CSS', href: '/Chapters/Chapter-03-CSS/index.html', keywords: ['css', 'styling', 'design', 'visual'] },
            { title: 'JavaScript', href: '/Chapters/Chapter-06-JavaScript/index.html', keywords: ['javascript', 'programming', 'dom', 'interactive'] },
            { title: 'Flexbox', href: '/Chapters/Chapter-04-Flexbox/index.html', keywords: ['flexbox', 'flexible', 'layout', 'responsive'] },
            { title: 'Grid', href: '/Chapters/Chapter-05-CSS Grid/index.html', keywords: ['grid', 'layout', '2d', 'complex'] },
            { title: 'Responsive Design', href: '/Chapters/Chapter-07-Responsive Design/index.html', keywords: ['responsive', 'mobile', 'adaptive', 'devices'] },
            { title: 'Bootstrap', href: '/Chapters/Chapter-08-Bootstrap/index.html', keywords: ['bootstrap', 'framework', 'components', 'ui'] },
            { title: 'Git & GitHub', href: '/Chapters/Chapter-09-Git & GitHub/index.html', keywords: ['git', 'github', 'version', 'control'] },
            { title: 'Project', href: '/Chapters/Chapter-10-Final Project/index.html', keywords: ['project', 'portfolio', 'final', 'build'] }
        ];

        // Find matches
        const matches = searchableContent.filter(item => 
            item.title.toLowerCase().includes(searchQuery) ||
            item.keywords.some(keyword => keyword.includes(searchQuery))
        );

        if (matches.length > 0) {
            // Navigate to first match
            window.location.href = matches[0].href;
        } else {
            // Show no results message or search web
            this.showSearchResults(query);
        }
    }

    /**
     * Show search results
     */
    showSearchResults(query) {
        // Create a modal or notification for search results
        const modal = document.createElement('div');
        modal.className = 'search-results-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h3>Search Results for "${query}"</h3>
                    <p>No specific lessons found. Here are some suggestions:</p>
                    <ul>
                        <li>Try searching for specific topics like "HTML basics" or "CSS flexbox"</li>
                        <li>Browse the curriculum sections below</li>
                        <li>Use the quick explore tools</li>
                    </ul>
                    <button onclick="this.closest('.modal-overlay').remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        // Only handle navigation when not in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case '/':
                e.preventDefault();
                // Focus search input
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
                break;
            case 'Escape':
                // Clear search input
                const search = document.querySelector('.search-input');
                if (search) {
                    search.value = '';
                    search.blur();
                }
                break;
            case 'Home':
                e.preventDefault();
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                // Scroll to bottom
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
    }

    /**
     * Update progress from localStorage
     */
    updateProgressFromStorage() {
        const progressFill = document.querySelector('.progress-bar-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const progressPercentage = this.userProgress.totalLessons > 0 ? 
                Math.round((this.userProgress.completedLessons / this.userProgress.totalLessons) * 100) : 0;
            
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${this.userProgress.completedLessons} / ${this.userProgress.totalLessons} Lessons`;
        }
    }

    /**
     * Update dark mode
     */
    updateDarkMode() {
        const body = document.body;
        const storedTheme = localStorage.getItem('wz_storehouse_theme') || localStorage.getItem('wz-theme') || 'dark';
        
        if (storedTheme === 'light') {
            body.classList.remove('dark');
        } else {
            body.classList.add('dark');
        }

        // Apply CSS variables for proper theming
        this.applyThemeVariables();
    }

    /**
     * Apply theme variables
     */
    applyThemeVariables() {
        const body = document.body;
        const isDark = body.classList.contains('dark');
        
        // Set CSS custom properties for consistent theming
        document.documentElement.style.setProperty('--primary', isDark ? '#3b82f6' : '#d90429');
        document.documentElement.style.setProperty('--secondary', isDark ? '#8b5cf6' : '#ef233c');
        document.documentElement.style.setProperty('--accent', isDark ? '#06b6d4' : '#ff7b00');
        document.documentElement.style.setProperty('--background', isDark ? '#0f172a' : '#fcf7f7');
        document.documentElement.style.setProperty('--surface', isDark ? '#1e293b' : '#ffffff');
        document.documentElement.style.setProperty('--text', isDark ? '#f8fafc' : '#1c0b0f');
        document.documentElement.style.setProperty('--muted', isDark ? '#94a3b8' : '#5e3a40');
        document.documentElement.style.setProperty('--border', isDark ? 'rgba(255, 255, 255, 0.1)' : '#e6ccd0');
    }

    /**
     * Mark lesson as started
     */
    startLesson(lessonId, chapterId) {
        if (!this.userProgress.currentChapter) {
            this.userProgress.currentChapter = chapterId;
        }
        if (!this.userProgress.currentLesson) {
            this.userProgress.currentLesson = lessonId;
        }

        this.userProgress.lastAccessed = new Date().toISOString();
        this.saveUserProgress();
    }

    /**
     * Complete lesson
     */
    completeLesson(lessonId, chapterId) {
        const chapterData = this.getChapterData(chapterId);
        const lesson = chapterData.lessons.find(l => l.id === lessonId);
        
        if (lesson && lesson.status !== 'completed') {
            lesson.status = 'completed';
            this.userProgress.completedLessons++;
            
            // Save chapter data
            localStorage.setItem(`progress_${chapterId}`, JSON.stringify(chapterData));
            
            this.userProgress.lastAccessed = new Date().toISOString();
            this.saveUserProgress();
            
            // Update UI
            this.updateLearningJourney();
            this.updateCurriculum();
        }
    }

    /**
     * Get user statistics
     */
    getUserStats() {
        return {
            totalLessons: this.userProgress.totalLessons,
            completedLessons: this.userProgress.completedLessons,
            progressPercentage: this.userProgress.totalLessons > 0 ? 
                Math.round((this.userProgress.completedLessons / this.userProgress.totalLessons) * 100) : 0,
            currentChapter: this.userProgress.currentChapter,
            currentLesson: this.userProgress.currentLesson,
            lastAccessed: this.userProgress.lastAccessed,
            streak: this.userProgress.streak
        };
    }
}

// Global instance
let learnPageManager;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    learnPageManager = new LearnPageManager();
});

// Global functions for lesson interaction
window.learnPageManager = {
    startLesson: function(lessonId, chapterId) {
        if (learnPageManager) learnPageManager.startLesson(lessonId, chapterId);
    },
    completeLesson: function(lessonId, chapterId) {
        if (learnPageManager) learnPageManager.completeLesson(lessonId, chapterId);
    },
    getStats: function() {
        return learnPageManager ? learnPageManager.getUserStats() : null;
    }
};