import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import { updateSubmissionSchema } from "@/lib/schemas/submission.schema";
import type { ApiErrorResponse, UpdateSubmissionResponse } from "@/types/submission-type";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      { message: "Sesi Anda telah berakhir, silakan login ulang" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const parsed = updateSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json<ApiErrorResponse>(
      {
        message: "Tautan karya tidak valid",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    );
  }

  try {
    const form = new FormData();
    form.append("submission", parsed.data.submission);

    const { data } = await laravelApi.post<UpdateSubmissionResponse>(
      "/teams/mine/submission",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json<UpdateSubmissionResponse>({
      message: data.message ?? "Tautan karya berhasil diperbarui",
      data: data.data,
    });
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      return NextResponse.json<ApiErrorResponse>(
        {
          message:
            error.response?.data?.message ?? "Gagal mengunggah tautan karya",
          errors: error.response?.data?.errors,
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
