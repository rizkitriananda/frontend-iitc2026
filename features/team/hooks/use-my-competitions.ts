import { useQuery } from "@tanstack/react-query";

import { getMyCompetitions } from "@/features/team/api/get-my-competitions";

export function useMyCompetitions() {
  return useQuery({
    queryKey: ["my-competitions"],
    queryFn: getMyCompetitions,
    // Ini dipakai buat nentuin tampilan awal /dashboard/team (apakah user
    // sudah punya tim atau belum), jadi jangan terlalu stale — tapi juga
    // gak perlu polling agresif.
    staleTime: 30 * 1000,
  });
}
