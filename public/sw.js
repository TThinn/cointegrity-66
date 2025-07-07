
// Advanced Service Worker with multiple caching strategies
const VERSION = '2.2.0';
const STATIC_CACHE = `cointegrity-static-v${VERSION}`;
const DYNAMIC_CACHE = `cointegrity-dynamic-v${VERSION}`;
const IMAGE_CACHE = `cointegrity-images-v${VERSION}`;

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/mica-ready-waitlist',
  '/glossary',
  '/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png', // Logo
  '/manifest.json',
  '/favicon.ico'
];

// Priority partner logos for faster loading
const PRIORITY_IMAGES = [
  '/lovable-uploads/ETH.png',
  '/lovable-uploads/Binance.png', 
  '/lovable-uploads/Meta.png',
  '/lovable-uploads/Blackrock.png',
  '/lovable-uploads/Google_Cloud.png',
  '/lovable-uploads/Mircrosoft.png'
];

// Cache strategies by resource type
const CACHE_STRATEGIES = {
  CACHE_FIRST: ['js', 'css', 'woff2', 'woff', 'ttf'],
  NETWORK_FIRST: ['html', 'json'],
  STALE_WHILE_REVALIDATE: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'avif']
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing v' + VERSION);
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      caches.open(IMAGE_CACHE).then(cache => {
        console.log('Service Worker: Preloading priority images');
        return cache.addAll(PRIORITY_IMAGES);
      }),
      self.skipWaiting()
    ]).catch((error) => {
      console.error('Service Worker: Install failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating v' + VERSION);
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => 
              name !== STATIC_CACHE && 
              name !== DYNAMIC_CACHE && 
              name !== IMAGE_CACHE
            )
            .map(name => {
              console.log('Service Worker: Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) return;
  
  const fileExtension = url.pathname.split('.').pop()?.toLowerCase();
  
  if (CACHE_STRATEGIES.CACHE_FIRST.includes(fileExtension)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.includes(fileExtension)) {
    event.respondWith(staleWhileRevalidateStrategy(request, IMAGE_CACHE));
  } else {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  }
});

// Cache first strategy for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', request.url);
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy for dynamic content
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate for images
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);
  
  return cachedResponse || await fetchPromise;
}
