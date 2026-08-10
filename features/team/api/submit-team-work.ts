import { api } from "@/lib/api/axios";

export interface SubmitTeamWorkInput {
  submission: string;
}

export async function submitTeamWork(input: SubmitTeamWorkInput) {
  const formData = new FormData();
  formData.append("submission", input.submission);
  const { data } = await api.post("/teams/mine/submission", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return data;
}
