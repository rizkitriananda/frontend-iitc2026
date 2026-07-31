import { api } from "@/lib/api/axios";
import type { CreateTeamInput } from "@/lib/schemas/team.schema";
import type { JoinCompetitionResponse } from "@/types/index";

export async function joinCompetition(
  competitionSlug: string,
  input: CreateTeamInput,
): Promise<JoinCompetitionResponse> {
  const { data } = await api.post<JoinCompetitionResponse>(
    `/teams/${competitionSlug}`,
    input,
  );
  return data;
}
