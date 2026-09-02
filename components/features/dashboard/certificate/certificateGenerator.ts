import { jsPDF } from "jspdf";
import type { CertificateData } from "@/types/certificate-type";

// Helper memuat font file menjadi base64
const fetchFontAsBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

/**
 * Fungsi ini HANYA menghasilkan Data URL (Base64) dari Canvas.
 * Digunakan untuk menampilkan Preview di layar.
 */
export const generateCertificatePreviewUrl = async (
  data: CertificateData,
): Promise<string> => {
  const status = data.winnerStatus ? String(data.winnerStatus).trim() : "";
  const compName = data.competitionName.toUpperCase();

  let isWinner = false;
  let achievementText = "";

  if (status === "1" || status === "2" || status === "3") {
    isWinner = true;
    achievementText = `JUARA ${status} LOMBA ${compName}`;
  } else if (status === "4") {
    isWinner = true;
    achievementText = `JUARA FAVORIT LOMBA ${compName}`;
  } else {
    isWinner = false;
    achievementText = `PESERTA LOMBA ${compName}`;
  }

  const templatePath = isWinner
    ? "/templates/sertifikat-juara.png"
    : "/templates/sertifikat-partisipan.png";

  // Muat gambar template sertifikat asli
  const templateImg = await loadImage(templatePath);

  // Buat elemen Canvas HTML
  const canvas = document.createElement("canvas");
  canvas.width = templateImg.width;
  canvas.height = templateImg.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Gagal menginisialisasi Canvas 2D");

  // Gambar background template ke canvas
  ctx.drawImage(templateImg, 0, 0);

  // Load kustom font Futura
  const fontBookBase64 = await fetchFontAsBase64(
    "/fonts/Futura/Futura-Bk-BT-Book.ttf",
  );
  const fontBoldBase64 = await fetchFontAsBase64(
    "/fonts/Futura/Futura-Md-BT-Bold.ttf",
  );

  const futuraRegular = new FontFace(
    "FuturaRegular",
    `url(data:font/ttf;base64,${fontBookBase64})`,
  );
  const futuraBold = new FontFace(
    "FuturaBold",
    `url(data:font/ttf;base64,${fontBoldBase64})`,
  );

  await Promise.all([futuraRegular.load(), futuraBold.load()]);
  document.fonts.add(futuraRegular);
  document.fonts.add(futuraBold);

  // Helper untuk meratakan teks di tengah secara horizontal
  const drawCenteredText = (
    text: string,
    yPos: number,
    font: string,
    fillStyle: string | CanvasGradient,
  ) => {
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, yPos);
  };

  // 1. Nomor Surat
  drawCenteredText(
    `NOMOR: ${data.certificateNumber}`,
    620,
    "70px FuturaRegular",
    "#FFFFFF",
  );

  // 2. Nama Peserta
  drawCenteredText(data.name.toUpperCase(), 900, "180px FuturaBold", "#FF811D");

  // 3. Nama Tim
  drawCenteredText(
    data.teamName.toUpperCase(),
    1170,
    "70px FuturaRegular",
    "#FFFFFF",
  );

  // 4. Keterangan Juara
  ctx.font = "130px FuturaBold";
  const textMetrics = ctx.measureText(achievementText);
  const textHeight =
    textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent || 130;

  const gradStart = 1350 - textHeight;
  const gradEnd = 1350 + 40;

  const gradient = ctx.createLinearGradient(0, gradStart, 0, gradEnd);
  gradient.addColorStop(0, "#F4A261");
  gradient.addColorStop(1, "#FF811D");

  drawCenteredText(achievementText, 1450, "130px FuturaBold", gradient);

  return canvas.toDataURL("image/png", 1.0);
};

/**
 * Mengonversi pratinjau Base64 gambar ke dalam format file PDF Blob.
 */
export const generateCertificatePdfBlob = (previewDataUrl: string): Blob => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  doc.addImage(previewDataUrl, "PNG", 0, 0, 297, 210);
  return doc.output("blob");
};
