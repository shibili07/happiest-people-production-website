import React from "react";
import Image from "next/image";
import { twc } from "@/utils";
import type { CoverageItem } from "@/lib/cms/types";

interface CoverageCardProps {
  item: CoverageItem;
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const CoverageCard = ({ item }: CoverageCardProps) => {
  const { image, title, label, url, publishedOn } = item;
  const external = Boolean(url);

  const media = (
    <div className={`coverage-card__media ${twClasses.media}`}>
      <Image
        src={image.url}
        alt={image.alt || `${title} coverage`}
        fill
        sizes="(min-width: 1024px) 745px, 100vw"
        className={`coverage-card__image ${twClasses.image}`}
        style={
          image.focalX !== undefined && image.focalY !== undefined
            ? { objectPosition: `${image.focalX}% ${image.focalY}%` }
            : undefined
        }
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/coverage/arrow-badge.svg"
        alt=""
        aria-hidden="true"
        className={`coverage-card__badge ${twClasses.badge}`}
      />
    </div>
  );

  const body = (
    <>
      {media}
      <div className={`coverage-card__meta ${twClasses.meta}`}>
        <div className={twClasses.row}>
          <h3 className={`coverage-card__title ${twClasses.title}`}>{title}</h3>
          <time dateTime={publishedOn} className={twClasses.date}>
            {formatDate(publishedOn)}
          </time>
        </div>
        <span className={twClasses.tag}>{label}</span>
      </div>
    </>
  );

  return external ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title}: ${label} (opens in a new tab)`}
      className={`coverage-card ${twClasses.card}`}
    >
      {body}
    </a>
  ) : (
    <article className={`coverage-card ${twClasses.card}`}>{body}</article>
  );
};

export default CoverageCard;

const twClasses = twc({
  card: "group block",
  media:
    "relative aspect-[745/548] w-full overflow-hidden rounded-[22px] border border-white/[.14] bg-white/[.08] lg:rounded-[30px]",
  image:
    "object-cover opacity-[.27] transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-70",
  badge:
    "absolute bottom-[6%] right-[4.5%] w-[10%] min-w-12 max-w-[75px] transition-transform duration-300 group-hover:scale-110",
  meta: "mt-5 flex flex-col items-start gap-5 lg:mt-[25px] lg:gap-[25px]",
  row: "flex w-full items-center justify-between gap-4",
  title:
    "ff-manrope text-xl font-normal text-white md:text-2xl 2xl:text-[31.7px]",
  date: "shrink-0 text-xs font-medium tracking-[0.04em] text-[#a3a3a3] md:text-sm 2xl:text-[15.9px]",
  tag: "ff-manrope rounded-full border border-[#a1979b] px-6 py-3 text-sm text-[#a1979b] md:px-9 2xl:px-[44px] 2xl:py-[18.5px] 2xl:text-[17.6px]",
});
