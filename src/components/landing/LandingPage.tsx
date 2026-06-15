import Link from "next/link";
import Image from "next/image";
import { LandingBackground } from "./LandingBackground";
import { PillNavWrapper } from "./PillNavWrapper";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Masuk", href: "/login" },
  { label: "Daftar", href: "/register" },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-base-100 relative overflow-x-hidden">
      <LandingBackground />
      <PillNavWrapper logo="/logo.png" items={navItems} activeHref="/" />
      <div className="relative z-10">
        <Hero />
        <Ticker />
        <Philosophy />
        <Features />
        <HowItWorks />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}

/* ====================== HERO ====================== */
function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-24 pb-16 md:pb-24">
      {/* Decorative SVG crosshair */}
      <svg
        className="hidden md:block absolute -right-8 top-12 text-base-content/6 animate-spin-slow pointer-events-none"
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
        aria-hidden
      >
        <circle
          cx="140"
          cy="140"
          r="110"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle
          cx="140"
          cy="140"
          r="70"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="140"
          x2="260"
          y2="140"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="260"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>

      <div className="max-w-3xl space-y-7 stagger">
        {/* Eyebrow with line */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-primary" aria-hidden />
          <p className="eyebrow text-base-content/55">
            Fitrack · Personal Finance Tracker
          </p>
        </div>

        {/* Massive headline */}
        <h1 className="display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-crammed text-base-content">
          Catat.{" "}
          <span className="text-base-content/40">Pahami.</span>
          <br />
          <em className="display-italic">
            <span className="marker">Kuasai</span>
          </em>{" "}
          belanjamu.
        </h1>

        <p className="text-base md:text-lg text-base-content/65 leading-relaxed max-w-xl">
          Personal expense tracker yang mengelompokkan tiap pengeluaran dalam{" "}
          <span className="display-italic text-base-content">
            tiga kebutuhan
          </span>{" "}
          — agar tiap keputusan finansial punya konteks yang jelas.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-md bg-primary text-primary-content hover:bg-primary/90 transition press shadow-lg shadow-primary/25"
          >
            Mulai gratis
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm text-base-content/65 hover:text-base-content transition font-medium press inline-flex items-center gap-1.5 px-3 py-3"
          >
            Sudah punya akun?
            <span className="text-primary border-b border-primary/30 group-hover:border-primary">
              Masuk
            </span>
          </Link>
        </div>

        {/* Trust line */}
        <div className="pt-4 flex items-center gap-3 text-xs text-base-content/45">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse-glow" />
            <span>Tanpa kartu kredit</span>
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-base-content/30" />
          <span>Daftar 30 detik</span>
          <span className="hidden sm:inline-flex items-center gap-3">
            <span className="w-0.5 h-0.5 rounded-full bg-base-content/30" />
            <span>Tanpa iklan</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ====================== TICKER ====================== */
function Ticker() {
  const items = [
    "3 Kategori",
    "12 Bulan Tren",
    "Chart Interaktif",
    "Gratis Selamanya",
    "Tanpa Iklan",
    "Privat Sepenuhnya",
    "Filter Cermat",
    "Bulan Demi Bulan",
  ];
  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section
      className="relative border-y border-base-content/8 bg-base-200/20 py-5 overflow-hidden"
      aria-label="Fitur unggulan"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 mx-8 display-italic text-2xl md:text-3xl text-base-content/40 leading-none"
          >
            {item}
            <span className="text-primary" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ====================== PHILOSOPHY ====================== */
function Philosophy() {
  const kategori = [
    {
      num: "01",
      label: "PRIMER",
      title: "Kebutuhan pokok",
      desc: "Makanan, transportasi, tagihan rutin. Pengeluaran yang tidak bisa kamu hindari, dasar yang menjaga roda hidup berputar.",
      color: "#10b981",
      bgClass: "from-primary/10 to-transparent",
    },
    {
      num: "02",
      label: "SEKUNDER",
      title: "Penunjang gaya hidup",
      desc: "Hiburan, langganan, kafe akhir pekan. Bukan keharusan, tapi yang membuat hidup lebih nyaman dan menyenangkan.",
      color: "#a3a3a3",
      bgClass: "from-base-content/8 to-transparent",
    },
    {
      num: "03",
      label: "URGENSI",
      title: "Tak terduga",
      desc: "Obat darurat, perbaikan mendadak, biaya tiba-tiba. Yang muncul tanpa peringatan dan butuh respons cepat.",
      color: "#f97316",
      bgClass: "from-accent/10 to-transparent",
    },
  ];

  return (
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-16">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-accent" aria-hidden />
            <p className="eyebrow text-base-content/55">
              Filosofi · Tiga Kategori
            </p>
          </div>
        </div>
        <div className="md:col-span-8">
          <h2 className="display text-3xl md:text-5xl tracking-crammed leading-tight">
            Tidak tiap nominal punya{" "}
            <em className="display-italic">arti yang sama</em>.
          </h2>
          <p className="text-base text-base-content/65 mt-5 max-w-xl leading-relaxed">
            Pengeluaran <em className="display-italic">primer</em> berbeda
            dengan <em className="display-italic">sekunder</em>. Kebutuhan{" "}
            <em className="display-italic">urgensi</em> berbeda dengan
            keinginan. Tracker yang baik harus tahu bedanya — supaya kamu juga
            tahu.
          </p>
        </div>
      </div>

      {/* Three cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {kategori.map((k, i) => (
          <article
            key={k.num}
            className="group relative paper-card rounded-xl p-6 md:p-7 overflow-hidden lift"
            style={{
              animation: `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s backwards`,
            }}
          >
            {/* Color accent corner */}
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle, ${k.color}30, transparent 70%)`,
              }}
              aria-hidden
            />

            {/* Number */}
            <div className="flex items-center gap-3 mb-6">
              <span className="display-italic text-4xl leading-none" style={{ color: k.color }}>
                {k.num}
              </span>
              <span
                className="num text-[10px] font-semibold tracking-widest"
                style={{ color: k.color }}
              >
                {k.label}
              </span>
            </div>

            <h3 className="display text-2xl tracking-tightest leading-tight mb-3">
              <em className="display-italic">{k.title.split(" ")[0]}</em>{" "}
              {k.title.split(" ").slice(1).join(" ")}
            </h3>

            <p className="text-sm text-base-content/65 leading-relaxed">
              {k.desc}
            </p>

            {/* Bottom accent line */}
            <div className="absolute left-6 right-6 bottom-0 h-px overflow-hidden">
              <span
                className="block h-full translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"
                style={{
                  background: `linear-gradient(90deg, transparent, ${k.color}, transparent)`,
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ====================== FEATURES ====================== */
function Features() {
  const features = [
    {
      num: "01",
      title: "Visualisasi",
      titleEm: "yang berbicara",
      desc: "Pie chart komposisi kategori. Bar chart 12 bulan terakhir. Angka yang berubah saat kamu navigasi.",
      visual: <FeatureVisualChart />,
    },
    {
      num: "02",
      title: "Filter",
      titleEm: "yang cermat",
      desc: "Pilih bulan, kategori, atau ketik nama. Cari dalam ratusan transaksi dalam satu klik.",
      visual: <FeatureVisualFilter />,
    },
    {
      num: "03",
      title: "Tren",
      titleEm: "yang terbaca",
      desc: "Perbandingan bulan ini vs bulan lalu. Persentase perubahan. Sparkline 12 bulan. Otomatis.",
      visual: <FeatureVisualTrend />,
    },
    {
      num: "04",
      title: "Privat",
      titleEm: "sepenuhnya",
      desc: "Akun kamu sendiri. Tidak dijual ke pihak ketiga. Tanpa iklan, tanpa tracker, tanpa kompromi.",
      visual: <FeatureVisualPrivate />,
    },
  ];

  return (
    <section className="relative bg-base-200/30 border-y border-base-content/6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-primary" aria-hidden />
              <p className="eyebrow text-base-content/55">Yang Kamu Dapat</p>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-3xl md:text-5xl tracking-crammed leading-tight">
              Lebih dari sekadar{" "}
              <em className="display-italic">daftar angka</em>.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {features.map((f, i) => (
            <article
              key={f.num}
              className="group relative paper-card rounded-xl p-6 md:p-8 overflow-hidden lift"
              style={{
                animation: `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s backwards`,
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-baseline gap-2">
                  <span className="num text-xs text-base-content/40 font-semibold tracking-widest">
                    {f.num}
                  </span>
                </div>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {f.visual}
                </div>
              </div>

              <h3 className="display text-2xl tracking-tightest leading-tight mb-2">
                {f.title}{" "}
                <em className="display-italic text-base-content/70">
                  {f.titleEm}
                </em>
              </h3>

              <p className="text-sm text-base-content/65 leading-relaxed">
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Feature visual mini-components */
function FeatureVisualChart() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="oklch(var(--bc) / 0.12)"
        strokeWidth="6"
      />
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="#10b981"
        strokeWidth="6"
        strokeDasharray="60 138"
        strokeDashoffset="0"
        transform="rotate(-90 32 32)"
      />
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="#f97316"
        strokeWidth="6"
        strokeDasharray="30 168"
        strokeDashoffset="-60"
        transform="rotate(-90 32 32)"
      />
    </svg>
  );
}

function FeatureVisualFilter() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
      <rect
        x="10"
        y="22"
        width="44"
        height="3"
        rx="1.5"
        fill="oklch(var(--bc) / 0.15)"
      />
      <rect x="10" y="22" width="28" height="3" rx="1.5" fill="#10b981" />
      <rect
        x="10"
        y="32"
        width="44"
        height="3"
        rx="1.5"
        fill="oklch(var(--bc) / 0.15)"
      />
      <rect x="10" y="32" width="14" height="3" rx="1.5" fill="#10b981" />
      <rect
        x="10"
        y="42"
        width="44"
        height="3"
        rx="1.5"
        fill="oklch(var(--bc) / 0.15)"
      />
      <rect x="10" y="42" width="38" height="3" rx="1.5" fill="#10b981" />
    </svg>
  );
}

function FeatureVisualTrend() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
      <polyline
        points="8,46 18,38 28,42 38,28 48,32 58,16"
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="58" cy="16" r="3" fill="#10b981" />
      <circle cx="58" cy="16" r="6" fill="#10b981" fillOpacity="0.2" />
    </svg>
  );
}

function FeatureVisualPrivate() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
      <path
        d="M32 12 L20 18 V32 C20 42 25 50 32 54 C39 50 44 42 44 32 V18 Z"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="30" r="3" fill="#10b981" />
      <path
        d="M32 33 V40"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ====================== HOW IT WORKS ====================== */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Daftar",
      desc: "Cukup nama, email, password. Tanpa kartu kredit, tanpa verifikasi panjang.",
      time: "30 detik",
    },
    {
      num: "02",
      title: "Catat",
      desc: "Tiap pengeluaran: nama, harga, kategori, tanggal. Catatan opsional.",
      time: "10 detik / transaksi",
    },
    {
      num: "03",
      title: "Pahami",
      desc: "Chart, ringkasan, perbandingan bulan otomatis muncul. Lihat polanya.",
      time: "Real-time",
    },
  ];

  return (
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-primary" aria-hidden />
          <p className="eyebrow text-base-content/55">Cara Pakai</p>
          <span className="w-8 h-px bg-primary" aria-hidden />
        </div>
        <h2 className="display text-3xl md:text-5xl tracking-crammed leading-tight">
          Tiga langkah. <em className="display-italic">Lima menit</em>.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
        {/* Connecting line desktop */}
        <div
          className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-base-content/15 to-transparent"
          aria-hidden
        />

        {steps.map((s, i) => (
          <article
            key={s.num}
            className="relative text-center md:text-left"
            style={{
              animation: `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s backwards`,
            }}
          >
            {/* Big number circle */}
            <div className="relative inline-flex md:flex items-center justify-center w-24 h-24 rounded-full bg-base-100 border border-base-content/10 shadow-md mb-5 mx-auto md:mx-0">
              <span className="display-italic text-4xl text-primary leading-none">
                {s.num}
              </span>
              {/* Pulse ring on first step */}
              {i === 0 && (
                <span
                  className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow"
                  aria-hidden
                />
              )}
            </div>

            <h3 className="display text-2xl tracking-tightest leading-tight mb-2">
              {s.title}
            </h3>

            <p className="text-sm text-base-content/65 leading-relaxed max-w-xs mx-auto md:mx-0 mb-3">
              {s.desc}
            </p>

            <p className="eyebrow text-base-content/40">
              <span className="text-primary">·</span> {s.time}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ====================== PRICING ====================== */
function Pricing() {
  const inclusions = [
    "Unlimited transaksi",
    "Riwayat penuh",
    "Chart pie & bar",
    "Filter & pencarian",
    "Dark & light theme",
    "Multi-device",
  ];

  return (
    <section className="relative bg-base-200/30 border-y border-base-content/6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-accent" aria-hidden />
          <p className="eyebrow text-base-content/55">Harga</p>
          <span className="w-8 h-px bg-accent" aria-hidden />
        </div>

        <h2 className="display text-4xl md:text-6xl tracking-crammed leading-tight">
          <em className="display-italic">Gratis.</em> Selamanya.
        </h2>

        <p className="text-base text-base-content/65 mt-5 max-w-xl mx-auto leading-relaxed">
          Personal project, tidak dimonetisasi. Tidak ada plan berbayar, tidak
          ada iklan, tidak ada data yang dijual.
        </p>

        {/* Pricing card */}
        <article className="relative paper-card rounded-2xl px-6 md:px-10 py-10 mt-12 max-w-2xl mx-auto overflow-hidden">
          {/* Tilted stamp */}
          <div className="absolute top-6 right-6 stamp text-primary">
            SELAMANYA
          </div>

          {/* Corner glow */}
          <div
            className="absolute -left-12 -top-12 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.76 0.165 161 / 0.12), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <p className="eyebrow text-base-content/50">Personal Tier</p>

            <div className="mt-3 flex items-baseline gap-2 justify-center md:justify-start">
              <span className="display-num text-3xl text-base-content/45">
                Rp
              </span>
              <span className="display-num text-6xl md:text-7xl leading-none">
                0
              </span>
              <span className="text-base-content/55 text-sm ml-2">/bulan</span>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-2.5 text-left">
              {inclusions.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-base-content/80"
                >
                  <span className="text-primary text-base">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-5 py-3 mt-9 text-sm font-semibold rounded-md bg-primary text-primary-content hover:bg-primary/90 transition press shadow-lg shadow-primary/25"
            >
              Mulai gratis sekarang
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ====================== FINAL CTA ====================== */
function FinalCTA() {
  return (
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
      {/* Decorative crosshair */}
      <svg
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base-content/5 animate-spin-slow pointer-events-none"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 12"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="relative">
        <p className="eyebrow text-base-content/45 mb-5">Mulai Sekarang</p>
        <h2 className="display text-4xl md:text-6xl lg:text-7xl tracking-crammed leading-[0.95] max-w-3xl mx-auto">
          Siap mengenal{" "}
          <em className="display-italic">
            <span className="marker-accent">pola belanjamu</span>
          </em>
          ?
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold rounded-md bg-primary text-primary-content hover:bg-primary/90 transition press shadow-xl shadow-primary/30"
          >
            Daftar gratis
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/login"
            className="px-5 py-3.5 text-base font-medium rounded-md text-base-content/70 hover:text-base-content hover:bg-base-200/60 transition press"
          >
            Sudah punya akun
          </Link>
        </div>

        <p className="mt-8 text-xs text-base-content/45 italic display-italic">
          Tanpa kartu kredit · Tanpa kompromi privasi
        </p>
      </div>
    </section>
  );
}

/* ====================== FOOTER ====================== */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-base-content/6 bg-base-200/30">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Fitrack"
            width={32}
            height={32}
            className="rounded-full ring-1 ring-base-content/10"
          />
          <div className="leading-none">
            <p className="display text-sm font-semibold tracking-tightest">
              Fitrack
            </p>
            <p className="text-[9px] eyebrow text-base-content/45 mt-1">
              Finance Tracker · Pribadi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs text-base-content/55">
          <Link
            href="/login"
            className="hover:text-base-content transition press font-medium"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="hover:text-base-content transition press font-medium"
          >
            Daftar
          </Link>
          <span className="text-base-content/30 italic">
            <span className="num">©</span> {year} · Dryhus Dzacky Damingtyas.S
          </span>
        </div>
      </div>
    </footer>
  );
}
