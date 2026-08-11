export interface Team {
  id: number;
  code: string;
  name: string;
}

export interface JoinCompetitionResponse {
  status: number;
  message: string;
  data: { team: Team };
}

export interface MyTeamSummary {
  id: number;
  name: string;
  code?: string;
  title: string;
  submissionLink: string | null;
  leader: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  members?: Array<{
    id: string | number;
    name: string;
    email: string;
  }>;
  competition: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface GetMyCompetitionsResponse {
  status: number;
  message: string;
  data: { teams: MyTeamSummary[] };
}

export interface JoinTeamAsMemberResponse {
  success: boolean;
  message: string;
}

export interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (team: Team) => void;
  competitionSlug?: string | null;
}

export interface UpdateTeamInput {
  name: string;
  title: string;
  submission?: string;
  avatar?: File | null;
}
