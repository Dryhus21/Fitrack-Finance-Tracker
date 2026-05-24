"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { IconLogOut, IconMenu, IconMoon, IconSun } from "@/components/icons";
import { useSidebar } from "./DashboardShell";

export function Topbar({
  title,
  subtitle,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}) {
  const { openMobile } = useSidebar();
  const [theme, setTheme] = useState<"finance" | "financeLight">("finance");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved =
      (localStorage.getItem("finance-theme") as "finance" | "financeLight") ||
      "finance";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    document.documentElement.style.colorScheme =
      saved === "financeLight" ? "light" : "dark";
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "finance" ? "financeLight" : "finance";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme =
      next === "financeLight" ? "light" : "dark";
    localStorage.setItem("finance-theme", next);
  };

  return (
    <header className="border-b border-base-300 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-2 px-4 md:px-8 py-3 md:py-4">
        <button
          onClick={openMobile}
          className="md:hidden p-2 -ml-1 rounded-md hover:bg-base-200 text-base-content/70 hover:text-base-content transition"
          aria-label="Buka menu"
        >
          <IconMenu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-semibold tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:block text-xs text-base-content/50 mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden sm:block">{rightSlot}</div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-base-200 text-base-content/70 hover:text-base-content transition"
            title="Ubah tema"
            aria-label="Ubah tema"
          >
            {mounted && theme === "finance" ? (
              <IconSun size={16} />
            ) : (
              <IconMoon size={16} />
            )}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-base-content/70 hover:text-base-content hover:bg-base-200 transition"
            aria-label="Keluar"
          >
            <IconLogOut size={15} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>

      {rightSlot && (
        <div className="sm:hidden px-4 pb-3 -mt-1">{rightSlot}</div>
      )}
    </header>
  );
}
