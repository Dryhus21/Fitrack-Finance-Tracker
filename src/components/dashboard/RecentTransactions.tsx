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
    <div className="border border-base-300 rounded-lg bg-base-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Transaksi Terbaru</h3>
          <p className="text-xs text-base-content/50 mt-0.5">
            5 entri paling terakhir
          </p>
        </div>
        <Link
          href="/transactions"
          className="text-xs text-base-content/60 hover:text-base-content inline-flex items-center gap-1 transition"
        >
          Lihat semua
          <IconArrowRight size={12} />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-base-content/50">Belum ada transaksi tercatat.</p>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1 text-xs text-primary mt-2"
          >
            Tambah sekarang
            <IconArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-base-300">
          {items.map((t) => (
            <li
              key={t.id}
              className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-base-200/40 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-2 h-2 rounded-sm shrink-0"
                  style={{
                    backgroundColor: KATEGORI_WARNA[t.category] || "#737373",
                  }}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{t.name}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">
                    {KATEGORI_LABEL[t.category] || t.category}
                    <span className="mx-1.5 text-base-content/30">·</span>
                    {formatTanggal(t.date)}
                  </p>
                </div>
              </div>
              <p className="num text-sm font-semibold whitespace-nowrap">
                {formatRupiah(t.price)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
