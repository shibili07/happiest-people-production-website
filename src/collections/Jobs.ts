import type { CollectionConfig } from "payload";

import { isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

export const Jobs: CollectionConfig = {
  slug: "jobs",
  labels: { singular: "Job opening", plural: "Job openings" },
  admin: {
    group: "Careers",
    useAsTitle: "title",
    defaultColumns: ["title", "type", "isOpen", "order"],
    description: "Roles listed under “Current openings” on the Careers page.",
  },
  defaultSort: "order",
  access: {
    // Closed roles stay hidden from the public API.
    read: ({ req: { user } }) => (user ? true : { isOpen: { equals: true } }),
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
      name: "type",
      type: "text",
      required: true,
      defaultValue: "Full time",
      admin: { description: "e.g. “Remote - Full time”." },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      admin: { description: "What the role involves and what you look for." },
    },
    {
      name: "isOpen",
      label: "Accepting applications",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
