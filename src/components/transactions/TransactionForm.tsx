"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { tanggalInput } from "@/lib/format";
import { CategoryType } from "@/lib/validations";
import { IconX } from "@/components/icons";

export type TxFormValues = {
  name: string;
  price: number;
  category: CategoryType;
  date: string;
  note?: string;
};

type Props = {
  open: boolean;
  initial?: Partial<TxFormValues> & { id?: string };
  onClose: () => void;
  onSubmit: (values: TxFormValues, id?: string) => Promise<void>;
};

const KATEGORI = [
  { value: "PRIMER", label: "Primer", caption: "Kebutuhan pokok" },
  { value: "SEKUNDER", label: "Sekunder", caption: "Pendukung" },
  { value: "URGENCY", label: "Urgensi", caption: "Mendesak" },
] as const;

export function TransactionForm({ open, initial, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TxFormValues>({
    defaultValues: {
      name: "",
      price: 0,
      category: "PRIMER",
      date: tanggalInput(new Date()),
      note: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: initial?.name ?? "",
        price: initial?.price ?? 0,
        category: (initial?.category as CategoryType) ?? "PRIMER",
        date: initial?.date ?? tanggalInput(new Date()),
        note: initial?.note ?? "",
      });
    }
  }, [open, initial, reset]);

  if (!open) return null;

  const submit = handleSubmit(async (values) => {
    await onSubmit(values, initial?.id);
  });
  const currentCategory = watch("category");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-lg shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-base-300">
          <h3 className="text-sm font-semibold tracking-tight">
            {initial?.id ? "Ubah transaksi" : "Transaksi baru"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-base-200 text-base-content/60 hover:text-base-content transition"
            aria-label="Tutup"
          >
            <IconX size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="px-5 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-base-content/70 mb-1.5">
              Nama barang
            </label>
            <input
              {...register("name", { required: "Nama wajib diisi", maxLength: 120 })}
              className="w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
              placeholder="Beras 5kg"
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-error mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-base-content/70 mb-1.5">
                Harga
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-base-content/40">
                  Rp
                </span>
                <input
                  type="number"
                  step="1"
                  min="1"
                  {...register("price", {
                    required: "Harga wajib",
                    valueAsNumber: true,
                    min: { value: 1, message: "Harus > 0" },
                  })}
                  className="num w-full pl-9 pr-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
                  placeholder="75000"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-error mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-base-content/70 mb-1.5">
                Tanggal
              </label>
              <input
                type="date"
                {...register("date", { required: "Tanggal wajib" })}
                className="num w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-base-content/70 mb-1.5">
              Kategori
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {KATEGORI.map((c) => {
                const checked = currentCategory === c.value;
                return (
                  <label
                    key={c.value}
                    className={`relative flex flex-col gap-0.5 px-3 py-2 border rounded-md cursor-pointer transition text-left ${
                      checked
                        ? "border-primary bg-primary/[0.08]"
                        : "border-base-300 hover:border-base-content/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value={c.value}
                      {...register("category", { required: true })}
                      className="sr-only"
                    />
                    <span
                      className={`text-sm font-medium ${checked ? "text-primary" : ""}`}
                    >
                      {c.label}
                    </span>
                    <span className="text-[10px] text-base-content/50">
                      {c.caption}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-base-content/70 mb-1.5">
              Catatan <span className="text-base-content/40">(opsional)</span>
            </label>
            <textarea
              {...register("note", { maxLength: 500 })}
              className="w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition resize-none"
              rows={2}
              placeholder="Detail tambahan"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm rounded-md text-base-content/70 hover:text-base-content hover:bg-base-200 transition"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-content hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan…" : initial?.id ? "Simpan" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
