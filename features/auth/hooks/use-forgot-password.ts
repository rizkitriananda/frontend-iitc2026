import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { forgotPassword } from "@/features/auth/api/forgot-password";
import type { ApiErrorResponse } from "@/types/index";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    // Sengaja TIDAK auto-redirect di onSuccess. Beda dengan login/register,
    // forgot-password gak punya "tujuan" halaman berikutnya yang jelas —
    // user cuma perlu tahu untuk cek email-nya. Redirect biar diputuskan
    // di komponen form (misal ganti tampilan jadi pesan sukses).
  });
}

// Helper sama seperti getAuthErrorMessage di use-login.ts.
// Dipisah biar gampang di-reuse tanpa import silang antar hook auth.
export function getForgotPasswordErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Terjadi kesalahan, coba lagi";
  }
  return "Terjadi kesalahan, coba lagi";
}
