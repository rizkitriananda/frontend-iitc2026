export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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

export type { ActiveTeamDashboardProps, TeamDetail, TeamMember, TeamLeader, TeamCompetition, GetTeamDetailResponse } from "./team-type";

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
  price?: number | null; // belum terkonfirmasi ada di response
  description?: string | null; // belum terkonfirmasi ada di response
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
