export interface Sponsor {
  id: number;
  name: string;
  tier: string;
  image: string;
  createdAt: string;
}

export interface GetSponsorsResponse {
  success: boolean;
  message: string;
  data: {
    sponsors: Sponsor[];
  };
}
