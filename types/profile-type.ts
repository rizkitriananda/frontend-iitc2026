export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string | null;
  phone?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileDetail {
  grade?: string;
  institution?: string;
  student_id_number?: string | null;
  gender?: string;
  user_id?: string;
  updated_at?: string;
  created_at?: string;
}

// Digunakan di Payment Page / Dashboard
export interface ExtendedProfileUser {
  name?: string;
  email?: string;
  phone?: string;
  participant?: ProfileDetail & {
    institution?: string;
    gender?: string;
    twibbon?: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: ProfileUser;
    detail: ProfileDetail;
  };
}
