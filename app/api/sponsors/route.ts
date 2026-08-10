import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse, GetSponsorsResponse } from "@/types/index";

export async function GET() {
  try {
    const { data } = await laravelApi.get<GetSponsorsResponse>("/sponsors");
    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/sponsors] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      return NextResponse.json<ApiErrorResponse>(
        {
          message: error.response?.data?.message ?? "Gagal memuat data sponsor",
        },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
