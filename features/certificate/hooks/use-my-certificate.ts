import { useQuery } from "@tanstack/react-query";
import { getMyCertificate } from "../api/get-my-certificate";

export function useMyCertificate() {
  return useQuery({
    queryKey: ["my-certificate"],
    queryFn: getMyCertificate,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
}
