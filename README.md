# Fitrack — Personal Finance Tracker

**Fitrack** (Finance Tracker) is a personal expense tracker that categorizes every spending into three meaningful buckets — so every financial decision has clear context.

🔗 **Live:** https://fitrack-finance-tracker.vercel.app  
📦 **Repo:** https://github.com/Dryhus21/Fitrack-Finance-Tracker

---

## Features

- **3 spending categories** — Primer (essential), Sekunder (lifestyle), Urgensi (emergency)
- **Monthly filtering** — navigate spending history month by month
- **Interactive charts** — pie chart for category breakdown, bar chart for 12-month trend
- **Animated stats** — hero card with sparkline, delta vs previous month
- **Dark theme** — editorial dark UI with dot field background
- **Multi-user** — each account sees only their own data
- **Responsive** — mobile card list, desktop table view
- **Landing page** — with interactive dot field (ReactBits inspired)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Database | PostgreSQL via Supabase |
| ORM | Prisma 5 |
| Auth | NextAuth v5 (Credentials + JWT) |
| Styling | Tailwind CSS + DaisyUI |
| Charts | Recharts |
| Animation | GSAP (PillNav), CSS animations |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Vercel](https://vercel.com) account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/Dryhus21/Fitrack-Finance-Tracker.git
cd Fitrack-Finance-Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
# Supabase — pooled URL for runtime (port 6543)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase — direct URL for migrations (port 5432)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
```

> Get your Supabase URLs from: **Project Settings → Database → Connection string**  
> Generate a secret: `openssl rand -base64 32`

### 4. Push the database schema

```bash
npx prisma migrate deploy
```

Or for initial setup:

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add these environment variables in Vercel project settings:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → your Vercel production URL
4. Deploy

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login & register pages
│   ├── (dashboard)/     # Dashboard & transactions (protected)
│   └── api/             # API routes
├── components/
│   ├── dashboard/       # Sidebar, StatCard, Charts, etc.
│   ├── landing/         # Landing page, DotField, PillNav
│   └── transactions/    # TransactionForm, TransactionManager
├── lib/
│   ├── auth.ts          # NextAuth config
│   ├── prisma.ts        # Prisma client singleton
│   ├── format.ts        # Currency, date formatters
│   └── validations.ts   # Zod schemas
prisma/
│   └── schema.prisma    # Database schema
```

---

## Database Schema

```prisma
model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  password     String
  transactions Transaction[]
}

model Transaction {
  id        String   @id @default(cuid())
  userId    String
  name      String
  price     Decimal  @db.Decimal(15, 2)
  category  Category
  date      DateTime
  note      String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Category {
  PRIMER
  SEKUNDER
  URGENCY
}
```

---

## Contributing

This is an open source personal project. Feel free to fork, use, or improve it.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

MIT — free to use, modify, and distribute.

---

*Built by [Dryhus Dzacky Damingtyas.S](https://github.com/Dryhus21) · Vibe coded with [Claude](https://claude.ai)*
