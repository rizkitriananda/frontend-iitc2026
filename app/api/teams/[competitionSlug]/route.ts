import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import { createTeamSchema } from "@/lib/schemas/team.schema";
import type { ApiErrorResponse, JoinCompetitionResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ competitionSlug: string }> },
) {
  const { competitionSlug } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  // Aksi ini bikin data baru (team) yang terikat ke user yang login, jadi
  // WAJIB ada token. Kalau tidak ada, middleware harusnya sudah mencegah
  // user sampai ke /dashboard sama sekali — tapi ini jaga-jaga kalau
  // Route Handler dipanggil langsung (mis. cookie expired di antara render
  // halaman dan submit form).
  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      { message: "Sesi Anda telah berakhir, silakan login ulang" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const parsed = createTeamSchema.safeParse(body);
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
    // Laravel-nya nerima multipart/form-data (lihat --form di curl docs),
    // sama seperti pola /login.
    const form = new FormData();
    form.append("name", parsed.data.name);

    const { data } = await laravelApi.post<JoinCompetitionResponse>(
      `/teams/${competitionSlug}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(`[POST /api/teams/${competitionSlug}] error:`, error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 422
          ? "Data tim tidak valid"
          : status === 401
            ? "Sesi Anda telah berakhir, silakan login ulang"
            : status === 409
              ? "Anda sudah terdaftar di lomba ini"
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
