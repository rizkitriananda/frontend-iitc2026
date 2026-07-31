import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST() {
  // Ambil token dari cookie httpOnly. Ini server-side, jadi httpOnly TIDAK
  // menghalangi kita membacanya di sini (beda dengan document.cookie di browser).
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  // Kalau memang sudah tidak ada token, anggap saja sudah "logout".
  // Tetap hapus cookie (jaga-jaga ada sisa cookie basi) dan balas sukses,
  // supaya UI tidak nyangkut kalau state client & cookie sempat tidak sinkron.
  if (!token) {
    const response = NextResponse.json({ message: "Sudah logout" });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  try {
    // Laravel Sanctum: endpoint terproteksi butuh Authorization: Bearer <token>.
    // Ini beda dengan /login yang public, makanya baru di sini header ini
    // pertama kali benar-benar dibutuhkan.
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

    // PENTING: walaupun Laravel gagal (mis. token sudah expired/revoked di
    // sisi server), kita TETAP hapus cookie di browser. Kalau tidak, user
    // bisa "terjebak" logged-in secara UI padahal token-nya sudah mati di
    // Laravel — klik logout tapi middleware masih nganggep dia login karena
    // cookie belum kehapus.
    const response = NextResponse.json<ApiErrorResponse>(
      {
        message: isAxiosError<ApiErrorResponse>(error)
          ? (error.response?.data?.message ??
            "Gagal logout di server, tapi sesi lokal tetap dihapus")
          : "Terjadi kesalahan, tapi sesi lokal tetap dihapus",
      },
      { status: 200 }, // tetap 200 karena dari sudut pandang user, logout "berhasil"
    );
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }
}
