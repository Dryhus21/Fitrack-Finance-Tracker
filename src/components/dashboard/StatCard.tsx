"use client";

import { IconTrendingDown, IconTrendingUp } from "@/components/icons";
import { AnimatedNumber } from "./AnimatedNumber";

type StatProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  accentColor?: string;
};

export function StatCard({ label, value, hint, icon, accentColor }: StatProps) {
  return (
    <div className="relative paper-card rounded-xl px-5 py-4 overflow-hidden group lift">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow text-base-content/45">{label}</p>
        {icon && (
          <span
            className="text-base-content/40 group-hover:text-base-content/80 transition-all duration-300 group-hover:scale-110"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {icon}
          </span>
        )}
      </div>

      <p className="num mt-3 text-xl font-semibold tracking-tightest leading-none">
        {value}
      </p>

      {hint && (
        <p className="text-[11px] text-base-content/50 mt-1.5 font-medium">
          {hint}
        </p>
      )}

      <div
        className="absolute left-5 right-5 bottom-0 h-px overflow-hidden"
        aria-hidden
      >
        <span
          className="block h-full bg-gradient-to-r from-transparent via-base-content/15 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"
          style={
            accentColor
              ? {
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

type HeroProps = {
  label: string;
  amount: number;
  txCount: number;
  delta?: number | null;
  sparkline?: number[];
  monthLabel: string;
};

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 132;
  const h = 40;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return [x, y] as const;
  });
  const path = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${path} L${w},${h} L0,${h} Z`;
  const lastX = points[points.length - 1][0];
  const lastY = points[points.length - 1][1];

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spark-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-fill)" />
      <path
        d={path}
        fill="none"
        stroke="url(#spark-stroke)"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="draw-line"
        style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
      />
      <circle
        cx={lastX}
        cy={lastY}
        r="6"
        fill="hsl(160 84% 39%)"
        fillOpacity="0.18"
        className="animate-pulse-glow"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill="hsl(160 84% 39%)" />
    </svg>
  );
}

export function HeroStat({
  label,
  amount,
  txCount,
  delta,
  sparkline,
  monthLabel,
}: HeroProps) {
  const showTrend = delta !== null && delta !== undefined;
  const trendUp = showTrend && (delta as number) > 0;
  const trendDown = showTrend && (delta as number) < 0;

  return (
    <article className="accent-stripe-l relative overflow-hidden paper-card rounded-xl px-6 py-7 md:px-9 md:py-9 group">
      {/* Atmospheric backdrop */}
      <div
        className="absolute -right-16 -top-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(160 84% 39% / 0.08), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -left-10 -bottom-20 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(20 91% 48% / 0.045), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Tilted stamp */}
      <div className="absolute top-6 right-5 md:top-7 md:right-7 stamp text-base-content/55 hidden sm:inline-flex">
        {monthLabel}
      </div>

      <div className="relative">
        <p className="eyebrow text-base-content/55">{label}</p>

        <div className="mt-3 md:mt-4 flex items-baseline gap-2 md:gap-3 flex-wrap">
          <span className="display-num text-base-content/45 text-3xl md:text-4xl mr-0.5">
            Rp
          </span>
          <h2 className="display-num text-5xl md:text-7xl leading-none text-base-content reveal-num">
            <AnimatedNumber
              value={amount}
              format={(n) =>
                Math.round(n).toLocaleString("id-ID", {
                  maximumFractionDigits: 0,
                })
              }
            />
          </h2>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <div className="flex items-center gap-2 text-base-content/65">
            <span className="num text-base-content/85 font-semibold">
              {txCount}
            </span>
            <span>transaksi tercatat</span>
          </div>

          {showTrend && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  trendUp
                    ? "text-error bg-error/12"
                    : trendDown
                      ? "text-primary bg-primary/12"
                      : "text-base-content/55 bg-base-200"
                }`}
              >
                {trendUp ? (
                  <IconTrendingUp size={12} />
                ) : trendDown ? (
                  <IconTrendingDown size={12} />
                ) : null}
                <span className="num">
                  {trendUp ? "+" : ""}
                  {(delta as number).toFixed(1)}%
                </span>
              </span>
              <span className="text-xs text-base-content/50">
                vs bulan sebelumnya
              </span>
            </div>
          )}

          {!showTrend && (
            <span className="text-xs text-base-content/45 italic">
              belum ada pembanding bulan lalu
            </span>
          )}
        </div>

        {sparkline && sparkline.length >= 2 && (
          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="eyebrow text-base-content/40">
                Tren 12 bulan
              </span>
              <span className="w-8 h-px bg-base-content/15" aria-hidden />
            </div>
            <Sparkline data={sparkline} />
          </div>
        )}
      </div>
    </article>
  );
}
