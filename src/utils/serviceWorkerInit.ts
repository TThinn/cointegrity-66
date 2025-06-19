
export const initServiceWorker = () => {
  // Only initialize if we're in a browser environment and service workers are supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * 60); // Check every hour
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
};
