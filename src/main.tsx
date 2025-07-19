import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import { initWebVitals } from './utils/webVitalsInit';
import { SecurityProvider } from './components/security/SecurityProvider';
import { initializeSecurityHeaders, initializeSecurityMonitoring } from './utils/securityHeaders';

// Simple app initialization
const initializeApp = () => {
  // Check if this is a crawler first
  const userAgent = navigator.userAgent?.toLowerCase() || '';
  const isBot = ['bot', 'crawler', 'spider', 'nightwatch', 'googlebot', 'bingbot'].some(term => 
    userAgent.includes(term)
  );
  
  // Skip security initialization for crawlers to ensure immediate content access
  if (!isBot) {
    initializeSecurityHeaders();
    initializeSecurityMonitoring();
  }

  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <SecurityProvider>
        <App />
      </SecurityProvider>
    </React.StrictMode>
  );

  // Initialize web vitals after app render
  initWebVitals();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
