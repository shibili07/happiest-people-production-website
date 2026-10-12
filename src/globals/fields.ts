import type { Field } from "payload";

/** Search-engine title and description for a page. */
export const seoField: Field = {
  name: "seo",
  label: "Search engine listing",
  type: "group",
  admin: {
    description:
      "How this page appears in Google results and when it is shared.",
  },
  fields: [
    {
      name: "title",
      type: "text",
      maxLength: 70,
      admin: { description: "Around 50–60 characters works best." },
    },
    {
      name: "description",
      type: "textarea",
      maxLength: 170,
      admin: { description: "Around 140–160 characters works best." },
    },
  ],
};

/**
 * Section headings are written as “lead + emphasised word”, e.g.
 * “Our” + “Creations!”, so the italic accent from the design is preserved.
 */
export const headingFields = (
  leadDefault: string,
  emphasisDefault: string,
): Field[] => [
  {
    type: "row",
    fields: [
      {
        name: "titleLead",
        label: "Heading",
        type: "text",
        required: true,
        defaultValue: leadDefault,
      },
      {
        name: "titleEmphasis",
        label: "Italic accent word",
        type: "text",
        required: true,
        defaultValue: emphasisDefault,
      },
    ],
  },
];

/** A short stat, e.g. “800+” and “Ads”. */
export const statsField = (name = "stats"): Field => ({
  name,
  label: "Stats",
  type: "array",
  minRows: 1,
  maxRows: 6,
  labels: { singular: "Stat", plural: "Stats" },
  admin: {
    description:
      "The number counts up when it scrolls into view. Use digits followed by an optional suffix, e.g. “300+”.",
    initCollapsed: true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          validate: (value: unknown) =>
            typeof value === "string" && /^\d+\D*$/.test(value.trim())
              ? true
              : "Start with digits, e.g. 300+",
        },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
});

export const linkFields: Field[] = [
  {
    type: "row",
    fields: [
      { name: "label", type: "text", required: true },
      {
        name: "href",
        label: "Link",
        type: "text",
        required: true,
        admin: { description: "A path like /about or a full https:// URL." },
      },
    ],
  },
];
