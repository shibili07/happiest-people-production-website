import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { headingFields, linkFields, seoField, statsField } from "./fields";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About page",
  admin: {
    group: "Pages",
    description: "Text and images for the About page.",
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
            { name: "eyebrow", type: "text", required: true, defaultValue: "About" },
            {
              type: "row",
              fields: [
                { name: "titleLine1", label: "First line", type: "text", required: true },
                { name: "titleLine2", label: "Second line", type: "text", required: true },
              ],
            },
            { name: "cta", label: "Button", type: "group", fields: linkFields },
          ],
        },
        {
          label: "Introduction",
          name: "intro",
          fields: [
            { name: "text", type: "textarea", required: true },
            statsField(),
          ],
        },
        {
          label: "Careers invite",
          name: "careers",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "titleLine1",
                  label: "Heading",
                  type: "text",
                  required: true,
                },
                {
                  name: "titleEmphasis",
                  label: "Italic accent",
                  type: "text",
                  required: true,
                },
              ],
            },
            { name: "description", type: "textarea", required: true },
            { name: "button", type: "group", fields: linkFields },
            {
              name: "images",
              label: "Team photos",
              type: "array",
              minRows: 3,
              maxRows: 9,
              labels: { singular: "Photo", plural: "Photos" },
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
          label: "Belief system",
          name: "beliefs",
          fields: [
            ...headingFields("Our belief", "system"),
            {
              name: "items",
              type: "array",
              minRows: 1,
              maxRows: 4,
              labels: { singular: "Card", plural: "Cards" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "title", type: "text", required: true },
                    {
                      name: "icon",
                      type: "select",
                      required: true,
                      defaultValue: "vision",
                      options: [
                        { label: "Vision", value: "vision" },
                        { label: "Mission", value: "mission" },
                      ],
                    },
                  ],
                },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Values collage",
          name: "collage",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                description: "The “HPC” lettering artwork (transparent PNG/WebP).",
              },
            },
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea", required: true },
          ],
        },
        {
          label: "Founder insight",
          name: "insight",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "titleLine1",
                  label: "Heading",
                  type: "text",
                  required: true,
                },
                {
                  name: "titleEmphasis",
                  label: "Italic accent",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "quote",
              type: "textarea",
              required: true,
              admin: { description: "Leave a blank line between paragraphs." },
            },
            {
              type: "row",
              fields: [
                { name: "authorName", type: "text", required: true },
                { name: "authorRole", type: "text", required: true },
              ],
            },
            {
              name: "portrait",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "Portrait, ratio about 4:5." },
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
