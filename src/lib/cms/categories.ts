/** Work categories shown as filter tabs on the Works page. */
export const WORK_CATEGORIES = [
  { value: "commercials", label: "Commercials" },
  { value: "series", label: "Series" },
  { value: "promo", label: "Promo & Music Videos" },
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number]["value"];

export const DEFAULT_WORK_CATEGORY: WorkCategory = "commercials";
