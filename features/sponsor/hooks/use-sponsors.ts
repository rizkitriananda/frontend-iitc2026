import { useQuery } from "@tanstack/react-query";
import { getSponsors } from "../api/get-sponsors";

export const useSponsors = () => {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: getSponsors,
  });
};
