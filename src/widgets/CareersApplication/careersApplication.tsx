"use client";
import React from "react";
import Container from "@/components/Container/container";
import CareersApplicationForm from "@/components/CareersApplicationForm";
import GlowBlob from "@/components/GlowBlob";
import { twc } from "@/utils";
import type { CareersData } from "@/lib/cms/types";

interface CareersApplicationProps {
  data: CareersData["application"];
}

const CareersApplication = ({ data }: CareersApplicationProps) => {
  return (
    <section
      id="careers-application"
      data-widget="careers-application"
      className={`careers-application ${twClasses.section}`}
    >
      <GlowBlob scale={0.9} className="left-[-8%] top-[75%]" />
      <Container className="relative z-10">
        <div className={twClasses.grid}>
          <div className="careers-application__left">
            <h2 className={`careers-application__title ${twClasses.title}`}>
              {data.title}
            </h2>
            <p className={`careers-application__description ${twClasses.text}`}>
              {data.text}
            </p>
          </div>
          <div className="careers-application__right">
            <CareersApplicationForm departments={data.departments} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareersApplication;

const twClasses = twc({
  section:
    "relative scroll-mt-24 overflow-x-clip bg-black text-white lg:pb-32 pb-16 2xl:pb-[290px]",
  grid: "grid gap-10 xl:grid-cols-[minmax(0,436fr)_minmax(0,936fr)] xl:gap-[7%]",
  title:
    "ff-figtree max-w-[436px] text-4xl font-light lowercase leading-[1.1] tracking-[-0.05em] sm:text-5xl 2xl:text-[64px]",
  text: "mt-6 max-w-[436px] text-base leading-[1.78] text-[#909090] md:text-xl 2xl:mt-6 2xl:text-[27.5px] 2xl:leading-[49px]",
});
