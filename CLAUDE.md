# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Finance Tracker — multi-user personal expense tracker with category buckets (Primer / Sekunder / Urgensi), pie/bar charts, and monthly filtering. UI is in Bahasa Indonesia (`lang="id"`, zod error messages and labels in Indonesian).

## Stack

- Next.js 15 App Router + TypeScript (strict)
- Prisma 5 + MySQL (local: XAMPP/phpMyAdmin on `finance_app`)
- NextAuth v5 beta (Credentials provider, JWT session) + bcryptjs
- Tailwind + DaisyUI (custom themes `finance` dark / `financeLight` light)
- Recharts, react-hook-form, zod, date-fns (id locale)

Path alias: `@/*` → `src/*`.

## Commands

```bash
npm run dev                    # next dev on :3000
npm run build                  # next build
npm start                      # production
npm run lint                   # next lint (eslint-config-next)
npx prisma migrate dev --name <name>   # create + apply migration in dev
npx prisma migrate deploy      # apply migrations in prod
npx prisma db push             # push schema without migration history (fallback)
npx prisma studio              # GUI for DB
npx prisma generate            # runs automatically via `postinstall`
```

There is no test runner configured. Type checking happens via `next build`.

## Architecture

### Route groups & auth boundary

`src/app/` uses two route groups:
- `(auth)/` — `/login`, `/register`, public
- `(dashboard)/` — `/dashboard`, `/transactions`, protected

Protection is enforced in two places (both must stay in sync):
1. `src/middleware.ts` re-exports `auth` from `@/lib/auth` and matches `/dashboard/:path*` and `/transactions/:path*`.
2. `src/app/(dashboard)/layout.tsx` does a server-side `auth()` + `redirect("/login")` as a defense-in-depth check.

When adding a new protected route, update the middleware matcher *and* ensure it lives under the `(dashboard)` group (or replicate the layout-level check).

### NextAuth setup (`src/lib/auth.ts`)

- Single source of truth — exports `handlers`, `signIn`, `signOut`, `auth`.
- `session.user.id` is added via the `jwt` + `session` callbacks and declared in a module augmentation at the top of the file. **Always read the user id as `session.user.id`** in API routes; this is what every route uses to scope queries.
- API route handler lives at `src/app/api/auth/[...nextauth]/route.ts` (must re-export `handlers.GET`/`handlers.POST`).

### Prisma client (`src/lib/prisma.ts`)

Standard Next.js singleton pattern (caches on `globalThis` in non-prod to survive hot reloads). Always `import { prisma } from "@/lib/prisma"` — never `new PrismaClient()` elsewhere.

### Data model (`prisma/schema.prisma`)

```
User 1—* Transaction
Category enum: PRIMER | SEKUNDER | URGENCY   (note: enum is URGENCY, label is "Urgensi")
Transaction.price: Decimal(15,2)
Index: Transaction(userId, date)
onDelete: Cascade from User → Transaction
```

### Decimal handling

Prisma returns `Decimal` for `price`. API responses **must** serialize it as a string (`price: t.price.toString()`) — JSON can't represent Decimal natively. The frontend then `parseFloat`s when needed. Follow this pattern in any new endpoint that returns transactions; see `src/app/api/transactions/route.ts` and `[id]/route.ts`.

### Ownership scoping

Every transaction query is scoped by `userId: session.user.id`. For mutations on a specific row, use the `ensureOwnership` pattern from `src/app/api/transactions/[id]/route.ts` (fetch first, compare `userId`, return 404 if mismatch — do not leak existence).

### Month filtering convention

Both `GET /api/transactions` and `GET /api/stats` accept a `month` query param formatted `YYYY-MM`. Ranges are constructed in **UTC** (`Date.UTC(y, m-1, 1)` … `Date.UTC(y, m, 1)`) and filtered with `{ gte: start, lt: end }`. Keep new date-range filters in UTC to match — mixing local time will cause off-by-one-month bugs near month boundaries.

### Validation

All input validation is centralized in `src/lib/validations.ts` using zod. `categoryEnum`, `transactionCreateSchema`, `transactionUpdateSchema` (partial of create), and `registerSchema` are re-used between API routes and react-hook-form. Error messages are in Bahasa Indonesia; preserve that when adding fields.

### Formatting / labels (`src/lib/format.ts`)

Use the helpers — don't inline currency or date formatting:
- `formatRupiah` / `formatRupiahShort` (IDR, `id-ID` locale)
- `formatTanggal` / `formatBulan` / `bulanInput` / `tanggalInput` (date-fns + `id` locale)
- `KATEGORI_LABEL`, `KATEGORI_BADGE`, `KATEGORI_WARNA` — maps from enum value to display label / DaisyUI badge class / chart hex color. Update all three together if you add a category.

### Theming

The dark theme `finance` and light theme `financeLight` are DaisyUI themes defined in `tailwind.config.ts`. The active theme is stored in `localStorage` under key `finance-theme` and applied via an inline `<script>` in `src/app/layout.tsx` *before* hydration to avoid a flash. If you touch theme handling, keep the bootstrap script in sync with whatever reads/writes that key (the Topbar toggle).

### Components

- `src/components/dashboard/` — Sidebar, Topbar (theme toggle + signOut), MonthSelector, StatCard, CategoryPieChart, MonthlyBarChart, RecentTransactions
- `src/components/transactions/` — TransactionForm (modal, react-hook-form + zod), TransactionManager (table + filters)
- `src/components/providers.tsx` — wraps the app in `SessionProvider`

Charts are Recharts; colors come from `KATEGORI_WARNA`.

## Notes for changes

- When you change `prisma/schema.prisma`, run `npx prisma migrate dev --name <change>` and commit the generated migration in `prisma/migrations/`.
- New API routes go under `src/app/api/.../route.ts`, must call `auth()` first, return 401 if no `session.user.id`, and scope all queries by `userId`.
- Don't introduce a second Prisma client or a second NextAuth config — both are intentionally singletons.
