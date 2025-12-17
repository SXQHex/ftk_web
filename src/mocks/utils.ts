// src/mocks/utils.ts
export function isMockModeActive() {
  // `typeof window !== 'undefined'` kontrolü, bu kodun tarayıcı ortamında çalıştığını garanti eder.
  // MSW hem Node.js hem de tarayıcıda çalıştığı için bu önemlidir.
  // Node.js ortamında (örneğin SSR) localStorage'a erişilemez, bu durumda mock modu kapalı kabul edilir.
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('ftk_mock_mode') === 'true';
  }
  return false;
}