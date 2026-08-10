import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      {
        message: "Unauthorized. Sesi Anda telah habis, silakan login kembali.",
      },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("proveOfPayment");

    if (!file) {
      return NextResponse.json<ApiErrorResponse>(
        {
          message: "Data tidak valid",
          errors: { proveOfPayment: ["File bukti pembayaran wajib diunggah"] },
        },
        { status: 422 },
      );
    }

    const form = new FormData();
    form.append("proveOfPayment", file);

    const { data } = await laravelApi.post("/payment/mine", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[POST /api/payment/mine] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 422
          ? "Format file tidak valid atau terlalu besar"
          : "Terjadi kesalahan saat mengunggah bukti pembayaran, coba lagi");

      return NextResponse.json<ApiErrorResponse>(
        { message, errors: error.response?.data?.errors },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan internal pada server Next.js" },
      { status: 500 },
    );
  }
}
