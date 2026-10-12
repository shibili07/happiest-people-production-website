import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "icon", "order"],
    description: "Cards in the “Our services” slider on the home page.",
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
    { name: "description", type: "textarea", required: true },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "tv",
      options: [
        { label: "TV", value: "tv" },
        { label: "Play button", value: "play" },
        { label: "Camera", value: "camera" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
