"use client";

import { signOut } from "next-auth/react";
import { IconLogOut, IconMenu } from "@/components/icons";
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

  return (
    <header className="border-b border-base-content/6 bg-base-100/70 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-2 px-4 md:px-8 py-3.5 md:py-4">
        <button
          onClick={openMobile}
          className="md:hidden p-2 -ml-1 rounded-md hover:bg-base-200 text-base-content/70 hover:text-base-content transition press"
          aria-label="Buka menu"
        >
          <IconMenu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="display text-lg md:text-xl font-semibold tracking-tightest truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:flex items-center gap-1.5 text-xs text-base-content/55 mt-0.5">
              <span className="w-1 h-1 rounded-full bg-primary/70 animate-pulse-glow" aria-hidden />
              <span className="truncate">{subtitle}</span>
            </p>
          )}
        </div>

        <div className="hidden sm:block">{rightSlot}</div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-base-content/65 hover:text-base-content hover:bg-base-200 transition press"
            aria-label="Keluar"
          >
            <IconLogOut size={15} />
            <span className="hidden sm:inline font-medium">Keluar</span>
          </button>
        </div>
      </div>

      {rightSlot && <div className="sm:hidden px-4 pb-3 -mt-1">{rightSlot}</div>}
    </header>
  );
}
