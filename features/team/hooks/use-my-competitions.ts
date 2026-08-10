import { useQuery } from "@tanstack/react-query";

import { getMyCompetitions } from "@/features/team/api/get-my-competitions";

export function useMyCompetitions() {
  return useQuery({
    queryKey: ["my-competitions"],
    queryFn: getMyCompetitions,
    staleTime: 30 * 1000,
  });
}
