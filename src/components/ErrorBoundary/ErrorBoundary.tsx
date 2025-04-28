// src/components/ErrorBoundary.tsx
import React, { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true }; // Update state to display fallback UI
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong!</div>; // Fallback UI
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
