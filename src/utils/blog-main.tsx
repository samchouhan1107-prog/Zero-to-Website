import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';

// Blog specific initialization
const initializeBlog = () => {
  console.log('WebZoneBW Blog initialized');
  
  // Add blog-specific event listeners or configurations
  document.addEventListener('DOMContentLoaded', () => {
    // Blog-specific functionality
    const blogContainer = document.querySelector('.blog-container');
    if (blogContainer) {
      // Add blog-specific interactions
      const categoryCards = blogContainer.querySelectorAll('.blog-category');
      categoryCards.forEach(card => {
        card.addEventListener('click', () => {
          const categoryTitle = card.querySelector('h3')?.textContent;
          console.log('Category selected:', categoryTitle);
          // Filter articles by category or navigate to category page
        });
      });

      const articleCards = blogContainer.querySelectorAll('.blog-article');
      articleCards.forEach(card => {
        card.addEventListener('click', () => {
          const articleTitle = card.querySelector('h4')?.textContent;
          console.log('Article selected:', articleTitle);
          // Navigate to article detail page
        });
      });

      const tagElements = blogContainer.querySelectorAll('.blog-tag');
      tagElements.forEach(tag => {
        tag.addEventListener('click', (e) => {
          e.stopPropagation();
          const tagName = tag.textContent;
          console.log('Tag selected:', tagName);
          // Filter articles by tag
        });
      });
    }

    // Blog navigation functionality
    const navButtons = blogContainer.querySelectorAll('.blog-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.textContent;
        console.log('Blog navigation:', action);
        // Handle pagination or navigation
      });
    });
  });
};

// Initialize the React app with blog context
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize blog-specific functionality
initializeBlog();