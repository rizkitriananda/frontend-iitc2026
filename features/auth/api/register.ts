import { api } from "@/lib/api/axios";
import type { RegisterInput } from "@/lib/schemas/auth.schema";
import type { RegisterResponse } from "@/types/index";

export async function register(
  input: RegisterInput,
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/auth/register", input);
  return data;
}
