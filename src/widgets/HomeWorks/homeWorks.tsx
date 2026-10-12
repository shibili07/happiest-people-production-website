import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ImageCard from "@/components/ImageCard";
import GlowBlob from "@/components/GlowBlob";
import SectionTag from "@/components/SectionTag";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { HomeData } from "@/lib/cms/types";

interface HomeWorksProps {
  data: HomeData["works"];
}

const HomeWorks = ({ data }: HomeWorksProps) => {
  return (
    <section
      data-widget="home-works"
      className={`home-works ${twClasses.section}`}
    >
      <GlowBlob scale={0.9} className="left-0 top-[8%]" />
      <GlowBlob scale={0.9} className="right-[-10%] top-[92%]" />
      <Container className="relative z-10">
        <div className={`home-works__header ${twClasses.header}`}>
          <div className={`home-works__heading ${twClasses.heading}`}>
            <SectionTag>{data.eyebrow}</SectionTag>
            <h2 className={`home-works__title ${twClasses.title}`}>
              {data.title.lead}{" "}
              <em className="font-light">{data.title.emphasis}</em>
            </h2>
          </div>
          <p className={`home-works__description ${twClasses.description}`}>
            {data.description}
          </p>
        </div>
        <div className={`home-works__list ${twClasses.grid}`}>
          {data.items.map((work, index) => {
            return <ImageCard key={index} theme="dark" {...work} />;
          })}
        </div>
        <div className={`home-works__view-all ${twClasses.view_all}`}>
          <Button
            text={data.viewAllLabel}
            icon={<Icons.ChevronRight className="h-3 mt-px" />}
            variant="outlined-with-icon"
            href="/works"
            color="white"
            className="2xl:h-[60px] 2xl:min-w-[230px] rounded-[11px]"
            textClass="font-medium 2xl:text-lg"
          />
        </div>
      </Container>
    </section>
  );
};

export default HomeWorks;

const twClasses = twc({
  section:
    "relative overflow-x-clip text-white 2xl:pt-[180px] 2xl:pb-[220px] xl:py-32 md:py-20 py-16",
  header: "xl:flex xl:items-end xl:justify-between xl:gap-16",
  heading: "flex flex-col items-start gap-8 2xl:gap-[57px]",
  title:
    "ff-figtree fs-title-secondary font-medium uppercase leading-[1.1] tracking-[-0.029em] xl:whitespace-nowrap",
  description:
    "fs-para-secondary mt-8 text-white/90 tracking-[0.02em] xl:mt-0 xl:max-w-[640px] 2xl:leading-[37px]",
  grid: "grid md:grid-cols-2 md:gap-4 2xl:gap-[25px] gap-10 xl:mt-24 mt-12 2xl:mt-[123px]",
  view_all: "flex justify-center xl:mt-24 mt-12 2xl:mt-[117px]",
});
