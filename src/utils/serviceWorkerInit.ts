
// PHASE 3: Enhanced service worker initialization with React-safe implementation
export const initServiceWorker = async () => {
  // Only initialize if we're in a browser environment and service workers are supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }
  
  try {
    // Wait for page to load before registering to avoid React hydration issues
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }
    
    // Additional safety: wait for React to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none' // Always check for updates
    });
    
    console.log('Service Worker registered successfully:', registration);
    
    // Handle service worker updates with React-safe notifications
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker available');
            showUpdateNotification();
          }
        });
      }
    });
    
    // Check for updates every 30 minutes instead of hourly for better freshness
    setInterval(() => {
      registration.update();
    }, 1000 * 60 * 30);
    
    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Message from service worker:', event.data);
      
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('Cache has been updated');
      }
    });
    
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
};

// React-safe update notification
const showUpdateNotification = () => {
  console.log('App update available - consider refreshing');
  
  // Dispatch custom event that React components can listen to
  window.dispatchEvent(new CustomEvent('app-update-available', {
    detail: { 
      message: 'A new version is available',
      timestamp: Date.now()
    }
  }));
};

// Enhanced utility to check if service worker is active
export const isServiceWorkerActive = (): boolean => {
  return 'serviceWorker' in navigator && 
         navigator.serviceWorker.controller !== null;
};

// Force service worker update with improved error handling
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

// Get service worker status for debugging
export const getServiceWorkerStatus = async (): Promise<{
  isSupported: boolean;
  isActive: boolean;
  registration: ServiceWorkerRegistration | null;
  controller: ServiceWorker | null;
}> => {
  const status = {
    isSupported: 'serviceWorker' in navigator,
    isActive: false,
    registration: null as ServiceWorkerRegistration | null,
    controller: null as ServiceWorker | null
  };

  if (status.isSupported) {
    try {
      status.registration = await navigator.serviceWorker.getRegistration();
      status.controller = navigator.serviceWorker.controller;
      status.isActive = status.controller !== null;
    } catch (error) {
      console.log('Service worker status check failed:', error);
    }
  }

  return status;
};
