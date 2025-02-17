const CACHE_NAME = "v1";
const CACHE_FILES = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/gato.png",
];

// Evento de instalación: almacena archivos en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Archivos en caché");
            return cache.addAll(CACHE_FILES);
        })
    );
});

// Evento de activación: limpia cachés antiguos si existen
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Caché antiguo eliminado:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de recuperación: sirve archivos desde el caché si están disponibles
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
