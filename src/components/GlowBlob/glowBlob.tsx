import React from "react";

interface GlowBlobProps {
  className?: string;
  // 1 = the 634x491 ellipse from the design (1855px wide once blur is included)
  scale?: number;
}

const BASE_WIDTH = 1855;

const GlowBlob = ({ className = "", scale = 1 }: GlowBlobProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/home/glow-ellipse.svg"
      alt=""
      aria-hidden="true"
      className={`glow-blob pointer-events-none absolute max-w-none select-none -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: BASE_WIDTH * scale }}
    />
  );
};

export default GlowBlob;
