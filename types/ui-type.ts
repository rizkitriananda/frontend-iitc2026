import { LucideIcon } from "lucide-react";
import type { Competition } from "./competition-type";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DeadlineCardProps {
  title: string;
  startDate: string | Date;
  targetDate: string | Date;
  label?: string;
}

// Timeline
export type MarkerShape = "diamond" | "circle" | "filled";
export type BadgeVariant = "blue" | "orange" | "white";

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  icon: LucideIcon;
  markerShape: MarkerShape;
  badgeVariant: BadgeVariant;
  align: "left" | "right";
}

// Modals & Components
export interface CompetitionCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (competition: Competition) => void;
}

export interface PromoBannerProps {
  onIkutiLombaClick?: () => void;
}

export interface ActiveTeamDashboardProps {
  teamName: string;
  role: "leader" | "member";
  onLeaveTeam: () => void;
}

export interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}

export interface LeaveTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}
