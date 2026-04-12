import React from "react";
import { Link } from "react-router-dom";

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-content-center bg-slate-100 px-4 text-center">
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
            <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-600">
              We hit an unexpected issue. Please refresh or return to dashboard.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="rounded-full bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white"
              >
                Reload
              </button>
              <Link to="/dashboard" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
