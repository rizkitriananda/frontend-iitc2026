import Hero from "@/components/features/landing/Hero";
import About from "@/components/features/landing/About";
import Countdown from "@/components/features/landing/Countdown";
import Competitions from "@/components/features/landing/Competitions";
import Timeline from "@/components/features/landing/timeline/Timeline";
import MediaPartners from "@/components/features/landing/MediaPartners";
import FAQ from "@/components/features/landing/FAQ";
import Sponsors from "@/components/features/landing/Sponsor";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full overflow-hidden">
      <Hero />
      <Sponsors />
      <div className="w-full max-w-360 px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20 py-16">
        <About />
        <Countdown />
        <Competitions />
        <Timeline />
        <MediaPartners />
        <FAQ />
      </div>
    </main>
  );
}
