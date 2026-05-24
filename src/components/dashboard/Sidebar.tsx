"use client";

import Link from "next/link";
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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm shadow-primary/20">
              <span className="text-primary-content text-[11px] font-bold tracking-tighter">
                FT
              </span>
            </div>
            <span className="font-semibold tracking-tight">Finance</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-md hover:bg-base-200 text-base-content/60 hover:text-base-content transition"
            aria-label="Tutup menu"
          >
            <IconX size={16} />
          </button>
        </div>
      </div>

      <div className="px-3">
        <p className="px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-base-content/40">
          Menu
        </p>
        <nav className="space-y-0.5">
          {menu.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`relative flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition ${
                  active
                    ? "bg-base-200 text-base-content"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-200/60"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary" />
                )}
                <Icon size={16} className={active ? "text-primary" : ""} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-3 py-4 border-t border-base-300">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-primary">{initial}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-base-content/50 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-col w-60 border-r border-base-300 min-h-screen bg-base-100/80 backdrop-blur-sm relative z-10">
        {body}
      </aside>

      <div
        className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-64 max-w-[85vw] bg-base-100 border-r border-base-300 flex flex-col shadow-2xl transition-transform duration-200 ${
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
