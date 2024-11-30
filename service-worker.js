const CACHE_NAME = 'duka-la-likes-v1';
const urlsToCache = [
  '/', // Your homepage or entry point
  '/index.html', // Replace with your main file if different
  '/style.css',  // Your stylesheet
  '/custom.js',  // Your JavaScript file
  '/icons/icon-192x192.png', // Your 192x192 icon
  '/icons/icon-512x512.png'  // Your 512x512 icon
];

// Install and cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch cached files when offline, fallback to network if not found
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // Optional: Serve a fallback page for offline users
      // return caches.match('/offline.html');
    })
  );
});

// Activate and remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
