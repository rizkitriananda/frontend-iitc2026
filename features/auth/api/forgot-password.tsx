import { api } from "@/lib/api/axios";
import type { ForgotPasswordInput } from "@/lib/schemas/auth.schema";

export async function forgotPassword(
  input: ForgotPasswordInput,
): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(
    "/auth/forgot-password",
    input,
  );
  return data;
}
