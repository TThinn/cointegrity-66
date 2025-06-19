
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import { initCriticalCssOptimization } from './utils/criticalCss';

console.log('🔍 Main.tsx initializing...');

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

// Ensure DOM is ready before creating root
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error('❌ Root element not found');
    return;
  }

  console.log('🔍 Creating React root...');
  const root = createRoot(rootElement);
  
  console.log('🔍 Rendering App component...');
  root.render(<App />);
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
