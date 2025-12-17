// /Users/erkinkunbuk/projeler/ftkapp/frontend/apps/ftk_web/src/mocks/types.ts

// Kullanıcı Rolleri Tanımları
export type UserRole = 'Admin' | 'Staff' | 'Trainer' | 'Assistant' | 'Member' | 'Guest' | string;

// --- Disiplin / Branş Tanımı ---
export interface Discipline {
  id: string; // UUID
  name: string; // Örn: "Salsa", "Bale"
  description: string;
}

// --- Seviye Tanımı ---
export interface Level {
  id: string; // UUID
  name: string; // Örn: "Yeni Başlayan", "İleri Seviye"
  order: number; // Sıralama önceliği
}

// --- Kurs Ana Tanımı ---
export interface CourseDefinition {
  id: string;
  title: string;
  description: string;
  discipline_id: string; // Discipline.id ile ilişkili
  level_id: string;      // Level.id ile ilişkili
}

// --- Kurs Grubu (Dönemlik/Sınıf Bazlı) ---
export interface CourseGroup {
  id: string;
  definition_id: string; // CourseDefinition.id ile ilişkili
  group_name: string;    // Örn: "Salsa - İleri Seviye Grubu 1"
  status: 'Active' | 'Planned' | string;
  start_date: string;    // YYYY-MM-DD
  end_date: string;      // YYYY-MM-DD
  capacity: number;
  price: string;         // JSON'da string formatında ("925.17")
  instructor_id: string; // User.id ile ilişkili
}

// --- Kurs Oturumu (Bireysel Dersler) ---
export interface CourseSession {
  id: string;
  course_group_id: string; // CourseGroup.id ile ilişkili
  session_date: string;    // YYYY-MM-DD
  start_datetime: string;  // ISO 8601 (2026-04-16T17:00:00.000Z)
  end_datetime: string;    // ISO 8601
  is_completed: boolean;
  room_id: string;         // Room.id ile ilişkili
}

// --- Oda / Salon Bilgisi ---
export interface Room {
  id: string;
  name: string; // Örn: "Ana Stüdyo A"
  capacity: number;
}

// --- Kullanıcı Bilgisi ---
export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string; // JSON'dan gelen bazı değerler boş/null olabilir
  last_name?: string;  // JSON'dan gelen bazı değerler boş/null olabilir
  role: UserRole; // Yukarıdaki UserRole tipini kullan
  is_staff: boolean; // Bu alan role göre otomatik belirlenecek
  is_superuser: boolean;
  is_active: boolean;
  mock_role_type: string;
  date_joined: string; // ISO 8601
  last_login: string;  // ISO 8601
  password: string; // Mock doğrulama için parola alanı, 'sifre123' yerine string
}

// --- Kayıtlar (Enrollment) ---
export interface Enrollment {
  id: string;
  user_id: string;           // User.id ile ilişkili
  course_session_id: string; // CourseSession.id ile ilişkili
  membership_id: string | null;
  status: 'Enrolled' | string;
  enrolled_at: string;       // ISO 8601
}

/**
 * Yardımlı Tipler (İlişkisel Veriler için)
 * Frontend tarafında verileri birleştirerek (populate/join) kullanacaksanız
 * aşağıdaki gibi genişletilmiş tipler oluşturabilirsiniz.
 */

export interface CourseGroupWithDetails extends CourseGroup {
  definition?: CourseDefinition;
  instructor?: User;
}

export interface CourseSessionWithDetails extends CourseSession {
  room?: Room;
  group?: CourseGroup;
}

// AuthResponse Arayüzü (mock login response için)
export interface AuthResponse {
    access: string;
    refresh: string;
    role: UserRole; // UserRole tipini kullan
    user_id: string;
    username: string;
}