import React from "react";
import Container from "@/components/Container";
import GlowBlob from "@/components/GlowBlob";
import Image from "next/image";
import { twc } from "@/utils";
import type { CareersData } from "@/lib/cms/types";

interface CareersTailoredProps {
  data: CareersData["culture"];
}

const focus = (image: CareersData["culture"]["images"][number]) =>
  image.focalX !== undefined && image.focalY !== undefined
    ? { objectPosition: `${image.focalX}% ${image.focalY}%` }
    : undefined;

const CareersTailored = ({ data }: CareersTailoredProps) => {
  const [first, second, third] = data.images;

  return (
    <section
      data-widget="careers-tailored"
      className={`careers-tailored ${twClasses.section}`}
    >
      <GlowBlob scale={0.9} className="left-[-6%] top-[60%]" />
      <Container className="relative z-10">
        <div className={`careers-tailored__wrapper ${twClasses.wrapper}`}>
          {/* Stair-stepped photo pair */}
          <div className={`careers-tailored__grid ${twClasses.img_grid}`}>
            <div className={`careers-tailored__img-cell ${twClasses.img_small}`}>
              <Image
                src={first.url}
                alt={first.alt}
                fill
                sizes="(min-width: 1536px) 229px, 25vw"
                className="object-cover"
                style={focus(first)}
              />
            </div>
            <div className={`careers-tailored__img-cell ${twClasses.img_large}`}>
              <Image
                src={second.url}
                alt={second.alt}
                fill
                sizes="(min-width: 1536px) 434px, 50vw"
                className="object-cover"
                style={focus(second)}
              />
            </div>
          </div>

          <div
            className={`careers-tailored__text-content ${twClasses.text_content}`}
          >
            <h2 className={`careers-tailored__title ${twClasses.title}`}>
              {data.title.lead}
              <br />
              <em className={twClasses.title_em}>{data.title.emphasis}</em>
            </h2>
            <p
              className={`careers-tailored__description ${twClasses.description}`}
            >
              {data.description}
            </p>
            <div
              className={`careers-tailored__img-cell ${twClasses.img_third}`}
            >
              <Image
                src={third.url}
                alt={third.alt}
                fill
                sizes="(min-width: 1536px) 281px, 40vw"
                className="object-cover"
                style={focus(third)}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareersTailored;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black text-white 2xl:pb-[260px] lg:pb-32 pb-16",
  wrapper: "grid items-start gap-10 xl:grid-cols-[minmax(0,662fr)_minmax(0,720fr)] xl:gap-[10%]",
  img_grid:
    "grid w-full max-w-[662px] grid-cols-[228fr_434fr] max-xl:mx-auto xl:mt-[8%]",
  img_small:
    "relative col-start-1 row-start-1 aspect-square w-full overflow-hidden",
  img_large:
    "relative col-start-2 row-start-2 aspect-[434/401] w-full overflow-hidden",
  text_content: "relative max-xl:text-center",
  title:
    "ff-figtree text-4xl font-medium uppercase leading-[1.18] tracking-[-0.041em] sm:text-6xl 2xl:text-[82px]",
  title_em:
    "bg-gradient-to-b from-white to-[#e0e34b] bg-clip-text pe-3 font-light text-transparent",
  description:
    "mt-8 max-w-[592px] text-lg leading-[1.5] text-white max-xl:mx-auto md:text-2xl 2xl:mt-[85px] 2xl:text-[30.5px]",
  img_third:
    "relative ms-auto mt-10 aspect-[281/245] w-[45%] max-w-[281px] overflow-hidden max-xl:mx-auto xl:mt-[38px]",
});
