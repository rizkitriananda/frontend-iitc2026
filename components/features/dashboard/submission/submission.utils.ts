import type { ProfileDetail } from "@/types/profile-type";

export interface ExtendedProfileUser {
  name?: string;
  email?: string;
  phone?: string;
  participant?: ProfileDetail & {
    institution?: string;
    gender?: string;
    twibbon?: string;
  };
}

export const VALID_PAYMENT_STATUSES = ["valid", "success", "accepted"];

export const WHATSAPP_GROUP_BY_COMPETITION: {
  keywords: string[];
  url: string;
}[] = [
  {
    keywords: ["web design", "webdesign"],
    url: "https://chat.whatsapp.com/GPk3ial29LvHRkYGdNmIe3",
  },
  {
    keywords: ["ui/ux", "uiux", "ui"],
    url: "https://chat.whatsapp.com/HgPrSs3uZ32AYGCE8myQh4",
  },
  {
    keywords: ["gen ai", "genai", "ai"],
    url: "https://chat.whatsapp.com/HA3xyTpiNnuIsCPQFwEY3C",
  },
];

export function getWhatsAppGroupUrl(competitionName?: string): string {
  if (!competitionName) return "#";
  const name = competitionName.toLowerCase();
  const match = WHATSAPP_GROUP_BY_COMPETITION.find((entry) =>
    entry.keywords.some((keyword) => name.includes(keyword)),
  );
  return match?.url ?? "#";
}

export function computeSubmissionTimeStatus(): "before" | "after" | "active" {
  const now = new Date();
  const startDate = new Date("2026-08-19T00:00:00+07:00");
  const endDate = new Date("2026-08-27T23:59:59+07:00");

  if (now < startDate) return "before";
  if (now > endDate) return "after";
  return "active";
}
