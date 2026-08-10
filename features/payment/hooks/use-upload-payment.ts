import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { uploadPayment } from "@/features/payment/api/upload-payment";
import type { ApiErrorResponse } from "@/types/index";

export function useUploadPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
      queryClient.invalidateQueries({ queryKey: ["payment-status"] });
    },
  });
}

export function getPaymentErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      "Gagal mengunggah bukti pembayaran, periksa kembali file Anda."
    );
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
