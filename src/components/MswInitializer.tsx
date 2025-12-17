// src/components/MswInitializer.tsx
"use client";

import { useEffect } from 'react';

interface MswInitializerProps {
  isMockModeEnabled: boolean;
}

export function MswInitializer({ isMockModeEnabled }: MswInitializerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks') // src/mocks'u dinamik olarak içe aktar
        .then(({ initializeMocks }) => {
          initializeMocks(isMockModeEnabled); // isMockModeEnabled'ı fonksiyona geçir
        })
        .catch(error => {
          console.error("MSW mock'ları başlatılamadı:", error);
        });
    }
  }, [isMockModeEnabled]); // isMockModeEnabled değiştiğinde yeniden çalıştır (sayfa yenilenmesi beklenir)

  return null; // Bu bileşen herhangi bir şey render etmez
}