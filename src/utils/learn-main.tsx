import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Learn specific initialization
const initializeLearn = () => {
  console.log('WebZoneBW Learn initialized');
  
  // Add learn-specific event listeners or configurations
  document.addEventListener('DOMContentLoaded', () => {
    // Learn-specific functionality
    const learnContainer = document.querySelector('.learn-container');
    if (learnContainer) {
      // Add learn-specific interactions
      const chapterCards = learnContainer.querySelectorAll('.learn-chapter');
      chapterCards.forEach(card => {
        card.addEventListener('click', () => {
          const chapterTitle = card.querySelector('h3')?.textContent;
          console.log('Chapter selected:', chapterTitle);
          // Navigate to chapter or open chapter details
        });
      });

      const pathCards = learnContainer.querySelectorAll('.learn-path');
      pathCards.forEach(card => {
        card.addEventListener('click', () => {
          const pathTitle = card.querySelector('h4')?.textContent;
          console.log('Learning path selected:', pathTitle);
        });
      });
    }
  });
};

// Initialize the React app with learn context
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize learn-specific functionality
initializeLearn();