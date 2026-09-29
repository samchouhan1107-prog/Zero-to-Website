/**
 * WebZoneBW Site Navigation System
 * Handles the main site navigation with mobile responsiveness
 */

class SiteNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupActiveNavigation();
        this.setupSearch();
        this.setupUserMenu();
        this.setupKeyboardNavigation();
    }

    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking overlay
            if (navOverlay) {
                navOverlay.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            }

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-header') && !e.target.closest('.nav-overlay')) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
        
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }

        // Update aria-expanded
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            const isExpanded = navMenu?.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }

        // Update aria-expanded
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Setup active navigation highlighting
     */
    setupActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if current path matches the link
            if (currentPath === linkPath || 
                (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            }
        });

        // Update active state on navigation
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchInput = document.querySelector('.nav-search input');
        const searchButton = document.querySelector('.nav-search button');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearchSubmit(e.target.value);
                }
            });
        }

        if (searchButton) {
            searchButton.addEventListener('click', () => {
                const searchValue = searchInput?.value || '';
                this.handleSearchSubmit(searchValue);
            });
        }
    }

    /**
     * Handle search input
     */
    handleSearch(query) {
        // You can add real-time search suggestions here
        if (query.length > 2) {
            // Show search suggestions
            console.log('Searching for:', query);
        }
    }

    /**
     * Handle search submission
     */
    handleSearchSubmit(query) {
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
            { title: 'Project', href: '/Chapters/Chapter-10-Final Project/index.html', keywords: ['project', 'portfolio', 'final', 'build'] },
            { title: 'Learn', href: '/learn.html', keywords: ['learn', 'curriculum', 'lessons', 'course'] }
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
            // Fallback to Google search
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)} site:webzonebw.shop`;
        }
    }

    /**
     * Setup user menu dropdown
     */
    setupUserMenu() {
        const userMenu = document.querySelector('.user-menu');
        const userDropdown = document.querySelector('.user-dropdown');

        if (userMenu && userDropdown) {
            userMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userDropdown.classList.remove('active');
            });

            // Close dropdown when clicking on dropdown items
            userDropdown.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    userDropdown.classList.remove('active');
                }
            });
        }
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu and dropdowns
            if (e.key === 'Escape') {
                this.closeMobileMenu();
                
                const userDropdown = document.querySelector('.user-dropdown');
                if (userDropdown) {
                    userDropdown.classList.remove('active');
                }
            }

            // Forward slash focuses search
            if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const searchInput = document.querySelector('.nav-search input');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Tab key navigation
            if (e.key === 'Tab') {
                // Handle tab navigation for accessibility
                this.handleTabNavigation(e);
            }
        });
    }

    /**
     * Handle tab navigation
     */
    handleTabNavigation(e) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        // If tabbing outside of mobile menu and menu is open, close it
        if (navMenu?.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.nav-toggle')) {
            this.closeMobileMenu();
        }
    }

    /**
     * Update navigation based on user progress
     */
    updateProgress(progress) {
        // Update progress badges
        const progressBadges = document.querySelectorAll('.nav-badge');
        progressBadges.forEach(badge => {
            badge.textContent = progress;
        });
    }

    /**
     * Show/hide user menu based on login status
     */
    updateLoginStatus(isLoggedIn) {
        const userMenu = document.querySelector('.user-menu');
        const loginLink = document.querySelector('.nav-login');
        
        if (isLoggedIn) {
            if (userMenu) userMenu.style.display = 'flex';
            if (loginLink) loginLink.style.display = 'none';
        } else {
            if (userMenu) userMenu.style.display = 'none';
            if (loginLink) loginLink.style.display = 'block';
        }
    }

    /**
     * Get current navigation state
     */
    getNavigationState() {
        return {
            mobileMenuOpen: document.querySelector('.nav-menu')?.classList.contains('active') || false,
            currentPath: window.location.pathname,
            searchQuery: document.querySelector('.nav-search input')?.value || ''
        };
    }
}

// Initialize site navigation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const siteNavigation = new SiteNavigation();
    
    // Make it globally accessible
    window.siteNavigation = siteNavigation;
});

// Handle responsive resize
window.addEventListener('resize', function() {
    const siteNavigation = window.siteNavigation;
    if (siteNavigation) {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            siteNavigation.closeMobileMenu();
        }
    }
});