"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  formatRupiah,
  formatTanggal,
  KATEGORI_LABEL,
  KATEGORI_WARNA,
  bulanInput,
  tanggalInput,
} from "@/lib/format";
import {
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@/components/icons";
import { TransactionForm, TxFormValues } from "./TransactionForm";

type Tx = {
  id: string;
  name: string;
  price: string;
  category: string;
  date: string;
  note: string | null;
};

export function TransactionManager() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const monthKey = sp.get("month") || bulanInput(new Date());
  const categoryParam = sp.get("category") || "";
  const searchParam = sp.get("search") || "";

  const [items, setItems] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Tx | null>(null);
  const [searchInput, setSearchInput] = useState(searchParam);

  const load = async () => {
    setLoading(true);
    const qs = new URLSearchParams();
    qs.set("month", monthKey);
    if (categoryParam) qs.set("category", categoryParam);
    if (searchParam) qs.set("search", searchParam);
    try {
      const res = await fetch(`/api/transactions?${qs.toString()}`);
      const data = await res.json();
      setItems(data.transactions || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthKey, categoryParam, searchParam]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const onSubmit = async (values: TxFormValues, id?: string) => {
    const payload = {
      ...values,
      date: new Date(values.date).toISOString(),
    };
    const res = id
      ? await fetch(`/api/transactions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (!res.ok) {
      alert("Gagal menyimpan transaksi");
      return;
    }
    setFormOpen(false);
    setEditTarget(null);
    await load();
    router.refresh();
  };

  const onDelete = async (id: string) => {
    if (!confirm("Hapus transaksi ini?")) return;
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Gagal menghapus");
      return;
    }
    await load();
    router.refresh();
  };

  const total = items.reduce((s, t) => s + Number(t.price), 0);
  const activeFilters = [
    categoryParam && KATEGORI_LABEL[categoryParam],
    searchParam && `"${searchParam}"`,
  ].filter(Boolean);

  return (
    <div className="space-y-5">
      {/* Filter rail */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="month"
          value={monthKey}
          onChange={(e) => setParam("month", e.target.value)}
          className="num px-3 py-1.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition font-medium"
        />

        <select
          value={categoryParam}
          onChange={(e) => setParam("category", e.target.value)}
          className="px-3 py-1.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition font-medium"
        >
          <option value="">Semua kategori</option>
          <option value="PRIMER">Primer</option>
          <option value="SEKUNDER">Sekunder</option>
          <option value="URGENCY">Urgensi</option>
        </select>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setParam("search", searchInput);
          }}
          className="flex items-center relative flex-1 sm:flex-initial min-w-0"
        >
          <IconSearch
            size={14}
            className="absolute left-3 text-base-content/40 pointer-events-none"
          />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari nama…"
            className="pl-8 pr-3 py-1.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition w-full sm:w-40 md:w-56 placeholder:text-base-content/35"
          />
          {searchParam && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setParam("search", "");
              }}
              className="ml-1 px-2 py-1 text-xs text-base-content/55 hover:text-base-content press"
            >
              reset
            </button>
          )}
        </form>

        <div className="ml-auto">
          <button
            onClick={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
            className="group inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-md bg-primary text-primary-content hover:bg-primary/90 transition press shadow-md shadow-primary/25"
          >
            <span className="transition-transform group-hover:rotate-90">
              <IconPlus size={14} />
            </span>
            Tambah
          </button>
        </div>
      </div>

      {/* Container */}
      <div className="paper-card rounded-xl overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-base-content/6 flex items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 min-w-0">
            <p className="text-sm font-semibold">
              <span className="num text-base-content">{items.length}</span>
              <span className="text-base-content/55 font-normal ml-1">
                transaksi
              </span>
            </p>
            <p className="text-xs text-base-content/55 truncate flex items-center gap-2">
              <span>Total</span>
              <span className="num font-semibold text-base-content/85">
                {formatRupiah(total)}
              </span>
              {activeFilters.length > 0 && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-base-content/30" />
                  <span className="text-base-content/45 italic">
                    {activeFilters.join(" · ")}
                  </span>
                </>
              )}
            </p>
          </div>
          {loading && (
            <span className="flex items-center gap-1.5 text-xs text-base-content/45">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              memuat
            </span>
          )}
        </div>

        {items.length === 0 && !loading ? (
          <EmptyState
            onAdd={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
            hasFilter={activeFilters.length > 0}
          />
        ) : (
          <>
            {/* Mobile: cards */}
            <ul className="md:hidden divide-y divide-base-content/5 stagger">
              {items.map((t) => (
                <li key={t.id} className="px-4 py-3.5 group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{t.name}</p>
                      {t.note && (
                        <p className="text-xs text-base-content/55 truncate mt-0.5 italic">
                          {t.note}
                        </p>
                      )}
                    </div>
                    <p className="num text-sm font-semibold whitespace-nowrap tracking-tight">
                      {formatRupiah(t.price)}
                    </p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-base-content/60 min-w-0">
                      <span
                        className="w-2 h-2 rounded-sm shrink-0"
                        style={{
                          backgroundColor:
                            KATEGORI_WARNA[t.category] || "#737373",
                        }}
                      />
                      <span className="truncate font-medium">
                        {KATEGORI_LABEL[t.category] || t.category}
                      </span>
                      <span className="w-0.5 h-0.5 rounded-full bg-base-content/30" />
                      <span className="num whitespace-nowrap">
                        {formatTanggal(t.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditTarget(t);
                          setFormOpen(true);
                        }}
                        className="p-2 rounded-md text-base-content/55 hover:text-base-content hover:bg-base-200 active:bg-base-300 transition press"
                        aria-label="Edit"
                      >
                        <IconPencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        className="p-2 rounded-md text-base-content/55 hover:text-error hover:bg-error/10 active:bg-error/20 transition press"
                        aria-label="Hapus"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="eyebrow text-base-content/45 bg-base-200/30">
                    <th className="text-left font-semibold px-5 py-3 w-32">
                      Tanggal
                    </th>
                    <th className="text-left font-semibold px-3 py-3">Nama</th>
                    <th className="text-left font-semibold px-3 py-3 w-32">
                      Kategori
                    </th>
                    <th className="text-right font-semibold px-3 py-3 w-36">
                      Harga
                    </th>
                    <th className="text-right font-semibold px-5 py-3 w-20"></th>
                  </tr>
                </thead>
                <tbody className="stagger">
                  {items.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-base-content/5 hover:bg-base-200/30 transition-all duration-200 group"
                    >
                      <td className="px-5 py-3.5 num text-base-content/65 whitespace-nowrap text-xs">
                        {formatTanggal(t.date)}
                      </td>
                      <td className="px-3 py-3.5">
                        <p className="font-semibold group-hover:translate-x-0.5 transition-transform">
                          {t.name}
                        </p>
                        {t.note && (
                          <p className="text-xs text-base-content/55 truncate max-w-md mt-0.5 italic">
                            {t.note}
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-base-content/75 font-medium">
                          <span
                            className="w-2 h-2 rounded-sm transition-transform group-hover:scale-125"
                            style={{
                              backgroundColor:
                                KATEGORI_WARNA[t.category] || "#737373",
                            }}
                          />
                          {KATEGORI_LABEL[t.category] || t.category}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 num text-right font-semibold whitespace-nowrap tracking-tight">
                        {formatRupiah(t.price)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end gap-0.5">
                          <button
                            onClick={() => {
                              setEditTarget(t);
                              setFormOpen(true);
                            }}
                            className="p-1.5 rounded-md text-base-content/40 hover:text-base-content hover:bg-base-200 transition press"
                            aria-label="Edit"
                            title="Edit"
                          >
                            <IconPencil size={14} />
                          </button>
                          <button
                            onClick={() => onDelete(t.id)}
                            className="p-1.5 rounded-md text-base-content/40 hover:text-error hover:bg-error/10 transition press"
                            aria-label="Hapus"
                            title="Hapus"
                          >
                            <IconTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <TransactionForm
        open={formOpen}
        initial={
          editTarget
            ? {
                id: editTarget.id,
                name: editTarget.name,
                price: Number(editTarget.price),
                category: editTarget.category as TxFormValues["category"],
                date: tanggalInput(editTarget.date),
                note: editTarget.note ?? "",
              }
            : undefined
        }
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}

function EmptyState({
  onAdd,
  hasFilter,
}: {
  onAdd: () => void;
  hasFilter: boolean;
}) {
  return (
    <div className="px-5 py-16 text-center">
      <div className="relative mx-auto w-24 h-24 mb-5">
        {/* Floating coins illustration */}
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="absolute inset-0 text-base-content/15"
          aria-hidden
        >
          <ellipse
            cx="48"
            cy="78"
            rx="32"
            ry="4"
            fill="currentColor"
            opacity="0.3"
          />
          <g className="animate-float">
            <ellipse
              cx="48"
              cy="42"
              rx="24"
              ry="6"
              fill="hsl(160 84% 39% / 0.15)"
              stroke="hsl(160 84% 39% / 0.5)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="48"
              cy="38"
              rx="24"
              ry="6"
              fill="hsl(160 84% 39% / 0.25)"
              stroke="hsl(160 84% 39% / 0.6)"
              strokeWidth="1.5"
            />
            <path
              d="M48 38 v-4 M48 38 v4"
              stroke="hsl(160 84% 39%)"
              strokeWidth="1.5"
            />
            <text
              x="48"
              y="40"
              textAnchor="middle"
              fontSize="6"
              fontWeight="700"
              fill="hsl(160 84% 39%)"
              fontFamily="var(--font-geist), system-ui, sans-serif"
            >
              Rp
            </text>
          </g>
        </svg>
      </div>
      <p className="display-italic text-lg text-base-content/70 mb-1">
        {hasFilter ? "Tidak ada yang cocok" : "Halaman masih bersih"}
      </p>
      <p className="text-xs text-base-content/55 mb-5 max-w-xs mx-auto">
        {hasFilter
          ? "Coba ubah filter atau bulan untuk melihat transaksi lain."
          : "Catat transaksi pertama untuk mulai melihat pola pengeluaranmu."}
      </p>
      {!hasFilter && (
        <button
          onClick={onAdd}
          className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition press"
        >
          <span className="transition-transform group-hover:rotate-90">
            <IconPlus size={14} />
          </span>
          Tambah transaksi pertama
        </button>
      )}
    </div>
  );
}
