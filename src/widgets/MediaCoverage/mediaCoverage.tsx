import React from "react";
import Container from "@/components/Container";
import CoverageCard from "@/components/CoverageCard";
import GlowBlob from "@/components/GlowBlob";
import { twc } from "@/utils";
import type { ClientsPageData } from "@/lib/cms/types";

interface MediaCoverageProps {
  data: ClientsPageData["coverage"];
}

const MediaCoverage = ({ data }: MediaCoverageProps) => {
  return (
    <section
      data-widget="media-coverage"
      className={`media-coverage ${twClasses.section}`}
    >
      <GlowBlob scale={1.1} className="right-[-4%] top-[8%]" />
      <Container className="relative z-10">
        <header className={`media-coverage__header ${twClasses.header}`}>
          <h2 className={`media-coverage__title ${twClasses.title}`}>
            {data.title}
          </h2>
          <p className={`media-coverage__description ${twClasses.description}`}>
            {data.description}
          </p>
        </header>

        <div className={`media-coverage__grid ${twClasses.grid}`}>
          {data.items.map((item) => (
            <CoverageCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MediaCoverage;

const twClasses = twc({
  section:
    "relative overflow-x-clip text-white 2xl:pb-[290px] xl:pb-32 pb-16",
  header: "mx-auto flex max-w-[905px] flex-col items-center text-center",
  title:
    "ff-figtree text-4xl font-medium leading-[1.04] tracking-[-0.024em] sm:text-6xl 2xl:text-[112px]",
  description:
    "ff-figtree mt-6 max-w-[601px] text-lg font-medium leading-[1.3] text-white md:text-2xl 2xl:mt-[60px] 2xl:text-[32px]",
  grid: "mt-12 grid gap-x-[6%] gap-y-12 md:grid-cols-2 xl:mt-20 2xl:mt-[170px] 2xl:gap-y-[100px]",
});
