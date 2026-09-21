import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';

// Web Tools specific initialization
const initializeWebTools = () => {
  console.log('WebZoneBW Web Tools initialized');
  
  // Add web tools-specific event listeners or configurations
  document.addEventListener('DOMContentLoaded', () => {
    // Web tools-specific functionality
    const webtoolsContainer = document.querySelector('.webtools-container');
    if (webtoolsContainer) {
      // Add web tools-specific interactions
      const toolCards = webtoolsContainer.querySelectorAll('.webtool-card');
      toolCards.forEach(card => {
        card.addEventListener('click', () => {
          console.log('Web tool selected:', card.querySelector('h3')?.textContent);
        });
      });
    }
  });
};

// Initialize the React app with web tools context
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize web tools-specific functionality
initializeWebTools();