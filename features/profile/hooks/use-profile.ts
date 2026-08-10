import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/get-profile";

export function useProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfile,
    // Data profil jarang berubah dengan sendirinya, jadi kita bisa set staleTime agak lama
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: 1, // Hanya retry 1 kali jika gagal (misal karena token expired)
  });
}
