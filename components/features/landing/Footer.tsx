import Link from "next/link";
import { Mail, Globe, MessageSquare } from "lucide-react";
import logoAmikom from "@/public/logo_amikom.png";
import logoIntermedia from "@/public/logo_intermedia.png";
import Image from "next/image";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const socialIcons = [
  // !TODO Change Tiktok icon
  { icon: Mail, href: "https://www.tiktok.com/@iitc_intermedia", label: "Email" },
  { icon: Globe, href: "https://www.intermediaamikom.org/", label: "Website" },
  { icon: InstagramIcon, href: "https://www.instagram.com/iitc_intermedia/", label: "Instagram" },
  { icon: MessageSquare, href: "wa.me/6285133711081", label: "Whatsapp" }
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#030310] border-t border-indigo-500/10 text-slate-300 py-12 relative overflow-hidden">
      {/* Efek Glow Latar Belakang */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">

          {/* Kiri: Logo, Judul & Sosial */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <div className="flex gap-4">
              <div className="bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10 transition-colors hover:bg-white/10">
                <Image
                  src={logoAmikom}
                  alt="Logo Universitas Amikom Purwokerto"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10 transition-colors hover:bg-white/10">
                <Image
                  src={logoIntermedia}
                  alt="Logo Intermedia"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                IITC 2026
              </h2>
              <p className="text-slate-400 text-xs mt-1 max-w-[250px]">
                &quot;From Vision to Innovation&quot;
              </p>
            </div>

            <div className="flex gap-3">
              {socialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10 flex items-center justify-center transition-all duration-300 group hover:-translate-y-1"
                >
                  <social.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-300 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tengah: Navigasi (Grid 3 Kolom) */}
          <nav className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
            {['Beranda', 'Kategori Lomba', 'Panduan', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Kontak Kami'].map((item) => (
              <Link key={item} href="#" className="hover:text-indigo-300 transition-colors text-center lg:text-left">
                {item}
              </Link>
            ))}
          </nav>

          {/* Kanan: Copyright */}
          <div className="text-sm text-slate-500 text-center lg:text-right flex flex-col gap-1">
            <p>&copy; {new Date().getFullYear()} IITC 2026.</p>
            <p className="text-indigo-300/70 font-medium">Built for Innovation.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
