import React from "react";

/** Shown on the admin login screen. */
export const Logo = () => (
  <div className="hpp-admin-logo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/home/footer-logo.svg"
      alt="Happiest People Productions"
      width={220}
      height={160}
    />
    <span className="hpp-admin-logo__tag">Content studio</span>
  </div>
);
