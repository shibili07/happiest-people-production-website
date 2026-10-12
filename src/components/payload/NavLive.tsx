import React from "react";

import { AdminIcon } from "./icons";

/** Bottom of the sidebar: jump to the public website. */
export const NavLive = () => (
  <a
    className="hpp-nav-live"
    href="/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="hpp-nav-live__dot" aria-hidden="true" />
    <span className="hpp-nav-live__text">
      <strong>Live website</strong>
      <span>Open in a new tab</span>
    </span>
    <AdminIcon name="external" size={16} />
  </a>
);
