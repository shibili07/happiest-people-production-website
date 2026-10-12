import React from "react";
import type { Metadata } from "next";

import ContactBanner from "@/widgets/ContactBanner";
import ContactAddress from "@/widgets/ContactAddress/contactAddress";
import { SiteCtaBanner, SiteFooter, SiteHeader } from "@/widgets/SiteChrome";
import GlobalContextProvider from "@/components/GlobalContextProvider";
import { getContactPage } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPage();
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
  };
}

const ContactUs = async () => {
  const page = await getContactPage();

  return (
    <GlobalContextProvider>
      <div className="bg-black text-white">
        <SiteHeader variant="dark" />
        <ContactBanner
          title={page.title}
          description={page.description}
          image={page.officeImage}
          services={page.services}
        />
        <ContactAddress contact={page.contact} mapEmbedUrl={page.mapEmbedUrl} />
        <SiteCtaBanner />
        <SiteFooter variant="dark" />
      </div>
    </GlobalContextProvider>
  );
};

export default ContactUs;
