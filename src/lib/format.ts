import { format, parseISO } from "date-fns";
import { id as localeID } from "date-fns/locale";

export function formatRupiah(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(num)) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatRupiahShort(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(num)) return "Rp0";
  if (num >= 1_000_000_000) return `Rp${(num / 1_000_000_000).toFixed(1)}M`;
  if (num >= 1_000_000) return `Rp${(num / 1_000_000).toFixed(1)}jt`;
  if (num >= 1_000) return `Rp${(num / 1_000).toFixed(0)}rb`;
  return `Rp${num}`;
}

export function formatTanggal(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMM yyyy", { locale: localeID });
}

export function formatBulan(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMMM yyyy", { locale: localeID });
}

export function bulanInput(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "yyyy-MM");
}

export function tanggalInput(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "yyyy-MM-dd");
}

export const KATEGORI_LABEL: Record<string, string> = {
  PRIMER: "Primer",
  SEKUNDER: "Sekunder",
  URGENCY: "Urgensi",
};

export const KATEGORI_BADGE: Record<string, string> = {
  PRIMER: "badge-success",
  SEKUNDER: "badge-ghost",
  URGENCY: "badge-error",
};

export const KATEGORI_WARNA: Record<string, string> = {
  PRIMER: "#10b981",
  SEKUNDER: "#a3a3a3",
  URGENCY: "#f97316",
};
