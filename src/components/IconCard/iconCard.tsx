import React from "react";
import { twc } from "@/utils";

interface IconCardProps {
  icon: any;
  title: string;
  description: string;
  theme?: "light" | "dark";
}

const IconCard = ({
  icon,
  title,
  description,
  theme = "light",
}: IconCardProps) => {
  const isDark = theme === "dark";

  return (
    <div
      data-component="icon-card"
      className={`icon-card ${isDark ? twClasses.card_dark : twClasses.card}`}
    >
      <div
        className={`icon-card__icon ${
          isDark ? twClasses.icon_dark : twClasses.icon
        }`}
      >
        {icon}
      </div>
      <h3
        className={`icon-card__title ${
          isDark ? twClasses.title_dark : twClasses.title
        }`}
      >
        {title}
      </h3>
      <p
        className={`icon-card__description ${
          isDark ? twClasses.description_dark : twClasses.description
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export default IconCard;

const twClasses = twc({
  card: "bg-gray-100 p-12",
  icon: "mb-4",
  title: "text-xl font-semibold mb-4",
  description: "text-lg leading-relaxed",
  card_dark:
    "rounded-[34px] border border-white/[.14] bg-white/[.08] px-8 py-10 2xl:min-h-[413px] 2xl:px-[41px] 2xl:py-[58px]",
  icon_dark: "mb-8 flex h-[52px] items-end 2xl:mb-10",
  title_dark:
    "mb-6 text-2xl font-semibold tracking-[-0.022em] text-[#b1b1b1]/[.93] 2xl:mb-9 2xl:text-[30px]",
  description_dark:
    "text-lg leading-[1.7] text-[#565656] md:text-xl 2xl:text-[30.5px]",
});
