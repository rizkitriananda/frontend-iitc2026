import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import { joinCompetition } from "@/features/team/api/join-competition";
import type { CreateTeamInput } from "@/lib/schemas/team.schema";
import type { ApiErrorResponse } from "@/types/index";

export function useJoinCompetition(competitionSlug: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTeamInput) =>
      joinCompetition(competitionSlug, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
      router.push("/dashboard/team");
      router.refresh();
    },
  });
}

export function getJoinCompetitionErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Terjadi kesalahan, coba lagi";
  }
  return "Terjadi kesalahan, coba lagi";
}
