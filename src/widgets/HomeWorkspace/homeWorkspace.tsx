"use client";
import React from "react";
import Container from "@/components/Container";
import ParallaxImageSlider from "@/components/ParallaxImageSlider";
import GlowBlob from "@/components/GlowBlob";
import SectionTag from "@/components/SectionTag";
import useHomeWorkspace from "./useHomeWorkspace";
import { twc } from "@/utils";
import type { HomeData } from "@/lib/cms/types";

interface HomeWorkspaceProps {
  data: HomeData["workspace"];
}

const RATIOS = ["ratio_1", "ratio_2", "ratio_3"];

/** Wraps the first occurrence of `highlight` in the brand-yellow accent. */
const withHighlight = (text: string, highlight?: string) => {
  if (!highlight) return text;
  const index = text.indexOf(highlight);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="font-semibold text-primary">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
};

const HomeWorkspace = ({ data }: HomeWorkspaceProps) => {
  // The scroll-driven gallery needs a long strip, so repeat short lists.
  const sliderImages = Array.from(
    { length: Math.max(6, data.images.length * 2) },
    (_, index) => {
      const image = data.images[index % data.images.length];
      return { ...image, ratio: RATIOS[index % RATIOS.length] };
    },
  );

  const { containerRef, descriptionRef } = useHomeWorkspace();

  return (
    <section
      className={`home-workspace ${twClasses.section}`}
      ref={containerRef}
    >
      <GlowBlob scale={0.75} className="left-[-6%] top-[8%]" />
      <GlowBlob scale={0.75} className="right-[-4%] top-[20%]" />
      <Container className="relative z-10">
        <div className={`home-workspace__header ${twClasses.header}`}>
          <SectionTag>{data.eyebrow}</SectionTag>
          <h2 className={`home-workspace__title ${twClasses.title}`}>
            {data.titleBefore}{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/camera-indoor.svg"
              alt=""
              aria-hidden="true"
              className={`home-workspace__title--icon ${twClasses.title_icon}`}
            />{" "}
            {data.titleAfter}{" "}
            <em className="font-light">{data.titleEmphasis}</em>
          </h2>
        </div>
        <p
          className={`home-workspace__description ${twClasses.description}`}
          ref={descriptionRef}
        >
          {data.paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {withHighlight(paragraph, data.highlight)}
            </React.Fragment>
          ))}
        </p>
      </Container>
      <div className={`home-workspace__slider ${twClasses.slider}`}>
        <ParallaxImageSlider images={sliderImages} />
      </div>
    </section>
  );
};

export default HomeWorkspace;

const twClasses = twc({
  section:
    "relative overflow-x-clip text-white 2xl:pb-[270px] 2xl:pt-0 lg:pb-32 pb-16",
  header: "flex flex-col items-start gap-8 2xl:gap-[69px]",
  title:
    "ff-figtree max-w-[930px] text-4xl font-medium uppercase leading-[1.42] tracking-[-0.057em] text-white md:text-5xl 2xl:text-[64px]",
  title_icon:
    "inline-block h-[0.8em] w-auto align-baseline mx-[0.1em] -translate-y-[0.08em]",
  description:
    "mt-10 text-lg leading-[1.87] text-white md:text-xl xl:ml-auto xl:max-w-[1056px] 2xl:mt-[120px] 2xl:text-[30.5px]",
  slider:
    "mt-12 xl:mt-32 [&_.parallax-image-slider__slide]:rounded-xl 2xl:mt-[150px]",
});
