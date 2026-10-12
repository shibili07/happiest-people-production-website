"use client";
import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import GlowBlob from "@/components/GlowBlob";
import SliderArrows from "@/components/SliderArrows";
import useScrollSlider from "@/components/SliderArrows/useScrollSlider";
import VideoModal from "@/components/VideoModal";
import { twc } from "@/utils";
import type { HomeData, TestimonialItem } from "@/lib/cms/types";

interface HomeTestimonialsProps {
  data: HomeData["testimonials"];
}

// Long quotes are set smaller so they fit the card.
const COMPACT_QUOTE_LENGTH = 450;

const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
  const [open, setOpen] = useState(false);
  const { company, tag, quote, name, role, photo, videoId } = item;
  const compact = quote.join("").length > COMPACT_QUOTE_LENGTH;

  return (
    <article
      data-testimonial-card
      className={`home-testimonials__card ${twClasses.card}`}
    >
      <div className={`home-testimonials__card--body ${twClasses.card_body}`}>
        <div>
          <div className={twClasses.card_header}>
            {company.logo ? (
              <Image
                src={company.logo.url}
                alt={company.name}
                width={company.logo.width ?? 64}
                height={company.logo.height ?? 34}
                className="h-[34px] w-auto"
              />
            ) : (
              <h3 className={twClasses.company}>{company.name}</h3>
            )}
            <span className={twClasses.tag}>{tag}</span>
          </div>
          <div
            className={`${twClasses.quote} ${
              compact ? twClasses.quote_compact : twClasses.quote_regular
            }`}
          >
            {quote.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={twClasses.author}>
          <p className={twClasses.author_name}>{name}</p>
          <p className={twClasses.author_role}>
            {role.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      <figure className={`home-testimonials__card--photo ${twClasses.photo}`}>
        <Image
          src={photo.url}
          alt={photo.alt || name}
          fill
          sizes="(min-width: 768px) 396px, 90vw"
          className="object-cover"
          style={
            photo.focalX !== undefined && photo.focalY !== undefined
              ? { objectPosition: `${photo.focalX}% ${photo.focalY}%` }
              : undefined
          }
        />
        <span className={twClasses.photo_overlay} aria-hidden="true" />
        {videoId && (
          <button
            type="button"
            aria-label={`Play ${name} testimonial video`}
            onClick={() => setOpen(true)}
            className={twClasses.play}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/testimonial-play.svg"
              alt=""
              className="size-full"
            />
          </button>
        )}
      </figure>

      {videoId && (
        <VideoModal
          videoId={videoId}
          open={open}
          onClose={() => setOpen(false)}
          title={`${name} testimonial`}
          animationDurationMs={300}
        />
      )}
    </article>
  );
};

const HomeTestimonials = ({ data }: HomeTestimonialsProps) => {
  const { trackRef, canPrev, canNext, scrollByCard } = useScrollSlider(
    "[data-testimonial-card]"
  );

  return (
    <section
      data-widget="home-testimonials"
      className={`home-testimonials ${twClasses.section}`}
    >
      <GlowBlob scale={1.4} className="left-[-6%] top-[6%]" />
      <Container className="relative z-10">
        <div className={`home-testimonials__header ${twClasses.header}`}>
          <h2 className={`home-testimonials__title ${twClasses.title}`}>
            {data.title.lead}{" "}
            <em className="font-light">{data.title.emphasis}</em>
          </h2>
          <p
            className={`home-testimonials__description ${twClasses.description}`}
          >
            {data.description}
          </p>
        </div>
      </Container>

      <div
        ref={trackRef}
        className={`home-testimonials__track no-scrollbar ${twClasses.track}`}
      >
        {data.items.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>

      <div className={`home-testimonials__arrows ${twClasses.arrows}`}>
        <SliderArrows
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
          disablePrev={!canPrev && canNext}
          disableNext={!canNext && canPrev}
        />
      </div>
    </section>
  );
};

export default HomeTestimonials;

const twClasses = twc({
  section:
    "relative overflow-x-clip text-white 2xl:pb-[250px] xl:pb-32 pb-16",
  header: "flex flex-col items-center text-center",
  title:
    "ff-figtree fs-title-secondary font-medium uppercase leading-[1.1] tracking-[-0.029em]",
  description:
    "mt-6 max-w-[1124px] text-base leading-[1.58] text-[#cacaca] md:text-lg 2xl:mt-[57px] 2xl:text-[24px]",
  track:
    "relative z-10 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 xl:mt-20 2xl:mt-[100px] 2xl:ps-[70px]",
  card: "grid flex-[0_0_90%] snap-start grid-cols-1 gap-8 rounded-[34px] border border-white/[.14] bg-white/[.08] p-6 md:grid-cols-[minmax(0,1fr)_300px] md:p-10 lg:flex-[0_0_min(1054px,90%)] xl:grid-cols-[minmax(0,1fr)_396px] 2xl:min-h-[585px] 2xl:gap-[60px] 2xl:px-[49px] 2xl:py-[43px]",
  card_body: "flex flex-col justify-between gap-10",
  card_header: "flex flex-wrap items-center gap-4",
  company: "text-xl font-bold tracking-[0.02em] text-white",
  tag: "rounded-full border-[0.5px] border-white px-[10px] py-[8px] text-base font-medium tracking-[0.02em] text-[#c9c9c9] 2xl:p-[10px] 2xl:text-lg",
  quote: "mt-6 space-y-0 text-[#c3c3c3] 2xl:mt-[17px]",
  quote_compact:
    "text-sm leading-[1.5] tracking-[0.02em] 2xl:text-[14px] 2xl:leading-[21px]",
  quote_regular:
    "text-lg leading-[1.5] tracking-[0.02em] 2xl:mt-[62px] 2xl:text-[22px] 2xl:leading-[33px]",
  author: "flex flex-col gap-[10px]",
  author_name: "text-xl font-semibold text-white 2xl:text-[22px]",
  author_role:
    "text-base tracking-[0.02em] text-[#9d9599] 2xl:text-[18px]",
  photo:
    "relative aspect-[396/430] w-full overflow-hidden rounded-[15px] md:self-start",
  photo_overlay:
    "absolute inset-0 bg-[linear-gradient(151.7deg,rgba(0,0,0,0)_4%,rgba(251,207,29,0.4)_115%)]",
  play: "absolute bottom-6 left-6 size-16 cursor-pointer transition-transform duration-300 hover:scale-110 2xl:size-[80px]",
  arrows: "relative z-10 mt-10 flex justify-center xl:mt-16 2xl:mt-[111px]",
});
