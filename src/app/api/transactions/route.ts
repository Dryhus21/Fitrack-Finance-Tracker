import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  transactionCreateSchema,
  categoryEnum,
} from "@/lib/validations";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Prisma.TransactionWhereInput = { userId: session.user.id };

  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const [y, m] = month.split("-").map(Number);
    const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(y, m, 1, 0, 0, 0));
    where.date = { gte: start, lt: end };
  }
  if (category) {
    const parsed = categoryEnum.safeParse(category);
    if (parsed.success) where.category = parsed.data;
  }
  if (search) {
    where.name = { contains: search };
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 500,
  });

  return NextResponse.json(
    {
      transactions: transactions.map((t) => ({
        ...t,
        price: t.price.toString(),
      })),
    },
    {
      headers: {
        "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
      },
    },
  );
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = transactionCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const created = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        name: parsed.data.name,
        price: new Prisma.Decimal(parsed.data.price),
        category: parsed.data.category,
        date: parsed.data.date,
        note: parsed.data.note ?? null,
      },
    });

    revalidateTag(`user-${session.user.id}`);
    return NextResponse.json(
      { transaction: { ...created, price: created.price.toString() } },
      { status: 201 },
    );
  } catch (err) {
    console.error("create transaction error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
