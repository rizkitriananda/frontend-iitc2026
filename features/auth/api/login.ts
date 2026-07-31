import { api } from "@/lib/api/axios";
import type { LoginInput } from "@/lib/schemas/auth.schema";
import type { LoginResponse } from "@/types/index";

export async function login(input: LoginInput): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", input);
  return data;
}
