import type { CompetitionItem } from "@/types";

export function formatPrice(
  price: number | null | undefined,
  fallback: string,
): string {
  if (price === null || price === undefined || price === 0) {
    return fallback;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function getGuidebookLink(
  competitions: CompetitionItem[] | undefined,
  keyword: string,
): string {
  const comp = competitions?.find((c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  if (!comp) return "#";
  return (
    comp.guidebookLink ||
    comp.guideBookLink ||
    comp.guide_book_link ||
    comp.linkPanduan ||
    "#"
  );
}

export function getFormattedDeadline(
  competitions: CompetitionItem[] | undefined,
  keyword: string,
  fallback: string,
): string {
  const comp = competitions?.find((c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  if (!comp || !comp.deadline) return fallback;

  try {
    const date = new Date(comp.deadline);
    if (isNaN(date.getTime())) return comp.deadline;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return comp.deadline;
  }
}
