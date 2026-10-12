import React from "react";

/** 24×24 line-icon paths (stroke only) used by the admin dashboard. */
const paths: Record<string, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  works: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </>
  ),
  reels: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M4 8h16M9 3l2 5M14 3l2 5" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  careers: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" />
    </>
  ),
  clients: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <path d="M15.5 5.7a3 3 0 0 1 0 5.6M17 14.8c2 .5 3.2 2 3.5 4.2" />
    </>
  ),
  coverage: (
    <>
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z" />
      <path d="M18 9h1.5A1.5 1.5 0 0 1 21 10.5V18a2 2 0 0 1-2 2M8.5 8.5h6M8.5 12h6M8.5 15.5h3" />
    </>
  ),
  media: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="m4 18 5.2-5 3.3 3.2 2.5-2.2L20 17.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 14.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h0a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5h0a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v0a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
    </>
  ),
  services: (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5z" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </>
  ),
  testimonials: (
    <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-4.5 3.5V17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 10h8M8 13h5" />
  ),
  brands: (
    <>
      <path d="M3 12.5V4h8.5l9 9-8.5 8.5z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="9" r="3.2" />
      <path d="M5.5 19c.9-3 3.3-4.6 6.5-4.6s5.6 1.6 6.5 4.6" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  external: (
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

/** Maps collection / global slugs to an icon name. */
const bySlug: Record<string, string> = {
  "home-page": "home",
  "about-page": "about",
  "works-page": "works",
  "behind-the-scene-page": "reels",
  "careers-page": "careers",
  "clients-page": "clients",
  "contact-page": "contact",
  "site-settings": "settings",
  works: "works",
  "behind-the-scenes": "reels",
  "media-coverage": "coverage",
  services: "services",
  testimonials: "testimonials",
  clients: "clients",
  brands: "brands",
  jobs: "careers",
  media: "media",
  users: "users",
};

export type IconName = keyof typeof paths;

export const iconNameFor = (slug: string): IconName =>
  (bySlug[slug] as IconName | undefined) ?? "file";

export const AdminIcon = ({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {paths[name] ?? paths.file}
  </svg>
);
