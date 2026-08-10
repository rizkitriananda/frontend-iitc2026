import axios from "axios";
import { GetSeminarsResponse } from "@/types";

export const getSeminars = async (): Promise<GetSeminarsResponse> => {
  const { data } = await axios.get<GetSeminarsResponse>("/api/seminars");
  return data;
};
