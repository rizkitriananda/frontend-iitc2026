// app/api/seminars/route.ts
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

export async function GET() {
  try {
    const { data } = await laravelApi.get("/seminars");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET /api/seminars] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ?? "Gagal mengambil data seminar";

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
