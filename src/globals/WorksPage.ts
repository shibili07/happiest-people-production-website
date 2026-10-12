import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { headingFields, seoField } from "./fields";

export const WorksPage: GlobalConfig = {
  slug: "works-page",
  label: "Works page",
  admin: {
    group: "Pages",
    description:
      "Heading for the Works page. The films themselves are managed under Works, where each one is given a category.",
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
          label: "Heading",
          fields: [
            ...headingFields("Our", "works"),
            {
              name: "emptyMessage",
              label: "Message for an empty category",
              type: "text",
              defaultValue: "No films in this category yet. Check back soon.",
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
