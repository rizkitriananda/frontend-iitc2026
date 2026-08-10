import axios from "axios";
import type { GetSponsorsResponse } from "@/types/index";

export const getSponsors = async (): Promise<GetSponsorsResponse> => {
  const { data } = await axios.get<GetSponsorsResponse>("/api/sponsors");
  return data;
};
