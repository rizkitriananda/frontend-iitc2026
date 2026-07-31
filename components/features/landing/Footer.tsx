import Link from "next/link";
import { Mail, Globe, Camera, MessageSquare } from "lucide-react";
import logoAmikom from "@/public/logo_amikom.png";
import logoIntermedia from "@/public/logo_intermedia.png";
import Image from "next/image";

const socialIcons = [Mail, Globe, Camera, MessageSquare];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          {/* Kiri: logo partner, judul, dan ikon sosial */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            {/* Ruang untuk logo partner/univ/ukm */}
            <div className="flex gap-3">
              <div className="w-20 h-14 rounded-xl  flex items-center justify-center ">
                <Image
                  src={logoAmikom}
                  alt="Logo Universitas Amikom Purwokerto"
                  width={120}
                  height={40}
                  className="h-11 w-auto"
                />
              </div>
              <div className="w-20 h-14 rounded-xl  flex items-center justify-center ">
                <Image
                  src={logoIntermedia}
                  alt="Logo Intermedia"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">
              IITC Heritage Tech
            </h2>

            <div className="flex gap-3">
              {socialIcons.map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-900 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tengah: Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Syarat &amp; Ketentuan
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Kontak Kami
            </Link>
          </nav>

          {/* Kanan: Copyright */}
          <div className="text-sm text-slate-500 text-center lg:text-right">
            <p>&copy; {new Date().getFullYear()} IITC .</p>
            <p>Built for Innovation.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
