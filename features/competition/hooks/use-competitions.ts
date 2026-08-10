import { useQuery } from "@tanstack/react-query";
import { getCompetitions } from "@/features/competition/api/get-competitions";

export function useCompetitions() {
  return useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
    staleTime: 5 * 60 * 1000,
  });
}
