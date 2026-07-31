import { useQuery } from "@tanstack/react-query";

import { getCompetitions } from "@/features/competition/api/get-competitions";

export function useCompetitions() {
  return useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
    // Data daftar lomba jarang berubah dalam rentang menit-ke-menit, jadi
    // gak perlu refetch agresif tiap kali modal dibuka ulang.
    staleTime: 5 * 60 * 1000,
  });
}
