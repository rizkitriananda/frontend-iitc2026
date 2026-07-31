"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  User,
  Wallet,
  CloudUpload,
  GraduationCap,
  BadgeCheck,
  Settings,
  LogOut,
  Bell,
  Menu,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import maskotIITC from "@/public/Maskot2.svg";
import { useLogout } from "@/features/auth/hooks/use-logout";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profil Saya", href: "/dashboard/profile" },
  { icon: Users, label: "Manajemen Tim", href: "/dashboard/team" },
  { icon: Wallet, label: "Pembayaran", href: "/dashboard/payment" },
  { icon: CloudUpload, label: "Unggah Karya", href: "/dashboard/submission" },
  { icon: GraduationCap, label: "Seminar", href: "/dashboard/seminar" },
  { icon: BadgeCheck, label: "Sertifikat", href: "/dashboard/sertificate" },
];

// Isi sidebar dipisah jadi komponen sendiri supaya bisa dipakai ulang
// baik di sidebar desktop (statis) maupun di dalam Sheet (drawer mobile).
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    // Tutup drawer mobile dulu (kalau ada) sebelum proses logout jalan,
    // biar gak ada flicker UI drawer nutup bareng redirect.
    onNavigate?.();
    logoutMutation.mutate();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Logo Section */}
        <div className="pt-10 pb-8 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-100 shadow-sm relative">
            <Image
              src={maskotIITC}
              alt="Maskot IITC"
              fill
              className="object-contain p-2"
            />
          </div>
          <h2 className="text-xl font-extrabold text-blue-700 tracking-wide">
            IITC 2026
          </h2>
        </div>

        {/* Navigation */}
        <nav className="px-6 space-y-1">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.label === "Dashboard" && pathname === "/dashboard");
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#2F2FE4] bg-blue-50 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {isActive && (
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-[#2F2FE4]" />
                )}
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="pb-8 px-6 pt-6 space-y-1 border-t border-slate-200 mx-6">
        <Link
          href="/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>

        {/* Tombol logout — sengaja pakai <button>, bukan <Link>, karena ini
            memicu aksi (POST ke server + hapus cookie httpOnly), bukan
            navigasi murni. Link ke "/" sebelumnya TIDAK benar-benar logout
            — token httpOnly tetap ada, cuma pindah halaman. */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="flex items-center gap-3 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-slate-100 transition-colors w-full text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {logoutMutation.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          {logoutMutation.isPending ? "Memproses..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-[#F8FAFC] border-r border-slate-200 hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile (Drawer) */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-72 p-0 bg-[#F8FAFC] border-r border-slate-200"
        >
          <SidebarContent onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#F8FAFC] flex items-center justify-between md:justify-end px-4 sm:px-8 gap-4 sm:gap-6 border-b border-slate-200">
          {/* Tombol hamburger, hanya tampil di mobile */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Avatar className="w-10 h-10 border border-indigo-100">
              <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                A
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
