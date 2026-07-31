import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type {
  ApiErrorResponse,
  GetMyCompetitionsResponse,
} from "@/types/team-type";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      { message: "Sesi Anda telah berakhir, silakan login ulang" },
      { status: 401 },
    );
  }

  try {
    const { data } = await laravelApi.get<GetMyCompetitionsResponse>(
      "/competitions/mine",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/competitions/mine] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      return NextResponse.json<ApiErrorResponse>(
        { message: error.response?.data?.message ?? "Gagal memuat data tim" },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
