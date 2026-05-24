# Finance Tracker

Aplikasi pencatat keuangan pribadi multi-user dengan kategori (Primer / Sekunder / Urgensi), visualisasi chart, dan filter bulanan.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **MySQL** via Prisma ORM (lokal XAMPP / phpMyAdmin, mudah pindah ke hosting)
- **NextAuth v5** (Credentials provider, JWT session) + bcryptjs
- **Tailwind CSS** + **DaisyUI** (tema `finance` gelap & `financeLight` terang)
- **Recharts** untuk pie & bar chart
- **react-hook-form** + **zod** untuk validasi form

## Setup Pertama Kali

### 1. Jalankan MySQL via XAMPP

1. Buka XAMPP Control Panel → **Start** modul **Apache** dan **MySQL**.
2. Buka phpMyAdmin di [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Klik tab **Databases** → buat database baru dengan nama `finance_app` (collation `utf8mb4_unicode_ci`).

### 2. Konfigurasi environment

File `.env` sudah ada untuk development. Kalau MySQL kamu pakai password, edit:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/finance_app"
```

Default XAMPP user `root` tanpa password → `DATABASE_URL="mysql://root:@localhost:3306/finance_app"` (sudah pre-filled).

Untuk production, ganti `NEXTAUTH_SECRET` & `AUTH_SECRET` dengan string acak panjang:

```bash
# Linux/Mac/Git Bash
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3. Install dependencies

```bash
npm install
```

### 4. Buat tabel di MySQL

```bash
npx prisma migrate dev --name init
```

Setelah selesai, refresh phpMyAdmin → akan muncul tabel `User`, `Transaction`, dan `_prisma_migrations`.

### 5. Jalankan dev server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Cara Pakai

1. **Daftar** akun baru di `/register` (nama, email, password min 6 karakter).
2. Otomatis masuk ke `/dashboard` setelah daftar.
3. Buka menu **Transaksi** → klik **+ Tambah Transaksi**.
4. Isi nama barang, harga, pilih kategori (Primer / Sekunder / Urgensi), tanggal, catatan (opsional).
5. Kembali ke **Dashboard** untuk lihat:
   - Total Pengeluaran, Rata-rata harian, Jumlah transaksi, Kategori terbesar
   - Pie chart distribusi kategori
   - Bar chart 12 bulan terakhir
   - 5 transaksi terbaru
6. Pakai **Month Selector** untuk lihat bulan lain.
7. Toggle tema gelap/terang lewat tombol 🌙 / ☀️ di topbar.

## Struktur

```
prisma/
  schema.prisma             # model User, Transaction, enum Category
src/
  app/
    (auth)/                 # login, register
    (dashboard)/            # dashboard, transactions (proteksi via middleware)
    api/
      auth/                 # NextAuth handlers + register
      transactions/         # CRUD endpoints
      stats/                # ringkasan untuk dashboard
  components/
    dashboard/              # Sidebar, Topbar, StatCard, charts, MonthSelector
    transactions/           # TransactionForm (modal), TransactionManager (tabel + filter)
  lib/
    auth.ts                 # NextAuth config
    prisma.ts               # singleton PrismaClient
    validations.ts          # zod schemas
    format.ts               # formatRupiah, formatTanggal, dll
  middleware.ts             # proteksi /dashboard & /transactions
```

## Pindah ke Hosting Online

Saat siap deploy:

1. **Buat database MySQL di hosting** (cPanel / Hostinger / Niagahoster / dll). Catat host, port (umumnya 3306), user, password, nama database.
2. **Update `.env` (atau env vars di hosting):**
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
   NEXTAUTH_URL="https://domain-kamu.com"
   NEXTAUTH_SECRET="hasil-openssl-rand-base64-32"
   AUTH_SECRET="hasil-openssl-rand-base64-32"
   ```
3. **Push schema ke database production:**
   ```bash
   npx prisma migrate deploy
   ```
   Atau kalau hostingnya nggak support migrate, pakai `npx prisma db push` (skip migration history).
4. **Build & start:**
   ```bash
   npm run build
   npm start
   ```

Untuk hosting di Vercel: tinggal hubungkan repo Git, set env vars di dashboard Vercel, `prisma generate` otomatis jalan via `postinstall`.

## Troubleshooting

- **Tidak bisa konek ke MySQL** → pastikan modul MySQL XAMPP **Start** (lampu hijau), dan port 3306 tidak dipakai aplikasi lain.
- **Error `Authentication plugin caching_sha2_password`** → di MySQL 8+, jalankan di phpMyAdmin:
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
  FLUSH PRIVILEGES;
  ```
- **Migration error / tabel mau di-reset** → `npx prisma migrate reset` (akan hapus semua data lalu re-create).
- **Login berhasil tapi langsung balik ke /login** → cek `NEXTAUTH_URL` di `.env` harus match dengan URL yang dibuka di browser (`http://localhost:3000` untuk dev).
- **Cek isi DB** → buka phpMyAdmin → pilih database `finance_app` → tabel `Transaction` untuk lihat data mentah.

## Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Jalankan production build |
| `npm run lint` | ESLint check |
| `npx prisma studio` | Buka GUI untuk lihat/edit data DB |
| `npx prisma migrate dev` | Buat migration baru saat ubah schema |
