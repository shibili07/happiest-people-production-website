import type { CollectionConfig } from "payload";

import { isAdmin, isAdminField, isLoggedIn } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  admin: {
    group: "Settings",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    description: "People who can sign in to this admin panel.",
  },
  auth: {
    tokenExpiration: 60 * 60 * 12,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    // Editors can see the team and edit themselves, admins manage everyone.
    read: isLoggedIn,
    create: isAdmin,
    update: ({ req: { user }, id }) =>
      Boolean(user && (user.role === "admin" || user.id === id)),
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      // The very first account (created on the first-run screen) must be an
      // admin, otherwise nobody could ever manage users.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({
          collection: "users",
          req,
        });
        return totalDocs === 0 ? { ...data, role: "admin" } : data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: { update: isAdminField },
      admin: {
        position: "sidebar",
        description: "Admins can manage users. Editors can only edit content.",
      },
    },
  ],
};
