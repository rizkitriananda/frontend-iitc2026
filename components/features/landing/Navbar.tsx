"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logoIITC2026 from "@/public/Logo-IITC2026.svg";

const NAV_LINKS = [
  { href: "/#tentang", label: "Tentang" },
  { href: "/#kompetisi", label: "Kompetisi" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Bagian Logo (Kiri) */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Image
              src={logoIITC2026}
              alt="Logo IITC2026"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Bagian Navigasi (Tengah) - hanya tampil di desktop */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tombol Daftar - hanya tampil di desktop */}
          <Link href={"/register"} className="hidden md:block cursor-pointer">
            <Button className="bg-[#2F2FE4] hover:bg-indigo-800 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-[1.15rem] text-sm font-medium">
              Daftar Sekarang
            </Button>
          </Link>

          {/* Tombol Hamburger - hanya tampil di mobile & tablet */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F2FE4]"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Overlay latar belakang saat menu mobile terbuka */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel menu mobile / tablet */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 z-40 origin-top border-b bg-white shadow-lg transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <Link href={"/register"} onClick={closeMenu} className="mt-2">
            <Button className="w-full bg-[#2F2FE4] hover:bg-indigo-800 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md py-6 text-sm font-medium">
              Daftar Sekarang
            </Button>
          </Link>
        </nav>
      </div>
    </>
  );
}
