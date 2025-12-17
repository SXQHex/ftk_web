// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // src/auth.ts dosyanızın doğru yolu

// Next.js App Router, GET ve POST metotlarını bu şekilde dışa aktarmanızı bekler.
export const { GET, POST } = handlers;

// handlers objesi içinde diğer metotlar (örneğin DELETE, PUT vb.) varsa,
// onları da ihtiyaca göre dışa aktarabilirsiniz.
// export const { GET, POST, PUT, DELETE, PATCH } = handlers;

// Not: Next.js App Router'da, aynı dosyada 'NextResponse' gibi farklı API logic'leri
// veya 'use client' direktifleri karıştırılmamalıdır.
// Bu dosya yalnızca NextAuth.js handler'larını dışa aktarmalıdır.
// Eğer login için özel bir API endpoint'iniz varsa, bu ayrı bir route dosyası (örn: app/api/login/route.ts) olmalıdır.