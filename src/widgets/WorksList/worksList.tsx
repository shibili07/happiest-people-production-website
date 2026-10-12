"use client";
import React, { useId, useMemo, useState } from "react";
import Container from "@/components/Container";
import ImageCard from "@/components/ImageCard";
import GlowBlob from "@/components/GlowBlob";
import { twc } from "@/utils";
import CategoryTabs from "@/components/CategoryTabs";
import { WORK_CATEGORIES, type WorkCategory } from "@/lib/cms/categories";
import type { WorksPageData } from "@/lib/cms/types";

interface WorksListProps {
  data: WorksPageData;
}

const WorksList = ({ data }: WorksListProps) => {
  const [active, setActive] = useState<WorkCategory>(WORK_CATEGORIES[0].value);
  const tabsId = useId();

  const visible = useMemo(
    () => data.items.filter((work) => work.category === active),
    [data.items, active]
  );

  return (
    <section
      data-widget="works-list"
      className={`works-list ${twClasses.section}`}
    >
      <GlowBlob scale={0.9} className="left-[-6%] top-[78%]" />
      <Container className="relative z-10">
        <h1 className={`works-list__title ${twClasses.title}`}>
          {data.title.lead}{" "}
          <em className="font-medium">{data.title.emphasis}</em>
        </h1>
      </Container>

      <div className={`works-list__filters ${twClasses.filters}`}>
        <Container>
          <CategoryTabs
            active={active}
            onChange={setActive}
            idPrefix={tabsId}
            label="Filter works by category"
          />
        </Container>
      </div>

      <Container className="relative z-10">
        <div
          role="tabpanel"
          id={`${tabsId}-panel`}
          aria-labelledby={`${tabsId}-${active}`}
          className={`works-list__items ${twClasses.grid}`}
        >
          {visible.length ? (
            visible.map((work, index) => (
              <ImageCard key={`${active}-${index}`} theme="listing" {...work} />
            ))
          ) : (
            <p className={twClasses.empty}>{data.emptyMessage}</p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default WorksList;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black pt-36 text-white lg:pt-44 2xl:pt-[200px] 2xl:pb-[330px] xl:pb-32 pb-16",
  title:
    "ff-figtree text-5xl font-light leading-[1.2] tracking-[-0.04em] sm:text-7xl 2xl:text-[100.87px]",
  filters:
    "relative z-10 mt-8 border-b border-white/10 pb-8 lg:mt-10 2xl:mt-[75px] 2xl:pb-[75px]",
  grid: "mt-10 grid gap-x-4 gap-y-12 md:grid-cols-2 xl:mt-16 2xl:mt-[100px] 2xl:gap-x-[53px] 2xl:gap-y-[80px]",
  empty: "ff-manrope text-lg text-white/60 md:col-span-2 md:text-center",
});
