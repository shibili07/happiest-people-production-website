"use client";
import React from "react";
import { WORK_CATEGORIES, type WorkCategory } from "@/lib/cms/categories";
import { twc } from "@/utils";

interface CategoryTabsProps {
  active: WorkCategory;
  onChange: (category: WorkCategory) => void;
  /** Prefix for element ids so several tab lists can share a page. */
  idPrefix: string;
  label?: string;
}

/** Pill-shaped filter tabs shared by the Works and Behind the scene pages. */
const CategoryTabs = ({
  active,
  onChange,
  idPrefix,
  label = "Filter by category",
}: CategoryTabsProps) => {
  return (
    <div role="tablist" aria-label={label} className={twClasses.tabs}>
      {WORK_CATEGORIES.map(({ value, label: text }) => {
        const selected = value === active;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            id={`${idPrefix}-${value}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            onClick={() => onChange(value)}
            className={`${twClasses.tab} ${
              selected ? twClasses.tab_active : twClasses.tab_idle
            }`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;

const twClasses = twc({
  tabs: "flex flex-wrap gap-3 md:justify-center 2xl:gap-6",
  tab: "ff-manrope cursor-pointer rounded-full border px-6 py-3 text-base font-semibold transition-colors duration-300 md:px-8 md:py-4 2xl:px-[42px] 2xl:py-[22px] 2xl:text-[22px]",
  tab_active: "border-white bg-white text-black",
  tab_idle:
    "border-white/15 bg-white/[.09] text-white hover:border-white/40 hover:bg-white/15",
});
