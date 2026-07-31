import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "@/features/auth/api/logout";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Bersihkan semua cache React Query (data profile, dsb) supaya user
      // berikutnya yang login di browser yang sama tidak sempat lihat
      // data user lama walau sekilas (misal dari cache stale sebelum refetch).
      queryClient.clear();

      // router.refresh() penting di sini karena dashboard/layout.tsx dan
      // middleware baca cookie dari request server. Setelah cookie dihapus
      // oleh Route Handler, kita perlu paksa Server Component baca ulang
      // (kalau nanti ada layout yang fetch data user di server).
      router.refresh();
      router.push("/login");
    },
    onError: () => {
      // Fallback jaga-jaga: kalaupun request ke Route Handler gagal total
      // (mis. network error), tetap dorong user ke /login. Cookie httpOnly
      // memang tidak bisa kita hapus dari client, tapi middleware akan
      // tetap redirect balik ke sini kalau token beneran sudah invalid
      // di sisi Laravel, dan kalau tidak, minimal user bisa coba lagi.
      router.push("/login");
    },
  });
}
