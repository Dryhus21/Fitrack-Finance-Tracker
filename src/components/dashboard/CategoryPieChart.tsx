"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { KATEGORI_LABEL, KATEGORI_WARNA, formatRupiah } from "@/lib/format";
import { AnimatedNumber } from "./AnimatedNumber";

type Item = { category: string; value: number };

type SectorProps = {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
};

type TipPayload = {
  name: string;
  value: number;
  payload: Item;
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TipPayload[];
}) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="paper-card rounded-md shadow-lg px-3.5 py-2.5 text-xs">
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-sm"
          style={{
            backgroundColor: KATEGORI_WARNA[item.payload.category] || "#737373",
          }}
        />
        <span className="text-base-content/80 font-semibold tracking-wide">
          {KATEGORI_LABEL[item.payload.category] || item.payload.category}
        </span>
      </div>
      <p className="num mt-1.5 font-semibold text-sm text-base-content">
        {formatRupiah(item.value)}
      </p>
    </div>
  );
}

const renderActiveShape = (props: SectorProps) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius ?? 0) + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={(outerRadius ?? 0) + 8}
        outerRadius={(outerRadius ?? 0) + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.25}
      />
    </g>
  );
};

export function CategoryPieChart({ data }: { data: Item[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const hasData = total > 0;
  const filtered = data.filter((d) => d.value > 0);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Find dominant category
  const dominant = filtered.reduce<Item | null>(
    (max, cur) => (!max || cur.value > max.value ? cur : max),
    null,
  );

  return (
    <section className="paper-card rounded-xl overflow-hidden">
      <header className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-base-content/45">Komposisi</p>
          <h3 className="display text-xl mt-1.5 tracking-tightest leading-tight">
            Distribusi <em className="display-italic">kebutuhan</em>
          </h3>
        </div>
        {hasData && dominant && (
          <div className="text-right">
            <p className="eyebrow text-base-content/40">Dominan</p>
            <p
              className="text-sm font-semibold mt-1"
              style={{ color: KATEGORI_WARNA[dominant.category] }}
            >
              {KATEGORI_LABEL[dominant.category]}
            </p>
          </div>
        )}
      </header>

      <div className="px-5 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-5 items-center">
          <div className="h-60 relative">
            {hasData ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filtered}
                      dataKey="value"
                      nameKey="category"
                      innerRadius={68}
                      outerRadius={94}
                      paddingAngle={3}
                      strokeWidth={0}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, i) => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(undefined)}
                      animationDuration={900}
                      animationEasing="ease-out"
                    >
                      {filtered.map((entry) => (
                        <Cell
                          key={entry.category}
                          fill={KATEGORI_WARNA[entry.category] || "#737373"}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="eyebrow text-base-content/40">Total</span>
                  <span className="num text-sm md:text-base font-semibold mt-1 text-base-content/90">
                    <AnimatedNumber
                      value={total}
                      format={(n) =>
                        formatRupiah(Math.round(n)).replace(/Rp/, "Rp ")
                      }
                    />
                  </span>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  className="text-base-content/15 animate-float"
                  aria-hidden
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="3 5"
                  />
                  <circle cx="32" cy="32" r="3" fill="currentColor" />
                </svg>
                <p className="text-sm text-base-content/50 italic display-italic">
                  Belum ada pengeluaran
                </p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            {data.map((item) => {
              const pct = total > 0 ? (item.value / total) * 100 : 0;
              const filteredIdx = filtered.findIndex(
                (f) => f.category === item.category,
              );
              const isHover = filteredIdx === activeIndex;
              return (
                <button
                  key={item.category}
                  type="button"
                  onMouseEnter={() =>
                    filteredIdx >= 0 && setActiveIndex(filteredIdx)
                  }
                  onMouseLeave={() => setActiveIndex(undefined)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg transition-all duration-300 ${
                    isHover
                      ? "bg-base-200/70 translate-x-0.5"
                      : "hover:bg-base-200/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-sm shrink-0 transition-transform ${isHover ? "scale-125" : ""}`}
                        style={{
                          backgroundColor:
                            KATEGORI_WARNA[item.category] || "#737373",
                        }}
                      />
                      <span className="text-base-content/85 font-medium truncate">
                        {KATEGORI_LABEL[item.category] || item.category}
                      </span>
                    </div>
                    <span className="num text-xs text-base-content/55 font-medium shrink-0">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <p className="num pl-[18px] text-xs text-base-content/65 mt-0.5 font-medium">
                    {formatRupiah(item.value)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
