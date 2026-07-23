/* TrainLog service worker — zorgt dat de app werkt zonder internet */
const CACHE = 'trainlog-v2';
const BESTANDEN = [
  'trainlog.html',
  'trainlog.webmanifest',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(BESTANDEN.map(b => c.add(b))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

/* Netwerk eerst, cache als vangnet: altijd de nieuwste versie,
   maar zonder bereik blijft de app gewoon werken. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const kopie = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopie)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('trainlog.html')))
  );
});
