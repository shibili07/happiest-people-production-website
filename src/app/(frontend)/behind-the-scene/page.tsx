import React from "react";
import type { Metadata } from "next";

import BehindTheScene from "@/widgets/BehindTheScene";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import { getBehindTheScene } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getBehindTheScene();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

const BehindTheScenePage = async () => {
  const page = await getBehindTheScene();

  return (
    <GlobalContextProvider>
      <div className="bg-black text-white">
        <SiteHeader variant="dark" />
        <BehindTheScene data={page} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
};

export default BehindTheScenePage;
