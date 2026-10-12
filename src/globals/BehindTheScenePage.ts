import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { seoField } from "./fields";

export const BehindTheScenePage: GlobalConfig = {
  slug: "behind-the-scene-page",
  label: "Behind the scene page",
  admin: {
    group: "Pages",
    description:
      "Heading and intro for the Behind the scene page. The reels are managed under Behind the scenes.",
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
            {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Behind the scene",
            },
            { name: "description", type: "textarea" },
            {
              name: "emptyMessage",
              label: "Message for an empty category",
              type: "text",
              defaultValue: "No reels in this category yet. Check back soon.",
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
