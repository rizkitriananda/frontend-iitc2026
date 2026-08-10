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
      router.refresh();
      router.push("/dashboard");
    },
  });
}

export function getAuthErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Terjadi kesalahan, coba lagi.";
  }
  return "Terjadi kesalahan, coba lagi.";
}
