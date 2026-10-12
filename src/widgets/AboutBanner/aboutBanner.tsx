"use client";
import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SlotCounter from "@/components/SlotCounter";
import SectionTag from "@/components/SectionTag";
import AboutBannerIllustration from "@/components/AnimatedIllustrations/AboutBannerIllustration";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { AboutData } from "@/lib/cms/types";

interface AboutBannerProps {
  hero: AboutData["hero"];
  intro: AboutData["intro"];
}

const AboutBanner = ({ hero, intro }: AboutBannerProps) => {
  return (
    <section
      data-widget="about-banner"
      className={`about-banner ${twClasses.section}`}
    >
      <Container>
        <SectionTag>{hero.eyebrow}</SectionTag>
        <h1 className={`about-banner__title ${twClasses.title}`}>
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </h1>
        <Button
          href={hero.cta.href}
          text={hero.cta.label}
          icon={<Icons.ArrowRight className="h-3 mt-px" />}
          variant="link-with-icon"
          className={`about-banner__button ${twClasses.button}`}
          textClass="fs-para-primary"
          color="white"
        />

        <div className={`about-banner__illustration ${twClasses.illustration}`}>
          <AboutBannerIllustration />
        </div>

        <div className={`about-banner__contents ${twClasses.contents}`}>
          <p className={`about-banner__description ${twClasses.description}`}>
            {intro.text}
          </p>

          <div className={`about-banner__stats ${twClasses.stats}`}>
            {intro.stats.map(({ value, label }, i) => (
              <div key={i} className={twClasses.stat(i !== 0)}>
                <div
                  className={`about-banner__stats--count ${twClasses.stat_count}`}
                >
                  <SlotCounter target={value} duration={3} />
                </div>
                <div
                  className={`about-banner__stats--label ${twClasses.stat_label}`}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutBanner;

const twClasses = twc({
  section:
    "bg-black pt-36 text-white lg:pt-44 2xl:pt-[290px] 2xl:pb-[420px] lg:pb-32 pb-16",
  title:
    "ff-figtree mt-6 text-4xl font-medium leading-[1.22] tracking-[-0.027em] text-white md:text-6xl lg:text-7xl 2xl:mt-[31px] 2xl:text-[96px]",
  button: "mt-8 w-max 2xl:mt-[26px]",
  illustration: "mt-4",
  contents: "mt-12 xl:mt-20 lg:ml-auto lg:max-w-[1134px] 2xl:mt-[160px]",
  description:
    "text-xl font-medium leading-[1.5] tracking-[-0.0125em] text-white/[.93] md:text-3xl 2xl:text-[40px]",
  stats: "mt-10 flex items-start 2xl:mt-[84px]",
  stat: (hasBorder: boolean) =>
    `text-left ${
      hasBorder
        ? "border-l border-dotted border-white/30 pl-6 lg:pl-16 2xl:pl-[105px]"
        : "pr-6 lg:pr-16 2xl:pr-[105px]"
    }`,
  stat_count:
    "ff-albert text-5xl font-medium tracking-[-0.027em] text-white lg:text-7xl 2xl:text-[95px]",
  stat_label:
    "mt-4 text-sm font-medium text-[#757c8a] lg:text-base 2xl:mt-9 2xl:text-[24px]",
});
