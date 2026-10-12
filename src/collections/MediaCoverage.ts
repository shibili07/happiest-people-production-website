import type { CollectionConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

export const MediaCoverage: CollectionConfig = {
  slug: "media-coverage",
  labels: { singular: "Media coverage", plural: "Media coverage" },
  admin: {
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "label", "publishedOn", "order"],
    description:
      "Press articles and reviews shown under “Media coverage & reviews” on the Clients page.",
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
      label: "Publication",
      type: "text",
      required: true,
      admin: { description: "e.g. “Cinema Express”." },
    },
    {
      type: "row",
      fields: [
        {
          name: "label",
          label: "Type of coverage",
          type: "text",
          required: true,
          defaultValue: "Review",
          admin: { description: "Small tag under the title, e.g. “Web series Review”." },
        },
        {
          name: "publishedOn",
          label: "Published on",
          type: "date",
          required: true,
          admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "Photo of the article or clipping, landscape works best (about 4:3). Use the focal point in the media library to choose the crop.",
      },
    },
    {
      name: "url",
      label: "Link to the article",
      type: "text",
      admin: {
        description:
          "Optional. If set, the card becomes a link that opens in a new tab.",
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
