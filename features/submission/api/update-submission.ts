import { api } from "@/lib/api/axios";
import type {
  UpdateSubmissionInput,
  UpdateSubmissionResponse,
} from "@/types/submission-type";

export async function updateSubmission(
  input: UpdateSubmissionInput,
): Promise<UpdateSubmissionResponse> {
  const { data } = await api.post<UpdateSubmissionResponse>(
    "/teams/mine/submission",
    input,
  );
  return data;
}
