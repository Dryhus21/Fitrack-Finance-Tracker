import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard, HeroStat } from "@/components/dashboard/StatCard";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { MonthlyBarChart } from "@/components/dashboard/MonthlyBarChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { IconCalendar, IconCircleDot } from "@/components/icons";
import {
  formatRupiah,
  formatBulan,
  bulanInput,
  KATEGORI_LABEL,
  KATEGORI_WARNA,
} from "@/lib/format";
import { format } from "date-fns";

type SP = Promise<{ month?: string }>;

function monthRange(monthStr?: string) {
  const now = new Date();
  let year: number;
  let m: number;
  if (monthStr && /^\d{4}-\d{2}$/.test(monthStr)) {
    const [y, mm] = monthStr.split("-").map(Number);
    year = y;
    m = mm - 1;
  } else {
    year = now.getUTCFullYear();
    m = now.getUTCMonth();
  }
  const start = new Date(Date.UTC(year, m, 1));
  const end = new Date(Date.UTC(year, m + 1, 1));
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  return { start, end, year, m, daysInMonth };
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const sp = await searchParams;
  const monthKey = sp.month || bulanInput(new Date());
  const { start, end, daysInMonth } = monthRange(monthKey);

  const prevStart = new Date(start);
  prevStart.setUTCMonth(prevStart.getUTCMonth() - 1);

  const fetchDashboardData = unstable_cache(
    async () => {
      const twelveStart = new Date(start);
      twelveStart.setUTCMonth(twelveStart.getUTCMonth() - 11);
      const [monthTxRaw, prevMonthTxRaw, recentRaw, twelveRaw] = await Promise.all([
        prisma.transaction.findMany({
          where: { userId, date: { gte: start, lt: end } },
          orderBy: { date: "desc" },
        }),
        prisma.transaction.findMany({
          where: { userId, date: { gte: prevStart, lt: start } },
          select: { price: true },
        }),
        prisma.transaction.findMany({
          where: { userId },
          orderBy: { date: "desc" },
          take: 5,
        }),
        prisma.transaction.findMany({
          where: { userId, date: { gte: twelveStart, lt: end } },
          select: { price: true, date: true },
        }),
      ]);
      // Serialize Decimal + Date before caching — unstable_cache stores as JSON
      return {
        monthTx: monthTxRaw.map((t) => ({ ...t, price: t.price.toString(), date: t.date.toISOString(), createdAt: t.createdAt.toISOString(), updatedAt: t.updatedAt.toISOString() })),
        prevMonthTx: prevMonthTxRaw.map((t) => ({ price: t.price.toString() })),
        recent: recentRaw.map((t) => ({ ...t, price: t.price.toString(), date: t.date.toISOString(), createdAt: t.createdAt.toISOString(), updatedAt: t.updatedAt.toISOString() })),
        twelveMonthsTx: twelveRaw.map((t) => ({ price: t.price.toString(), date: t.date.toISOString() })),
      };
    },
    [`dashboard-${userId}-${monthKey}`],
    { revalidate: 60, tags: [`user-${userId}`] },
  );

  const { monthTx, prevMonthTx, recent, twelveMonthsTx } = await fetchDashboardData();

  const total = monthTx.reduce((s, t) => s + Number(t.price), 0);
  const count = monthTx.length;
  const average = count > 0 ? total / daysInMonth : 0;
  const prevTotal = prevMonthTx.reduce((s, t) => s + Number(t.price), 0);
  const deltaPct =
    prevTotal > 0 ? ((total - prevTotal) / prevTotal) * 100 : null;

  const byCatMap: Record<string, number> = { PRIMER: 0, SEKUNDER: 0, URGENCY: 0 };
  for (const t of monthTx) byCatMap[t.category] += Number(t.price);
  const byCategory = Object.entries(byCatMap).map(([category, value]) => ({
    category,
    value,
  }));
  const topCategory = byCategory.reduce(
    (max, c) => (c.value > max.value ? c : max),
    { category: "-", value: 0 },
  ).category;

  const monthBuckets: { label: string; key: string; total: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCMonth(d.getUTCMonth() - 1 - i);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    monthBuckets.push({
      label: d.toLocaleString("id-ID", { month: "short" }),
      key,
      total: 0,
    });
  }
  for (const t of twelveMonthsTx) {
    const d = new Date(t.date);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    const b = monthBuckets.find((x) => x.key === key);
    if (b) b.total += Number(t.price);
  }

  const monthStampLabel = format(start, "MMM ''yy").toUpperCase();

  return (
    <>
      <Topbar
        title="Overview"
        subtitle={formatBulan(start)}
        rightSlot={<MonthSelector currentMonth={monthKey} />}
      />
      <div className="px-4 sm:px-5 md:px-8 py-5 md:py-6 space-y-5 md:space-y-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 stagger">
          <div className="lg:col-span-2">
            <HeroStat
              label={`Pengeluaran ${formatBulan(start)}`}
              amount={total}
              txCount={count}
              delta={deltaPct}
              sparkline={monthBuckets.map((b) => b.total)}
              monthLabel={monthStampLabel}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <StatCard
              label="Rata-rata / hari"
              value={formatRupiah(average)}
              hint={`dibagi ${daysInMonth} hari`}
              icon={<IconCalendar size={14} />}
            />
            <StatCard
              label="Kategori terbesar"
              value={KATEGORI_LABEL[topCategory] || "—"}
              hint={
                topCategory !== "-"
                  ? formatRupiah(byCatMap[topCategory])
                  : "belum ada"
              }
              icon={<IconCircleDot size={14} />}
              accentColor={
                topCategory !== "-" ? KATEGORI_WARNA[topCategory] : undefined
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 stagger">
          <div className="lg:col-span-2">
            <CategoryPieChart data={byCategory} />
          </div>
          <div className="lg:col-span-3">
            <MonthlyBarChart data={monthBuckets} highlightKey={monthKey} />
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <RecentTransactions
            items={recent.map((t) => ({
              id: t.id,
              name: t.name,
              price: t.price,
              category: t.category,
              date: t.date,
            }))}
          />
        </div>
      </div>
    </>
  );
}
