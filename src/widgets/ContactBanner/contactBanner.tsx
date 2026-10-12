"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import GlowBlob from "@/components/GlowBlob";
import { twc } from "@/utils";
import type { ContactPageData } from "@/lib/cms/types";

interface ContactBannerProps {
  title: ContactPageData["title"];
  description: ContactPageData["description"];
  image: ContactPageData["officeImage"];
  services: ContactPageData["services"];
}

const ContactBanner = ({
  title,
  description,
  image,
  services,
}: ContactBannerProps) => {
  return (
    <section
      data-widget="contact-banner"
      className={`contact-banner ${twClasses.section}`}
    >
      <GlowBlob scale={0.8} className="left-[-4%] top-[78%]" />
      <Container className="relative z-10">
        <h1 className={`contact-banner__title ${twClasses.title}`}>{title}</h1>
        {description && (
          <p className={`contact-banner__description ${twClasses.description}`}>
            {description}
          </p>
        )}

        <div className={twClasses.grid}>
          <figure className={`contact-banner__image ${twClasses.image}`}>
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1536px) 604px, (min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              style={
                image.focalX !== undefined && image.focalY !== undefined
                  ? { objectPosition: `${image.focalX}% ${image.focalY}%` }
                  : undefined
              }
            />
          </figure>

          <div className={`contact-banner__form ${twClasses.form}`}>
            <ContactForm theme="dark" services={services} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactBanner;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black pt-36 text-white lg:pt-44 2xl:pt-[200px] 2xl:pb-[310px] lg:pb-24 pb-16",
  title:
    "ff-figtree text-5xl font-light leading-[1.2] tracking-[-0.04em] sm:text-7xl 2xl:text-[100.87px]",
  description:
    "ff-manrope mt-3 max-w-2xl text-base text-white/60 md:text-lg 2xl:mt-6 2xl:text-[22px]",
  grid: "mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,604fr)_minmax(0,828fr)] lg:gap-[7%] 2xl:mt-[90px]",
  image:
    "relative aspect-[604/628] w-full max-w-[604px] overflow-hidden max-lg:mx-auto",
  form: "lg:pt-[4%]",
});
