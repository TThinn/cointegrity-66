
// SERVICE WORKER TEMPORARILY DISABLED
// This service worker has been disabled to prevent caching issues
// It will be re-enabled in Phase 2 with proper cache invalidation

// Immediately skip waiting and claim clients to disable caching
self.addEventListener('install', (event) => {
  console.log('Service worker disabled - skipping installation');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker disabled - clearing all caches');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Pass through all fetch requests without caching
self.addEventListener('fetch', (event) => {
  // Don't handle any requests - let them go through normally
  return;
});

