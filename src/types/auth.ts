// src/types/auth.ts
import { UserRole } from "./common";
import "next-auth"; // next-auth modülünü global olarak tanınması için import ediyoruz
import "next-auth/jwt"; // next-auth/jwt modülünü global olarak tanınması için import ediyoruz

/**
 * Başarılı bir kimlik doğrulama sonrası dönen yanıt yapısı.
 * Access/Refresh token ve kullanıcı bilgileri içerir.
 */
export interface AuthResponse {
  access: string;
  refresh: string;
  role: UserRole; // Kullanıcının rolü
  user_id: string; // Kullanıcı kimliği
  username: string; // Kullanıcı adı
}

// NextAuth'un kendi tiplerini genişleterek `role` özelliğini ekleyebiliriz
declare module "next-auth" {
  /**
   * NextAuth'un varsayılan User interface'ini genişletir.
   * Bu arayüz, 'next-auth' modülündeki mevcut User arayüzüyle birleştirilir.
   */
  interface User {
    id: string; // User tipinde 'id'nin string olduğunu garanti ediyoruz.
    role?: string; // Özel 'role' özelliğini ekliyoruz.
  }

  /**
   * NextAuth'un varsayılan Session interface'ini genişletir.
   * Session içindeki 'user' özelliği artık genişletilmiş 'User' tipimize uyacaktır.
   */
  interface Session {
    user: User; // Genişletilmiş User tipimizi referans alıyoruz.
  }
}

// 'next-auth/jwt' modülü için tip genişletmeleri (JWT token yapısı için)
// Bu arayüz, 'next-auth/jwt' modülündeki mevcut JWT arayüzüyle birleştirilir.
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // JWT token üzerinde 'id'nin bulunduğunu garanti ediyoruz.
    role?: string; // JWT token'a özel 'role' özelliğini ekliyoruz.
  }
}