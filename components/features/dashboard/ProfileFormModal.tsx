"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Tambahkan icon X dari lucide-react
import { Image as ImageIcon, UploadCloud, X } from "lucide-react";

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileFormModal({
  isOpen,
  onClose,
}: ProfileFormModalProps) {
  return (
    // Tambahkan prop ini agar ketika user klik di luar form (backdrop), modal TIDAK tertutup.
    // Jadi user HANYA bisa menutup dari tombol X atau tombol Batal.
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-none w-screen h-dvh m-0 p-0 rounded-none border-none bg-slate-50 flex flex-col overflow-hidden [&>button]:hidden"
      >
        <DialogTitle className="hidden">Lengkapi Profil Form</DialogTitle>

        {/* Custom Header (Fixed di atas) */}
        <header className="px-6 md:px-12 py-5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm z-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
              Lengkapi Profil
            </h2>
            <p className="text-sm text-slate-500 hidden md:block">
              Harap isi data diri Anda dengan benar sesuai identitas asli.
            </p>
          </div>

          {/* Tombol Close Silang */}
          <button
            onClick={onClose}
            // Ditambahkan border-none outline-none focus:ring-0 agar benar-benar bersih
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-600 transition-colors border-none outline-none focus:outline-none focus:ring-0"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Area Konten Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          {/* Container Form agar tidak terlalu melebar di layar besar */}
          <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-fit">
            <div className="px-6 md:px-10 py-8">
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                {/* Grid 2 Kolom untuk Input Teks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
                  {/* Kolom Kiri */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        defaultValue="Budi Santoso"
                        className="h-11 border-slate-200 w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        defaultValue="budi.santoso@example.com"
                        readOnly
                        className="h-11 w-full bg-slate-50 border-slate-200 text-slate-500 focus-visible:ring-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex rounded-md border border-slate-200 focus-within:ring-1 focus-within:ring-slate-950 transition-all overflow-hidden h-11 w-full">
                        <span className="flex items-center justify-center px-4 bg-slate-50 border-r border-slate-200 text-slate-600 text-sm">
                          +62
                        </span>
                        <Input
                          placeholder="812xxxxxx"
                          className="border-0 focus-visible:ring-0 rounded-none h-full bg-white shadow-none w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Status <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11 w-full border-slate-200">
                          <SelectValue placeholder="Pilih Status Anda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pelajar">
                            Pelajar (SMA/SMK Sederajat)
                          </SelectItem>
                          <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                          <SelectItem value="peserta">Peserta</SelectItem>
                          <SelectItem value="umum">Umum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Asal Sekolah/Instansi{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Nama sekolah atau kampus"
                        className="h-11 border-slate-200 w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        NISN / NIM (Opsional)
                      </Label>
                      <Input
                        placeholder="Masukkan NISN atau NIM"
                        className="h-11 border-slate-200 w-full"
                      />
                    </div>

                    <div className="space-y-3 pt-1">
                      <Label className="text-sm font-medium text-slate-700">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        defaultValue="laki-laki"
                        className="flex items-center gap-6 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="laki-laki"
                            id="laki-laki"
                            className="text-blue-700 border-slate-300"
                          />
                          <Label
                            htmlFor="laki-laki"
                            className="font-normal text-slate-700 cursor-pointer"
                          >
                            Laki-laki
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="perempuan"
                            id="perempuan"
                            className="text-blue-700 border-slate-300"
                          />
                          <Label
                            htmlFor="perempuan"
                            className="font-normal text-slate-700 cursor-pointer"
                          >
                            Perempuan
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Grid 2 Kolom untuk Area Upload */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Foto Profil (Avatar){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors h-40">
                      <div className="w-10 h-10 bg-indigo-50 text-[#1a0b8c] rounded-full flex items-center justify-center mb-3">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#1a0b8c] mb-1">
                        Pilih Gambar
                      </h4>
                      <p className="text-xs text-slate-500">
                        JPG, PNG atau GIF (Max 2MB)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Bukti Upload Twibbon (Opsional)
                    </Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors h-40">
                      <div className="w-10 h-10 bg-indigo-50 text-[#1a0b8c] rounded-full flex items-center justify-center mb-3">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#1a0b8c] mb-1">
                        Unggah Screenshot
                      </h4>
                      <p className="text-xs text-slate-500">
                        Instagram / Media sosial lainnya (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer (Action Buttons) */}
            <div className="px-6 md:px-10 py-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 rounded-b-2xl">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-slate-300 text-slate-700 hover:text-slate-900 font-medium px-6 h-11"
              >
                Batal
              </Button>
              <Button
                onClick={onClose}
                className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium px-6 h-11 shadow-sm"
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
