import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { twc } from "@/utils";
import { defaultSite } from "@/lib/cms/defaults";
import type { CmsHeading } from "@/lib/cms/types";

interface TailoredServiceBannerProps {
  heading?: CmsHeading;
}

const TailoredServiceBanner = ({
  heading = defaultSite.ctaBanner,
}: TailoredServiceBannerProps) => {
  return (
    <section
      data-widget="home-tailored-service-banner"
      data-invert-cursor="true"
      className={`home-tailored-service-banner ${twClasses.section}`}
    >
      <Container>
        <div className={`home-tailored-service-banner__grid ${twClasses.grid}`}>
          <figure
            className={`home-tailored-service-banner__image ${twClasses.image}`}
          >
            <Image
              src="/images/yellow-camera.webp"
              alt="yellow camera with circular waves around."
              fill
              className="object-contain"
            />
          </figure>
          <div
            className={`home-tailored-service-banner__contents ${twClasses.contents}`}
          >
            <h2
              className={`home-tailored-service-banner__title ${twClasses.title}`}
            >
              {heading.lead} <em className="font-medium">{heading.emphasis}</em>
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TailoredServiceBanner;

const twClasses = twc({
  section: "bg-gradient-to-r from-primary to-primary-100 py-12 text-black",
  grid: "grid lg:grid-cols-2",
  image: "relative aspect-[766/430] w-full",
  contents: "flex items-center",
  title:
    "xl:text-6xl 2xl:text-[75px] text-4xl leading-[1.12] tracking-[-0.03em] font-light ff-figtree xl:max-w-96 2xl:max-w-[430px] max-w-64 max-lg:text-center max-lg:mx-auto",
});
