import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';

// Developer Tools specific initialization
const initializeDeveloperTools = () => {
  console.log('WebZoneBW Developer Tools initialized');
  
  // Add developer tools-specific event listeners or configurations
  document.addEventListener('DOMContentLoaded', () => {
    // Developer tools-specific functionality
    const developertoolsContainer = document.querySelector('.developertools-container');
    if (developertoolsContainer) {
      // Add developer tools-specific interactions
      const toolCards = developertoolsContainer.querySelectorAll('.developertool-card');
      toolCards.forEach(card => {
        card.addEventListener('click', () => {
          console.log('Developer tool selected:', card.querySelector('h3')?.textContent);
        });
      });
    }
  });
};

// Initialize the React app with developer tools context
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize developer tools-specific functionality
initializeDeveloperTools();