import axios from "axios";

// /**
//  * Instance ini HANYA boleh dipakai di kode yang jalan di server:
//  * Route Handler (app/api/**/route.ts), Server Component, atau middleware.
//  * Jangan pernah di-import dari file "use client".
//  *
//  * Catatan: Content-Type SENGAJA tidak di-hardcode ke application/json di
//  * sini, karena beberapa endpoint Laravel (mis. /login, /register) menerima
//  * multipart/form-data. Biarkan axios menentukan Content-Type otomatis
//  * berdasarkan tipe data yang dikirim per-request (FormData -> multipart,
//  * object biasa -> application/json).
//  */
if (!process.env.LARAVEL_API_URL) {
  // Gagal cepat dengan pesan jelas, daripada axios lempar "Invalid URL"
  // yang membingungkan saat baseURL ternyata undefined.
  throw new Error(
    "LARAVEL_API_URL belum di-set. Cek file .env.local di root project, " +
      "lalu restart `npm run dev` (env var baru butuh restart penuh, " +
      "hot-reload saja tidak cukup).",
  );
}

export const laravelApi = axios.create({
  baseURL: process.env.LARAVEL_API_URL,
  headers: {
    Accept: "application/json",
  },
});
