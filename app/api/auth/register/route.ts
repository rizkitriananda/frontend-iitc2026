import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import { registerSchema } from "@/lib/schemas/auth.schema";
import type {
  ApiErrorResponse,
  LaravelRegisterResponse,
  RegisterResponse,
} from "@/types/index";

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiErrorResponse>(
      {
        message: "Data tidak valid",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    );
  }

  const { fullName, email, phone, password } = parsed.data;

  // Contoh di Postman docs pakai format "08112222333" (awalan 0, tanpa +62),
  // sedangkan form di UI cuma minta digit setelah +62 (mis. "812xxxxxxx").
  // Jadi di sini digit depan di-normalisasi jadi awalan "0" sebelum dikirim.
  // TODO: kalau ternyata Laravel-nya mau format "+62..." atau "62...", ganti baris ini.
  const normalizedPhone = `0${phone.replace(/^0+/, "")}`;

  try {
    // Laravel menerima multipart/form-data (lihat --form di curl Postman docs),
    // bukan JSON — dan tidak butuh confirmPassword.
    const form = new FormData();
    form.append("fullName", fullName);
    form.append("email", email);
    form.append("password", password);
    form.append("phone", normalizedPhone);

    const { data } = await laravelApi.post<LaravelRegisterResponse>(
      "/register",
      form,
    );

    return NextResponse.json<RegisterResponse>(
      {
        message: data.message,
        user: {
          id: data.data.user.id,
          fullName: data.data.user.fullName,
          email: data.data.user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // DEBUG SEMENTARA: supaya error aslinya kelihatan di terminal npm run dev
    console.error("[POST /api/auth/register] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 422
          ? "Data tidak valid atau email sudah terdaftar"
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
