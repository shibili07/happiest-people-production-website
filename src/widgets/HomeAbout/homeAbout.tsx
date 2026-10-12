import Button from "@/components/Button";
import React from "react";
import Container from "@/components/Container";
import SlotCounter from "@/components/SlotCounter";
import GlowBlob from "@/components/GlowBlob";
import SectionTag from "@/components/SectionTag";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { HomeData } from "@/lib/cms/types";

const cameraMaskStyle: React.CSSProperties = {
  WebkitMaskImage: "url(/images/home/about-camera-mask.svg)",
  maskImage: "url(/images/home/about-camera-mask.svg)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "81.79% 60.87%",
  maskSize: "81.79% 60.87%",
  WebkitMaskPosition: "93.9% 60.5%",
  maskPosition: "93.9% 60.5%",
};

interface HomeAboutProps {
  data: HomeData["about"];
}

const HomeAbout = ({ data }: HomeAboutProps) => {
  return (
    <section data-widget="home-about" className={twClasses.section}>
      <GlowBlob scale={0.9} className="right-[-8%] top-[18%]" />
      <GlowBlob scale={1} className="left-[-10%] top-[90%]" />
      <Container className="relative z-10">
        <figure className={`home-about__image ${twClasses.image_figure}`}>
          <div
            className={`home-about__image--mask ${twClasses.image_mask}`}
            style={cameraMaskStyle}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/about-camera.png"
              alt="smiling golden video recorder"
              className="size-full object-cover"
            />
          </div>
        </figure>

        <SectionTag>{data.eyebrow}</SectionTag>
        <div className={`home-about__grid ${twClasses.grid}`}>
          <h2 className={`home-about__title ${twClasses.title}`}>
            {data.title.lead}{" "}
            <span className={`home-about__asterisk ${twClasses.asterisk}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/asterisk-circle.svg"
                alt=""
                aria-hidden="true"
                className="size-full"
              />
            </span>
            <br />
            <em className={`home-about__title--em ${twClasses.title_em}`}>
              {data.title.emphasis}
            </em>
          </h2>

          <div className={`home-about__contents ${twClasses.contents}`}>
            <p className={`home-about__description ${twClasses.description}`}>
              {data.paragraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />}
                  {paragraph}
                </React.Fragment>
              ))}
            </p>

            <Button
              href={data.cta.href}
              text={data.cta.label}
              icon={<Icons.ArrowRight className="h-3 mt-px" />}
              variant="link-with-icon"
              className={`home-about__button ${twClasses.button}`}
              textClass="fs-para-primary"
              color="white"
            />
          </div>
        </div>

        <div className={`home-about__stats ${twClasses.stats}`}>
          {data.stats.map(({ value, label }, i) => (
            <div key={i} className={twClasses.stat(i)}>
              <div
                className={`home-about__stats--count ${twClasses.stat_count}`}
              >
                <SlotCounter target={value} duration={3} />
              </div>
              <div
                className={`home-about__stats--label ${twClasses.stat_label}`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeAbout;

const twClasses = twc({
  section:
    "relative text-white overflow-x-clip 2xl:pb-[250px] xl:pb-40 lg:pb-32 pb-16",
  image_figure:
    "relative mx-auto mb-10 w-[75%] max-w-[360px] xl:absolute xl:right-[-4%] xl:top-0 xl:mx-0 xl:mb-0 xl:w-[34%] xl:max-w-[583px]",
  image_mask: "aspect-square w-full -rotate-[8.54deg]",
  grid: "mt-8 2xl:mt-[69px]",
  title:
    "ff-figtree fs-title-primary font-medium uppercase leading-[1.1] tracking-[-0.024em] text-[#e9e9ee]",
  title_em:
    "bg-gradient-to-r from-[#e9e9ee] to-[#e1af00] bg-clip-text pe-4 font-light text-transparent",
  asterisk:
    "ms-[0.15em] inline-block size-10 align-middle md:size-14 2xl:size-[88px]",
  contents: "mt-8 xl:mt-14 2xl:mt-[88px]",
  description:
    "max-w-[740px] text-base leading-[1.53] text-[#8f9092] md:text-lg 2xl:text-[25px]",
  button: "mt-8 w-max 2xl:mt-[56px]",
  stats:
    "mt-16 flex flex-wrap max-md:gap-y-8 md:justify-between xl:mt-24 2xl:mt-[120px]",
  stat: (index: number) =>
    `text-left md:flex-1 xl:px-16 lg:px-8 px-6 max-md:flex-[0_0_50%] max-md:max-w-[50%] ${
      index !== 0 ? "md:seperator-r" : "!pl-0"
    } ${index % 2 === 1 ? "max-md:seperator-r" : "max-md:!pl-0"}`,
  stat_count:
    "ff-albert text-5xl tracking-[-0.027em] text-white lg:text-7xl 2xl:text-[95px]",
  stat_label:
    "mt-4 text-sm font-medium text-[#757c8a] lg:text-base 2xl:mt-10 2xl:text-[24px]",
});
