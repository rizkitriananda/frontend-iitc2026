import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse, GetCompetitionsResponse } from "@/types/index";

export async function GET() {
  try {
    // Endpoint ini public (gak butuh Authorization header) berdasarkan
    // dokumentasi Postman — tidak ada indikasi butuh Bearer token seperti
    // /logout. Kalau nanti ternyata Laravel-nya minta auth juga, tinggal
    // tambahkan header di sini seperti pola di /api/auth/logout.
    const { data } =
      await laravelApi.get<GetCompetitionsResponse>("/competitions");

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/competitions] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      return NextResponse.json<ApiErrorResponse>(
        { message: error.response?.data?.message ?? "Gagal memuat data lomba" },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
