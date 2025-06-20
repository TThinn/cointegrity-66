// Simplified service worker initialization
export const initServiceWorker = async () => {
  // Only initialize if we're in a browser environment and service workers are supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }
  
  try {
    // Wait for page to load
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }
    
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    
    console.log('Service Worker registered successfully:', registration);
    
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
};

// Simple utility to check if service worker is active
export const isServiceWorkerActive = (): boolean => {
  return 'serviceWorker' in navigator && 
         navigator.serviceWorker.controller !== null;
};
