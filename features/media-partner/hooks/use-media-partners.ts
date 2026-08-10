import { useQuery } from "@tanstack/react-query";
import { getMediaPartners } from "../api/get-media-partners";

export const useMediaPartners = () => {
  return useQuery({
    queryKey: ["media-partners"],
    queryFn: getMediaPartners,
  });
};
