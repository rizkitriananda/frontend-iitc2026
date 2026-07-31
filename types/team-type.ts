export interface Team {
  id: number;
  code: string;
  name: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface TeamLeader {
  name: string;
  email: string;
  avatar?: string | null;
}

export interface TeamCompetition {
  id: number;
  slug: string;
  name: string;
  deadline: string;
  max_members: number;
  price: number;
  description: string;
  guide_book?: string | null;
  cover?: string | null;
  created_at?: string;
  updated_at?: string;
  event_id?: number;
}

export interface TeamDetail {
  id: number;
  name: string;
  code: string;
  title?: string | null;
  isActive?: boolean | null;
  isSubmit?: boolean;
  submissionLink?: string | null;
  avatar?: string | null;
  leader: TeamLeader;
  members: TeamMember[];
  competition: TeamCompetition;
}

export interface GetTeamDetailResponse {
  success: boolean;
  message: string;
  data: {
    team: TeamDetail;
  };
}

export interface JoinCompetitionResponse {
  status: number;
  message: string;
  data: { team: Team };
}

export interface MyTeamSummary {
  teamId: number;
  competitionName: string;
  cSlug: string;
  teamName: string;
  avatar: string;
  isSubmit: boolean;
  maxMembers: number;
  currentMembers: number;
  isActive: boolean | null;
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

export interface ActiveTeamDashboardProps {
  team: TeamDetail;
  role: "leader" | "member";
  userEmail?: string;
  onLeaveTeam: () => void;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
