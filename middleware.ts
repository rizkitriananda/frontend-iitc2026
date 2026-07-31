import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Nama cookie httpOnly yang menyimpan access token.
// Cookie ini HARUS di-set dari server (route handler / server action) dengan opsi:
//   response.cookies.set("token", accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24, // sesuaikan dengan masa berlaku token
//   });
// httpOnly membuat cookie ini TIDAK BISA diakses lewat document.cookie di browser
// (mencegah XSS mencuri token), tapi tetap otomatis terkirim ke server pada
// setiap request dan tetap bisa dibaca di sini oleh middleware (server-side).
const TOKEN_COOKIE_NAME = "token";

// Rute autentikasi: HARUS exact match ke path pertama, bukan startsWith biasa,
// supaya "/login-promo" atau "/register-info" tidak ikut ke-treat sebagai auth route.
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

// Rute terproteksi: mencakup /dashboard dan semua sub-route-nya
// (/dashboard/payment, /dashboard/profile, /dashboard/seminar, dst).
const PROTECTED_ROUTE_PREFIX = "/dashboard";

function matchesExactRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * PENTING — kenapa ini TIDAK lagi decode token sebagai JWT:
 *
 * Laravel Sanctum tidak menerbitkan JWT. Token dari Sanctum berformat
 * opaque seperti "1|LlKr3poWmH8...random string..." — TIDAK punya
 * struktur header.payload.signature seperti JWT. Kalau token ini dilempar
 * ke `decodeJwt` (dari package `jose`), fungsi itu akan selalu throw
 * error karena formatnya tidak sesuai, sehingga token yang sebenarnya
 * VALID akan selalu dianggap invalid oleh middleware — inilah yang
 * menyebabkan bug "login sukses tapi tetap ke-redirect balik ke /login".
 *
 * Middleware di edge runtime TIDAK PUNYA cara untuk verifikasi keaslian/
 * masa berlaku token Sanctum secara mandiri — itu cuma bisa dicek oleh
 * Laravel sendiri (lewat tabel personal_access_tokens & kolom
 * expires_at/last_used_at). Jadi middleware di sini hanya bertugas
 * sebagai "penjaga kasar": cek APAKAH cookie token itu ada atau tidak.
 *
 * Validasi "beneran" (token expired/revoked di sisi Laravel) tetap
 * ditangani di dua tempat lain:
 *   1. Interceptor axios di sisi client (lib/api/axios.ts) — kalau
 *      Laravel balas 401, redirect ke /login.
 *   2. (Opsional, lebih kuat) Server Component di app/dashboard/layout.tsx
 *      melakukan fetch ke endpoint /me / /user ke Laravel sebelum render;
 *      kalau gagal, redirect ke /login dari server component.
 */
function isTokenUsable(token: string | undefined): boolean {
  return Boolean(token && token.trim().length > 0);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const hasValidToken = isTokenUsable(token);

  const isAuthRoute = matchesExactRoute(pathname, AUTH_ROUTES);
  const isProtectedRoute =
    pathname === PROTECTED_ROUTE_PREFIX ||
    pathname.startsWith(`${PROTECTED_ROUTE_PREFIX}/`);

  // KONDISI A: belum login (cookie token tidak ada / kosong) tapi mengakses /dashboard/*
  if (isProtectedRoute && !hasValidToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // KONDISI B: sudah login (cookie token ada) tapi mencoba akses /login, /register, /forgot-password
  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configuration Matcher untuk Performa
export const config = {
  matcher: [
    /*
     * Jalankan middleware pada semua request KECUALI:
     * - api (Endpoint API)
     * - _next/static (File statis Next.js)
     * - _next/image (File optimasi gambar)
     * - favicon.ico, globals.css, dan aset publik (png, jpg, svg, webp)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
