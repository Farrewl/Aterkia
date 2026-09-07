import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#060d1a] text-white flex items-center justify-center px-6">
          <div className="max-w-lg w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <h1 className="font-display font-bold text-lg text-red-400">Render error</h1>
            <pre className="mt-3 text-xs font-mono text-white/70 whitespace-pre-wrap break-words max-h-64 overflow-auto">
              {this.state.error.message}
              {this.state.error.stack ? `\n\n${this.state.error.stack}` : ''}
            </pre>
            <button
              onClick={() => { this.setState({ error: null }); }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold border border-white/10"
            >
              Coba lagi
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}