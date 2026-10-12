import React from "react";
import Image from "next/image";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import type { BtsItem } from "@/lib/cms/types";

interface ReelCardProps {
  item: BtsItem;
}

/**
 * A vertical Instagram reel cover. It is a plain link to Instagram, so no
 * third-party embed script is loaded on the page.
 */
const ReelCard = ({ item }: ReelCardProps) => {
  const { image, title, url } = item;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title}: watch on Instagram (opens in a new tab)`}
      className={`reel-card ${twClasses.card}`}
    >
      <Image
        src={image.url}
        alt=""
        fill
        sizes="(min-width: 1536px) 385px, (min-width: 1024px) 25vw, 50vw"
        className={`reel-card__image ${twClasses.image}`}
        style={
          image.focalX !== undefined && image.focalY !== undefined
            ? { objectPosition: `${image.focalX}% ${image.focalY}%` }
            : undefined
        }
      />
      <span className={twClasses.shade} aria-hidden="true" />

      <span className={twClasses.badge} aria-hidden="true">
        <Icons.Instagram className="icon-fill-current h-4 text-white 2xl:h-5" />
      </span>

      <span className={twClasses.center} aria-hidden="true">
        <span className={twClasses.play}>
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 size-5 fill-white 2xl:size-6"
          >
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14Z" />
          </svg>
        </span>
        <span className={twClasses.pill}>Watch on Instagram</span>
      </span>
    </a>
  );
};

export default ReelCard;

const twClasses = twc({
  card: "group relative block aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d10] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/30 2xl:rounded-[18px]",
  image:
    "object-cover opacity-90 transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-100",
  shade:
    "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30",
  badge:
    "absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(45deg,#f09433_0%,#dc2743_45%,#bc1888_75%,#7b2ff7_100%)] 2xl:right-4 2xl:top-4 2xl:size-10 2xl:rounded-xl",
  center:
    "absolute inset-0 flex flex-col items-center justify-center gap-3 2xl:gap-4",
  play: "flex size-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 2xl:size-[70px]",
  pill: "ff-manrope rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm 2xl:px-5 2xl:py-2.5 2xl:text-[15px]",
});
