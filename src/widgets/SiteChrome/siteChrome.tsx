import React from "react";
import MainHeader from "@/widgets/MainHeader";
import MainFooter from "@/widgets/MainFooter";
import TailoredServiceBanner from "@/widgets/TailoredServiceBanner";
import { getSite } from "@/lib/cms";

/**
 * Server wrappers that pull the shared chrome (menu, footer, closing banner)
 * from the CMS so every page stays in sync with the "Site settings" global.
 */

export const SiteHeader = async ({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) => {
  const site = await getSite();
  return <MainHeader variant={variant} navLinks={site.navLinks} />;
};

export const SiteFooter = async ({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) => {
  const site = await getSite();
  return <MainFooter variant={variant} site={site} />;
};

export const SiteCtaBanner = async () => {
  const site = await getSite();
  return <TailoredServiceBanner heading={site.ctaBanner} />;
};
