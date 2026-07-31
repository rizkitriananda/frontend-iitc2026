import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import type { ApiErrorResponse } from "@/types/index";

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = forgotPasswordSchema.safeParse(body);
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
    // CATATAN: endpoint ini ditandai "tbf (to be fix)" oleh backend di
    // dokumentasi Postman — kemungkinan besar masih ada bug di sisi Laravel
    // (mis. shape response belum final, atau logic kirim email belum jalan).
    // Kalau nanti perilakunya berubah (misal butuh field tambahan atau
    // response-nya beda), sesuaikan di sini dan di forgotPasswordSchema.
    const form = new FormData();
    form.append("email", parsed.data.email);

    const { data } = await laravelApi.post("/forgot-password", form);

    return NextResponse.json({
      message:
        data?.message ?? "Tautan reset password telah dikirim ke email Anda",
    });
  } catch (error) {
    console.error("[POST /api/auth/forgot-password] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 422
          ? "Email tidak ditemukan"
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
