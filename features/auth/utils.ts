import { isAxiosError } from "axios";

import type { ApiErrorResponse } from "@/types/index";

// Dipakai bareng oleh LoginForm & RegisterForm untuk menampilkan pesan error
// yang enak dibaca dari response Route Handler (login/register).
export function getAuthErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Terjadi kesalahan, coba lagi";
  }
  return "Terjadi kesalahan, coba lagi";
}
