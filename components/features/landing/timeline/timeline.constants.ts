// components/features/landing/timeline/timeline.constants.ts
import {
  ClipboardCheck,
  ShieldCheck,
  Presentation,
  FileText,
  Gavel,
  Megaphone,
  Trophy,
  LucideIcon,
} from "lucide-react";

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

export const MONTH_MAP: Record<string, string> = {
  januari: "January",
  jan: "January",
  februari: "February",
  feb: "February",
  maret: "March",
  mar: "March",
  april: "April",
  apr: "April",
  mei: "May",
  juni: "June",
  jun: "June",
  juli: "July",
  jul: "July",
  agustus: "August",
  agt: "August",
  september: "September",
  sept: "September",
  sep: "September",
  oktober: "October",
  okt: "October",
  november: "November",
  nov: "November",
  desember: "December",
  des: "December",
};

export const BADGE_STYLES: Record<BadgeVariant, string> = {
  blue: "border border-blue-700 bg-blue-50 text-blue-700",
  orange: "border border-orange-500 bg-orange-50 text-orange-600",
  white: "border border-white bg-white text-blue-700",
};

export const INITIAL_VISIBLE_COUNT = 3;

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "01",
    title: "Pendaftaran",
    subtitle: "Gelombang 1",
    description: "Pendaftaran awal peserta IITC 2026.",
    date: "04 Agt - 15 Agt 2026",
    icon: ClipboardCheck,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "02",
    title: "Pendaftaran",
    subtitle: "Gelombang 2",
    description: "Pendaftaran akhir dengan harga normal.",
    date: "16 Agt - 22 Agt 2026",
    icon: ClipboardCheck,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "03",
    title: "Technical Meeting",
    subtitle: "Technical Meeting Peserta",
    description: "Pengarahan teknis via daring.",
    date: "19 Agustus 2026",
    icon: ShieldCheck,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "04",
    title: "Pembukaan Pendaftaran Seminar",
    subtitle: "Seminar Nasional",
    description: "Pembukaan tiket acara seminar nasional.",
    date: "16 Agt - 04 Sept 2026",
    icon: Presentation,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "05",
    title: "Pengumpulan Karya",
    subtitle: "Online Submission",
    description: "Batas waktu unggah hasil karya.",
    date: "19 Agt - 30 Agt 2026",
    icon: FileText,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "06",
    title: "Penjurian",
    subtitle: "Proses Penilaian",
    description: "Penilaian karya oleh dewan juri.",
    date: "31 Agt - 03 Sept 2026",
    icon: Gavel,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "07",
    title: "Pengumuman Finalis",
    subtitle: "Top 3 Finalis",
    description: "Pengumuman finalis terpilih tiap kategori.",
    date: "05 Sept 2026",
    icon: Megaphone,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "08",
    title: "Technical Meeting",
    subtitle: "Finalis Terpilih",
    description: "Briefing mekanisme presentasi babak final.",
    date: "08 Sept 2026",
    icon: ShieldCheck,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "09",
    title: "Seminar dan Awarding",
    subtitle: "Penghargaan Offline & Seminar",
    description: "Acara puncak dan pembagian hadiah.",
    date: "12 Sept 2026",
    icon: Trophy,
    markerShape: "filled",
    badgeVariant: "white",
    align: "left",
  },
];
