import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { normalizeYoutubeId } from "../hooks/youtube";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  admin: {
    group: "Content",
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "company", "industry", "order"],
    description: "Client stories shown in the “Featured stories” slider.",
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
      type: "row",
      fields: [
        { name: "authorName", type: "text", required: true },
        {
          name: "authorRole",
          type: "textarea",
          required: true,
          admin: { description: "One line per row, e.g. title then company." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "company", type: "text", required: true },
        {
          name: "industry",
          type: "text",
          required: true,
          admin: { description: "Shown as a small tag, e.g. “Retail”." },
        },
      ],
    },
    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Optional. If set, the logo is shown instead of the company name.",
      },
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
      admin: {
        description: "Leave a blank line between paragraphs.",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Portrait, roughly 396 × 430." },
    },
    {
      name: "youtubeId",
      label: "Video testimonial",
      type: "text",
      hooks: { beforeValidate: [normalizeYoutubeId] },
      admin: {
        description:
          "Optional YouTube ID or link. Adds a play button over the photo.",
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
