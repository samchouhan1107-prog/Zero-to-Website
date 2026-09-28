import React from 'react';

interface AboutViewProps {
  // Add any props if needed
}

export const AboutView: React.FC<AboutViewProps> = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-300 mb-8">ℹ️ About WebZoneBW</h1>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300">
              Welcome to WebZoneBW Storehouse - your comprehensive learning platform for modern web development.
            </p>
            <h2 className="text-2xl font-bold text-indigo-300 mt-6">🎯 Our Mission</h2>
            <p className="text-slate-300">
              We believe that learning web development should be interactive, visual, and enjoyable. 
              Our platform combines structured lessons with hands-on practice and AI-powered assistance.
            </p>
            <h2 className="text-2xl font-bold text-indigo-300 mt-6">🚀 What We Offer</h2>
            <ul className="text-slate-300">
              <li>Interactive HTML, CSS, and JavaScript lessons</li>
              <li>Visual learning tools and concept stones</li>
              <li>Practice environments with instant feedback</li>
              <li>AI-powered tutoring and assistance</li>
              <li>Progress tracking and achievement system</li>
            </ul>
            <h2 className="text-2xl font-bold text-indigo-300 mt-6">💡 Learning Philosophy</h2>
            <p className="text-slate-300">
              We use brain-friendly teaching methods, real-world analogies, and interactive examples 
              to make complex concepts easy to understand and remember.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};