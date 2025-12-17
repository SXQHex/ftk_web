// src/lib/mockModeUtil.ts
// Bu dosya istemci tarafı çerez işlemlerini içerir, "use client" direktifi burada artık gerekli değildir.

export const MOCK_MODE_KEY = "ftk_app_mock_mode";

// İstemci tarafında çerez ayarlamak için yardımcı fonksiyon
const setClientCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// İstemci tarafında çerez okumak için yardımcı fonksiyon
const getClientCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// İstemci tarafında mock modunu ayarlar ve sayfayı yeniler
export const setMockModeClient = (enabled: boolean) => {
  if (typeof window !== "undefined") {
    setClientCookie(MOCK_MODE_KEY, String(enabled), 7); // Çerezi 7 gün geçerli yap
    window.location.reload(); // Sayfayı yenileyerek MSW değişikliklerinin uygulanmasını sağlıyoruz
  }
};

// İstemci tarafında mock modunu okur
export const getMockModeClient = (): boolean => {
  if (typeof window === "undefined") {
    return false; // Sunucu tarafında çağrılırsa varsayılan olarak false döner
  }
  const value = getClientCookie(MOCK_MODE_KEY);
  return value === "true";
};