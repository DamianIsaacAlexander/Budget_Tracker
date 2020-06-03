const version = "v1";

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(version)
        .then(cache => cache.addAll([
            "/",
            "assets/dist/manifest.json",
            "/assets/dist/style.css",
            "/assets/dist/bundle.js",
            "/index.html",
            "/assets/dist/icon_192x192.png",
            "/assets/dist/icon_512x512.png",
            "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
            "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0"
        ]))
    )
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
        .then(keys => Promise.all(keys.filter(key => key !== version).map(key => caches.delete(key))))
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
    caches.match(event.request)
    .then(res => {
        if(res && !event.request.url.includes("/api/")){
            return res;
        }
        else
        {   
            return fetchandUpdate(event.request);
        }
    }))
});

function fetchandUpdate(req){
    return fetch(req)
    .then(res => {
        if(res){
            return caches.open(version)
            .then(cache => {
                return cache.put(req.url, res.clone())
                .then(() => {
                    return res;
                });
            });
        }
    }).catch(() => {return caches.match(req).then(cache => cache)});
}