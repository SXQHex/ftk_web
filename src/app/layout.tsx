// src/app/layout.tsx (veya uygulamanızın ana client component'i)
  'use client'; // Bu dosyanın istemci tarafında çalışmasını sağlar
  import { useEffect } from 'react';
  // ... diğer import'lar

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    // Sadece istemci tarafında çalıştır
    if (typeof window !== 'undefined') {
      // İstemci taraflı MSW worker'ı başlat
      require('../mocks/browser').worker.start();
      console.log('MSW client-side handler started.');
    }
  }

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    // ... layout içeriği
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }