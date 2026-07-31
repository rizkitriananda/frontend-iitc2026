import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import { joinTeamSchema } from "@/lib/schemas/team.schema";
import type {
  ApiErrorResponse,
  JoinTeamAsMemberResponse,
} from "@/types/team-type";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      { message: "Sesi Anda telah berakhir, silakan login ulang" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const parsed = joinTeamSchema.safeParse(body);
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
    const form = new FormData();
    form.append("code", parsed.data.code);

    const { data } = await laravelApi.put<JoinTeamAsMemberResponse>(
      "/teams/join",
      form,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("[PUT /api/teams/join] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 404
          ? "Kode tim tidak ditemukan"
          : status === 422
            ? "Kode tim tidak valid"
            : status === 409
              ? "Anda sudah tergabung dalam tim lain"
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
