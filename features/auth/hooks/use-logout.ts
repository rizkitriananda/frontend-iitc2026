import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api/axios";

export const SELECTED_COMPETITION_STORAGE_KEY = "selectedCompetitionSlug";

async function logoutRequest() {
  const { data } = await api.post("/auth/logout");
  return data;
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
      try {
        localStorage.removeItem(SELECTED_COMPETITION_STORAGE_KEY);
      } catch (err) {
        console.error("Gagal menghapus data dari localStorage:", err);
      }
      toast.success("Berhasil logout");
      router.push("/");
    },
    onError: () => {
      queryClient.clear();
      try {
        localStorage.removeItem(SELECTED_COMPETITION_STORAGE_KEY);
      } catch (e) {}
      router.push("/");
    },
  });
}
