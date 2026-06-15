"use client";

import { useEffect, useState } from "react";
import PillNav, { type PillNavItem } from "./PillNav";

type Props = {
  logo: string;
  items: PillNavItem[];
  activeHref?: string;
};

export function PillNavWrapper({ logo, items, activeHref }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <PillNav
      logo={logo}
      logoAlt="Fitrack"
      items={items}
      activeHref={activeHref}
      ease="power3.out"
      baseColor="#10b981"
      pillColor="#15120e"
      pillTextColor="#f5f1e8"
      hoveredPillTextColor="#022c1f"
      accentDotColor="#10b981"
      initialLoadAnimation={true}
    />
  );
}
