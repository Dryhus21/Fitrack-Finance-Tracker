"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { tanggalInput } from "@/lib/format";
import { CategoryType } from "@/lib/validations";
import { IconX } from "@/components/icons";

export type TxFormValues = {
  name: string;
  price: number | string;
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
  { value: "PRIMER", label: "Primer", caption: "pokok", color: "#10b981" },
  { value: "SEKUNDER", label: "Sekunder", caption: "pendukung", color: "#a3a3a3" },
  { value: "URGENCY", label: "Urgensi", caption: "mendesak", color: "#f97316" },
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
      price: "",
      category: "PRIMER",
      date: tanggalInput(new Date()),
      note: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: initial?.name ?? "",
        price: initial?.price ?? "",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-md paper-card rounded-xl shadow-2xl animate-fade-up"
        style={{ animationDuration: "0.4s" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-content/8">
          <div>
            <p className="eyebrow text-base-content/45">
              {initial?.id ? "Mode ubah" : "Mode tambah"}
            </p>
            <h3 className="display text-lg tracking-tightest mt-0.5">
              {initial?.id ? (
                <>
                  Edit <em className="display-italic">transaksi</em>
                </>
              ) : (
                <>
                  <em className="display-italic">Transaksi</em> baru
                </>
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-base-200 text-base-content/55 hover:text-base-content transition press"
            aria-label="Tutup"
          >
            <IconX size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="px-5 py-5 space-y-4">
          <div>
            <label className="block eyebrow text-base-content/55 mb-2">
              Nama barang
            </label>
            <input
              {...register("name", {
                required: "Nama wajib diisi",
                maxLength: 120,
              })}
              className="w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition placeholder:text-base-content/30"
              placeholder="Beras 5kg"
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-error mt-1.5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-error" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block eyebrow text-base-content/55 mb-2">
                Harga
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 display-num text-sm text-base-content/45 leading-none">
                  Rp
                </span>
                <input
                  type="number"
                  step="1"
                  min="1"
                  {...register("price", {
                    required: "Harga wajib",
                    min: { value: 1, message: "Harus > 0" },
                    setValueAs: (v) => (v === "" || v === null ? "" : Number(v)),
                  })}
                  className="num w-full pl-9 pr-3 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition font-semibold tracking-tight"
                  placeholder="75000"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-error mt-1.5 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-error" />
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block eyebrow text-base-content/55 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                {...register("date", { required: "Tanggal wajib" })}
                className="num w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block eyebrow text-base-content/55 mb-2">
              Kategori
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {KATEGORI.map((c) => {
                const checked = currentCategory === c.value;
                return (
                  <label
                    key={c.value}
                    className={`relative flex flex-col gap-0.5 px-2 sm:px-3 py-2.5 border rounded-md cursor-pointer transition-all text-left press ${
                      checked
                        ? "border-primary bg-primary/10 shadow-sm shadow-primary/15"
                        : "border-base-content/12 hover:border-base-content/30 hover:bg-base-200/40"
                    }`}
                  >
                    <input
                      type="radio"
                      value={c.value}
                      {...register("category", { required: true })}
                      className="sr-only"
                    />
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{ backgroundColor: c.color }}
                        aria-hidden
                      />
                      <span
                        className={`text-xs sm:text-sm font-semibold ${checked ? "text-primary" : ""}`}
                      >
                        {c.label}
                      </span>
                    </span>
                    <span className="text-[10px] text-base-content/50 italic ml-3.5">
                      {c.caption}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block eyebrow text-base-content/55 mb-2">
              Catatan{" "}
              <span className="normal-case tracking-normal text-base-content/40 italic">
                opsional
              </span>
            </label>
            <textarea
              {...register("note", { maxLength: 500 })}
              className="w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition resize-none placeholder:text-base-content/30"
              rows={2}
              placeholder="Detail tambahan"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-sm rounded-md text-base-content/65 hover:text-base-content hover:bg-base-200 transition press font-medium"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="group px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-content hover:bg-primary/90 transition press disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary/25 inline-flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-content/50 animate-pulse" />
                  Menyimpan
                </>
              ) : (
                <>
                  {initial?.id ? "Simpan" : "Tambah"}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
