import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { headingFields, seoField } from "./fields";

export const CareersPage: GlobalConfig = {
  slug: "careers-page",
  label: "Careers page",
  admin: {
    group: "Pages",
    description:
      "Text and images for the Careers page. The roles themselves are managed under Job openings.",
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
          label: "Hero",
          name: "hero",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "titleLine1",
                  label: "First line",
                  type: "text",
                  required: true,
                  defaultValue: "Want to join",
                },
                {
                  name: "titleLine2",
                  label: "Second line",
                  type: "text",
                  required: true,
                  defaultValue: "our creative",
                },
                {
                  name: "titleEmphasis",
                  label: "Italic accent word",
                  type: "text",
                  required: true,
                  defaultValue: "squad?",
                },
              ],
            },
            {
              name: "buttonLabel",
              label: "Button text",
              type: "text",
              required: true,
              defaultValue: "Current Openings",
              admin: { description: "Scrolls to the openings list." },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "Wide image, about 2:1 (1573 × 755)." },
            },
          ],
        },
        {
          label: "Culture",
          name: "culture",
          fields: [
            ...headingFields("Shape your", "career graph!"),
            { name: "description", type: "textarea", required: true },
            {
              name: "images",
              label: "Photos",
              type: "array",
              minRows: 3,
              maxRows: 3,
              labels: { singular: "Photo", plural: "Photos" },
              admin: {
                description:
                  "Exactly three: the top-left tile, the larger middle tile and the lower-right tile.",
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Openings",
          name: "openings",
          fields: [
            ...headingFields("Current", "openings"),
            {
              name: "emptyMessage",
              label: "Message when there are no open roles",
              type: "textarea",
              defaultValue:
                "There are no open roles right now. Check back soon, or send us your portfolio through the form below.",
            },
          ],
        },
        {
          label: "Application form",
          name: "application",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Let's weave the visuals together!",
            },
            { name: "text", type: "textarea", required: true },
            {
              name: "departments",
              type: "array",
              minRows: 1,
              labels: { singular: "Department", plural: "Departments" },
              admin: {
                description: "Options in the “Applying for” dropdown.",
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
