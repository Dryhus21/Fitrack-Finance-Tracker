import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function monthRange(monthStr: string | null) {
  const now = new Date();
  let year: number;
  let monthIdx: number;
  if (monthStr && /^\d{4}-\d{2}$/.test(monthStr)) {
    const [y, m] = monthStr.split("-").map(Number);
    year = y;
    monthIdx = m - 1;
  } else {
    year = now.getUTCFullYear();
    monthIdx = now.getUTCMonth();
  }
  const start = new Date(Date.UTC(year, monthIdx, 1));
  const end = new Date(Date.UTC(year, monthIdx + 1, 1));
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  return { start, end, year, monthIdx, daysInMonth };
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const { searchParams } = new URL(req.url);
  const { start, end, daysInMonth } = monthRange(searchParams.get("month"));

  const inRange = await prisma.transaction.findMany({
    where: { userId, date: { gte: start, lt: end } },
    select: { price: true, category: true },
  });

  const total = inRange.reduce((sum, t) => sum + Number(t.price), 0);
  const count = inRange.length;
  const average = count > 0 ? total / daysInMonth : 0;

  const byCategoryMap: Record<string, number> = {
    PRIMER: 0,
    SEKUNDER: 0,
    URGENCY: 0,
  };
  for (const t of inRange) {
    byCategoryMap[t.category] += Number(t.price);
  }
  const byCategory = Object.entries(byCategoryMap).map(([category, value]) => ({
    category,
    value,
  }));

  const topCategory =
    byCategory.reduce((max, cur) => (cur.value > max.value ? cur : max), {
      category: "-",
      value: 0,
    }).category;

  const twelveStart = new Date(start);
  twelveStart.setUTCMonth(twelveStart.getUTCMonth() - 11);

  const allLastYear = await prisma.transaction.findMany({
    where: { userId, date: { gte: twelveStart, lt: end } },
    select: { price: true, date: true },
  });

  const monthBuckets: { label: string; key: string; total: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCMonth(d.getUTCMonth() - 1 - i);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    monthBuckets.push({
      label: d.toLocaleString("id-ID", { month: "short", year: "2-digit" }),
      key,
      total: 0,
    });
  }
  for (const t of allLastYear) {
    const d = new Date(t.date);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    const bucket = monthBuckets.find((b) => b.key === key);
    if (bucket) bucket.total += Number(t.price);
  }

  return NextResponse.json(
    {
      total,
      average,
      count,
      topCategory,
      byCategory,
      byMonth: monthBuckets,
    },
    {
      headers: {
        "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
      },
    },
  );
}
