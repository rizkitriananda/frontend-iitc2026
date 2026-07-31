"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react"; // Placeholder icon

// Konfigurasi animasi Framer Motion dengan Variants eksplisit
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    // Tambahkan "as const" agar TypeScript membaca type spring secara literal (bukan string biasa)
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function SponsorPage() {
  // Dummy data arrays untuk mempermudah mapping.
  const goldSponsors = [1, 2, 3];
  const silverSponsors = [1, 2, 3, 4];
  const bronzeSponsors = [1, 2, 3, 4, 5, 6];

  return (
    <main className="w-full min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 tracking-tight">
            Sponsor Kami
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            IITC 2026 didukung oleh perusahaan-perusahaan terkemuka yang peduli
            terhadap pelestarian budaya melalui inovasi teknologi.
          </p>
        </motion.div>

        {/* Sponsor Utama */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-slate-900 text-center"
          >
            Sponsor Utama
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Card className="max-w-4xl mx-auto border-none shadow-sm bg-white overflow-hidden rounded-3xl">
              <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
                {/* Placeholder Image Sponsor Utama */}
                <div className="w-full max-w-md aspect-video bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-sm font-medium">
                    Logo TechCorp Nusantara
                  </span>
                </div>

                <div className="space-y-4 max-w-3xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
                    TechCorp Nusantara
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                    Mitra strategis utama kami dalam mewujudkan visi integrasi
                    teknologi modern dengan nilai-nilai luhur kebudayaan
                    Indonesia. TechCorp Nusantara memimpin inovasi digital
                    dengan tetap berpijak pada kearifan lokal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Gold Sponsor */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-slate-700 text-center"
          >
            Gold
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {goldSponsors.map((item) => (
              <Card
                key={item}
                className="border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 flex items-center justify-center aspect-4/3 md:aspect-video">
                  {/* Placeholder Logo Gold */}
                  <div className="text-slate-300 flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">
                      Logo Gold {item}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.section>

        {/* Silver Sponsor */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-xl font-semibold text-slate-600 text-center"
          >
            Silver
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {silverSponsors.map((item) => (
              <Card
                key={item}
                className="border-none shadow-sm bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 flex items-center justify-center h-28 md:h-32">
                  {/* Placeholder Logo Silver */}
                  <div className="text-slate-200">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.section>

        {/* Bronze Sponsor */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-lg font-semibold text-slate-500 text-center"
          >
            Bronze
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto"
          >
            {bronzeSponsors.map((item) => (
              <Card
                key={item}
                className="border-none shadow-sm bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3 flex items-center justify-center h-20 md:h-24">
                  {/* Placeholder Logo Bronze */}
                  <div className="text-slate-200">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
