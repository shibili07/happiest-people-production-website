import React from "react";
import type { Metadata } from "next";

import HomeClients from "@/widgets/HomeClients";
import MediaCoverage from "@/widgets/MediaCoverage";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import GlowBlob from "@/components/GlowBlob";
import { getClientsPage } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getClientsPage();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

const Clients = async () => {
  const page = await getClientsPage();

  return (
    <GlobalContextProvider>
      <div className="relative overflow-x-clip bg-black text-white">
        <SiteHeader variant="dark" />
        <GlowBlob scale={0.9} className="left-[8%] top-[24%]" />
        <HomeClients
          data={page.clients}
          headingLevel="h1"
          className="relative z-10 pt-36 lg:pt-44 2xl:pt-[290px] 2xl:pb-[260px]"
        />
        <MediaCoverage data={page.coverage} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
};

export default Clients;
