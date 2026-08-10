// components/features/landing/timeline/timeline.utils.ts
import { MONTH_MAP } from "./timeline.constants";

const parseDateStr = (str: string, defaultYear: number) => {
  let normalized = str.toLowerCase();
  for (const [id, en] of Object.entries(MONTH_MAP)) {
    if (normalized.includes(id)) {
      normalized = normalized.replace(id, en);
      break;
    }
  }
  if (!/\d{4}/.test(normalized)) {
    normalized += ` ${defaultYear}`;
  }
  return new Date(normalized);
};

export function getTimelineStatus(
  dateString: string,
): "passed" | "active" | "upcoming" {
  const parts = dateString.split("-").map((s) => s.trim());
  const now = new Date();
  const currentYear = now.getFullYear();

  const startDateStr = parts[0];
  const endDateStr = parts[parts.length - 1];

  const endDate = parseDateStr(endDateStr, currentYear);
  const defaultYear = endDate.getFullYear() || currentYear;
  const startDate = parseDateStr(startDateStr, defaultYear);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "upcoming";

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  if (now > endDate) return "passed";
  if (now >= startDate && now <= endDate) return "active";
  return "upcoming";
}
