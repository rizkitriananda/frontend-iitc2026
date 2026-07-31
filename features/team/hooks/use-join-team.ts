import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { joinTeamAsMember } from "@/features/team/api/join-team";
import type { ApiErrorResponse } from "@/types/index";

export function useJoinTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinTeamAsMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-team"] });
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
    },
  });
}

export function getJoinTeamErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Terjadi kesalahan, coba lagi";
  }
  return "Terjadi kesalahan, coba lagi";
}
