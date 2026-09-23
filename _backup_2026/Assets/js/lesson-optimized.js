/* ==================================================
    WZ Storehouse - Optimized Lesson JavaScript
    Author  : Sameer Chouhan
    Version : 2.1 (Enhanced Performance & Mobile Support)
    ================================================== */

// Performance: Use requestAnimationFrame for smooth animations
const raf = (callback) => {
    return requestAnimationFrame(callback);
};

// Performance: Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Performance: Throttle function for touch events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Mobile detection
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Touch device detection
const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Initialize lesson functionality with performance optimizations
const initLesson = () => {
    // Performance: Cache DOM elements
    const elements = {
        runCodeBtn: document.getElementById('runCodeBtn'),
        htmlEditor: document.getElementById('htmlEditor'),
        previewWindow: document.getElementById('previewWindow'),
        darkModeBtn: document.getElementById('darkModeBtn'),
        fontSizeBtn: document.getElementById('fontSizeBtn'),
        settingsBtn: document.getElementById('settingsBtn'),
        settingsPanel: document.getElementById('settingsPanel'),
        closeSettingsBtn: document.getElementById('closeSettingsBtn'),
        mobileNavToggle: document.getElementById('mobileNavToggle'),
        nav: document.querySelector('nav'),
        mobileMenu: document.querySelector('.mobile-nav-menu'),
        settingsBtnMobile: document.getElementById('settingsBtnMobile'),
        mobileNavClose: document.getElementById('mobileNavClose')
    };

    // Performance: Use Intersection Observer for lazy loading
    const initLazyLoading = () => {
        const lazyElements = document.querySelectorAll('.lazy-load');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('loaded');
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyElements.forEach(element => observer.observe(element));
    };

    // Performance: Optimized code execution
    const runCode = () => {
        if (!elements.htmlEditor || !elements.previewWindow) return;

        const htmlCode = elements.htmlEditor.value;
        const previewDoc = elements.previewWindow.contentDocument || elements.previewWindow.contentWindow.document;
        
        // Performance: Use blob URL for better performance
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        previewDoc.open();
        previewDoc.write(htmlCode);
        previewDoc.close();
        
        // Performance: Clean up blob URL
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    // Performance: Optimized dark mode switching
    const toggleDarkMode = () => {
        const body = document.body;
        const isDark = body.classList.contains('dark');
        
        // Performance: Use CSS transitions instead of JavaScript animations
        body.classList.toggle('dark');
        
        // Performance: Use localStorage only when necessary
        if (isDark) {
            localStorage.setItem('wz_storehouse_theme', 'light');
        } else {
            localStorage.setItem('wz_storehouse_theme', 'dark');
        }
    };

    // Performance: Optimized font size adjustment
    const adjustFontSize = () => {
        const body = document.body;
        const currentSize = parseInt(window.getComputedStyle(body).fontSize);
        const newSize = currentSize === 16 ? 18 : currentSize === 18 ? 20 : 16;
        
        body.style.fontSize = `${newSize}px`;
        localStorage.setItem('wz_font_size', newSize);
    };

    // Performance: Optimized settings panel
    const toggleSettingsPanel = () => {
        if (!elements.settingsPanel || !elements.settingsBtn) return;
        
        const isOpen = elements.settingsPanel.classList.toggle('active');
        
        // Performance: Close mobile menu when opening settings
        if (elements.nav && elements.mobileMenu) {
            elements.nav.classList.remove('active');
            elements.mobileMenu.classList.remove('active');
        }
        
        // Performance: Update ARIA attributes
        elements.settingsBtn.setAttribute('aria-expanded', isOpen);
    };

    // Performance: Optimized mobile navigation
    const toggleMobileNavigation = () => {
        if (!elements.mobileNavToggle || !elements.nav || !elements.mobileMenu) return;
        
        const isOpen = elements.nav.classList.toggle('active');
        elements.mobileMenu.classList.toggle('active');
        
        // Performance: Update ARIA attributes
        elements.mobileNavToggle.setAttribute('aria-expanded', isOpen);
        elements.mobileNavToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    // Performance: Optimized close handlers
    const closeSettings = () => {
        if (elements.settingsPanel) {
            elements.settingsPanel.classList.remove('active');
            elements.settingsBtnMobile?.focus();
        }
    };

    const closeMobileNavigation = () => {
        if (elements.nav && elements.mobileMenu && elements.mobileNavToggle) {
            elements.nav.classList.remove('active');
            elements.mobileMenu.classList.remove('active');
            elements.mobileNavToggle.setAttribute('aria-expanded', 'false');
            elements.mobileNavToggle.setAttribute('aria-label', 'Open navigation menu');
            elements.mobileNavToggle.focus();
        }
    };

    // Performance: Touch gesture support
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        // Swipe left to open navigation
        if (diff > swipeThreshold && elements.nav && !elements.nav.classList.contains('active')) {
            toggleMobileNavigation();
        }
        
        // Swipe right to close navigation
        if (diff < -swipeThreshold && elements.nav && elements.nav.classList.contains('active')) {
            closeMobileNavigation();
        }
    };

    // Performance: Keyboard navigation
    const handleKeyboard = (e) => {
        if (e.key === 'Escape') {
            if (elements.settingsPanel && elements.settingsPanel.classList.contains('active')) {
                closeSettings();
            }
            if (elements.nav && elements.nav.classList.contains('active')) {
                closeMobileNavigation();
            }
        }
    };

    // Performance: Click outside handlers
    const handleClickOutside = (e) => {
        if (elements.settingsPanel && elements.settingsPanel.classList.contains('active')) {
            if (!elements.settingsPanel.contains(e.target) && 
                !elements.settingsBtn?.contains(e.target) && 
                !elements.settingsBtnMobile?.contains(e.target)) {
                closeSettings();
            }
        }
        
        if (elements.nav && elements.nav.classList.contains('active')) {
            if (!elements.nav.contains(e.target) && 
                !elements.mobileNavToggle?.contains(e.target) && 
                !elements.mobileMenu?.contains(e.target)) {
                closeMobileNavigation();
            }
        }
    };

    // Performance: Event delegation for better performance
    const setupEventListeners = () => {
        // Use event delegation for dynamic elements
        document.addEventListener('click', (e) => {
            // Run code button
            if (e.target.closest('#runCodeBtn')) {
                runCode();
            }
            
            // Dark mode button
            if (e.target.closest('#darkModeBtn')) {
                toggleDarkMode();
            }
            
            // Font size button
            if (e.target.closest('#fontSizeBtn')) {
                adjustFontSize();
            }
            
            // Settings button
            if (e.target.closest('#settingsBtn')) {
                toggleSettingsPanel();
            }
            
            // Mobile navigation toggle
            if (e.target.closest('#mobileNavToggle')) {
                toggleMobileNavigation();
            }
            
            // Settings close button
            if (e.target.closest('#closeSettingsBtn')) {
                closeSettings();
            }
            
            // Mobile navigation close
            if (e.target.closest('#mobileNavClose')) {
                closeMobileNavigation();
            }
        });

        // Touch events
        if (isTouchDevice()) {
            document.addEventListener('touchstart', handleTouchStart, { passive: true });
            document.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        // Keyboard events
        document.addEventListener('keydown', handleKeyboard);
        
        // Click outside events
        document.addEventListener('click', handleClickOutside);
    };

    // Performance: Initialize with debounced scroll events
    const initScrollEffects = () => {
        const handleScroll = debounce(() => {
            const header = document.querySelector('header');
            if (header) {
                const scrolled = window.scrollY > 10;
                header.classList.toggle('scrolled', scrolled);
            }
        }, 16); // 60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    };

    // Performance: Performance monitoring
    const initPerformanceMonitoring = () => {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        }
    };

    // Performance: Initialize all functionality
    const init = () => {
        // Check for saved preferences
        const savedTheme = localStorage.getItem('wz_storehouse_theme');
        const savedFontSize = localStorage.getItem('wz_font_size');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        }
        
        if (savedFontSize) {
            document.body.style.fontSize = `${savedFontSize}px`;
        }

        // Initialize components
        initLazyLoading();
        initScrollEffects();
        initPerformanceMonitoring();
        setupEventListeners();

        // Performance: Add touch class to body for mobile-specific styles
        if (isTouchDevice()) {
            document.body.classList.add('touch-device');
        }

        // Performance: Add mobile class for mobile-specific styles
        if (isMobile()) {
            document.body.classList.add('mobile-device');
        }

        console.log('Lesson initialized with performance optimizations');
    };

    // Performance: Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    };

    // Performance: Export functions for external use
    return {
        runCode,
        toggleDarkMode,
        adjustFontSize,
        toggleSettingsPanel,
        toggleMobileNavigation,
        closeSettings,
        closeMobileNavigation
    };
};

// Initialize the lesson functionality
const lessonAPI = initLesson();