import type { GlobalConfig } from "payload";

import { anyone, isLoggedIn } from "../access";
import { revalidateAfterChange } from "../hooks/revalidate";
import { linkFields } from "./fields";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Settings",
    description:
      "Navigation, footer, contact details and the banner shown above every footer.",
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
          label: "General",
          fields: [
            {
              name: "siteName",
              type: "text",
              required: true,
              defaultValue: "Happiest People Productions",
            },
            {
              name: "defaultDescription",
              label: "Default description",
              type: "textarea",
              maxLength: 170,
              admin: {
                description:
                  "Used for pages that do not have their own search description.",
              },
            },
          ],
        },
        {
          label: "Navigation",
          fields: [
            {
              name: "navLinks",
              label: "Header menu",
              type: "array",
              minRows: 1,
              maxRows: 8,
              labels: { singular: "Link", plural: "Links" },
              fields: linkFields,
            },
            {
              name: "footerColumns",
              label: "Footer link columns",
              type: "array",
              maxRows: 3,
              labels: { singular: "Column", plural: "Columns" },
              fields: [
                {
                  name: "links",
                  type: "array",
                  minRows: 1,
                  maxRows: 8,
                  labels: { singular: "Link", plural: "Links" },
                  fields: linkFields,
                },
              ],
            },
          ],
        },
        {
          label: "Contact",
          name: "contact",
          fields: [
            { name: "email", type: "email", required: true },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text" },
                {
                  name: "phoneNote",
                  label: "Opening hours note",
                  type: "text",
                  admin: { description: "e.g. “9 am to 5 pm, except Sundays”." },
                },
              ],
            },
            {
              name: "address",
              type: "textarea",
              admin: { description: "One line per row." },
            },
            {
              name: "mapUrl",
              label: "Directions link",
              type: "text",
              admin: { description: "Google Maps share link." },
            },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "socials",
              type: "array",
              maxRows: 6,
              labels: { singular: "Profile", plural: "Profiles" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      options: [
                        { label: "Facebook", value: "facebook" },
                        { label: "LinkedIn", value: "linkedin" },
                        { label: "Instagram", value: "instagram" },
                        { label: "Behance", value: "behance" },
                      ],
                    },
                    { name: "url", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Closing banner",
          name: "ctaBanner",
          description: "The yellow banner above the footer on every page.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "titleLead",
                  label: "Heading",
                  type: "text",
                  required: true,
                  defaultValue: "We serve a wide",
                },
                {
                  name: "titleEmphasis",
                  label: "Italic accent word",
                  type: "text",
                  required: true,
                  defaultValue: "tailored",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
