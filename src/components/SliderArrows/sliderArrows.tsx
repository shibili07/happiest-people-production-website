import React from "react";
import { twc } from "@/utils";

interface SliderArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  className?: string;
}

const SliderArrows = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  className = "",
}: SliderArrowsProps) => {
  return (
    <div className={`slider-arrows ${twClasses.wrapper} ${className}`}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        disabled={disablePrev}
        className={`slider-arrows__button ${twClasses.button}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/slider-prev.svg"
          alt=""
          className="size-full -scale-x-100"
        />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        disabled={disableNext}
        className={`slider-arrows__button ${twClasses.button}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/slider-next.svg"
          alt=""
          className="size-full"
        />
      </button>
    </div>
  );
};

export default SliderArrows;

const twClasses = twc({
  wrapper: "flex items-center gap-3 2xl:gap-[22px]",
  button:
    "size-14 shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 disabled:cursor-default disabled:opacity-40 disabled:hover:scale-100 lg:size-20 2xl:size-24",
});
