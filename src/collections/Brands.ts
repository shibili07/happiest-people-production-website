import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

export const Brands: CollectionConfig = {
  slug: "brands",
  labels: { singular: "Brand", plural: "Brands" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
    description: "Logos in the scrolling strip right under the home hero.",
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
    { name: "name", type: "text", required: true },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "Dark logo on a transparent background. The strip uses a yellow background.",
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
