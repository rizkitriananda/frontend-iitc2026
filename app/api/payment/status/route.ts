import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { laravelApi } from "@/lib/api/laravel-server";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await laravelApi.get("/payment/mine/status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: "Gagal mengambil status" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
