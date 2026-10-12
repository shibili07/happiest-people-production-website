import React from "react";
import Container from "@/components/Container";
import IconCard from "@/components/IconCard";
import { twc } from "@/utils";
import type { AboutData } from "@/lib/cms/types";

interface AboutBeliveSystemProps {
  data: AboutData["beliefs"];
}

const icons = {
  vision: (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/about/icon-vision.svg"
      alt=""
      aria-hidden="true"
      className="h-[51px] w-[51px]"
    />
  ),
  mission: (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/about/icon-mission.svg"
      alt=""
      aria-hidden="true"
      className="h-[44px] w-[47px]"
    />
  ),
};

const AboutBeliveSystem = ({ data }: AboutBeliveSystemProps) => {
  return (
    <section
      data-widget="about-belive-system"
      className={`about-belive-system ${twClasses.section}`}
    >
      <Container>
        <div
          className={`about-belive-system__title--wrapper ${twClasses.title_wrapper}`}
        >
          <h2 className={`about-belive-system__title ${twClasses.title}`}>
            {data.title.lead}{" "}
            <em className="font-light">{data.title.emphasis}</em>
          </h2>
        </div>
        <div className={`about-belive-system__cards ${twClasses.cards}`}>
          {data.items.map(({ icon, title, description }, index) => {
            return (
              <IconCard
                key={index}
                theme="dark"
                icon={icons[icon]}
                title={title}
                description={description}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default AboutBeliveSystem;

const twClasses = twc({
  section: "bg-black text-white lg:pb-32 pb-16 2xl:pb-[430px]",
  title_wrapper: "text-center",
  title:
    "ff-figtree text-4xl font-medium uppercase leading-[1.25] tracking-[-0.039em] text-[#fffafa] md:text-6xl 2xl:text-[82.6px]",
  cards:
    "mx-auto mt-12 grid max-w-[1514px] gap-6 lg:grid-cols-2 xl:mt-20 2xl:mt-[107px] 2xl:gap-[48px]",
});
