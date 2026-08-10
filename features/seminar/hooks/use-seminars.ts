import { useQuery } from "@tanstack/react-query";
import { getSeminars } from "../api/get-seminars";

export const useSeminars = () => {
  return useQuery({
    queryKey: ["seminars"],
    queryFn: getSeminars,
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
  });
};
