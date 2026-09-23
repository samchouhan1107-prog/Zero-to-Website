/* ==================================================
    WZ Storehouse - Performance Monitoring
    Author  : Sameer Chouhan
    Version : 2.1 (Core Web Vitals Monitoring)
    ================================================== */

// Performance monitoring for Core Web Vitals
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            lcp: null,
            fid: null,
            cls: null,
            fcp: null,
            ttfb: null,
            loadTime: null
        };
        this.init();
    }

    init() {
        // Check if PerformanceObserver is supported
        if ('PerformanceObserver' in window) {
            this.observeLCP();
            this.observeFID();
            this.observeCLS();
            this.observeFCP();
            this.observeTTFB();
        }

        // Track page load time
        this.trackPageLoad();

        // Track user interactions
        this.trackInteractions();
    }

    observeLCP() {
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            this.reportMetric('LCP', this.metrics.lcp);
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    observeFID() {
        const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
                this.metrics.fid = entry.processingStart - entry.startTime;
                this.reportMetric('FID', this.metrics.fid);
            });
        });

        fidObserver.observe({ entryTypes: ['first-input'] });
    }

    observeCLS() {
        const clsObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            let clsValue = 0;
            
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            
            this.metrics.cls = clsValue;
            this.reportMetric('CLS', this.metrics.cls);
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    observeFCP() {
        const fcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const firstEntry = entries[0];
            this.metrics.fcp = firstEntry.startTime;
            this.reportMetric('FCP', this.metrics.fcp);
        });

        fcpObserver.observe({ entryTypes: ['paint'] });
    }

    observeTTFB() {
        const navigationObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const navigationEntry = entries[0];
            this.metrics.ttfb = navigationEntry.responseStart;
            this.reportMetric('TTFB', this.metrics.ttfb);
        });

        navigationObserver.observe({ entryTypes: ['navigation'] });
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            this.reportMetric('Load Time', this.metrics.loadTime);
        });
    }

    trackInteractions() {
        let interactionCount = 0;
        
        const trackInteraction = () => {
            interactionCount++;
            this.reportMetric('Interactions', interactionCount);
        };

        // Track various user interactions
        document.addEventListener('click', trackInteraction);
        document.addEventListener('touchstart', trackInteraction);
        document.addEventListener('keydown', trackInteraction);
        document.addEventListener('scroll', () => {
            if (this.metrics.loadTime && performance.now() - this.metrics.loadTime > 1000) {
                trackInteraction();
            }
        }, { passive: true });
    }

    reportMetric(name, value) {
        // Log to console for debugging
        console.log(`${name}:`, value);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'metric', {
                event_category: 'Performance',
                event_label: name,
                value: Math.round(value)
            });
        }

        // Store in localStorage for persistence
        try {
            const timestamp = new Date().toISOString();
            const metricData = {
                name,
                value,
                timestamp,
                url: window.location.href
            };
            
            const existingMetrics = JSON.parse(localStorage.getItem('wz_performance_metrics') || '[]');
            existingMetrics.push(metricData);
            
            // Keep only last 100 metrics
            if (existingMetrics.length > 100) {
                existingMetrics.shift();
            }
            
            localStorage.setItem('wz_performance_metrics', JSON.stringify(existingMetrics));
        } catch (e) {
            console.warn('Failed to store performance metric:', e);
        }
    }

    getPerformanceScore() {
        const scores = {
            lcp: this.getLCPScore(),
            fid: this.getFIDScore(),
            cls: this.getCLSScore(),
            fcp: this.getFCPScore(),
            ttfb: this.getTTFBScore()
        };

        const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
        return {
            overall: Math.round(overallScore),
            breakdown: scores
        };
    }

    getLCPScore() {
        if (!this.metrics.lcp) return 0;
        if (this.metrics.lcp < 2500) return 100;
        if (this.metrics.lcp < 4000) return 75;
        return 50;
    }

    getFIDScore() {
        if (!this.metrics.fid) return 0;
        if (this.metrics.fid < 100) return 100;
        if (this.metrics.fid < 300) return 75;
        return 50;
    }

    getCLSScore() {
        if (!this.metrics.cls) return 0;
        if (this.metrics.cls < 0.1) return 100;
        if (this.metrics.cls < 0.25) return 75;
        return 50;
    }

    getFCPScore() {
        if (!this.metrics.fcp) return 0;
        if (this.metrics.fcp < 1800) return 100;
        if (this.metrics.fcp < 3000) return 75;
        return 50;
    }

    getTTFBScore() {
        if (!this.metrics.ttfb) return 0;
        if (this.metrics.ttfb < 800) return 100;
        if (this.metrics.ttfb < 1800) return 75;
        return 50;
    }

    generateReport() {
        const score = this.getPerformanceScore();
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            scores: score,
            metrics: this.metrics
        };

        console.log('Performance Report:', report);
        return report;
    }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

// Export for external use
window.PerformanceMonitor = PerformanceMonitor;

// Auto-generate report every 5 minutes
setInterval(() => {
    const report = performanceMonitor.generateReport();
    // Send report to server if needed
    // sendPerformanceReport(report);
}, 5 * 60 * 1000);

// Generate initial report after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        performanceMonitor.generateReport();
    }, 3000); // Wait 3 seconds after load
});