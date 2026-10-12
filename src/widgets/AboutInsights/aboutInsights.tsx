"use client";
import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import useInsightsSlider from "./useAboutInsightsSlider";
import type { InsightSlide } from "@/types/aboutInsights";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { AboutData } from "@/lib/cms/types";

interface AboutInsightsProps {
  data: AboutData["insight"];
}

const AboutInsights = ({ data }: AboutInsightsProps) => {
  // One founder note today; the slider supports several if more are added.
  const slides: InsightSlide[] = [
    {
      image: data.portrait.url,
      quote: data.paragraphs.join("\n"),
      author: data.authorName,
      designation: data.authorRole,
    },
  ];
  const { rootRef, contentRef, index, setSlideRef } = useInsightsSlider(slides);

  return (
    <section
      data-widget="about-insights"
      className={`about-insights ${twClasses.section}`}
    >
      <Container>
        <div className={`about-insights__grid ${twClasses.grid}`} ref={rootRef}>
          {/* Left Content */}
          <div className={`about-insights__grid--left ${twClasses.left}`}>
            <h2 className={`about-insights__title ${twClasses.title}`}>
              {data.title.lead}
              <br />
              <em className={`about-insights__title--em ${twClasses.title_em}`}>
                {data.title.emphasis}
              </em>
            </h2>
            <div
              className={`about-insights__content ${twClasses.content}`}
              ref={contentRef}
            >
              <Icons.BlockQuote className="lg:h-8 h-4 shrink-0 text-white" />
              <div
                className={`about-insights__content--right ${twClasses.content_right}`}
              >
                <div
                  className={`about-insights__description ${twClasses.description}`}
                >
                  {slides[index].quote.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className={`about-insights__author ${twClasses.author}`}>
                  <div className={`author-name ${twClasses.author_name}`}>
                    {slides[index].author}
                  </div>
                  <div
                    className={`author-designation ${twClasses.author_designation}`}
                  >
                    {slides[index].designation}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div
            className={`about-insights__image--wrapper ${twClasses.image_wrapper}`}
          >
            <figure
              className={`about-insights__image--figure ${twClasses.image_figure}`}
            >
              <div className={`about-insights__slides ${twClasses.slides}`}>
                {slides.map((s, i) => (
                  <div
                    key={i}
                    ref={(el) => setSlideRef(el, i)}
                    className="absolute inset-0"
                  >
                    <Image
                      src={s.image}
                      alt={slides[i].author}
                      fill
                      className={`about-insights__image ${twClasses.image}`}
                    />
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutInsights;

const twClasses = twc({
  section: "bg-black text-white lg:py-32 py-16 2xl:pt-[260px] 2xl:pb-[290px]",
  grid: "flex flex-wrap items-center gap-12",
  left: "flex-1 2xl:ps-[94px]",
  content: "mt-12 flex gap-6 lg:gap-8 2xl:mt-[70px] 2xl:gap-[50px]",
  image_wrapper: "lg:flex-[0_0_40%] lg:max-w-[40%] flex-[0_0_100%] max-w-full",
  title:
    "ff-figtree text-5xl font-light leading-[1.25] tracking-[-0.039em] text-white md:text-7xl 2xl:text-[82.6px]",
  title_em:
    "bg-gradient-to-r from-white from-15% to-primary bg-clip-text pe-2 font-medium text-transparent",
  description:
    "max-w-[600px] space-y-0 text-base leading-[1.67] text-white md:text-xl 2xl:text-[24px]",
  image_figure: "relative aspect-[467/589] overflow-hidden",
  content_right: "",
  author: "mt-10 2xl:mt-[30px] 2xl:ps-[7px]",
  author_name: "text-2xl font-semibold text-white/[.93] 2xl:text-[30px]",
  author_designation: "mt-2 text-base text-[#8c8c8c] 2xl:mt-3 2xl:text-[21.5px]",
  slides: "relative h-full w-full overflow-hidden",
  image: "object-cover",
});
