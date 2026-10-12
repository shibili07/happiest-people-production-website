"use client";
import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import GlowBlob from "@/components/GlowBlob";
import Image from "next/image";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { CareersData } from "@/lib/cms/types";

interface CareersBannerProps {
  data: CareersData["hero"];
}

const CareersBanner = ({ data }: CareersBannerProps) => {
  // Lenis scroll handler
  const handleScrollToOpenings = () => {
    const section = document.querySelector(
      '[data-widget="careers-current-openings"]'
    );
    if (section && window.lenis) {
      window.lenis?.scrollTo?.(section, { offset: -40, duration: 1 });
    } else if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      data-widget="careers-banner"
      className={`careers-banner ${twClasses.section}`}
    >
      <GlowBlob scale={0.9} className="left-1/2 top-[18%]" />
      <Container className="relative z-10">
        <h1 className={`careers-banner__title ${twClasses.title}`}>
          <span className="block">{data.titleLine1}</span>
          <span className="block">
            {data.titleLine2}{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/careers/cognition.svg"
              alt=""
              aria-hidden="true"
              className={`careers-banner__icon ${twClasses.icon}`}
            />{" "}
            <em className="font-light">{data.titleEmphasis}</em>
          </span>
        </h1>
        <div className={`careers-banner__button ${twClasses.button}`}>
          <Button
            as="button"
            text={data.buttonLabel}
            icon={<Icons.ChevronRight className="h-3 mt-px" />}
            variant="outlined-with-icon"
            color="white"
            className="rounded-[7px] 2xl:h-[60px] 2xl:min-w-[230px]"
            textClass="font-medium"
            onClick={handleScrollToOpenings}
          />
        </div>
        <figure className={`careers-banner__image ${twClasses.image}`}>
          <Image
            src={data.image.url}
            alt={data.image.alt}
            fill
            priority
            sizes="(min-width: 1600px) 1573px, 95vw"
            className="object-cover"
            style={
              data.image.focalX !== undefined && data.image.focalY !== undefined
                ? { objectPosition: `${data.image.focalX}% ${data.image.focalY}%` }
                : undefined
            }
          />
        </figure>
      </Container>
    </section>
  );
};

export default CareersBanner;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black pt-36 text-white lg:pt-44 2xl:pt-[200px] 2xl:pb-[330px] xl:pb-32 pb-16",
  title:
    "ff-figtree text-center text-4xl font-medium uppercase leading-[1.1] tracking-[-0.037em] sm:text-6xl lg:text-7xl 2xl:text-[98px]",
  icon: "inline-block h-[0.95em] w-auto align-middle -translate-y-[0.06em]",
  button: "relative z-[2] mx-auto mt-10 flex w-max justify-center 2xl:mt-[60px]",
  image:
    "relative mt-12 aspect-[1573/755] w-full overflow-hidden xl:mt-20 2xl:mt-[130px]",
});
