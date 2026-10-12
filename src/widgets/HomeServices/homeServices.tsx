"use client";
import React from "react";
import Container from "@/components/Container";
import GlowBlob from "@/components/GlowBlob";
import SliderArrows from "@/components/SliderArrows";
import useHomeServices from "./useHomeServices";
import { twc } from "@/utils";
import type { HomeData, ServiceIconType } from "@/lib/cms/types";

interface HomeServicesProps {
  data: HomeData["services"];
}

const iconBox =
  "absolute border-[0.7px] border-[#fec31b] bg-white/[.14] backdrop-blur-[2px]";

const ServiceIcon = ({ type }: { type: ServiceIconType }) => {
  switch (type) {
    case "tv":
      return (
        <span className="relative block h-[58px] w-[61px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/service-tv-antenna.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-[18px] top-0 w-[24px]"
          />
          <span
            className={`${iconBox} left-0 top-2 h-[49px] w-[60px] rounded-[4px]`}
          />
        </span>
      );
    case "play":
      return (
        <span className="relative block h-[50px] w-[61px]">
          <span
            className={`${iconBox} left-0 top-0 h-[49px] w-[60px] rounded-[4px]`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/service-glow.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-[44.5px] top-[26.5px] size-[31.7px] max-w-none scale-[2.7]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/service-play.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-[21px] top-[15px] w-[17px]"
          />
        </span>
      );
    case "camera":
      return (
        <span className="relative block h-[50px] w-[63px]">
          <span
            className={`${iconBox} left-0 top-0 h-[49px] w-[54px] rounded-[6px]`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/service-lens.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-[41px] top-[11px] h-[27px] w-[22px] -scale-x-100"
          />
        </span>
      );
  }
};

const HomeServices = ({ data }: HomeServicesProps) => {
  const { trackRef, active, setActive, canPrev, canNext, scrollByCard } =
    useHomeServices();

  return (
    <section
      data-widget="home-services"
      className={`home-services ${twClasses.section}`}
    >
      <GlowBlob scale={1.4} className="right-[-6%] top-[8%]" />
      <Container className="relative z-10">
        <div
          className={`home-services__title--wrapper ${twClasses.title_wrapper}`}
        >
          <h2 className={`home-services__title ${twClasses.title}`}>
            {data.title.lead}{" "}
            <em className="font-light">{data.title.emphasis}</em>
          </h2>
          <SliderArrows
            onPrev={() => scrollByCard(-1)}
            onNext={() => scrollByCard(1)}
            disablePrev={!canPrev && canNext}
            disableNext={!canNext && canPrev}
          />
        </div>

        <div
          ref={trackRef}
          className={`home-services__content no-scrollbar ${twClasses.track}`}
        >
          {data.items.map(({ icon, title, description }, index) => (
            <div
              key={index}
              data-service-card
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              tabIndex={0}
              className={`home-services__card ${twClasses.card} ${
                active === index ? twClasses.card_active : twClasses.card_idle
              }`}
            >
              <div
                className={`home-services__card--icon ${twClasses.icon_wrapper}`}
              >
                <ServiceIcon type={icon} />
              </div>
              <h3
                className={`home-services__card--title ${twClasses.card_title}`}
              >
                {title}
              </h3>
              <p className={`home-services__card--text ${twClasses.card_text}`}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeServices;

const twClasses = twc({
  section:
    "relative overflow-x-clip text-white 2xl:pb-[330px] 2xl:pt-0 xl:pb-32 pb-16",
  title_wrapper: "flex items-center justify-between gap-6",
  title:
    "ff-figtree fs-title-secondary font-medium uppercase leading-[1.1] tracking-[-0.029em]",
  track:
    "mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth xl:mt-20 2xl:mt-[130px] 2xl:gap-[117px]",
  card: "flex flex-[0_0_85%] snap-start flex-col rounded-[22px] border px-6 py-6 outline-none transition-colors duration-300 sm:flex-[0_0_46%] xl:flex-[0_0_calc((100%_-_3rem)/3)] 2xl:flex-[0_0_calc((100%_-_234px)/3)] 2xl:py-[26px] 2xl:pl-[35px] 2xl:pr-[21px]",
  card_active: "border-[#fcd539]",
  card_idle: "border-transparent",
  icon_wrapper: "h-[58px]",
  card_title:
    "mt-10 text-2xl font-semibold tracking-[-0.022em] text-white/[.93] 2xl:mt-12 2xl:text-[30px]",
  card_text:
    "mt-6 text-base font-light leading-[1.51] tracking-[0.0125em] text-[#bcbcbc] md:text-lg 2xl:mt-10 2xl:text-[24px]",
});
