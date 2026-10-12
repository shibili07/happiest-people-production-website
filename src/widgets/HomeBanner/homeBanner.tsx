"use client";
import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import useHomeBanner from "./useHomeBanner";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { HomeData } from "@/lib/cms/types";

interface HomeBannerProps {
  hero: HomeData["hero"];
}

const HomeBanner = ({ hero }: HomeBannerProps) => {
  const { videoRef, titleRef } = useHomeBanner();

  return (
    <section
      data-widget="home-banner"
      className={`home-banner ${twClasses.section} ${twClasses.section.before}`}
    >
      <div className={`home-banner__bg ${twClasses.background}`}>
        <video
          ref={videoRef}
          poster={"/images/banner-image.webp"}
          className={`size-full object-cover`}
          playsInline
          loop
          muted
          autoPlay
        />
      </div>
      <div className={`home-banner__contents ${twClasses.contents}`}>
        <Container>
          <h1
            ref={titleRef}
            className={`home-banner__contents--title ${twClasses.title}`}
          >
            <span>{hero.titleLine1}</span>
            <br />
            <span>
              {hero.titleLine2}{" "}
              <em className="font-medium text-white">{hero.titleEmphasis}</em>
            </span>
          </h1>
          <Button
            href={hero.cta.href}
            text={hero.cta.label}
            icon={<Icons.ArrowRight className="h-3 pt-px" />}
            variant="link-with-icon"
            className={`home-banner__contents--button ${twClasses.button}`}
            textClass="fs-para-primary"
            color="white"
          />
        </Container>
      </div>
    </section>
  );
};

export default HomeBanner;

const twClasses = twc({
  section: {
    DEFAULT: "w-full relative",
    before:
      "before:content-[''] before:bg-gradient-to-b before:from-black before:via-transparent before:to-black before:absolute before:inset-0 before:z-[9]",
  },
  background: "absolute top-0 left-0 size-full overflow-hidden",
  contents: "relative z-10 h-full flex items-end py-16",
  title:
    "ff-figtree max-w-[900px] fs-title-primary font-light leading-[1.08] tracking-[-0.024em] text-[#e9e9ee]",
  button: "mt-16 w-max 2xl:mt-[110px]",
});
