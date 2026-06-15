import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-[1.1fr_1fr] bg-base-100 bg-glow bg-dotted">
      {/* Hero panel — editorial side */}
      <div className="hidden md:flex flex-col justify-between p-10 lg:p-14 border-r border-base-content/8 bg-base-200/30 relative overflow-hidden">
        {/* Atmospheric layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-primary/[0.07] blur-3xl animate-float" />
          <div
            className="absolute -bottom-40 -right-40 w-[24rem] h-[24rem] rounded-full bg-accent/[0.05] blur-3xl animate-float"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
        </div>

        {/* Decorative crosshair grid */}
        <svg
          className="absolute top-1/3 right-10 text-base-content/8 animate-spin-slow"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Brand */}
        <div className="relative flex items-center gap-3 animate-fade-up">
          <Image
            src="/logo.png"
            alt="Fitrack"
            width={44}
            height={44}
            className="rounded-full ring-1 ring-base-content/15 shadow-md shadow-primary/10"
            priority
          />
          <div className="leading-none">
            <p className="display text-lg font-semibold tracking-tightest">
              Fitrack
            </p>
            <p className="text-[10px] eyebrow text-base-content/45 mt-1.5">
              Finance Tracker · Pribadi
            </p>
          </div>
        </div>

        {/* Editorial body */}
        <div className="relative max-w-lg space-y-7">
          <div className="space-y-1">
            <p className="eyebrow text-base-content/45 animate-fade-up">
              <span className="num text-primary">01</span> · Filosofi
            </p>
            <h2
              className="display text-4xl lg:text-5xl leading-[1.05] tracking-crammed text-base-content animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="marker">Catat</span>{" "}
              pengeluaran,{" "}
              <em className="display-italic">pahami</em>{" "}
              pola{" "}
              <em className="display-italic marker-accent">belanjamu</em>.
            </h2>
          </div>

          <p
            className="text-sm text-base-content/65 leading-relaxed max-w-md animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Tiap pengeluaran dikelompokkan{" "}
            <span className="text-base-content font-semibold">tiga kebutuhan</span>{" "}
            — agar setiap keputusan finansial punya konteks yang jelas.
          </p>

          <ul
            className="space-y-3 pt-2 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { num: "01", label: "Primer", desc: "kebutuhan pokok harian" },
              { num: "02", label: "Sekunder", desc: "pendukung gaya hidup" },
              { num: "03", label: "Urgensi", desc: "kondisi tak terduga" },
            ].map(({ num, label, desc }) => (
              <li
                key={num}
                className="flex items-baseline gap-3 group cursor-default"
              >
                <span className="num text-[10px] text-base-content/35 font-semibold tracking-wider">
                  {num}
                </span>
                <span className="display-italic text-base text-base-content group-hover:text-primary transition-colors">
                  {label}
                </span>
                <span className="text-xs text-base-content/50 italic">
                  — {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer mark */}
        <div
          className="relative flex items-center gap-2 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="w-8 h-px bg-base-content/20" aria-hidden />
          <p className="text-[10px] eyebrow text-base-content/40">
            © {new Date().getFullYear()} · Buatan personal
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 md:p-10 relative">
        <div
          className="w-full max-w-sm animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
