import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const response = NextResponse.json({ message: "Sudah logout" });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  try {
    await laravelApi.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const response = NextResponse.json({ message: "Berhasil logout" });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  } catch (error) {
    console.error("[POST /api/auth/logout] error:", error);

    const response = NextResponse.json<ApiErrorResponse>(
      {
        message: isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ??
            "Gagal logout di server, tapi sesi lokal tetap dihapus")
          : "Terjadi kesalahan, tapi sesi lokal tetap dihapus",
      },
      { status: 200 },
    );
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }
}
