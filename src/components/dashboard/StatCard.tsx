import { IconTrendingDown, IconTrendingUp } from "@/components/icons";

type StatProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  accentColor?: string;
};

export function StatCard({ label, value, hint, icon, accentColor }: StatProps) {
  return (
    <div className="relative px-5 py-4 border border-base-300 rounded-lg bg-base-100/80 backdrop-blur-sm overflow-hidden group hover:border-base-content/20 transition">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-base-content/50">
          {label}
        </p>
        {icon && (
          <span
            className="text-base-content/40 group-hover:text-base-content/70 transition"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="num mt-2 text-xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="text-xs text-base-content/50 mt-1">{hint}</p>}
      <span
        className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-base-content/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}

type HeroProps = {
  label: string;
  value: string;
  meta?: string;
  delta?: number | null;
  sub?: React.ReactNode;
  sparkline?: number[];
};

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 96;
  const h = 32;
  const step = data.length > 1 ? w / (data.length - 1) : 0;
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
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-fill)" className="text-primary" />
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="text-primary"
      />
      <circle cx={lastX} cy={lastY} r="2.5" className="fill-primary" />
      <circle
        cx={lastX}
        cy={lastY}
        r="5"
        className="fill-primary/20"
      />
    </svg>
  );
}

export function HeroStat({
  label,
  value,
  meta,
  delta,
  sub,
  sparkline,
}: HeroProps) {
  const showTrend = delta !== null && delta !== undefined;
  const trendUp = showTrend && (delta as number) > 0;
  const trendDown = showTrend && (delta as number) < 0;

  return (
    <div className="accent-stripe-l relative overflow-hidden border border-base-300 rounded-lg bg-base-100/80 backdrop-blur-sm px-6 py-7 md:px-8 md:py-8">
      <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-primary/[0.08] via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-primary/[0.05] blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-base-content/50">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="num text-3xl md:text-4xl font-semibold tracking-tightest">
              {value}
            </span>
            {showTrend && (
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded ${
                  trendUp
                    ? "text-error bg-error/10"
                    : trendDown
                      ? "text-primary bg-primary/10"
                      : "text-base-content/50 bg-base-200"
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
            )}
            {meta && (
              <span className="text-xs text-base-content/50">{meta}</span>
            )}
          </div>
          {sub && <div className="mt-3 text-sm text-base-content/70">{sub}</div>}
        </div>

        {sparkline && sparkline.length >= 2 && (
          <div className="shrink-0 self-start sm:self-end">
            <Sparkline data={sparkline} />
            <p className="text-[10px] uppercase tracking-wider text-base-content/40 mt-1 text-right">
              12 bulan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
