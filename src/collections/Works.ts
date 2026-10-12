import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { normalizeYoutubeId } from "../hooks/youtube";
import { DEFAULT_WORK_CATEGORY, WORK_CATEGORIES } from "../lib/cms/categories";

export const Works: CollectionConfig = {
  slug: "works",
  labels: { singular: "Work", plural: "Works" },
  admin: {
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "featuredOnHome", "order", "updatedAt"],
    description:
      "Films and shoots shown on the Works page. Mark a few as featured to show them on the home page.",
  },
  defaultSort: "order",
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Landscape image, ideally 16:9 (1920 × 1080)." },
    },
    {
      name: "youtubeId",
      label: "YouTube video",
      type: "text",
      hooks: { beforeValidate: [normalizeYoutubeId] },
      admin: {
        description:
          "Paste the video ID or the full YouTube link. Leave empty to hide the “Watch Now” button.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: DEFAULT_WORK_CATEGORY,
      options: WORK_CATEGORIES.map(({ label, value }) => ({ label, value })),
      admin: {
        position: "sidebar",
        description: "Which filter tab on the Works page this film appears under.",
      },
    },
    {
      name: "featuredOnHome",
      label: "Feature on home page",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
  ],
};
