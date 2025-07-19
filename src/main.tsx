
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import { initWebVitals } from './utils/webVitalsInit';
import { SecurityProvider } from './components/security/SecurityProvider';
import { initializeSecurityHeaders, initializeSecurityMonitoring } from './utils/securityHeaders';
import { detectCrawler } from './utils/crawlerDetection';

// Optimized app initialization
const initializeApp = () => {
  const userAgent = navigator.userAgent || '';
  const crawlerInfo = detectCrawler(userAgent);
  
  // Skip all security initialization for crawlers
  if (crawlerInfo.isLegitimate) {
    console.log('[Init] Crawler detected, skipping security initialization');
  } else {
    // Only initialize security for regular users, with error handling
    try {
      initializeSecurityHeaders();
      initializeSecurityMonitoring();
    } catch (error) {
      console.warn('[Init] Security initialization failed, continuing without it:', error);
    }
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

  // Initialize web vitals after app render (with delay to reduce initial load)
  setTimeout(() => {
    try {
      initWebVitals();
    } catch (error) {
      console.warn('[Init] Web vitals initialization failed:', error);
    }
  }, 2000);
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
