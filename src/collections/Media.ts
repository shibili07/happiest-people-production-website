import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media file", plural: "Media library" },
  admin: {
    group: "Library",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"],
    description: "Images used across the website. Always add alt text.",
  },
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
  upload: {
    // Local disk storage. For production on serverless hosting, swap in a
    // cloud storage adapter (S3, Vercel Blob, ...).
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/*"],
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 1024 },
      { name: "hero", width: 1920 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Short description for screen readers and search engines, e.g. “Team laughing on the studio terrace”.",
      },
    },
  ],
};
