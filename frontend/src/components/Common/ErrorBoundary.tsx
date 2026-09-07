import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Button from '../UI/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-red-900">Something went wrong</h3>
        <p className="mt-2 text-sm text-red-700">
          {this.props.fallbackMessage ?? 'An unexpected error occurred while rendering the marketplace.'}
        </p>
        <div className="mt-6">
          <Button variant="secondary" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;