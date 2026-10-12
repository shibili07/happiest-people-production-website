"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import Button from "../Button";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import VideoModal from "../VideoModal";

interface ImageCardProps {
  image: {
    url: string;
    alt: string;
  };
  title: string;
  videoId?: string; // Optional YouTube video ID
  /** "dark" is the muted home style, "listing" the bright style on the Works page. */
  theme?: "light" | "dark" | "listing";
}

const ImageCard = ({
  image,
  title,
  videoId,
  theme = "light",
}: ImageCardProps) => {
  const [open, setOpen] = useState(false);
  const hasVideo = !!videoId;
  const isDark = theme === "dark";
  const isListing = theme === "listing";

  const openVideo = useCallback(() => {
    if (hasVideo) setOpen(true);
  }, [hasVideo]);
  const closeVideo = useCallback(() => setOpen(false), []);

  return (
    <div
      data-component="image-card"
      className={`image-card ${twClasses.card} ${hasVideo ? "group" : ""}`}
    >
      <figure
        className={`image-card__image--wrapper ${twClasses.image_wrapper}`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          openVideo();
        }}
      >
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className={`image-card__image ${twClasses.image} ${twClasses.image.group_hover}`}
        />
      </figure>
      <h3
        className={`image-card__title ${twClasses.title} ${
          isDark
            ? twClasses.title_dark
            : isListing
            ? twClasses.title_listing
            : ""
        }`}
      >
        {title}
      </h3>
      {hasVideo && (
        <Button
          text="Watch Now"
          icon={<Icons.ChevronRight className="h-3 mt-px" />}
          variant="link-with-icon"
          className={`image-card__action ${twClasses.action}`}
          as="button"
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            openVideo();
          }}
          color={isDark || isListing ? "white" : "black"}
          textClass={
            isDark
              ? twClasses.action_dark
              : isListing
              ? twClasses.action_listing
              : ""
          }
          iconClass={
            isDark
              ? twClasses.action_dark
              : isListing
              ? twClasses.action_listing
              : ""
          }
        />
      )}
      {hasVideo && (
        <VideoModal
          videoId={videoId!}
          open={open}
          onClose={closeVideo}
          title={title}
          animationDurationMs={300}
        />
      )}
    </div>
  );
};

export default ImageCard;

const twClasses = twc({
  card: "group cursor-pointer",
  image_wrapper: "relative aspect-[766/430] w-full overflow-hidden",
  image: {
    DEFAULT: "transition-transform duration-300",
    group_hover: "group-hover:scale-105",
  },
  title: "ff-manrope 2xl:mt-14 mt-8 2xl:text-2xl text-xl",
  title_dark:
    "font-medium text-[#a8a8a8] transition-colors duration-300 group-hover:text-white 2xl:text-[28px]",
  title_listing: "font-medium text-white 2xl:text-[28px]",
  action: "mt-4 w-max",
  action_listing: "!text-primary 2xl:!text-[22px] 2xl:tracking-[0.02em]",
  action_dark:
    "!text-[#6b6b6b] transition-colors duration-300 group-hover:!text-white 2xl:!text-[22px] 2xl:tracking-[0.02em]",
});
