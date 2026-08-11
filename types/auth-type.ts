export interface LaravelLoginResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    email_verified_at: string | null;
    [key: string]: unknown;
  };
}

export interface LoginResponse {
  message: string;
  emailVerifiedAt: string | null;
}

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

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}
