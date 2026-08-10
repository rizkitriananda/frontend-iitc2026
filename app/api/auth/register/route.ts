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
  const normalizedPhone = `0${phone.replace(/^0+/, "")}`;

  try {
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
