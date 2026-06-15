"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconHome, IconList, IconX } from "@/components/icons";

const menu = [
  { href: "/dashboard", label: "Overview", Icon: IconHome },
  { href: "/transactions", label: "Transaksi", Icon: IconList },
];

type Props = {
  userName: string;
  userEmail: string;
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ userName, userEmail, mobileOpen, onClose }: Props) {
  const pathname = usePathname();
  const initial = userName.trim().charAt(0).toUpperCase() || "?";

  const body = (
    <>
      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/logo.png"
              alt="Fitrack"
              width={36}
              height={36}
              className="rounded-full ring-1 ring-base-content/10 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105"
              priority
            />
            <div className="leading-none">
              <p className="display text-base font-semibold text-base-content tracking-tightest">
                Fitrack
              </p>
              <p className="text-[9px] eyebrow text-base-content/45 mt-1">
                Finance Tracker · Pribadi
              </p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-md hover:bg-base-200 text-base-content/60 hover:text-base-content transition press"
            aria-label="Tutup menu"
          >
            <IconX size={16} />
          </button>
        </div>
      </div>

      <div className="px-3 mt-2">
        <p className="px-2 py-1.5 eyebrow text-base-content/35">Menu</p>
        <nav className="space-y-1">
          {menu.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-300 group ${
                  active
                    ? "bg-base-200/80 text-base-content"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-200/50 hover:translate-x-0.5"
                }`}
              >
                {active && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-primary"
                    aria-hidden
                  />
                )}
                <Icon
                  size={16}
                  className={`transition-colors ${active ? "text-primary" : "group-hover:text-base-content"}`}
                />
                <span className="font-medium">{label}</span>
                {active && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-3 py-4 border-t border-base-content/5">
        <div className="px-2 py-2 rounded-lg bg-base-200/40 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 border border-primary/40 flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
            <span className="display-italic text-sm font-semibold text-primary-content">
              {initial}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate leading-tight">
              {userName}
            </p>
            <p className="text-[11px] text-base-content/50 truncate mt-0.5">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-col w-60 border-r border-base-content/8 min-h-screen bg-base-100/60 backdrop-blur-md relative z-10">
        {body}
      </aside>

      <div
        className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-64 max-w-[85vw] bg-base-100 border-r border-base-content/10 flex flex-col shadow-2xl transition-transform duration-300 ease-smooth ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
        >
          {body}
        </aside>
      </div>
    </>
  );
}
