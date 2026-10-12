import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import MarqueeSlider from "@/components/MarqueeSlider";
import { twc } from "@/utils";
import type { CmsLogo } from "@/lib/cms/types";

interface HomeBrandsProps {
  brands: CmsLogo[];
}

// Keep the strip long enough to scroll even when only a few brands exist.
const MIN_LOGOS = 6;

const HomeBrands = ({ brands }: HomeBrandsProps) => {
  if (!brands.length) return null;

  const logos = Array.from(
    { length: Math.max(MIN_LOGOS, brands.length) },
    (_, index) => brands[index % brands.length],
  );

  return (
    <section
      data-widget="home-brands"
      className={`home-brands ${twClasses.section}`}
    >
      <Container>
        <MarqueeSlider
          className={`home-brands__image-grid ${twClasses.image_grid}`}
        >
          {logos.map((brand, index) => (
            <Image
              key={`${brand.name}-${index}`}
              src={brand.image.url}
              width={brand.image.width ?? 192}
              height={brand.image.height ?? 66}
              alt={`${brand.name} logo`}
              className="home-brands__image lg:mx-5 mx-2 h-12 object-contain 2xl:mx-[54px] 2xl:h-[66px]"
            />
          ))}
        </MarqueeSlider>
      </Container>
    </section>
  );
};

export default HomeBrands;

const twClasses = twc({
  section: "bg-[#ffeeab] lg:py-6 py-5 2xl:py-[35px]",
  image_grid: "items-center mix-blend-multiply",
});
