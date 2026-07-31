import { useQuery } from "@tanstack/react-query";
import { getMyTeam } from "@/features/team/api/get-my-team";

export function useMyTeam() {
  return useQuery({
    queryKey: ["my-team"],
    queryFn: getMyTeam,
    retry: 1,
  });
}
