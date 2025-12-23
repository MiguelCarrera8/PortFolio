// Service Worker for Portfolio Caching
const CACHE_NAME = 'miguel-portfolio-v1.0.0';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/assets/favicon.svg',
    // External resources that we want to cache
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: Cached all files');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('Service Worker: Cache failed', err);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip requests to external APIs or forms
    if (event.request.url.includes('/api/') || 
        event.request.url.includes('mailto:') ||
        event.request.url.includes('tel:')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request).then(fetchResponse => {
                    // Don't cache if not a successful response
                    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                        return fetchResponse;
                    }
                    
                    // Clone the response
                    const responseToCache = fetchResponse.clone();
                    
                    // Add to cache for future use
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return fetchResponse;
                });
            })
            .catch(() => {
                // Fallback for offline scenarios
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Background sync for form submissions (when online)
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Handle queued form submissions
            processQueuedForms()
        );
    }
});

async function processQueuedForms() {
    // Implementation for handling offline form submissions
    console.log('Processing queued forms...');
}

// Push notifications (optional - for future enhancements)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nueva notificación del portfolio',
        icon: '/assets/favicon.svg',
        badge: '/assets/favicon.svg',
        vibrate: [200, 100, 200],
        actions: [
            {
                action: 'explore',
                title: 'Ver Portfolio',
                icon: '/assets/favicon.svg'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/assets/favicon.svg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Miguel Ángel Portfolio', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('Service Worker: Loaded');