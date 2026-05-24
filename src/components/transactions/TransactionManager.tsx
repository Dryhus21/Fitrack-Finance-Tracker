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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="month"
          value={monthKey}
          onChange={(e) => setParam("month", e.target.value)}
          className="num px-3 py-1.5 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
        />

        <select
          value={categoryParam}
          onChange={(e) => setParam("category", e.target.value)}
          className="px-3 py-1.5 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
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
            className="pl-8 pr-3 py-1.5 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 w-full sm:w-40 md:w-56"
          />
          {searchParam && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setParam("search", "");
              }}
              className="ml-1 px-2 py-1 text-xs text-base-content/60 hover:text-base-content"
            >
              reset
            </button>
          )}
        </form>

        <div className="ml-auto sm:ml-auto">
          <button
            onClick={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-content hover:bg-primary/90 transition shadow-sm shadow-primary/20"
          >
            <IconPlus size={14} />
            Tambah
          </button>
        </div>
      </div>

      <div className="border border-base-300 rounded-lg bg-base-100/80 backdrop-blur-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-3 border-b border-base-300 flex items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 min-w-0">
            <p className="text-sm font-semibold tracking-tight">
              <span className="num">{items.length}</span>
              <span className="text-base-content/60 font-normal"> transaksi</span>
            </p>
            <p className="text-xs text-base-content/50 truncate">
              Total{" "}
              <span className="num text-base-content/80">
                {formatRupiah(total)}
              </span>
              {activeFilters.length > 0 && (
                <span className="ml-2 text-base-content/40">
                  · {activeFilters.join(" · ")}
                </span>
              )}
            </p>
          </div>
          {loading && (
            <span className="text-xs text-base-content/40">memuat…</span>
          )}
        </div>

        {items.length === 0 && !loading ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-base-content/60">
              Tidak ada transaksi pada filter ini.
            </p>
            <button
              onClick={() => {
                setEditTarget(null);
                setFormOpen(true);
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-base-300 hover:bg-base-200 transition"
            >
              <IconPlus size={14} />
              Tambah transaksi pertama
            </button>
          </div>
        ) : (
          <>
            <ul className="md:hidden divide-y divide-base-300">
              {items.map((t) => (
                <li key={t.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{t.name}</p>
                      {t.note && (
                        <p className="text-xs text-base-content/50 truncate mt-0.5">
                          {t.note}
                        </p>
                      )}
                    </div>
                    <p className="num text-sm font-semibold whitespace-nowrap">
                      {formatRupiah(t.price)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-base-content/60 min-w-0">
                      <span
                        className="w-1.5 h-1.5 rounded-sm shrink-0"
                        style={{
                          backgroundColor:
                            KATEGORI_WARNA[t.category] || "#737373",
                        }}
                      />
                      <span className="truncate">
                        {KATEGORI_LABEL[t.category] || t.category}
                      </span>
                      <span className="text-base-content/30">·</span>
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
                        className="p-2 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200 active:bg-base-300 transition"
                        aria-label="Edit"
                      >
                        <IconPencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        className="p-2 rounded-md text-base-content/60 hover:text-error hover:bg-error/10 active:bg-error/20 transition"
                        aria-label="Hapus"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-base-content/50 bg-base-200/40">
                    <th className="text-left font-medium px-5 py-2.5 w-32">Tanggal</th>
                    <th className="text-left font-medium px-3 py-2.5">Nama</th>
                    <th className="text-left font-medium px-3 py-2.5 w-32">Kategori</th>
                    <th className="text-right font-medium px-3 py-2.5 w-36">Harga</th>
                    <th className="text-right font-medium px-5 py-2.5 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-base-300 hover:bg-base-200/40 transition group"
                    >
                      <td className="px-5 py-3 num text-base-content/70 whitespace-nowrap">
                        {formatTanggal(t.date)}
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium">{t.name}</p>
                        {t.note && (
                          <p className="text-xs text-base-content/50 truncate max-w-md mt-0.5">
                            {t.note}
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-base-content/70">
                          <span
                            className="w-1.5 h-1.5 rounded-sm"
                            style={{
                              backgroundColor:
                                KATEGORI_WARNA[t.category] || "#737373",
                            }}
                          />
                          {KATEGORI_LABEL[t.category] || t.category}
                        </span>
                      </td>
                      <td className="px-3 py-3 num text-right font-semibold whitespace-nowrap">
                        {formatRupiah(t.price)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-0.5">
                          <button
                            onClick={() => {
                              setEditTarget(t);
                              setFormOpen(true);
                            }}
                            className="p-1.5 rounded-md text-base-content/40 hover:text-base-content hover:bg-base-200 transition"
                            aria-label="Edit"
                            title="Edit"
                          >
                            <IconPencil size={14} />
                          </button>
                          <button
                            onClick={() => onDelete(t.id)}
                            className="p-1.5 rounded-md text-base-content/40 hover:text-error hover:bg-error/10 transition"
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
