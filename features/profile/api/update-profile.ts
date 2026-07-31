import { api } from "@/lib/api/axios";
import type { UpdateProfileInput, UpdateProfileResponse } from "@/types/profile-type";

export async function updateProfile(
  input: UpdateProfileInput,
): Promise<UpdateProfileResponse> {
  const formData = new FormData();
  formData.append("fullName", input.fullName);
  formData.append("name", input.fullName);
  formData.append("grade", input.grade);
  formData.append("institution", input.institution);

  formData.append("student_id_number", input.student_id_number);

  formData.append("gender", input.gender);
  formData.append("phone", input.phone);

  if (input.avatar && input.avatar instanceof File) {
    formData.append("avatar", input.avatar);
    formData.append("photo_identity", input.avatar);
  }

  if (input.twibbon && input.twibbon instanceof File) {
    formData.append("twibbon", input.twibbon);
  }

  const { data } = await api.post<UpdateProfileResponse>("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
