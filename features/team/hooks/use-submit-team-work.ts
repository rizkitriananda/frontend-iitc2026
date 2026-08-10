import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { submitTeamWork } from "../api/submit-team-work";
import type { ApiErrorResponse } from "@/types/index";

export function useSubmitTeamWork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTeamWork,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-competitions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-team-detail"],
      });
    },
  });
}

export function getSubmitTeamWorkErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      "Gagal menyimpan data karya. Pastikan format tautan sudah benar."
    );
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
