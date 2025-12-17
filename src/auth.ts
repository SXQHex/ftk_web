// src/auth.ts
  // ... mevcut import'lar
  import NextAuth from "next-auth";
  import Google from "next-auth/providers/google";
  import Credentials from "next-auth/providers/credentials";
  import { LoginSchema } from "./lib/auth.schema";

  // NEXT_PUBLIC_API_MOCKING kontrolü ve MSW server başlatma kodu buradan kaldırıldı.
  // Bu mantık, uygulamanızın genel başlangıç noktasında veya MSW yapılandırma dosyasında
  // (örn: src/mocks/node.ts) ele alınmalıdır.


  export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      Google,
      Credentials({
        // `credentials` alanı, LoginForm'dan hangi verilerin geleceğini belirler.
        // `mockMode` tanımı buradan kaldırıldı.
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          // Zod şeması ile gelen verileri doğrula
          const isValid = LoginSchema.safeParse(credentials);
          if (!isValid.success) {
            throw new Error("Geçersiz giriş bilgileri.");
          }

          const { email, password } = isValid.data; // mockMode kaldırıldı

          // NextAuth Credentials sağlayıcısı, login için bir API endpoint'ine istek gönderecek.
          const authEndpoint = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/login`;

          const headers: Record<string, string> = {
            "Content-Type": "application/json",
          };

          // `mockMode` kontrolü ve 'X-Mock-Mode' başlığı ekleme mantığı buradan kaldırıldı.
          // MSW'nin manuel olarak tetiklenmesi gerekiyorsa, bunu doğrudan client-side fetch isteğinde
          // veya MSW'nin kendi interceptor mantığı içinde yönetmelisiniz.

          try {
            const response = await fetch(authEndpoint, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("API kimlik doğrulama başarısız:", errorData.message || response.statusText);
              throw new Error(errorData.message || "Kimlik doğrulama başarısız.");
            }

            const userData = await response.json();

            // Genişletilmiş User tipine uyan bir obje döndürüyoruz.
            return {
              id: userData.id,
              email: userData.email,
              name: userData.username || userData.email,
              role: userData.role,
            };

          } catch (error) {
            console.error("Giriş sırasında bir hata oluştu:", error);
            throw new Error(error instanceof Error ? error.message : "Giriş başarısız oldu.");
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          if (user.role) {
            token.role = user.role;
          }
        }
        return token;
      },
      async session({ session, token }) {
        if (token.id) {
          session.user.id = token.id;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        return session;
      },
    },
  });