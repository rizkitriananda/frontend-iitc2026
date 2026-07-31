import { api } from "@/lib/api/axios";
import type { GetTeamDetailResponse } from "@/types/team-type";

export async function getMyTeam(): Promise<GetTeamDetailResponse> {
  const { data } = await api.get<GetTeamDetailResponse>("/teams/mine");
  return data;
}
