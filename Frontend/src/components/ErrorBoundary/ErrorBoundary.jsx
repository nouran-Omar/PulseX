import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the fallback UI is shown on the next render
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can send this error to a service like Sentry for monitoring
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI shown to the user instead of a blank screen
      return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-5 text-center">
          <h1 className="text-2xl font-bold text-red-600">Sorry, something went wrong unexpectedly.</h1>
          <p className="mt-2 text-gray-600">We apologize. Please try reloading the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 rounded-lg bg-brand-main px-6 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;