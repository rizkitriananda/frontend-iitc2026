import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import { login } from "@/features/auth/api/login";
import type { ApiErrorResponse } from "@/types/index";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Cookie httpOnly sudah di-set oleh Route Handler.
      // router.refresh() memaksa Server Component (mis. layout dashboard)
      // membaca ulang cookie terbaru sebelum navigasi.
      router.refresh();
      router.push("/dashboard");
    },
  });
}

// Helper untuk ambil pesan error yang enak dibaca dari AxiosError
export function getAuthErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Terjadi kesalahan, coba lagi";
  }
  return "Terjadi kesalahan, coba lagi";
}
