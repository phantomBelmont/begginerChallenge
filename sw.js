const tryCACHE = 'v5';
const ASSETS = [
  './',
  './index.html',
  './script.js',
  './style.css',
  './manifest.json',
  './icon512.png',
  './icon192.png'
];

self.addEventListener(
  'install', ins=>{
    ins.waitUntil(
      caches.open(tryCACHE).then(tryCA=>tryCA.addAll(ASSETS))
      .then(()=>self.skipWaiting()) // 修正：self.skipWaiting() に変更しました
    );
});

// 次に古いキャッシュの削除
self.addEventListener('activate', acti => {
  acti.waitUntil(
    caches.keys()
    .then(KEYS => Promise.all(
      KEYS.filter(k => k !== tryCACHE).map(k => caches.delete(k))
    ))
    .then(() => clients.claim())
  );
});

// 中身を取ってくる
self.addEventListener('fetch', fe => {
  if (fe.request.method !== 'GET') return;

  fe.respondWith(
    caches.match(fe.request).then(cachedRes => {
      const fetchPromise = fetch(fe.request).then(networkRes => {
        if (networkRes && networkRes.status === 200) {
          const netCopy = networkRes.clone();
          caches.open(tryCACHE).then(tryCA => tryCA.put(fe.request, netCopy));
        }
        return networkRes;
      }).catch(() => {});

      return cachedRes || fetchPromise;
    })
  );
});
