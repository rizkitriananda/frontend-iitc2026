import type { ApiErrorResponse } from "./index";

export type GenderType = "male" | "female" | "Laki-laki" | "Perempuan";

export interface Participant {
  user_id?: string;
  grade?: string | null;
  gender?: string | null;
  student_id_number?: string | null;
  institution?: string | null;
  avatar?: string | null;
  photo_identity?: string | null;
  twibbon?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string | null;
  phone?: string | number | null;
  created_at?: string;
  updated_at?: string;
  participant?: Participant | null;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: UserDetail;
  };
}

export interface UserProfile {
  id?: string | number;
  fullName: string;
  grade: string;
  institution: string;
  student_id_number: string;
  gender: string;
  phone: string;
  avatar?: string | null;
  twibbon?: string | null;
}

export interface UpdateProfileInput {
  fullName: string;
  grade: string;
  institution: string;
  student_id_number: string;
  gender: string;
  phone: string;
  avatar?: File | null;
  twibbon?: File | null;
}

export interface LaravelProfileResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data?: {
    user?: UserDetail | UserProfile;
    profile?: UserDetail | UserProfile;
    [key: string]: unknown;
  };
}

export interface UpdateProfileResponse {
  message: string;
  user?: UserDetail | UserProfile;
}

export type { ApiErrorResponse };
