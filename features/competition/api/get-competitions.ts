import { api } from "@/lib/api/axios";
import type { Competition, GetCompetitionsResponse } from "@/types/index";

export async function getCompetitions(): Promise<Competition[]> {
  const { data } = await api.get<GetCompetitionsResponse>("/competitions");
  return data.data.competitions;
}
