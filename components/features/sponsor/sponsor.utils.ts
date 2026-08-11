import { Variants } from "framer-motion";
import type { Sponsor } from "@/types/index";

// Varian animasi Framer Motion
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function categorizeSponsors(sponsors: Sponsor[]) {
  const safeSponsors = sponsors || [];

  const filterByTier = (tierKeywords: string[]) =>
    safeSponsors.filter((s) => tierKeywords.includes(s.tier.toLowerCase()));

  const platinum = filterByTier(["platinum"]);
  const gold = filterByTier(["gold"]);
  const silver = filterByTier(["silver"]);
  const bronze = filterByTier(["bronze"]);
  const inKind = filterByTier(["in kind", "inkind", "in-kind"]);

  const hasNoSponsors =
    platinum.length === 0 &&
    gold.length === 0 &&
    silver.length === 0 &&
    bronze.length === 0 &&
    inKind.length === 0;

  return { platinum, gold, silver, bronze, inKind, hasNoSponsors };
}
