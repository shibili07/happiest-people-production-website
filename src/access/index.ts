import type { Access, FieldAccess } from "payload";

/** Public read access, used for content that is rendered on the website. */
export const anyone: Access = () => true;

/** Any signed-in admin-panel user (editor or admin). */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user);

/** Only users with the `admin` role. */
export const isAdmin: Access = ({ req: { user } }) =>
  Boolean(user && user.role === "admin");

export const isAdminField: FieldAccess = ({ req: { user } }) =>
  Boolean(user && user.role === "admin");
