const CACHE_NAME = 'api-cache-v2';
const GITHUB_API_BASE = 'https://api.github.com';
const LEETCODE_API_BASE = '/api/leetcode-stats';

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
    const requestUrl = event.request.url;
    if (requestUrl.startsWith(GITHUB_API_BASE) || requestUrl.includes(LEETCODE_API_BASE)) {
        event.respondWith(
            (async () => {
                try {
                    const cache = await caches.open(CACHE_NAME);

                    // Try to get from cache first
                    const cachedResponse = await cache.match(event.request);
                    if (cachedResponse) return cachedResponse;

                    // Fetch from network
                    const fetchResponse = await fetch(event.request);
                    const fetchResponseClone = fetchResponse.clone();

                    // Update cache with new response
                    cache.put(event.request, fetchResponseClone);

                    return fetchResponse;
                } catch (error) {
                    console.error('Service worker fetch error:', error);
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(event.request);
                    return cachedResponse || new Response(null, { status: 404 });
                }
            })()
        );
    }
});
