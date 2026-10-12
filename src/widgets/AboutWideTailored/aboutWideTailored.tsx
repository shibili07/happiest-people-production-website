import React from "react";
import Container from "@/components/Container";
import GlowBlob from "@/components/GlowBlob";
import Image from "next/image";
import { twc } from "@/utils";
import type { AboutData } from "@/lib/cms/types";

interface AboutWideTailoredProps {
  data: AboutData["collage"];
}

const AboutWideTailored = ({ data }: AboutWideTailoredProps) => {
  return (
    <section
      data-widget="about-wide-tailored"
      className={`about-wide-tailored ${twClasses.section}`}
    >
      <GlowBlob scale={1.2} className="left-[-8%] top-[8%]" />
      <Container className="relative z-10">
        <figure className={`about-wide-tailored__image ${twClasses.image}`}>
          <Image
            src={data.image.url}
            alt={data.image.alt}
            width={data.image.width ?? 1040}
            height={data.image.height ?? 414}
            sizes="(min-width: 1536px) 1040px, 90vw"
            className="h-auto w-full"
          />
        </figure>

        <h2 className={`about-wide-tailored__title ${twClasses.title}`}>
          {data.title}
        </h2>

        <div className={`about-wide-tailored__contents ${twClasses.contents}`}>
          <p
            className={`about-wide-tailored__description ${twClasses.description}`}
          >
            {data.text}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AboutWideTailored;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black text-white lg:pb-32 pb-16 2xl:pb-[260px]",
  image: "max-w-[768px] 2xl:max-w-[1040px]",
  title:
    "ff-figtree mt-12 max-w-[1149px] text-4xl font-light leading-[1.25] tracking-[-0.039em] text-white md:text-6xl 2xl:mt-[56px] 2xl:ps-[17px] 2xl:text-[82.6px]",
  contents: "mt-10 lg:ml-[30%] lg:max-w-[880px] 2xl:mt-[120px]",
  description:
    "text-xl leading-[1.5] tracking-[-0.0125em] text-[#969696]/[.93] md:text-3xl 2xl:text-[40px]",
});
