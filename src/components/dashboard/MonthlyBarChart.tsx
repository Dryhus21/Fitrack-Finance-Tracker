"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatRupiah, formatRupiahShort } from "@/lib/format";

type Item = { label: string; key: string; total: number };

type TipPayload = {
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
      <p className="text-base-content/60 mb-0.5">{item.payload.label}</p>
      <p className="num font-semibold text-sm">{formatRupiah(item.value)}</p>
    </div>
  );
}

export function MonthlyBarChart({
  data,
  highlightKey,
}: {
  data: Item[];
  highlightKey?: string;
}) {
  const hasData = data.some((d) => d.total > 0);

  return (
    <div className="border border-base-300 rounded-lg bg-base-100/80 backdrop-blur-sm">
      <div className="px-5 pt-5 pb-2 flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Tren 12 Bulan</h3>
          <p className="text-xs text-base-content/50 mt-0.5">
            Pengeluaran bulanan terakhir
          </p>
        </div>
        {hasData && (
          <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-wider text-base-content/40">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-primary" />
              Aktif
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-base-content/30" />
              Bulan lain
            </span>
          </div>
        )}
      </div>

      <div className="px-2 pb-3">
        <div className="h-56">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
                barCategoryGap={8}
              >
                <defs>
                  <linearGradient id="bar-active" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="bar-dim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#737373" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#737373" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="rgb(115 115 115 / 0.15)"
                  strokeDasharray="2 4"
                />
                <XAxis
                  dataKey="label"
                  stroke="rgb(163 163 163 / 0.5)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />
                <YAxis
                  stroke="rgb(163 163 163 / 0.5)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => formatRupiahShort(v)}
                  width={48}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgb(115 115 115 / 0.08)" }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {data.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={
                        entry.key === highlightKey
                          ? "url(#bar-active)"
                          : "url(#bar-dim)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-base-content/40">
              Belum ada data 12 bulan terakhir
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
