import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type {
  ApiErrorResponse,
  GetProfileResponse,
  LaravelProfileResponse,
  UpdateProfileResponse,
} from "@/types/profile-type";

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
    const { data } = await laravelApi.get<GetProfileResponse>("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      return NextResponse.json<ApiErrorResponse>(
        { message: error.response?.data?.message ?? "Gagal mengambil data profil" },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      { message: "Sesi Anda telah berakhir, silakan login ulang" },
      { status: 401 },
    );
  }

  try {
    const incomingFormData = await request.formData();

    const fullName = (incomingFormData.get("fullName") ?? incomingFormData.get("name")) as string;
    const grade = incomingFormData.get("grade") as string;
    const institution = incomingFormData.get("institution") as string;
    const studentIdNumber = incomingFormData.get("student_id_number") as string;
    const gender = incomingFormData.get("gender") as string;
    const phone = incomingFormData.get("phone") as string;
    const avatar = incomingFormData.get("avatar") ?? incomingFormData.get("photo_identity");
    const twibbon = incomingFormData.get("twibbon");

    const form = new FormData();
    if (fullName) {
      form.append("fullName", fullName);
      form.append("name", fullName);
    }
    if (grade) form.append("grade", grade);
    if (institution) form.append("institution", institution);
    if (studentIdNumber) form.append("student_id_number", studentIdNumber);
    if (gender) form.append("gender", gender);
    if (phone) form.append("phone", phone);

    if (avatar && avatar instanceof File) {
      form.append("avatar", avatar);
      form.append("photo_identity", avatar);
    }

    if (twibbon && twibbon instanceof File) {
      form.append("twibbon", twibbon);
    }

    const { data } = await laravelApi.post<LaravelProfileResponse>(
      "/profile",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json<UpdateProfileResponse>({
      message: data.message ?? "Profil berhasil diperbarui",
      user: data.data?.user ?? data.data?.profile,
    });
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 422
          ? "Data profil tidak valid"
          : status === 401
            ? "Sesi Anda telah berakhir, silakan login ulang"
            : "Terjadi kesalahan saat memperbarui profil");

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
