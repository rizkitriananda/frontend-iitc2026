import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function DELETE(request: NextRequest) {
  // 1. Ambil token dari cookie httpOnly
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Silakan login kembali." },
      { status: 401 },
    );
  }

  try {
    // 2. Teruskan request DELETE ke backend Laravel
    const { data } = await laravelApi.delete("/teams/mine/leave", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/teams/mine/leave] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        "Terjadi kesalahan saat keluar dari tim";

      return NextResponse.json<ApiErrorResponse>(
        { message, errors: error.response?.data?.errors },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan internal server" },
      { status: 500 },
    );
  }
}
