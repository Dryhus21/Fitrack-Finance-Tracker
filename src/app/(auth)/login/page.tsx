"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
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
      } else {
        router.push(callbackUrl);
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
      <div className="md:hidden mb-8 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-content text-[11px] font-bold tracking-tighter">
            FT
          </span>
        </div>
        <span className="font-semibold tracking-tight">Finance</span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">Masuk</h1>
      <p className="text-sm text-base-content/60 mt-1.5">
        Gunakan email dan password kamu untuk lanjut.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-xs font-medium text-base-content/70 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
            autoComplete="email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-base-content/70">
              Password
            </label>
          </div>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-xs text-error bg-error/10 border border-error/20 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-3.5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-content hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>

      <p className="text-sm text-base-content/60 mt-6">
        Belum punya akun?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
