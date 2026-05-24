import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

const stroke = (size = 18, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const IconHome = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const IconWallet = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

export const IconList = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

export const IconPlus = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconSearch = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IconPencil = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

export const IconTrash = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6 17.6 19.2A2 2 0 0 1 15.6 21H8.4a2 2 0 0 1-2-1.8L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const IconX = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
);

export const IconMoon = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

export const IconSun = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const IconLogOut = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const IconArrowRight = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const IconCalendar = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const IconChevronDown = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const IconChevronLeft = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const IconChevronRight = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const IconCircleDot = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

export const IconMenu = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const IconTrendingUp = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="15 7 21 7 21 13" />
  </svg>
);

export const IconTrendingDown = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <polyline points="3 7 9 13 13 9 21 17" />
    <polyline points="15 17 21 17 21 11" />
  </svg>
);

export const IconSparkles = ({ size, ...p }: Props) => (
  <svg {...stroke(size, p)}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);
