import { api } from "@/lib/api/axios";
import type { ProfileResponse } from "@/types/profile-type";

export async function getProfile(): Promise<ProfileResponse> {
  const { data } = await api.get<ProfileResponse>("/profile");
  return data;
}
