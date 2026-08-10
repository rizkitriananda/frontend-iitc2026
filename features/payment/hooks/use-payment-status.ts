import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";

export function usePaymentStatus() {
  return useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => {
      const { data } = await api.get("/payment/status");
      return data;
    },
    retry: false,
  });
}
