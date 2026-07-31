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
      // Tim baru dibuat -> data "kompetisi milik saya" (kalau nanti dipakai
      // di halaman lain, mis. dashboard/team) jadi basi. Invalidate supaya
      // ke-refetch begitu ada komponen yang butuh, daripada nampilin data
      // lama yang belum include tim yang baru dibuat.
      queryClient.invalidateQueries({ queryKey: ["my-team"] });
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });

      // Arahkan ke halaman Manajemen Tim supaya user lanjut proses
      // (undang anggota, dst) — bukan cuma nutup modal begitu saja.
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
