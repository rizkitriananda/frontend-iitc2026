import { LucideIcon } from "lucide-react";
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DeadlineCardProps {
  title: string;
  startDate: string | Date; // Kapan pendaftaran/event dimulai
  targetDate: string | Date; // Kapan batas akhirnya
  label?: string;
}

// timeline
export type MarkerShape = "diamond" | "circle" | "filled";
export type BadgeVariant = "blue" | "orange" | "white";

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  icon: LucideIcon;
  markerShape: MarkerShape;
  badgeVariant: BadgeVariant;
  align: "left" | "right";
}
export interface CompetitionCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (competition: Competition) => void;
}

export interface PromoBannerProps {
  onIkutiLombaClick?: () => void;
}

export interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (teamName: string) => void;
}

export interface ActiveTeamDashboardProps {
  teamName: string;
  role: "leader" | "member";
  onLeaveTeam: () => void;
}

export interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}

export interface LeaveTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}

// Bentuk response ASLI dari Laravel (dikonfirmasi dari Postman docs).
export interface LaravelLoginResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    email_verified_at: string | null;
    [key: string]: unknown; // jaga-jaga kalau backend nambah field lain nanti
  };
}

// Bentuk response yang dibalikin Route Handler Next.js ke client.
// Sengaja TIDAK menyertakan access_token — token cuma hidup di cookie httpOnly.
export interface LoginResponse {
  message: string;
  emailVerifiedAt: string | null;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>; // format error validasi khas Laravel
}

// Bentuk response ASLI dari Laravel (dikonfirmasi dari Postman docs).
export interface LaravelLoginResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    email_verified_at: string | null;
    [key: string]: unknown; // jaga-jaga kalau backend nambah field lain nanti
  };
}

// Bentuk response yang dibalikin Route Handler Next.js ke client.
// Sengaja TIDAK menyertakan access_token — token cuma hidup di cookie httpOnly.
export interface LoginResponse {
  message: string;
  emailVerifiedAt: string | null;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>; // format error validasi khas Laravel
}

// Bentuk response ASLI dari Laravel untuk /api/register.
export interface LaravelRegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      [key: string]: unknown;
    };
  };
}

// Response yang dibalikin Route Handler Next.js ke client.
// Register TIDAK mengembalikan access_token (beda dgn login), jadi tidak ada
// cookie yang di-set di sini — user tetap harus login manual setelah daftar.
export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface Competition {
  slug: string;
  name: string;
  cover: string;
  maxMembers: number;
  competitionPrice?: number | null; // belum terkonfirmasi ada di response
  description?: string | null; // belum terkonfirmasi ada di response
  guidebookLink?: string | null;
  deadline?: string | null;
}

export interface CompetitionsApiResponse {
  success: boolean;
  message: string;
  data: {
    competitions: Competition[];
  };
}

export interface GetCompetitionsResponse {
  success: boolean;
  message: string;
  data: {
    competitions: Competition[];
  };
}

export interface Team {
  id: number;
  code: string;
  name: string;
}

export interface JoinCompetitionResponse {
  status: number;
  message: string;
  data: {
    team: Team;
  };
}

export interface UploadPaymentResponse {
  success: boolean;
  message: string;
  data: {
    team: {
      teamId: number;
    };
    payment: {
      team_id: number;
      transfer_receipt: string;
      updated_at: string;
      created_at: string;
    };
  };
}

export interface UpdateTeamInput {
  name: string; // Required dari Laravel
  title: string; // Required dari Laravel
  submission?: string; // Optional (Link GDrive)
  avatar?: File | null; // Optional
}

//profile
export interface UserProfile {
  user?: {
    id: string | number;
    name: string;
    email: string;
    phone?: string;
  };
  // Atau jika struktur API mengembalikan field langsung tanpa pembungkus 'user':
  email?: string;
  name?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile; // Sesuaikan dengan struktur JSON dari Laravel
}

// seminar
export interface SeminarItem {
  id: number;
  title: string;
  description: string | null;
  speaker: string;
  dateTime: string;
  startDate: string;
  endDate: string;
  location: string;
  registrationLink: string;
  posterUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface GetSeminarsResponse {
  success: boolean;
  message: string;
  data: {
    seminars: SeminarItem[];
  };
}

// sponsor
export interface Sponsor {
  id: number;
  name: string;
  tier: string;
  image: string;
  createdAt: string;
}

export interface GetSponsorsResponse {
  success: boolean;
  message: string;
  data: {
    sponsors: Sponsor[];
  };
}
