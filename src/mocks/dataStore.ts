// /Users/erkinkunbuk/projeler/ftkapp/frontend/apps/ftk_web/src/mocks/dataStore.ts

import USERS_JSON from './data/users.json';
import ROOMS_JSON from './data/rooms.json';
import ENROLLMENTS_JSON from './data/enrollments.json';
import COURSE_DEFINITIONS_JSON from './data/course_definitions.json';
import COURSE_GROUPS_JSON from './data/course_groups.json';
import COURSE_SESSIONS_JSON from './data/course_sessions.json';
import DISCIPLINES_JSON from './data/disciplines.json';
import LEVELS_JSON from './data/levels.json';

// Yeni oluşturulan types.ts dosyasından tipleri import ediyoruz
import {
    User,
    UserRole,
    Room,
    Enrollment,
    CourseDefinition,
    CourseGroup,
    CourseSession,
    Discipline,
    Level,
    AuthResponse,
} from '../types/types'; // types.ts dosyasından import

// --- MOCK ROL TANIMLARI ---
// UserRole tipi artık types.ts'den geldiği için buradaki tanımlar ona uygun.
export const MOCK_ROLES = {
    ADMIN: 'Admin' as UserRole,
    STAFF: 'Staff' as UserRole,
    TRAINER: 'Trainer' as UserRole, // types.ts'deki User role tipine uygun
    ASSISTANT: 'Assistant' as UserRole, // types.ts'deki User role tipine uygun
    MEMBER: 'Member' as UserRole,
    GUEST: 'Guest' as UserRole,
};

// --- Role Dönüşüm Yardımcı Fonksiyonu ---
export const mapBackendRoleToFrontendRole = (role: string): UserRole => {
    switch (role) {
        case 'Admin': return MOCK_ROLES.ADMIN;
        case 'Staff': return MOCK_ROLES.STAFF;
        case 'Instructor': // JSON'dan "Instructor" geliyorsa
        case 'Trainer': return MOCK_ROLES.TRAINER; // "Trainer" olarak eşle
        case 'Assistant': // JSON'dan "Assistant" geliyorsa
        case 'Asistance': return MOCK_ROLES.ASSISTANT; // "Assistant" olarak eşle (yazım hatasını da dikkate alarak)
        case 'Student': return MOCK_ROLES.MEMBER; // JSON'dan "Student" geliyorsa "Member" olarak eşle
        case 'Guest': return MOCK_ROLES.GUEST;
        default: return MOCK_ROLES.MEMBER; // Varsayılan rol
    }
};

// --- TÜM VERİLERİ TANIMLAMA VE DIŞA AKTARMA ---

// USERS_JSON içeriğini User tipine dönüştürüyoruz.
export const ALL_USERS: User[] = (USERS_JSON as any[]).map(user => {
    const userRole = mapBackendRoleToFrontendRole(user.role || user.mock_role_type || MOCK_ROLES.MEMBER);
    return {
        ...user, // USERS_JSON'dan gelen mevcut tüm alanları kopyala
        id: user.id || crypto.randomUUID(),
        email: user.email || `${user.username || 'mockuser'}@example.com`,
        username: user.username || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email?.split('@')[0] || 'unknown',
        role: userRole,
        password: user.password || 'sifre123', // Mock doğrulama için varsayılan parola
        // is_staff otomatik değerdir ve eğer rol admin, staff yada trainer ise true olur
        is_staff: userRole === MOCK_ROLES.ADMIN || userRole === MOCK_ROLES.STAFF || userRole === MOCK_ROLES.TRAINER,
        is_superuser: user.is_superuser !== undefined ? user.is_superuser : false,
        is_active: user.is_active !== undefined ? user.is_active : true,
        mock_role_type: user.mock_role_type || userRole,
        date_joined: user.date_joined || new Date().toISOString(),
        last_login: user.last_login || new Date().toISOString(),
    };
}) as User[]; // TypeScript'e son tipin User[] olduğunu bildiriyoruz

// Diğer veriler basitçe dışa aktarılır ve uygun tiplere cast edilir
export const ALL_ROOMS: Room[] = ROOMS_JSON as Room[];
export const ALL_ENROLLMENTS: Enrollment[] = ENROLLMENTS_JSON as Enrollment[];
export const ALL_COURSE_DEFINITIONS: CourseDefinition[] = COURSE_DEFINITIONS_JSON as CourseDefinition[];
export const ALL_COURSE_GROUPS: CourseGroup[] = COURSE_GROUPS_JSON as CourseGroup[];
export const ALL_COURSE_SESSIONS: CourseSession[] = COURSE_SESSIONS_JSON as CourseSession[];
export const ALL_DISCIPLINES: Discipline[] = DISCIPLINES_JSON as Discipline[];
export const ALL_LEVELS: Level[] = LEVELS_JSON as Level[];

// --- MOCK LOGIN RESPONSE (örnek) ---
export const MOCK_LOGIN_RESPONSE: AuthResponse = {
    access: "mock_access_token_default",
    refresh: "mock_refresh_token_default",
    role: MOCK_ROLES.ADMIN,
    user_id: ALL_USERS.find(u => u.username === 'admin')?.id || 'mock-admin-id',
    username: 'admin',
};

// Tüm mock verilerini içeren genel bir dataStore nesnesi
export const dataStore = {
    users: ALL_USERS,
    rooms: ALL_ROOMS,
    enrollments: ALL_ENROLLMENTS,
    courseDefinitions: ALL_COURSE_DEFINITIONS,
    courseGroups: ALL_COURSE_GROUPS,
    courseSessions: ALL_COURSE_SESSIONS,
    disciplines: ALL_DISCIPLINES,
    levels: ALL_LEVELS,
    loginResponse: MOCK_LOGIN_RESPONSE,
};