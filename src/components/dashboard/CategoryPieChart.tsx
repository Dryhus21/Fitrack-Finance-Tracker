"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { KATEGORI_LABEL, KATEGORI_WARNA, formatRupiah } from "@/lib/format";

type SectorProps = {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
};

type Item = { category: string; value: number };

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
    <div className="bg-base-200 border border-base-300 rounded-md shadow-lg px-3 py-2 text-xs">
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-sm"
          style={{
            backgroundColor: KATEGORI_WARNA[item.payload.category] || "#737373",
          }}
        />
        <span className="text-base-content/80 font-medium">
          {KATEGORI_LABEL[item.payload.category] || item.payload.category}
        </span>
      </div>
      <p className="num mt-1 font-semibold text-sm">
        {formatRupiah(item.value)}
      </p>
    </div>
  );
}

const renderActiveShape = (props: SectorProps) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={(outerRadius ?? 0) + 4}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

export function CategoryPieChart({ data }: { data: Item[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const hasData = total > 0;
  const filtered = data.filter((d) => d.value > 0);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  return (
    <div className="border border-base-300 rounded-lg bg-base-100/80 backdrop-blur-sm">
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-sm font-semibold tracking-tight">
          Komposisi Pengeluaran
        </h3>
        <p className="text-xs text-base-content/50 mt-0.5">
          Distribusi berdasarkan kebutuhan
        </p>
      </div>

      <div className="px-5 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4 items-center">
          <div className="h-56 relative">
            {hasData ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filtered}
                      dataKey="value"
                      nameKey="category"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={2}
                      strokeWidth={0}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, i) => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(undefined)}
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
                  <span className="text-[10px] uppercase tracking-wider text-base-content/40">
                    Total
                  </span>
                  <span className="num text-sm md:text-base font-semibold mt-0.5">
                    {formatRupiah(total)}
                  </span>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-base-content/40">
                Belum ada pengeluaran
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            {data.map((item) => {
              const pct = total > 0 ? (item.value / total) * 100 : 0;
              const filteredIdx = filtered.findIndex(
                (f) => f.category === item.category,
              );
              const isHover = filteredIdx === activeIndex;
              return (
                <div
                  key={item.category}
                  onMouseEnter={() =>
                    filteredIdx >= 0 && setActiveIndex(filteredIdx)
                  }
                  onMouseLeave={() => setActiveIndex(undefined)}
                  className={`px-2 -mx-2 py-1 rounded-md transition ${
                    isHover ? "bg-base-200/60" : ""
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{
                          backgroundColor:
                            KATEGORI_WARNA[item.category] || "#737373",
                        }}
                      />
                      <span className="text-base-content/80">
                        {KATEGORI_LABEL[item.category] || item.category}
                      </span>
                    </div>
                    <span className="num text-xs text-base-content/50">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <p className="num pl-4 text-xs text-base-content/60 mt-0.5">
                    {formatRupiah(item.value)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
