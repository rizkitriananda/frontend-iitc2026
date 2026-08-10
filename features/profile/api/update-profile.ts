import { api } from "@/lib/api/axios";
import type { ProfileResponse } from "@/types/profile-type";

export async function updateProfile(
  formData: FormData,
): Promise<ProfileResponse> {
  const { data } = await api.post<ProfileResponse>("/profile", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return data;
}
