
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import { initCriticalCssOptimization } from './utils/criticalCss';
import { validateReactImport, debugReactModule } from './utils/reactValidation';

// Validate React before doing anything else
try {
  console.log('🔧 Pre-initialization React validation');
  validateReactImport();
  debugReactModule();
} catch (error) {
  console.error('❌ Critical React validation failure:', error);
}

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

// Enhanced DOM ready initialization with React validation
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error('❌ Root element not found');
    return;
  }

  try {
    // Final React validation before rendering
    validateReactImport();
    
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('✅ App initialized successfully with React validation');
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    
    // Fallback error display
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; color: #900; font-family: Arial, sans-serif;">
          <h2>Application Error</h2>
          <p>Failed to initialize the application. Please refresh the page.</p>
          <details>
            <summary>Error Details</summary>
            <pre>${error}</pre>
          </details>
        </div>
      `;
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
