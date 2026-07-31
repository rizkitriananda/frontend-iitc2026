import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import { loginSchema } from "@/lib/schemas/auth.schema";
import type {
  ApiErrorResponse,
  LaravelLoginResponse,
  LoginResponse,
} from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST(request: Request) {
  const body = await request.json();

  // Validasi ulang di server (jangan cuma percaya validasi client)
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiErrorResponse>(
      {
        message: "Data tidak valid",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    );
  }

  try {
    // Laravel-nya menerima multipart/form-data (bukan JSON) — lihat --form
    // di contoh curl Postman docs. Kalau dikirim sebagai JSON biasa,
    // Laravel akan gagal parsing field email/password-nya.
    const form = new FormData();
    form.append("email", parsed.data.email);
    form.append("password", parsed.data.password);

    const { data } = await laravelApi.post<LaravelLoginResponse>(
      "/login",
      form,
    );

    const response = NextResponse.json<LoginResponse>({
      message: data.message,
      emailVerifiedAt: data.data.email_verified_at,
    });

    response.cookies.set(AUTH_COOKIE_NAME, data.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari — sesuaikan dgn masa berlaku token Sanctum di Laravel
    });

    return response;
  } catch (error) {
    // DEBUG SEMENTARA: supaya error aslinya kelihatan di terminal npm run dev
    console.error("[POST /api/auth/login] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 401 || status === 422
          ? "Email atau password salah"
          : "Terjadi kesalahan, coba lagi");

      return NextResponse.json<ApiErrorResponse>(
        { message, errors: error.response?.data?.errors },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
