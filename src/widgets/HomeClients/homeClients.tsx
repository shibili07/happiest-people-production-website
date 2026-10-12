import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { twc } from "@/utils";
import type { HomeData } from "@/lib/cms/types";

interface HomeClientsProps {
  data: HomeData["clients"];
  /** Heading level; the Clients page uses its own h1. */
  headingLevel?: "h1" | "h2";
  /** Extra classes for the section, e.g. top padding under the fixed header. */
  className?: string;
}

const HomeClients = ({
  data,
  headingLevel: Heading = "h2",
  className = "",
}: HomeClientsProps) => {
  return (
    <section
      data-widget="home-clients"
      className={`home-clients ${twClasses.section} ${className}`}
    >
      <Container className="relative z-10">
        <div className={`home-clients__header ${twClasses.header}`}>
          <Heading className={`home-clients__title ${twClasses.title}`}>
            {data.title.lead}{" "}
            <em className="font-light">{data.title.emphasis}</em>
          </Heading>
          <p className={`home-clients__description ${twClasses.description}`}>
            {data.description}
          </p>
        </div>
        <ul className={`home-clients__list ${twClasses.list}`}>
          {data.items.map((client) => (
            <li
              key={client.name}
              className={`home-clients__item ${twClasses.item}`}
            >
              <Image
                src={client.image.url}
                alt={client.image.alt || `${client.name} logo`}
                width={client.image.width ?? 374}
                height={client.image.height ?? 261}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="size-full object-contain p-3 md:p-5"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default HomeClients;

const twClasses = twc({
  section: "text-white 2xl:pb-[180px] xl:pb-32 pb-16",
  header:
    "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-24",
  title:
    "ff-figtree fs-title-secondary font-medium uppercase leading-[1.1] tracking-[-0.029em] lg:whitespace-nowrap",
  description:
    "fs-para-secondary text-white/90 tracking-[0.02em] lg:max-w-[638px] 2xl:leading-[37px]",
  list: "mt-12 grid grid-cols-2 gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-4 xl:mt-20 2xl:mt-[108px]",
  item: "relative aspect-[374/261] bg-white",
});
