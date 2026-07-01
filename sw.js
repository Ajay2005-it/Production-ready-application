// Minimal cache-first service worker. Bumps CACHE_NAME to invalidate
// old caches on deploy — the standard pattern for static SPA hosting.
const CACHE_NAME = "keystroke-v1";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/js/router.js",
  "/js/cart.js",
  "/js/data.js",
  "/js/productArt.js",
  "/js/components/header.js",
  "/js/components/productCard.js",
  "/js/components/toast.js",
  "/js/pages/home.js",
  "/js/pages/catalog.js",
  "/js/pages/productDetail.js",
  "/js/pages/cart.js",
  "/js/pages/notFound.js",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
