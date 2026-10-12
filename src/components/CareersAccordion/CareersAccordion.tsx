"use client";
import React, { useRef, useState } from "react";
import type { CareersAccordionSettings } from "@/types/careersAccordion";
import Icons from "@/utils/icons";
import Button from "../Button";

const themes = {
  light: {
    root: "bg-white",
    section: "border-b-2 border-gray-300",
    row: "text-black",
    dot: "bg-[#222]",
    meta: "text-[#222]",
    body: "text-[#222]",
    divider: "bg-[#e5e5e5]",
    buttonColor: "black" as const,
  },
  dark: {
    root: "bg-transparent border-t border-white/80",
    section: "border-b border-white/80",
    row: "text-white/[.93]",
    dot: "bg-white",
    meta: "text-white",
    body: "text-white/80",
    divider: "bg-transparent",
    buttonColor: "white" as const,
  },
};

const CareersAccordion: React.FC<CareersAccordionSettings> = ({
  sections,
  arrowIcon = defaultArrow,
  applyLabel = "Apply now",
  applyHref = "",
  theme = "light",
}) => {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = themes[theme];

  return (
    <div className={`careers-accordion font-sans ${t.root}`}>
      {sections.map((section, secIdx) => {
        const isOpen = openSection === secIdx;
        return (
          <div
            key={`${section.title}-${secIdx}`}
            className={`careers-accordion__section relative ${t.section}`}
          >
            <button
              className={`ff-manrope w-full bg-transparent border-none outline-none flex items-center justify-between py-6 text-[1.375rem] font-light cursor-pointer gap-0 md:py-8 2xl:py-[41px] 2xl:text-[36px] ${t.row}`}
              onClick={() => setOpenSection(isOpen ? null : secIdx)}
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-left font-normal tracking-tight leading-tight">
                {section.title}
              </span>
              <span
                className={`flex-1 items-center gap-2 text-[1.0625rem] font-normal hidden sm:flex 2xl:text-[30px] ${t.meta}`}
              >
                <span
                  className={`w-[6px] h-[6px] rounded-full inline-block ${t.dot}`}
                />
                <span>{section.type}</span>
              </span>
              <span
                className={`ml-4 transition-transform duration-200 flex items-center${
                  isOpen ? " rotate-180" : ""
                }`}
              >
                {arrowIcon}
              </span>
            </button>
            <div
              className="will-change-max-height"
              ref={(el) => {
                panelRefs.current[secIdx] = el;
              }}
              style={{
                maxHeight: isOpen
                  ? (panelRefs.current[secIdx]?.scrollHeight ?? 0) + 32 + "px"
                  : "0px",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: isOpen ? "0 0 32px 0" : "0",
              }}
            >
              <div
                className={`ff-manrope text-lg font-light 2xl:text-xl ${t.body}`}
              >
                <span
                  className={`sm:hidden flex items-center gap-2 text-[1.0625rem] font-normal mb-4 ${t.meta}`}
                >
                  <span
                    className={`w-[6px] h-[6px] rounded-full inline-block ${t.dot}`}
                  />
                  <span>{section.type}</span>
                </span>
                {section.richText}
              </div>
              <div className="w-max mt-4 px-1">
                <Button
                  href={applyHref}
                  text={applyLabel}
                  icon={<Icons.ArrowRight className="h-3 mt-1" />}
                  variant="link-with-icon"
                  color={t.buttonColor}
                />
              </div>
            </div>
            <div
              className={`careers-accordion__divider absolute left-0 right-0 bottom-0 h-[2px] ${
                t.divider
              }${secIdx === sections.length - 1 ? " hidden" : ""}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CareersAccordion;

const defaultArrow = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 10L12 14L16 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
