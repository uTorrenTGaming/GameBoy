// Service Worker Mínimo para permitir instalação
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalado');
});

self.addEventListener('fetch', (e) => {
  // Necessário para PWA funcionar offline futuramente
});