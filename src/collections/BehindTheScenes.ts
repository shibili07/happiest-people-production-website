import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { DEFAULT_WORK_CATEGORY, WORK_CATEGORIES } from "../lib/cms/categories";

export const BehindTheScenes: CollectionConfig = {
  slug: "behind-the-scenes",
  labels: { singular: "Behind the scenes reel", plural: "Behind the scenes" },
  admin: {
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order", "updatedAt"],
    description:
      "Instagram reels shown on the Behind the scene page. Each card links out to Instagram.",
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
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description:
          "Short description of the reel. Used as the image description for screen readers.",
      },
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "Vertical cover image, ideally 9:16 (for example 1080 × 1920). Save a frame from the reel or use its Instagram cover.",
      },
    },
    {
      name: "instagramUrl",
      label: "Instagram link",
      type: "text",
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== "string" || !value.trim()) return "Enter the reel link.";
        try {
          const url = new URL(value.trim());
          const host = url.hostname.replace(/^www\./, "");
          return host === "instagram.com" || host.endsWith(".instagram.com")
            ? true
            : "This should be an instagram.com link.";
        } catch {
          return "Enter a full link, e.g. https://www.instagram.com/reel/…";
        }
      },
      admin: { description: "The reel's share link from Instagram." },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: DEFAULT_WORK_CATEGORY,
      options: WORK_CATEGORIES.map(({ label, value }) => ({ label, value })),
      admin: {
        position: "sidebar",
        description: "Which filter tab the reel appears under.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
