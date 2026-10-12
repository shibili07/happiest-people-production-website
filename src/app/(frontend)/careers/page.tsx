import React from "react";
import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";

import CareersBanner from "@/widgets/CareersBanner/careersBanner";
import CurrentOpenings from "@/widgets/CurrentOpenings/currentOpenings";
import CareersApplication from "@/widgets/CareersApplication";
import CareersTailored from "@/widgets/CareersTailored";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import { getCareers, getJobs } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCareers();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

const richTextClasses =
  "[&_ol]:ml-6 [&_ol]:list-decimal [&_p+p]:mt-3 [&_ul]:ml-6 [&_ul]:mt-2 [&_ul]:list-disc";

const Careers = async () => {
  const [careers, jobs] = await Promise.all([getCareers(), getJobs()]);

  // Rich text is rendered on the server and handed to the (client) accordion.
  const openings = jobs.map((job) => ({
    title: job.title,
    type: job.type,
    richText: job.description ? (
      <RichText data={job.description} className={richTextClasses} />
    ) : null,
  }));

  return (
    <GlobalContextProvider>
      <div className="bg-black text-white">
        <SiteHeader variant="dark" />
        <CareersBanner data={careers.hero} />
        <CareersTailored data={careers.culture} />
        <CurrentOpenings openings={openings} data={careers.openings} />
        <CareersApplication data={careers.application} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
};

export default Careers;
