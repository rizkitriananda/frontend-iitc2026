import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { deleteTeam, leaveTeam, removeMember } from "../api/manage-team";
import type { ApiErrorResponse } from "@/types/index";

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
      queryClient.invalidateQueries({ queryKey: ["my-team-detail"] });
    },
  });
}

export function useLeaveTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
      queryClient.invalidateQueries({ queryKey: ["my-team-detail"] });
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeMember,
    onSuccess: () => {
      // Refresh data agar daftar anggota langsung ter-update di UI
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
      queryClient.invalidateQueries({ queryKey: ["my-team-detail"] });
    },
  });
}

export function getManageTeamErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ?? "Tindakan gagal dilakukan, coba lagi."
    );
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
