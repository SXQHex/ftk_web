// src/app/page.tsx
"use client";

import { LoginForm } from "./(auth)/login/components/LoginForm";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getMockModeClient, setMockModeClient } from "@/lib/mockModeUtil"; // İstemciye özel fonksiyonları kullan

const AuthPage = () => {
  const [isMockModeActive, setIsMockModeActive] = useState<boolean>(false);

  useEffect(() => {
    // Sadece istemci tarafında: Çerezden ilk mock modunu oku
    setIsMockModeActive(getMockModeClient());
  }, []);

  const handleMockModeChange = (checked: boolean) => {
    setMockModeClient(checked); // Çerezi güncelle ve sayfayı yenile
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {process.env.NODE_ENV === 'development' && ( // Sadece geliştirme ortamında switch'i göster
        <div className="p-4 bg-white rounded-lg shadow-md mb-4 flex items-center space-x-2">
          <Checkbox
            id="mock-mode-switch"
            checked={isMockModeActive}
            onCheckedChange={(checked) => handleMockModeChange(checked as boolean)}
          />
          <Label htmlFor="mock-mode-switch">Mock Modu Aktif Et (MSW)</Label>
        </div>
      )}
      <LoginForm />
    </div>
  );
};

export default AuthPage;