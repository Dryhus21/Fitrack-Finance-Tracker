"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        const firstErr =
          typeof data.error === "object"
            ? (Object.values(data.error)[0] as string[])?.[0]
            : data.error;
        setError(firstErr || "Gagal mendaftar.");
        return;
      }

      const login = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (login?.error) {
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        <p className="eyebrow text-base-content/45">Buat akun</p>
        <h1 className="display text-3xl md:text-4xl tracking-tightest leading-tight">
          <em className="display-italic">Mulai</em> dari sini.
        </h1>
        <p className="text-sm text-base-content/60 mt-2">
          Cukup 30 detik untuk siapkan ruang keuanganmu.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 stagger">
        <div>
          <label className="block eyebrow text-base-content/55 mb-2">
            Nama
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Nama lengkap"
            className="w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition placeholder:text-base-content/30"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block eyebrow text-base-content/55 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="nama@email.com"
            className="w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition placeholder:text-base-content/30"
            autoComplete="email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block eyebrow text-base-content/55">
              Password
            </label>
            <span className="text-[10px] text-base-content/40 italic">
              min 6 karakter
            </span>
          </div>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={update("password")}
            placeholder="••••••••"
            className="num w-full px-3.5 py-2.5 text-sm bg-base-100 border border-base-content/12 rounded-md focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition tracking-wider placeholder:text-base-content/30"
            autoComplete="new-password"
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
                Membuat akun
              </>
            ) : (
              <>
                Daftar
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
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline underline-offset-4"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
