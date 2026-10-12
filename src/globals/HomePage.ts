import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { headingFields, linkFields, seoField, statsField } from "./fields";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  admin: {
    group: "Pages",
    description:
      "Text and images for the home page. Works, services, clients and testimonials are managed in their own sections.",
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
                  defaultValue: "Crafting a",
                },
                {
                  name: "titleLine2",
                  label: "Second line",
                  type: "text",
                  required: true,
                  defaultValue: "impactful",
                },
                {
                  name: "titleEmphasis",
                  label: "Italic accent word",
                  type: "text",
                  required: true,
                  defaultValue: "ads",
                },
              ],
            },
            {
              name: "cta",
              label: "Button",
              type: "group",
              fields: linkFields,
            },
          ],
        },
        {
          label: "Works",
          name: "works",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "works" },
            ...headingFields("Our", "Creations!"),
            { name: "description", type: "textarea", required: true },
            {
              name: "viewAllLabel",
              label: "“View all” button",
              type: "text",
              required: true,
              defaultValue: "View All",
            },
          ],
        },
        {
          label: "About",
          name: "about",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "About Us" },
            {
              type: "row",
              fields: [
                {
                  name: "titleLine1",
                  label: "Heading",
                  type: "text",
                  required: true,
                  defaultValue: "We craft",
                },
                {
                  name: "titleEmphasis",
                  label: "Italic accent",
                  type: "text",
                  required: true,
                  defaultValue: "your fit!",
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: { description: "Leave a blank line between paragraphs." },
            },
            {
              name: "cta",
              label: "Link",
              type: "group",
              fields: linkFields,
            },
            statsField(),
          ],
        },
        {
          label: "Work space",
          name: "workspace",
          fields: [
            { name: "eyebrow", type: "text", required: true, defaultValue: "Work space" },
            {
              name: "titleBefore",
              label: "Heading, first part",
              type: "text",
              required: true,
            },
            {
              name: "titleAfter",
              label: "Heading, second part",
              type: "text",
              required: true,
            },
            {
              name: "titleEmphasis",
              label: "Italic accent",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: { description: "Leave a blank line between paragraphs." },
            },
            {
              name: "highlight",
              label: "Highlighted text",
              type: "text",
              admin: {
                description:
                  "A word or number from the description to show in yellow, e.g. 2000.",
              },
            },
            {
              name: "images",
              label: "Gallery",
              type: "array",
              minRows: 3,
              maxRows: 9,
              labels: { singular: "Photo", plural: "Photos" },
              admin: {
                description:
                  "Shown in the scroll-driven gallery. Landscape photos work best for the first slot.",
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
          label: "Services",
          name: "services",
          fields: [...headingFields("Our", "services")],
        },
        {
          label: "Clients",
          name: "clients",
          fields: [
            ...headingFields("Our", "Clients"),
            { name: "description", type: "textarea", required: true },
          ],
        },
        {
          label: "Testimonials",
          name: "testimonials",
          fields: [
            ...headingFields("Featured", "Stories"),
            { name: "description", type: "textarea", required: true },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
