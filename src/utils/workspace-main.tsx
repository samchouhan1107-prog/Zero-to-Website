import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Workspace-specific initialization
const initializeWorkspace = () => {
  console.log('WebZoneBW Workspace initialized');
  
  // Add workspace-specific event listeners or configurations
  document.addEventListener('DOMContentLoaded', () => {
    // Workspace-specific functionality
    const workspaceContainer = document.querySelector('.workspace-container');
    if (workspaceContainer) {
      // Add workspace-specific interactions
      workspaceContainer.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('workspace-btn')) {
          console.log('Workspace action triggered');
        }
      });
    }
  });
};

// Initialize the React app with workspace context
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize workspace-specific functionality
initializeWorkspace();