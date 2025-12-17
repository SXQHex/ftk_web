// src/mocks/index.ts
import { handlers } from './handlers';

// Bu fonksiyon artık mockMode durumunu parametre olarak alır
export async function initializeMocks(isMockModeEnabled: boolean) {
  if (process.env.NODE_ENV === 'development') { // Sadece geliştirme ortamında çalıştır
    if (isMockModeEnabled) {
      console.log("MSW: Mock modu AKTİF. API istekleri mock handler'lar tarafından karşılanacak.");
      if (typeof window === 'undefined') { // Sunucu tarafı ortamı (SSR, Server Actions vb.)
        const { server } = await import('./node'); // Dinamik olarak sunucu mock'larını içe aktar
        server.listen({ onUnhandledRequest: 'bypass' }); // İşlenmeyen istekleri gerçek API'ye yönlendir
      } else { // Tarayıcı tarafı ortamı
        const { worker } = await import('./browser'); // Dinamik olarak tarayıcı worker'ını içe aktar
        worker.start({ onUnhandledRequest: 'bypass' }); // İşlenmeyen istekleri gerçek API'ye yönlendir
      }
    } else {
      console.log("MSW: Mock modu KAPALI. API istekleri gerçek backend'e yönlendirilecek.");
      // Mock modu kapalıysa MSW başlatılmaz.
    }
  }
}

// initMocks() çağrısını buradan kaldırın. Artık MswInitializer bileşeni tarafından çağrılacak.