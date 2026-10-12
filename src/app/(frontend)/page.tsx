import type { Metadata } from "next";

import HomeAbout from "@/widgets/HomeAbout";
import HomeBanner from "@/widgets/HomeBanner";
import HomeBrands from "@/widgets/HomeBrands";
import HomeClients from "@/widgets/HomeClients";
import HomeServices from "@/widgets/HomeServices";
import HomeTestimonials from "@/widgets/HomeTestimonials";
import HomeWorks from "@/widgets/HomeWorks";
import HomeWorkspace from "@/widgets/HomeWorkspace";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import { getHome } from "@/lib/cms";

// Cached pages are refreshed instantly when content is saved in the CMS;
// this is only a safety net.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

export default async function Home() {
  const home = await getHome();

  return (
    <GlobalContextProvider>
      <div className="bg-black text-white">
        <SiteHeader variant="dark" />
        <HomeBanner hero={home.hero} />
        <HomeBrands brands={home.brands} />
        <HomeWorks data={home.works} />
        <HomeAbout data={home.about} />
        <HomeWorkspace data={home.workspace} />
        <HomeServices data={home.services} />
        <HomeClients data={home.clients} />
        <HomeTestimonials data={home.testimonials} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
}
