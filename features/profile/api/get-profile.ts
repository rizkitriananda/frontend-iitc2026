import { api } from "@/lib/api/axios";
import type { GetProfileResponse } from "@/types/profile-type";

export async function getProfile(): Promise<GetProfileResponse> {
  const { data } = await api.get<GetProfileResponse>("/profile");
  return data;
}
