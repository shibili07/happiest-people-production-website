"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminIcon } from "./icons";

/** Top of the sidebar: brand lockup and the Dashboard link. */
export const NavHome = () => {
  const pathname = usePathname();
  const active = pathname === "/admin" || pathname === "/admin/";

  return (
    <div className="hpp-nav-home">
      <Link href="/admin" className="hpp-nav-brand" aria-label="Dashboard">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hpp-logo.svg" alt="" width={34} height={25} />
        <span className="hpp-nav-brand__text">
          <strong>Happiest People</strong>
          <span>Content studio</span>
        </span>
      </Link>
      <Link
        href="/admin"
        className={`hpp-nav-dashboard${active ? " hpp-nav-dashboard--active" : ""}`}
      >
        <AdminIcon name="grid" size={18} />
        Dashboard
      </Link>
    </div>
  );
};
