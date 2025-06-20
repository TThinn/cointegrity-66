
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';

// Ensure React is fully loaded before attempting to render
const initializeApp = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Create root and render with proper error boundaries
  const root = createRoot(rootElement);
  
  // Render the app with React.StrictMode to catch issues early
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Service worker initialization removed to prevent caching issues
// Will be re-implemented in Phase 2 with proper cache invalidation
