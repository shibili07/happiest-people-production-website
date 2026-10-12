import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { seoField } from "./fields";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact page",
  admin: {
    group: "Pages",
    description:
      "Photos and form options for the Contact page. The address, phone and email live in Site settings.",
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
              defaultValue: "Contact us",
            },
            {
              name: "description",
              type: "textarea",
              admin: {
                description:
                  "Short line under the heading. Leave empty to hide it.",
              },
            },
          ],
        },
        {
          label: "Images",
          fields: [
            {
              name: "officeImage",
              label: "Photo next to the form",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "Roughly square, about 604 × 628." },
            },
          ],
        },
        {
          label: "Map",
          fields: [
            {
              name: "mapQuery",
              label: "Place shown on the map",
              type: "text",
              required: true,
              defaultValue:
                "Happiest People Productions, Aloor Road, Perumannu, Kechery, Thrissur, Kerala 680501",
              admin: {
                description:
                  "A place name or address, or “latitude,longitude”. For an exact pin, open Google Maps → Share → Embed a map and paste the whole snippet here. The “Get direction” button uses the map link in Site settings.",
              },
            },
          ],
        },
        {
          label: "Form",
          fields: [
            {
              name: "services",
              label: "Services dropdown",
              type: "array",
              labels: { singular: "Option", plural: "Options" },
              admin: {
                description:
                  "Options in the “Services” dropdown. Leave empty to use the titles from Services plus “Other”.",
                initCollapsed: true,
              },
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
