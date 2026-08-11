import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./sponsor.utils";
import SponsorTile from "./SponsorTile";
import type { Sponsor } from "@/types/index";

function TierLabel({ label, count }: { label: string; count: number }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-4">
      <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase whitespace-nowrap">
        {label} TIER
        <span className="ml-2 text-slate-300">({count})</span>
      </span>
      <div className="h-px flex-1 bg-slate-200" />
    </motion.div>
  );
}

interface StandardTierProps {
  label: string;
  sponsors: Sponsor[];
  gridClass: string;
  aspect: string;
}

export default function StandardTier({
  label,
  sponsors,
  gridClass,
  aspect,
}: StandardTierProps) {
  if (sponsors.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="space-y-6"
    >
      <TierLabel label={label} count={sponsors.length} />
      <motion.div variants={itemVariants} className={`grid ${gridClass}`}>
        {sponsors.map((sponsor) => (
          <SponsorTile key={sponsor.id} sponsor={sponsor} aspect={aspect} />
        ))}
      </motion.div>
    </motion.section>
  );
}
