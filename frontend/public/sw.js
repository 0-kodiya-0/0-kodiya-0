const CACHE_NAME = 'github-api-cache-v1';
const GITHUB_API_BASE = 'https://api.github.com';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Only intercept GitHub API requests from our origin
    if (event.request.url.startsWith(GITHUB_API_BASE)) {
        event.respondWith(
            (async () => {
                try {
                    const cache = await caches.open(CACHE_NAME);

                    // Try to get from cache first
                    const cachedResponse = await cache.match(event.request);

                    // Fetch from network
                    const fetchResponse = await fetch(event.request);

                    // Clone responses as they can only be read once
                    const fetchResponseClone = fetchResponse.clone();

                    // Update cache with new response
                    cache.put(event.request, fetchResponseClone);

                    // Return cached response if exists, otherwise network response
                    return cachedResponse || fetchResponse;
                } catch (error) {
                    console.error('Service worker fetch error:', error);
                    // Fallback to cached response if exists
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(event.request);
                    return cachedResponse || new Response(null, { status: 404 });
                }
            })()
        );
    }
});