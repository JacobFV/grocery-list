const CACHE_NAME = 'grocery-list-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('sync', event => {
    if (event.tag.startsWith('notify-')) {
        const itemName = event.tag.split('-')[1];
        self.registration.showNotification('Grocery Reminder', {
            body: `Time to buy ${itemName}!`,
        });
    }
});
