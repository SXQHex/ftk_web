// /Users/erkinkunbuk/projeler/ftkapp/frontend/apps/ftk_web/src/mocks/handlers.ts

import { http, HttpResponse } from 'msw';
import { LoginSchema, RegisterSchema } from '../lib/auth.schema';
import { ALL_USERS, MOCK_ROLES } from './dataStore';
import { User, UserRole } from '../types/types';

// Mock service worker'ın aktif olup olmadığını belirleyen bir değişken.
const mockMode = true;

export const handlers = [
  // Login API mock'u
  http.post(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/login`, async ({ request }) => {
    if (!mockMode || request.headers.get('X-Mock-Mode') !== 'true') {
      // TypeScript hatasını çözmek için 'request' objesi 'any' tipine dönüştürüldü
      return (request as any).passthrough();
    }

    const requestBody = await request.json();
    const validationResult = LoginSchema.safeParse(requestBody);

    if (!validationResult.success) {
      console.error("[MSW Mock Login] Invalid request body:", validationResult.error);
      return HttpResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // ALL_USERS üzerinde arama yapıyoruz (u artık User tipinde olduğu için 'email' ve 'password' erişilebilir)
    const user = ALL_USERS.find((u: User) => u.email === email && u.password === password);

    if (user) {
      // Başarılı giriş
      return HttpResponse.json({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        message: 'Mock login successful',
      }, { status: 200 });
    } else {
      // Hatalı giriş
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  }),

  // Register API mock'u
  http.post(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/register`, async ({ request }) => {
    if (!mockMode || request.headers.get('X-Mock-Mode') !== 'true') {
      // TypeScript hatasını çözmek için 'request' objesi 'any' tipine dönüştürüldü
      return (request as any).passthrough();
    }

    const requestBody = await request.json();
    const validationResult = RegisterSchema.safeParse(requestBody);

    if (!validationResult.success) {
      console.error("[MSW Mock Register] Invalid request body:", validationResult.error);
      return HttpResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // RegisterSchema'dan gelen veriler: name, email, password, confirmPassword
    const { email, password, name } = validationResult.data;

    // Basit bir kayıt mock'u: Eğer kullanıcı zaten varsa hata döndür
    const existingUser = ALL_USERS.some((u: User) => u.email === email);
    if (existingUser) {
        return HttpResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const newUserRole: UserRole = MOCK_ROLES.MEMBER; // Yeni kayıt olan kullanıcılara varsayılan 'Member' rolü verilir.
    // is_staff otomatik değerdir ve eğer rol admin, staff yada trainer ise true olur
    const newIsStaff = newUserRole === MOCK_ROLES.ADMIN || newUserRole === MOCK_ROLES.STAFF || newUserRole === MOCK_ROLES.TRAINER;


    // Başarılı kayıt simülasyonu
    const newUser: User = { // newUser'ı User tipi olarak tanımladık
        id: `mock-user-${ALL_USERS.length + 1}`, // Benzersiz bir ID oluştur
        email,
        username: name, // RegisterSchema'dan gelen 'name'i 'username' olarak kullan
        password,
        role: newUserRole, // Doğru MOCK_ROLES kullanımı
        first_name: name.split(' ')[0] || '',
        last_name: name.split(' ')[1] || '',
        is_staff: newIsStaff, // Rolüne göre is_staff değerini ata
        is_superuser: false,
        is_active: true,
        mock_role_type: newUserRole,
        date_joined: new Date().toISOString(),
        last_login: new Date().toISOString(),
    };
    ALL_USERS.push(newUser); // Mock veri deposuna ekle

    return HttpResponse.json({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        message: 'Mock registration successful',
    }, { status: 201 });
  }),
];