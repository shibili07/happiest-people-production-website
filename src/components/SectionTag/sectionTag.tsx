import React from "react";
import { twc } from "@/utils";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTag = ({ children, className = "" }: SectionTagProps) => {
  return (
    <div className={`section-tag ${twClasses.tag} ${className}`}>
      {children}
    </div>
  );
};

export default SectionTag;

const twClasses = twc({
  tag: "ff-figtree inline-flex items-center justify-center rounded-full border border-white/10 bg-grey-900/20 px-6 py-3 text-lg font-medium text-white lg:text-xl 2xl:min-w-[147px] 2xl:p-3.5 2xl:text-[26px]",
});
