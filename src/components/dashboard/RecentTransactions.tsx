import Link from "next/link";
import {
  formatRupiah,
  formatTanggal,
  KATEGORI_LABEL,
  KATEGORI_WARNA,
} from "@/lib/format";
import { IconArrowRight } from "@/components/icons";

type Tx = {
  id: string;
  name: string;
  price: string;
  category: string;
  date: string;
};

export function RecentTransactions({ items }: { items: Tx[] }) {
  return (
    <section className="paper-card rounded-xl overflow-hidden">
      <header className="flex items-center justify-between px-5 py-4 border-b border-base-content/6">
        <div>
          <p className="eyebrow text-base-content/45">Aktivitas</p>
          <h3 className="display text-xl mt-1.5 tracking-tightest leading-tight">
            Transaksi <em className="display-italic">terbaru</em>
          </h3>
        </div>
        <Link
          href="/transactions"
          className="group text-xs text-base-content/60 hover:text-primary inline-flex items-center gap-1.5 transition press font-medium"
        >
          <span>Lihat semua</span>
          <span className="transition-transform group-hover:translate-x-1">
            <IconArrowRight size={12} />
          </span>
        </Link>
      </header>

      {items.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-base-200/80 flex items-center justify-center mb-3 animate-float">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-base-content/30"
              aria-hidden
            >
              <path d="M3 6h18M3 12h18M3 18h18" strokeDasharray="3 3" />
            </svg>
          </div>
          <p className="display-italic text-base text-base-content/60 mb-1">
            Daftar masih kosong
          </p>
          <p className="text-xs text-base-content/45 mb-4">
            Catat pengeluaran pertamamu untuk memulai
          </p>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold border-b border-primary/30 hover:border-primary pb-0.5 transition"
          >
            Tambah sekarang
            <IconArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-base-content/5 stagger">
          {items.map((t) => (
            <li
              key={t.id}
              className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-base-200/40 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="relative w-2.5 h-2.5 rounded-sm shrink-0 group-hover:scale-125 transition-transform"
                  style={{
                    backgroundColor: KATEGORI_WARNA[t.category] || "#737373",
                  }}
                  aria-hidden
                >
                  <span
                    className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-50 group-hover:scale-150 transition-all duration-300"
                    style={{
                      backgroundColor: KATEGORI_WARNA[t.category] || "#737373",
                    }}
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate group-hover:translate-x-0.5 transition-transform">
                    {t.name}
                  </p>
                  <p className="text-xs text-base-content/55 mt-0.5 flex items-center gap-1.5">
                    <span className="font-medium">
                      {KATEGORI_LABEL[t.category] || t.category}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-base-content/30" />
                    <span className="num">{formatTanggal(t.date)}</span>
                  </p>
                </div>
              </div>
              <p className="num text-sm font-semibold whitespace-nowrap tracking-tight">
                {formatRupiah(t.price)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
