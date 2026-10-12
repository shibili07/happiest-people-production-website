import React from "react";
import type { Metadata } from "next";

import AboutBanner from "@/widgets/AboutBanner";
import AboutCareers from "@/widgets/AboutCareers";
import AboutBeliveSystem from "@/widgets/AboutBeliveSystem";
import AboutWideTailored from "@/widgets/AboutWideTailored";
import AboutInsights from "@/widgets/AboutInsights";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider/globalContextProvider";
import { getAbout } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAbout();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

const About = async () => {
  const about = await getAbout();

  return (
    <GlobalContextProvider>
      <div className="bg-black text-white">
        <SiteHeader variant="dark" />
        <AboutBanner hero={about.hero} intro={about.intro} />
        <AboutCareers data={about.careers} />
        <AboutBeliveSystem data={about.beliefs} />
        <AboutWideTailored data={about.collage} />
        <AboutInsights data={about.insight} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
};

export default About;
