import React from "react";
import type { Metadata } from "next";

import WorksList from "@/widgets/WorksList/worksList";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import { getWorksPage } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getWorksPage();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

const Works = async () => {
  const page = await getWorksPage();

  return (
    <GlobalContextProvider>
      <div className="bg-black text-white">
        <SiteHeader variant="dark" />
        <WorksList data={page} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
};

export default Works;
