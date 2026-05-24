"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

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
      <div className="md:hidden mb-8 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-content text-[11px] font-bold tracking-tighter">
            FT
          </span>
        </div>
        <span className="font-semibold tracking-tight">Finance</span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">Buat akun</h1>
      <p className="text-sm text-base-content/60 mt-1.5">
        Hanya butuh beberapa detik untuk mulai.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-xs font-medium text-base-content/70 mb-1.5">
            Nama
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Nama lengkap"
            className="w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-base-content/70 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
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
            <span className="text-xs text-base-content/40">min 6 karakter</span>
          </div>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={update("password")}
            placeholder="••••••••"
            className="w-full px-3 py-2 text-sm bg-base-100 border border-base-300 rounded-md focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
            autoComplete="new-password"
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
          {loading ? "Membuat akun…" : "Daftar"}
        </button>
      </form>

      <p className="text-sm text-base-content/60 mt-6">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
