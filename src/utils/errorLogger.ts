
// Simple error logging utility with anti-recursion protection
let isLoggingError = false;
let errorCount = 0;
const MAX_ERRORS_PER_SESSION = 10;

export const logError = (error: Error, context?: string) => {
  // Prevent recursive logging and limit total errors
  if (isLoggingError || errorCount >= MAX_ERRORS_PER_SESSION) {
    return;
  }
  
  // Skip logging our own timeout errors to prevent recursion
  if (error.message?.includes('Timeout') && error.stack?.includes('errorLogger')) {
    return;
  }
  
  isLoggingError = true;
  errorCount++;
  
  try {
    console.error(`Error ${context ? `in ${context}` : ''}:`, error);
    
    // Log stack trace only for the first few errors
    if (error.stack && errorCount <= 3) {
      console.error('Stack trace:', error.stack);
    }
  } catch (e) {
    // Silent fail to prevent recursive errors
  } finally {
    isLoggingError = false;
  }
};

// Simplified global error handler without recursive timeout logic
export const initializeErrorHandling = () => {
  if (typeof window === 'undefined') return;
  
  // Simple error handler without complex recursion prevention
  window.addEventListener('error', (event) => {
    if (errorCount >= MAX_ERRORS_PER_SESSION) return;
    
    // Skip our own errors
    if (event.message?.includes('Timeout') && event.filename?.includes('errorLogger')) {
      return;
    }
    
    logError(new Error(event.message), 'Global error handler');
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    if (errorCount >= MAX_ERRORS_PER_SESSION) return;
    
    // Skip our own promise rejections
    if (event.reason?.message?.includes('Timeout') && event.reason?.stack?.includes('errorLogger')) {
      return;
    }
    
    logError(new Error(event.reason), 'Unhandled promise rejection');
  });
  
  // Reset error count periodically
  setInterval(() => {
    errorCount = Math.max(0, errorCount - 1);
  }, 60000); // Reset one error per minute
};
