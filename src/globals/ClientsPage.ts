import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { headingFields, seoField } from "./fields";

export const ClientsPage: GlobalConfig = {
  slug: "clients-page",
  label: "Clients page",
  admin: {
    group: "Pages",
    description:
      "Headings for the Clients page. Logos come from Clients and press items from Media coverage.",
  },
  access: { read: anyone, update: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange] },
  // Autosaved drafts power Live Preview; editors click "Publish changes" to go live.
  versions: { drafts: { autosave: { interval: 400 } }, max: 20 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Clients",
          name: "clients",
          fields: [
            ...headingFields("Our", "Clients"),
            { name: "description", type: "textarea", required: true },
          ],
        },
        {
          label: "Media coverage",
          name: "coverage",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Media Coverage & Reviews",
            },
            { name: "description", type: "textarea", required: true },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
