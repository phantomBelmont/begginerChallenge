const CACHE_NAME = 'v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js', 
  './icon-192.png',
  './icon-512.png'
];

// インストール時：キャッシュにファイルを保存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// アクティブ時：古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// フェッチ時：オフラインでもキャッシュから返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにあったらそれを返す
        if (response) {
          return response;
        }
        // なかったらネットワークから取得
        return fetch(event.request);
      })
  );
});
