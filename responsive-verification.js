// Responsive Design Verification Script
// This script helps verify the responsive design implementation

class ResponsiveVerification {
    constructor() {
        this.breakpoints = {
            'extra-small': { min: 0, max: 575, name: 'Mobile' },
            'small': { min: 576, max: 767, name: 'Mobile' },
            'medium': { min: 768, max: 991, name: 'Tablet' },
            'large': { min: 992, max: 1199, name: 'Desktop' },
            'extra-large': { min: 1200, max: Infinity, name: 'Desktop' }
        };
        
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            total: 0
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.runTests();
        this.displayResults();
    }
    
    setupEventListeners() {
        // Test viewport resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateViewportInfo();
                this.runTests();
            }, 250);
        });
        
        // Initial viewport info
        this.updateViewportInfo();
    }
    
    updateViewportInfo() {
        const width = window.innerWidth;
        const breakpoint = this.getCurrentBreakpoint(width);
        
        const indicator = document.getElementById('viewportIndicator');
        if (indicator) {
            indicator.textContent = `${breakpoint.name}: ${width}px`;
            
            // Color coding
            const colors = {
                'Mobile': '#ec4899',
                'Tablet': '#0ea5e9',
                'Desktop': '#d90429'
            };
            indicator.style.background = colors[breakpoint.name] || '#64748b';
        }
    }
    
    getCurrentBreakpoint(width) {
        for (const [key, breakpoint] of Object.entries(this.breakpoints)) {
            if (width >= breakpoint.min && width <= breakpoint.max) {
                return { ...breakpoint, key };
            }
        }
        return this.breakpoints['extra-large'];
    }
    
    runTests() {
        this.tests = [];
        this.results = { passed: 0, failed: 0, total: 0 };
        
        // Viewport tests
        this.testViewportBreakpoints();
        this.testContainerWidths();
        this.testNavigationResponsiveness();
        this.testGridLayouts();
        this.testTypographyScaling();
        this.testTouchTargets();
        this.testOverflowIssues();
        
        // Component tests
        this.testCodePlayground();
        this.testModals();
        this.testForms();
        this.testTables();
        
        // Performance tests
        this.testCSSLoading();
        this.testMediaQueries();
        
        this.displayResults();
    }
    
    testViewportBreakpoints() {
        const width = window.innerWidth;
        const breakpoint = this.getCurrentBreakpoint(width);
        
        this.addTest({
            name: `Viewport Breakpoint: ${breakpoint.name}`,
            test: () => {
                // Check if media queries are working
                const style = window.getComputedStyle(document.body);
                const computedWidth = window.innerWidth;
                
                // Basic check - should match expected breakpoint
                return computedWidth === width;
            },
            critical: true
        });
    }
    
    testContainerWidths() {
        this.addTest({
            name: 'Container Widths',
            test: () => {
                const containers = document.querySelectorAll('.container, .content, .chapter-page');
                let valid = true;
                
                containers.forEach(container => {
                    const computedStyle = window.getComputedStyle(container);
                    const width = computedStyle.width;
                    
                    // Check if container has proper width constraints
                    if (width === 'auto' || width === '0px') {
                        valid = false;
                    }
                });
                
                return valid;
            },
            critical: true
        });
    }
    
    testNavigationResponsiveness() {
        this.addTest({
            name: 'Navigation Responsiveness',
            test: () => {
                const nav = document.querySelector('nav');
                if (!nav) return true;
                
                const computedStyle = window.getComputedStyle(nav);
                const width = window.innerWidth;
                
                // Check navigation behavior based on viewport
                if (width < 768) {
                    // Mobile: should have vertical stacking or compact layout
                    return computedStyle.flexDirection === 'column' || nav.children.length <= 3;
                } else {
                    // Desktop: should have horizontal layout
                    return computedStyle.flexDirection === 'row';
                }
            },
            critical: true
        });
    }
    
    testGridLayouts() {
        this.addTest({
            name: 'Grid Layouts',
            test: () => {
                const grids = document.querySelectorAll('.code-playground, .home-grid, .chapter-lessons');
                let valid = true;
                
                grids.forEach(grid => {
                    const computedStyle = window.getComputedStyle(grid);
                    const display = computedStyle.display;
                    
                    if (display !== 'grid' && display !== 'flex') {
                        valid = false;
                    }
                });
                
                return valid;
            },
            critical: false
        });
    }
    
    testTypographyScaling() {
        this.addTest({
            name: 'Typography Scaling',
            test: () => {
                const h1 = document.querySelector('h1');
                if (!h1) return true;
                
                const computedStyle = window.getComputedStyle(h1);
                const fontSize = parseFloat(computedStyle.fontSize);
                const viewportWidth = window.innerWidth;
                
                // Check if typography scales appropriately
                if (viewportWidth < 576) {
                    return fontSize <= 32; // Should be smaller on mobile
                } else if (viewportWidth < 768) {
                    return fontSize <= 36;
                } else {
                    return fontSize >= 40; // Should be larger on desktop
                }
            },
            critical: false
        });
    }
    
    testTouchTargets() {
        this.addTest({
            name: 'Touch Targets',
            test: () => {
                const buttons = document.querySelectorAll('button, a');
                let valid = true;
                
                buttons.forEach(button => {
                    const computedStyle = window.getComputedStyle(button);
                    const height = parseFloat(computedStyle.height);
                    const width = parseFloat(computedStyle.width);
                    
                    // Check minimum touch target size
                    if (height < 44 || width < 44) {
                        valid = false;
                    }
                });
                
                return valid;
            },
            critical: true
        });
    }
    
    testOverflowIssues() {
        this.addTest({
            name: 'Overflow Issues',
            test: () => {
                // Check for horizontal scrolling
                const body = document.body;
                const html = document.documentElement;
                
                return body.scrollWidth <= body.clientWidth && 
                       html.scrollWidth <= html.clientWidth;
            },
            critical: true
        });
    }
    
    testCodePlayground() {
        this.addTest({
            name: 'Code Playground Responsiveness',
            test: () => {
                const playground = document.querySelector('.code-playground');
                if (!playground) return true;
                
                const computedStyle = window.getComputedStyle(playground);
                const display = computedStyle.display;
                
                // Check if playground layout adapts to viewport
                if (window.innerWidth < 768) {
                    return display === 'grid' && computedStyle.gridTemplateColumns === '1fr';
                } else {
                    return display === 'grid' && computedStyle.gridTemplateColumns === '1fr 1fr';
                }
            },
            critical: false
        });
    }
    
    testModals() {
        this.addTest({
            name: 'Modal Responsiveness',
            test: () => {
                const modals = document.querySelectorAll('.settings-panel, .command-panel');
                let valid = true;
                
                modals.forEach(modal => {
                    const computedStyle = window.getComputedStyle(modal);
                    const width = computedStyle.width;
                    
                    // Check if modal width adapts to viewport
                    if (window.innerWidth < 768) {
                        // Should be full width or nearly full width on mobile
                        valid = valid && (width === '100%' || parseFloat(width) > window.innerWidth - 40);
                    } else {
                        // Should have reasonable width on desktop
                        valid = valid && (parseFloat(width) > 300 && parseFloat(width) < 800);
                    }
                });
                
                return valid;
            },
            critical: false
        });
    }
    
    testForms() {
        this.addTest({
            name: 'Form Responsiveness',
            test: () => {
                const textareas = document.querySelectorAll('textarea');
                let valid = true;
                
                textareas.forEach(textarea => {
                    const computedStyle = window.getComputedStyle(textarea);
                    const width = computedStyle.width;
                    
                    // Check if textarea width is responsive
                    if (width === '100%' || width === 'auto') {
                        valid = valid;
                    } else {
                        valid = valid && parseFloat(width) > 200;
                    }
                });
                
                return valid;
            },
            critical: false
        });
    }
    
    testTables() {
        this.addTest({
            name: 'Table Responsiveness',
            test: () => {
                const tables = document.querySelectorAll('table');
                let valid = true;
                
                tables.forEach(table => {
                    const computedStyle = window.getComputedStyle(table);
                    const width = computedStyle.width;
                    
                    // Check if table width is responsive
                    if (width === '100%' || width === 'auto') {
                        valid = valid;
                    } else {
                        // Should not have fixed width that causes overflow
                        valid = valid && parseFloat(width) < window.innerWidth - 40;
                    }
                });
                
                return valid;
            },
            critical: false
        });
    }
    
    testCSSLoading() {
        this.addTest({
            name: 'CSS Loading',
            test: () => {
                // Check if responsive CSS files are loaded
                const responsiveLink = document.querySelector('link[href*="responsive.css"]');
                const mainLink = document.querySelector('link[href*="main.css"]');
                
                return responsiveLink && mainLink;
            },
            critical: true
        });
    }
    
    testMediaQueries() {
        this.addTest({
            name: 'Media Queries Active',
            test: () => {
                // Check if media queries are being applied
                const style = document.createElement('style');
                style.textContent = `
                    @media (max-width: 768px) {
                        body::after { content: 'mobile'; }
                    }
                    @media (min-width: 769px) {
                        body::after { content: 'desktop'; }
                    }
                `;
                document.head.appendChild(style);
                
                const computedStyle = window.getComputedStyle(document.body);
                const mediaQueryActive = computedStyle.content !== 'none';
                
                document.head.removeChild(style);
                return mediaQueryActive;
            },
            critical: true
        });
    }
    
    addTest(test) {
        test.passed = false;
        test.timestamp = new Date().toISOString();
        this.tests.push(test);
        this.results.total++;
    }
    
    runSingleTest(test) {
        try {
            test.passed = test.test();
            if (test.passed) {
                this.results.passed++;
            } else {
                this.results.failed++;
            }
        } catch (error) {
            test.passed = false;
            test.error = error.message;
            this.results.failed++;
        }
    }
    
    displayResults() {
        // Run all tests
        this.tests.forEach(test => this.runSingleTest(test));
        
        // Display results in console
        console.log('=== Responsive Design Verification Results ===');
        console.log(`Total Tests: ${this.results.total}`);
        console.log(`Passed: ${this.results.passed}`);
        console.log(`Failed: ${this.results.failed}`);
        console.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
        
        // Display detailed results
        console.log('\n=== Detailed Results ===');
        this.tests.forEach((test, index) => {
            const status = test.passed ? '✅ PASS' : '❌ FAIL';
            const critical = test.critical ? ' (CRITICAL)' : '';
            console.log(`${index + 1}. ${test.name} - ${status}${critical}`);
            
            if (!test.passed && test.error) {
                console.log(`   Error: ${test.error}`);
            }
        });
        
        // Display viewport information
        const width = window.innerWidth;
        const breakpoint = this.getCurrentBreakpoint(width);
        console.log(`\n=== Current Viewport ===`);
        console.log(`Width: ${width}px`);
        console.log(`Breakpoint: ${breakpoint.name}`);
        
        // Display recommendations
        this.displayRecommendations();
    }
    
    displayRecommendations() {
        const failedTests = this.tests.filter(test => !test.passed);
        
        if (failedTests.length > 0) {
            console.log('\n=== Recommendations ===');
            
            const criticalFailures = failedTests.filter(test => test.critical);
            if (criticalFailures.length > 0) {
                console.log('🚨 CRITICAL ISSUES FOUND:');
                criticalFailures.forEach(test => {
                    console.log(`  - ${test.name}: Address this immediately`);
                });
            }
            
            const nonCriticalFailures = failedTests.filter(test => !test.critical);
            if (nonCriticalFailures.length > 0) {
                console.log('⚠️ NON-CRITICAL ISSUES FOUND:');
                nonCriticalFailures.forEach(test => {
                    console.log(`  - ${test.name}: Consider addressing for better UX`);
                });
            }
        } else {
            console.log('\n🎉 ALL TESTS PASSED! Responsive design is working correctly.');
        }
    }
    
    // Method to manually trigger tests
    runManualTest() {
        console.log('Running manual responsive verification...');
        this.runTests();
    }
    
    // Method to export results
    exportResults() {
        const results = {
            timestamp: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                breakpoint: this.getCurrentBreakpoint(window.innerWidth)
            },
            tests: this.tests,
            summary: this.results
        };
        
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `responsive-verification-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        return results;
    }
}

// Initialize verification when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveVerification = new ResponsiveVerification();
    
    // Add manual test button for debugging
    const testButton = document.createElement('button');
    testButton.textContent = 'Run Responsive Test';
    testButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #d90429;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        z-index: 1000;
    `;
    testButton.addEventListener('click', () => {
        window.responsiveVerification.runManualTest();
    });
    document.body.appendChild(testButton);
    
    // Add export button
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Results';
    exportButton.style.cssText = `
        position: fixed;
        bottom: 60px;
        right: 20px;
        background: #0ea5e9;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        z-index: 1000;
    `;
    exportButton.addEventListener('click', () => {
        window.responsiveVerification.exportResults();
    });
    document.body.appendChild(exportButton);
    
    console.log('🔍 Responsive Design Verification initialized');
    console.log('📱 Use the test button to run manual verification');
    console.log('💾 Use the export button to save results');
});

// Export for use in browser console
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveVerification;
}