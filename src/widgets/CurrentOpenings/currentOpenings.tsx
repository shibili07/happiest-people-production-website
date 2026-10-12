"use client";
import React from "react";
import Container from "@/components/Container";
import { twc } from "@/utils";
import CareersAccordion from "@/components/CareersAccordion";
import type { CareersAccordionSection } from "@/types/careersAccordion";
import type { CareersData } from "@/lib/cms/types";

interface CurrentOpeningsProps {
  openings: CareersAccordionSection[];
  data: CareersData["openings"];
}

const CurrentOpenings = ({ openings, data }: CurrentOpeningsProps) => {
  return (
    <section
      data-widget="careers-current-openings"
      className={`careers-current-openings ${twClasses.section}`}
    >
      <Container>
        <h2 className={`careers-current-openings__title ${twClasses.title}`}>
          {data.title.lead}{" "}
          <em className="font-medium">{data.title.emphasis}</em>
        </h2>
        <div className={`careers-current-openings__list ${twClasses.list}`}>
          {openings.length ? (
            <CareersAccordion
              sections={openings}
              theme="dark"
              applyHref="#careers-application"
            />
          ) : (
            <p className="ff-manrope mx-auto max-w-xl text-center text-lg text-white/60">
              {data.emptyMessage}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CurrentOpenings;

const twClasses = twc({
  section: "bg-black text-white lg:pb-32 pb-16 2xl:pb-[300px]",
  title:
    "ff-figtree text-center text-4xl font-light leading-[1.25] tracking-[-0.039em] sm:text-6xl 2xl:text-[82.6px]",
  list: "mt-12 xl:mt-20 2xl:mt-[130px]",
});
