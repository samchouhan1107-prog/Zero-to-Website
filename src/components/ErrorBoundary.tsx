import React from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('WebZoneBW SC Error Boundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-app-canvas px-4">
          <div className="w-full max-w-md panel-surface p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30">
              <AlertTriangle className="h-7 w-7 text-red-500" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-black text-app-ink">Something went wrong</h1>
            <p className="mt-2 text-sm text-app-muted">
              The platform encountered an unexpected error. Your progress is saved locally.
            </p>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-xs font-mono text-app-subtle hover:text-app-ink">
                  Technical details
                </summary>
                <pre className="mt-2 overflow-auto rounded-lg border border-app-border bg-app-inset p-3 text-xs text-red-400">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-app-border bg-app-inset px-4 py-2.5 text-sm font-semibold text-app-ink transition-colors hover:bg-app-active"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
