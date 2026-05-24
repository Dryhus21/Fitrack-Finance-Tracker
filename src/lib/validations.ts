import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(80),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").max(72),
});

export const categoryEnum = z.enum(["PRIMER", "SEKUNDER", "URGENCY"]);

export const transactionCreateSchema = z.object({
  name: z.string().min(1, "Nama barang wajib").max(120),
  price: z.coerce.number().positive("Harga harus lebih dari 0"),
  category: categoryEnum,
  date: z.coerce.date(),
  note: z.string().max(500).optional().nullable(),
});

export const transactionUpdateSchema = transactionCreateSchema.partial();

export type RegisterInput = z.infer<typeof registerSchema>;
export type TransactionCreateInput = z.infer<typeof transactionCreateSchema>;
export type TransactionUpdateInput = z.infer<typeof transactionUpdateSchema>;
export type CategoryType = z.infer<typeof categoryEnum>;
