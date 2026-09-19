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
  
  const memoizedValue = React.useMemo(factory, deps);
  
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
        <div className="error-boundary-fallback p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-bold text-red-600 mb-2">Something went wrong</h3>
          <p className="text-sm text-red-500">Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export all utilities
export {
  PerformanceTracker,
  MemoCache,
  debounce,
  throttle,
  useOptimizedMemo,
  calculateVisibleItems,
  createIntersectionObserver,
  withPerformanceMonitoring,
  getMemoryUsage,
  forceGarbageCollection,
  OptimizedErrorBoundary,
};