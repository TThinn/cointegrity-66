// Simple error logging utility
export const logError = (error: Error, context?: string) => {
  console.error(`Error ${context ? `in ${context}` : ''}:`, error);
  
  // Log to console with stack trace
  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }
};

// Global error handler
export const initializeErrorHandling = () => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('error', (event) => {
    logError(new Error(event.message), 'Global error handler');
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    logError(new Error(event.reason), 'Unhandled promise rejection');
  });
};
