export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      <div className="hidden md:flex flex-col justify-between p-10 lg:p-14 border-r border-base-300 bg-base-200/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/[0.06] blur-3xl" />
        </div>
        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-content text-[11px] font-bold tracking-tighter">
              FT
            </span>
          </div>
          <span className="font-semibold tracking-tight">Finance</span>
        </div>

        <div className="relative max-w-md space-y-5">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tightest leading-tight">
            Catat pengeluaran,
            <br />
            pahami pola belanjamu.
          </h2>
          <p className="text-sm text-base-content/60 leading-relaxed">
            Setiap pengeluaran dikelompokkan berdasarkan kebutuhan — primer,
            sekunder, dan urgensi — sehingga keputusan finansial selalu punya konteks.
          </p>

          <div className="space-y-2 pt-2">
            {[
              "Ringkasan harian, mingguan, bulanan",
              "Visualisasi kategori & tren 12 bulan",
              "Riwayat tersimpan aman, milikmu sendiri",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2 text-sm text-base-content/70">
                <span className="text-primary mt-1">—</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-base-content/40">
          © {new Date().getFullYear()} Finance Tracker
        </p>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
