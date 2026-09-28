import React from 'react';

interface LearnViewProps {
  // Add any props if needed
}

export const LearnView: React.FC<LearnViewProps> = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-300 mb-8">📚 Learning Hub</h1>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <p className="text-slate-300 text-center">
            🚀 Learning resources and structured learning paths will be available here soon.
          </p>
        </div>
      </div>
    </div>
  );
};