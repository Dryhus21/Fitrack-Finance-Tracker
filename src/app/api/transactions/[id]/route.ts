import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { transactionUpdateSchema } from "@/lib/validations";

async function ensureOwnership(id: string, userId: string) {
  const t = await prisma.transaction.findUnique({ where: { id } });
  if (!t || t.userId !== userId) return null;
  return t;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await ensureOwnership(id, session.user.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const parsed = transactionUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data: Prisma.TransactionUpdateInput = {};
    if (parsed.data.name !== undefined) data.name = parsed.data.name;
    if (parsed.data.price !== undefined)
      data.price = new Prisma.Decimal(parsed.data.price);
    if (parsed.data.category !== undefined) data.category = parsed.data.category;
    if (parsed.data.date !== undefined) data.date = parsed.data.date;
    if (parsed.data.note !== undefined) data.note = parsed.data.note ?? null;

    const updated = await prisma.transaction.update({ where: { id }, data });

    revalidateTag(`user-${session.user.id}`);
    return NextResponse.json({
      transaction: { ...updated, price: updated.price.toString() },
    });
  } catch (err) {
    console.error("update transaction error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await ensureOwnership(id, session.user.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.transaction.delete({ where: { id } });
  revalidateTag(`user-${session.user.id}`);
  return NextResponse.json({ ok: true });
}
