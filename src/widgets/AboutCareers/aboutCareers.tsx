import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ParallaxImageSlider from "@/components/ParallaxImageSlider";
import GlowBlob from "@/components/GlowBlob";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { AboutData } from "@/lib/cms/types";

interface AboutCareersProps {
  data: AboutData["careers"];
}

const RATIOS = ["ratio_1", "ratio_2", "ratio_2"];

const AboutCareers = ({ data }: AboutCareersProps) => {
  // The scroll-driven gallery needs a long strip, so repeat short lists.
  const sliderImages = Array.from(
    { length: Math.max(6, data.images.length * 2) },
    (_, index) => ({
      ...data.images[index % data.images.length],
      ratio: RATIOS[index % RATIOS.length],
    }),
  );

  return (
    <section
      data-widget="about-careers"
      className={`about-careers ${twClasses.section}`}
    >
      <GlowBlob scale={0.8} className="left-[-6%] top-[22%]" />
      <GlowBlob scale={0.8} className="right-[-6%] top-[78%]" />
      <Container className="relative z-10">
        <h2 className={`about-careers__title ${twClasses.title}`}>
          {data.title.lead}
          <br />
          <em className="font-light">{data.title.emphasis}</em>
        </h2>

        <div className={`about-careers__contents ${twClasses.contents}`}>
          <p className={`about-careers__description ${twClasses.description}`}>
            {data.description}
          </p>

          <div className={`about-careers__button ${twClasses.button}`}>
            <Button
              text={data.button.label}
              icon={<Icons.ChevronRight className="h-3 mt-px" />}
              variant="outlined-with-icon"
              href={data.button.href}
              color="white"
              className="2xl:h-[60px] 2xl:min-w-[230px]"
              textClass="font-medium 2xl:text-lg"
            />
          </div>
        </div>
      </Container>

      <div
        data-cursor-text="Scroll"
        className={`about-careers__slider ${twClasses.slider}`}
      >
        <ParallaxImageSlider images={sliderImages} />
      </div>
    </section>
  );
};

export default AboutCareers;

const twClasses = twc({
  section:
    "relative overflow-x-clip bg-black text-white lg:pb-32 pb-16 2xl:pb-[385px]",
  title:
    "ff-figtree text-5xl font-medium uppercase leading-[1.25] tracking-[-0.039em] md:text-7xl 2xl:text-[82.6px]",
  contents: "mt-8 lg:ml-[29%] lg:max-w-[700px] 2xl:mt-[60px]",
  description:
    "text-lg leading-[1.7] text-white md:text-xl 2xl:text-[30.5px]",
  button: "mt-10 w-max 2xl:mt-[160px]",
  slider:
    "mt-12 xl:mt-20 [&_.parallax-image-slider__slide]:rounded-xl 2xl:mt-[156px]",
});
