"use client";
import React, { useId, useMemo, useState } from "react";
import Container from "@/components/Container";
import CategoryTabs from "@/components/CategoryTabs";
import ReelCard from "@/components/ReelCard";
import GlowBlob from "@/components/GlowBlob";
import { WORK_CATEGORIES, type WorkCategory } from "@/lib/cms/categories";
import { twc } from "@/utils";
import type { BehindTheScenePageData } from "@/lib/cms/types";

interface BehindTheSceneProps {
  data: BehindTheScenePageData;
}

const BehindTheScene = ({ data }: BehindTheSceneProps) => {
  const [active, setActive] = useState<WorkCategory>(WORK_CATEGORIES[0].value);
  const tabsId = useId();

  const visible = useMemo(
    () => data.items.filter((item) => item.category === active),
    [data.items, active]
  );

  return (
    <section
      data-widget="behind-the-scene"
      className={`behind-the-scene ${twClasses.section}`}
    >
      <GlowBlob scale={1} className="right-[-6%] top-[30%]" />
      <GlowBlob scale={0.8} className="left-[-8%] top-[80%]" />

      <Container className="relative z-10">
        <h1 className={`behind-the-scene__title ${twClasses.title}`}>
          {data.title}
        </h1>
        {data.description && (
          <p className={`behind-the-scene__description ${twClasses.description}`}>
            {data.description}
          </p>
        )}
      </Container>

      <div className={`behind-the-scene__filters ${twClasses.filters}`}>
        <Container>
          <CategoryTabs
            active={active}
            onChange={setActive}
            idPrefix={tabsId}
            label="Filter reels by category"
          />
        </Container>
      </div>

      <Container className="relative z-10">
        <div
          role="tabpanel"
          id={`${tabsId}-panel`}
          aria-labelledby={`${tabsId}-${active}`}
          className={`behind-the-scene__grid ${twClasses.grid}`}
        >
          {visible.length ? (
            visible.map((item) => <ReelCard key={item.id} item={item} />)
          ) : (
            <p className={twClasses.empty}>{data.emptyMessage}</p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default BehindTheScene;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black pt-36 text-white lg:pt-44 2xl:pt-[200px] 2xl:pb-[330px] xl:pb-32 pb-16",
  title:
    "ff-figtree text-5xl font-light leading-[1.2] tracking-[-0.04em] sm:text-7xl 2xl:text-[100.87px]",
  description:
    "ff-manrope mt-3 max-w-2xl text-base text-white/60 md:text-lg 2xl:mt-6 2xl:text-[22px]",
  filters:
    "relative z-10 mt-8 border-b border-white/10 pb-8 lg:mt-10 2xl:mt-[75px] 2xl:pb-[75px]",
  grid: "mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 xl:mt-16 2xl:mt-[90px] 2xl:gap-[26px]",
  empty:
    "ff-manrope col-span-full text-lg text-white/60 md:text-center",
});
