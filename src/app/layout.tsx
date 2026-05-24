import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance — Catat pengeluaran pribadi",
  description:
    "Catat pengeluaran, kelompokkan berdasarkan kebutuhan, lihat tren keuanganmu.",
};

const themeBootScript = `(function(){try{var t=localStorage.getItem('finance-theme')||'finance';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t==='financeLight'?'light':'dark';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-theme="finance" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
