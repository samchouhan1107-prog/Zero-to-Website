import React, { useMemo } from 'react';

/**
 * Performance optimization utilities for XP Milestones Modal
 */

// Performance monitoring constants
export const PERFORMANCE_THRESHOLDS = {
  RENDER_TIME: 16, // 60fps target in ms
  MEMOIZATION_CACHE_SIZE: 50,
  DEBOUNCE_DELAY: 100,
} as const;

// Performance tracking
export class PerformanceTracker {
  private static renderTimes = new Map<string, number>();
  private static renderCount = new Map<string, number>();

  static startRender(componentName: string): number {
    const startTime = performance.now();
    const count = (this.renderCount.get(componentName) || 0) + 1;
    this.renderCount.set(componentName, count);
    return startTime;
  }

  static endRender(componentName: string, startTime: number): void {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    this.renderTimes.set(componentName, renderTime);
    
    if (renderTime > PERFORMANCE_THRESHOLDS.RENDER_TIME) {
      console.warn(`Performance: ${componentName} took ${renderTime.toFixed(2)}ms to render`);
    }
  }

  static getStats(): { renderTimes: Map<string, number>; renderCount: Map<string, number> } {
    return {
      renderTimes: new Map(this.renderTimes),
      renderCount: new Map(this.renderCount),
    };
  }

  static reset(): void {
    this.renderTimes.clear();
    this.renderCount.clear();
  }
}

// Memoization utilities
export class MemoCache<T> {
  private cache = new Map<string, { value: T; timestamp: number }>();
  private maxSize: number;

  constructor(maxSize = PERFORMANCE_THRESHOLDS.MEMOIZATION_CACHE_SIZE) {
    this.maxSize = maxSize;
  }

  set(key: string, value: T): void {
    // Remove oldest item if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, { value, timestamp: Date.now() });
  }

  get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (item) {
      // Cache items for 5 minutes
      if (Date.now() - item.timestamp < 300000) {
        return item.value;
      }
      this.cache.delete(key);
    }
    return undefined;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Optimized memoization hook
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: any[],
  componentName: string
): T {
  const startTime = PerformanceTracker.startRender(componentName);
  
  const memoizedValue = useMemo(factory, deps);
  
  PerformanceTracker.endRender(componentName, startTime);
  
  return memoizedValue;
}

// Virtualization utilities for large lists
export interface VirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function calculateVisibleItems(
  scrollTop: number,
  options: VirtualizationOptions
): { startIndex: number; endIndex: number } {
  const { itemHeight, containerHeight, overscan = 5 } = options;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
    Math.ceil(options.containerHeight / itemHeight)
  );
  
  return { startIndex, endIndex };
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

// Performance monitoring decorator
export function withPerformanceMonitoring<T extends (...args: any[]) => any>(
  fn: T,
  functionName: string
): T {
  return ((...args: Parameters<T>) => {
    const startTime = performance.now();
    
    const result = fn.apply(null, args);
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    if (executionTime > PERFORMANCE_THRESHOLDS.RENDER_TIME) {
      console.warn(`Performance: ${functionName} took ${executionTime.toFixed(2)}ms to execute`);
    }
    
    return result;
  }) as T;
}

// Memory usage monitoring
export function getMemoryUsage(): { used: number; total: number; percentage: number } {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
    };
  }
  return { used: 0, total: 0, percentage: 0 };
}

// Garbage collection hint (for debugging)
export function forceGarbageCollection(): void {
  if ((globalThis as any).gc) {
    (globalThis as any).gc();
  }
}

// Error boundary utilities
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface OptimizedErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class OptimizedErrorBoundary extends React.Component<
  OptimizedErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: OptimizedErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('OptimizedErrorBoundary caught an error:', error, errorInfo);
    
    // Log performance metrics when error occurs
    const memoryUsage = getMemoryUsage();
    console.warn('Memory usage at error time:', memoryUsage);
    
    this.setState({ error, errorInfo });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <main role="alert" className="flex min-h-screen items-center justify-center bg-app-canvas px-4 py-10 text-app-ink">
          <section className="w-full max-w-xl border border-app-border bg-app-surface p-6 shadow-xl sm:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-rose-500">Render error</p>
            <h1 className="mt-2 text-2xl font-bold">This page could not be displayed</h1>
            <p className="mt-3 text-sm leading-relaxed text-app-muted">
              The app encountered an unexpected error while rendering. Reload the page or return to WebZoneBW home.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="min-h-10 rounded-md bg-app-amber px-4 text-sm font-semibold text-white hover:bg-app-amber-hover"
              >
                Reload page
              </button>
              <a
                href="/"
                className="inline-flex min-h-10 items-center rounded-md border border-app-border px-4 text-sm font-semibold text-app-ink hover:border-app-amber/50 hover:text-app-amber"
              >
                Go to home
              </a>
            </div>
            {this.state.error?.message && (
              <details className="mt-6 border-t border-app-border pt-4 text-xs text-app-muted">
                <summary className="cursor-pointer font-semibold">Technical error details</summary>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words font-mono">{this.state.error.message}</pre>
              </details>
            )}
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

