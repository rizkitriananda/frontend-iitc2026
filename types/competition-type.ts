export interface Competition {
  slug: string;
  name: string;
  cover: string;
  maxMembers: number;
  competitionPrice?: number | null;
  description?: string | null;
  guidebookLink?: string | null;
  deadline?: string | null;
}

export interface CompetitionsApiResponse {
  success: boolean;
  message: string;
  data: {
    competitions: Competition[];
  };
}

export type GetCompetitionsResponse = CompetitionsApiResponse;

export interface SeminarItem {
  id: number;
  title: string;
  description: string | null;
  speaker: string;
  dateTime: string;
  startDate: string;
  endDate: string;
  location: string;
  registrationLink: string;
  posterUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface GetSeminarsResponse {
  success: boolean;
  message: string;
  data: {
    seminars: SeminarItem[];
  };
}
