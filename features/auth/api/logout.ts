import { api } from "@/lib/api/axios";

export async function logout(): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>("/auth/logout");
  return data;
}
