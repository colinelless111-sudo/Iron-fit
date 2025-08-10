self.addEventListener('install', e=>self.skipWaiting());
self.addEventListener('activate', e=>clients.claim());
self.addEventListener('fetch', e=>{
  e.respondWith((async()=>{
    try{ return await fetch(e.request); }
    catch(_){ return Response.error(); }
  })());
});