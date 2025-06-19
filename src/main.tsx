
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import { initCriticalCssOptimization } from './utils/criticalCss';

// Initialize critical CSS optimization
if (typeof window !== 'undefined') {
  initCriticalCssOptimization();
}

// Add preload for critical fonts
const preloadFonts = () => {
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    document.head.appendChild(link);
  });
};

if (typeof window !== 'undefined') {
  preloadFonts();
}

// Ensure DOM and React are ready before creating root
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error('❌ Root element not found');
    return;
  }

  // Additional check to ensure React is available
  if (typeof React === 'undefined') {
    console.error('❌ React is not available');
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('✅ App initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
