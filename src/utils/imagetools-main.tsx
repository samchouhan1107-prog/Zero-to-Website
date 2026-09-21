import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';

// Image Tools specific initialization
const initializeImageTools = () => {
  console.log('WebZoneBW Image Tools initialized');
  
  // Add image tools-specific event listeners or configurations
  document.addEventListener('DOMContentLoaded', () => {
    // Image tools-specific functionality
    const imagetoolsContainer = document.querySelector('.imagetools-container');
    if (imagetoolsContainer) {
      // Add image tools-specific interactions
      const toolItems = imagetoolsContainer.querySelectorAll('.imagetool-item');
      toolItems.forEach(item => {
        item.addEventListener('click', () => {
          console.log('Image tool selected:', item.querySelector('.imagetool-title')?.textContent);
        });
      });
    }
  });
};

// Initialize the React app with image tools context
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize image tools-specific functionality
initializeImageTools();