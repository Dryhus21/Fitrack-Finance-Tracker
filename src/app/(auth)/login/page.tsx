"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Email atau password salah.");
        setLoading(false);
      } else {
        // Direct navigation — skips client router overhead
        window.location.href = callbackUrl;
      }
    } catch {
      setError("Tidak bisa terhubung ke server.");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mobile brand */}
      <div className="md:hidden mb-10 flex items-center gap-2.5">
        <Image
          src="/logo.png"
          alt="Fitrack"
          width={38}
          height={38}
          className="rounded-full ring-1 ring-base-content/10"
          priority
        />
        <div className="leading-none">
          <p className="display text-base font-semibold tracking-tightest">
            Fitrack
          </p>
          <p className="text-[9px] eyebrow text-base-content/45 mt-1">
            Finance Tracker · Pribadi
          </p>
        </div>
      </div>

      <div className="space-y-1.5 mb-8">
        <p className="eyebrow text-base-content/45">Masuk</p>
        <h1 className="display text-3xl md:text-4xl tracking-tightest leading-tight">
          <em className="display-italic">Selamat</em> kembali.
        </h1>
        <p className="text-sm text-base-content/60 mt-2">
          Lanjutkan mencatat pengeluaran kamu.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 stagger">
        <div>
          <label className="block eyebrow text-base-content/55 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition placeholder:text-base-content/30"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block eyebrow text-base-content/55 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="num w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition tracking-wider placeholder:text-base-content/30"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-xs text-error bg-error/10 border border-error/20 px-3 py-2.5 rounded-md flex items-center gap-2 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-error" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full px-3.5 py-3 text-sm font-semibold rounded-md bg-primary text-primary-content hover:bg-primary/90 transition press disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary/20 overflow-hidden"
        >
          <span className="relative inline-flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-content/50 animate-pulse" />
                Memproses
              </>
            ) : (
              <>
                Masuk
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </span>
        </button>
      </form>

      <p className="text-sm text-base-content/60 mt-7 divider-dot">
        <span className="text-xs">atau</span>
      </p>

      <p className="text-sm text-base-content/60 mt-5 text-center">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="text-primary font-semibold hover:underline underline-offset-4"
        >
          Daftar gratis
        </Link>
      </p>
    </div>
  );
}
