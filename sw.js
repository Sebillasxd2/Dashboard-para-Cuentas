/* Service Worker — permite instalar la app y usarla sin conexión.
   Estrategia: la página (HTML) usa "red primero" para recibir actualizaciones
   al instante cuando hay internet, y cae a la caché si estás offline. */
const CACHE = 'cuentas-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;
  // Dejar pasar a la red las peticiones de Firebase / Google (sincronización en vivo)
  if (url.includes('gstatic.com') || url.includes('firebaseio') || url.includes('googleapis.com') || url.includes('firebase')) return;

  const isDoc = req.mode === 'navigate' || req.destination === 'document' || url.endsWith('/index.html') || url.endsWith('/');
  if (isDoc) {
    // Red primero para el HTML: siempre la última versión cuando hay internet
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // Recursos estáticos: caché primero (rápido y offline)
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => caches.match('./index.html')))
  );
});
