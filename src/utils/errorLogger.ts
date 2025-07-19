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
  
  // Prevent recursive error logging
  let errorLoggingEnabled = true;
  
  window.addEventListener('error', (event) => {
    if (!errorLoggingEnabled) return;
    
    // Temporarily disable error logging to prevent recursion
    errorLoggingEnabled = false;
    
    try {
      // Only log real errors, not timeout errors from error logger itself
      if (!event.message?.includes('Timeout') || !event.filename?.includes('errorLogger')) {
        logError(new Error(event.message), 'Global error handler');
      }
    } catch (e) {
      // Silently fail to prevent recursive errors
    }
    
    // Re-enable after a delay
    setTimeout(() => {
      errorLoggingEnabled = true;
    }, 1000);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    if (!errorLoggingEnabled) return;
    
    // Prevent logging promise rejection errors from this module
    if (event.reason?.message?.includes('Timeout') && event.reason?.stack?.includes('errorLogger')) {
      return;
    }
    
    errorLoggingEnabled = false;
    
    try {
      logError(new Error(event.reason), 'Unhandled promise rejection');
    } catch (e) {
      // Silently fail
    }
    
    setTimeout(() => {
      errorLoggingEnabled = true;
    }, 1000);
  });
};
