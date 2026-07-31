import { api } from "@/lib/api/axios";
import type { JoinTeamInput } from "@/lib/schemas/team.schema";
import type { JoinTeamAsMemberResponse } from "@/types/team-type";

export async function joinTeamAsMember(
  input: JoinTeamInput,
): Promise<JoinTeamAsMemberResponse> {
  const { data } = await api.put<JoinTeamAsMemberResponse>(
    "/teams/join",
    input,
  );
  return data;
}
