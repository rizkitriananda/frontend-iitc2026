import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { register } from "@/features/auth/api/register";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Register TIDAK membuat sesi login (tidak ada cookie yang di-set),
      // jadi arahkan ke /login supaya user login manual dengan akun barunya.
      router.push("/login?registered=1");
    },
  });
}
