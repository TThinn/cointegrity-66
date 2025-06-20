
// Enhanced service worker initialization for Phase 2
export const initServiceWorker = async () => {
  // Only initialize if we're in a browser environment and service workers are supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }
  
  try {
    // Wait for page to load before registering
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }
    
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    
    console.log('Service Worker registered successfully:', registration);
    
    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is available
            console.log('New service worker available');
            
            // You could show a toast notification here
            // For now, we'll just log it
            showUpdateNotification();
          }
        });
      }
    });
    
    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 1000 * 60 * 60); // Check every hour
    
    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Message from service worker:', event.data);
    });
    
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
};

// Show update notification (placeholder for future toast implementation)
const showUpdateNotification = () => {
  console.log('App update available - consider refreshing');
  
  // In a real implementation, you might show a toast or banner
  // For now, we'll just add a subtle console message
  
  // Example of how you might implement this with a custom event:
  window.dispatchEvent(new CustomEvent('app-update-available', {
    detail: { message: 'A new version is available' }
  }));
};

// Utility to check if service worker is active
export const isServiceWorkerActive = (): boolean => {
  return 'serviceWorker' in navigator && 
         navigator.serviceWorker.controller !== null;
};

// Utility to force service worker update
export const forceServiceWorkerUpdate = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) return;
  
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      
      // If there's a waiting worker, activate it
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
  } catch (error) {
    console.log('Force update failed:', error);
  }
};
