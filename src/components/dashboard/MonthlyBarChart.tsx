"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
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
    <div className="paper-card rounded-md shadow-xl px-3.5 py-2.5 text-xs">
      <p className="eyebrow text-base-content/55">{item.payload.label}</p>
      <p className="num font-semibold text-sm mt-1 text-base-content">
        {formatRupiah(item.value)}
      </p>
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

  const avg = useMemo(() => {
    const nonZero = data.filter((d) => d.total > 0);
    if (nonZero.length === 0) return 0;
    return nonZero.reduce((s, d) => s + d.total, 0) / nonZero.length;
  }, [data]);

  const peak = useMemo(
    () => data.reduce<Item | null>((m, d) => (!m || d.total > m.total ? d : m), null),
    [data],
  );

  return (
    <section className="paper-card rounded-xl overflow-hidden">
      <header className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-base-content/45">Histori</p>
          <h3 className="display text-xl mt-1.5 tracking-tightest leading-tight">
            Tren <em className="display-italic">12 bulan</em>
          </h3>
        </div>
        {hasData && peak && peak.total > 0 && (
          <div className="text-right">
            <p className="eyebrow text-base-content/40">Puncak</p>
            <p className="num text-xs font-semibold mt-1 text-accent">
              {formatRupiahShort(peak.total)}
            </p>
            <p className="text-[10px] text-base-content/45">{peak.label}</p>
          </div>
        )}
      </header>

      <div className="px-2 pb-4">
        <div className="h-60">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 12, right: 16, left: 8, bottom: 0 }}
                barCategoryGap={10}
              >
                <defs>
                  <linearGradient
                    id="bar-active-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={0.45}
                    />
                  </linearGradient>
                  <linearGradient
                    id="bar-dim-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(140 140 140)"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(140 140 140)"
                      stopOpacity={0.12}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="rgb(140 140 140 / 0.15)"
                  strokeDasharray="2 6"
                />
                <XAxis
                  dataKey="label"
                  stroke="rgb(140 140 140 / 0.6)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  fontFamily="var(--font-geist)"
                />
                <YAxis
                  stroke="rgb(140 140 140 / 0.6)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => formatRupiahShort(v)}
                  width={52}
                  fontFamily="var(--font-geist), system-ui, sans-serif"
                />
                {avg > 0 && (
                  <ReferenceLine
                    y={avg}
                    stroke="rgb(140 140 140 / 0.4)"
                    strokeDasharray="4 4"
                    label={{
                      value: `rata ${formatRupiahShort(avg)}`,
                      position: "insideTopLeft",
                      fill: "rgb(140 140 140 / 0.7)",
                      fontSize: 9,
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                    }}
                  />
                )}
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgb(140 140 140 / 0.08)" }}
                  animationDuration={150}
                />
                <Bar
                  dataKey="total"
                  radius={[5, 5, 0, 0]}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={
                        entry.key === highlightKey
                          ? "url(#bar-active-grad)"
                          : "url(#bar-dim-grad)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
              <svg
                width="80"
                height="48"
                viewBox="0 0 80 48"
                className="text-base-content/15"
                aria-hidden
              >
                {[8, 22, 36, 50, 64].map((x, i) => (
                  <rect
                    key={x}
                    x={x}
                    y={48 - (i % 3) * 8 - 8}
                    width="6"
                    height={(i % 3) * 8 + 8}
                    fill="currentColor"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </svg>
              <p className="text-sm text-base-content/50 italic display-italic">
                Belum ada riwayat 12 bulan
              </p>
            </div>
          )}
        </div>

        {hasData && (
          <div className="px-3 pt-3 mt-1 flex items-center gap-4 text-[10px] uppercase tracking-wider text-base-content/40 border-t border-base-content/5">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-primary" />
              Bulan aktif
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-base-content/30" />
              Bulan lain
            </span>
            {avg > 0 && (
              <span className="flex items-center gap-1.5 ml-auto">
                <span className="w-4 h-px border-t border-dashed border-base-content/40" />
                Rata-rata
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
