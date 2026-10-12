import React from "react";

import { AdminIcon } from "./icons";

/** Header shortcut shown at the top right of every admin screen. */
export const ViewSite = () => (
  <a
    className="hpp-view-site"
    href="/"
    target="_blank"
    rel="noopener noreferrer"
  >
    View site
    <AdminIcon name="external" size={14} />
  </a>
);
