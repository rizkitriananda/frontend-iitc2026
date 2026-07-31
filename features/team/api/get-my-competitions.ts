import { api } from "@/lib/api/axios";
import type {
  GetMyCompetitionsResponse,
  MyTeamSummary,
} from "@/types/team-type";

export async function getMyCompetitions(): Promise<MyTeamSummary[]> {
  const { data } =
    await api.get<GetMyCompetitionsResponse>("/competitions/mine");
  return data.data.teams;
}
