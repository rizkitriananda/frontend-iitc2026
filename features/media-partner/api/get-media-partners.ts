import axios from "axios";
import type { GetMediaPartnersResponse } from "@/types/media-partner-type";

export const getMediaPartners = async (): Promise<GetMediaPartnersResponse> => {
  const { data } = await axios.get<GetMediaPartnersResponse>(
    "/api/media-partners",
  );
  return data;
};
