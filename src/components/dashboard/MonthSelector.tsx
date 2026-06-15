"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { bulanInput } from "@/lib/format";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";

export function MonthSelector({ currentMonth }: { currentMonth: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const setMonth = (val: string) => {
    const params = new URLSearchParams(sp.toString());
    if (val) params.set("month", val);
    else params.delete("month");
    router.push(`${pathname}?${params.toString()}`);
  };

  const shift = (delta: number) => {
    const [y, m] = currentMonth.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 1 + delta, 1));
    setMonth(
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
    );
  };

  const isCurrent = currentMonth === bulanInput(new Date());

  return (
    <div className="inline-flex items-center gap-0.5 border border-base-content/10 rounded-md bg-base-100/80 backdrop-blur-sm p-0.5 w-full sm:w-auto shadow-sm">
      <button
        onClick={() => shift(-1)}
        className="p-1.5 rounded text-base-content/55 hover:text-base-content hover:bg-base-200 transition press shrink-0"
        aria-label="Bulan sebelumnya"
      >
        <IconChevronLeft size={15} />
      </button>
      <input
        type="month"
        value={currentMonth}
        onChange={(e) => setMonth(e.target.value)}
        className="bg-transparent text-sm px-1.5 py-1 num focus:outline-none focus-ring rounded flex-1 sm:flex-initial sm:w-[8.5rem] min-w-0 text-base-content/90 font-medium"
      />
      <button
        onClick={() => shift(1)}
        className="p-1.5 rounded text-base-content/55 hover:text-base-content hover:bg-base-200 transition press shrink-0"
        aria-label="Bulan berikutnya"
      >
        <IconChevronRight size={15} />
      </button>
      {!isCurrent && (
        <button
          onClick={() => setMonth(bulanInput(new Date()))}
          className="text-xs px-2.5 py-1 ml-0.5 rounded text-base-content/65 hover:text-primary hover:bg-primary/10 shrink-0 whitespace-nowrap transition press font-medium border-l border-base-content/8"
          title="Kembali ke bulan ini"
        >
          Kini
        </button>
      )}
    </div>
  );
}
