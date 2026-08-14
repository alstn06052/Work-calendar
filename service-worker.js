const CACHE_RESET='work-calendar-v84-reset';
self.addEventListener('install',event=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
    }catch(e){}
    try{await self.registration.unregister()}catch(e){}
    const clientsList=await self.clients.matchAll({type:'window'});
    for(const client of clientsList){ try{client.navigate(client.url)}catch(e){} }
  })());
});
self.addEventListener('fetch',event=>{
  event.respondWith(fetch(event.request));
});
