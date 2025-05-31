
import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
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
    }
  }, []);
};
