import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import { defaultSite } from "@/lib/cms/defaults";
import type { SiteData, SocialPlatform } from "@/lib/cms/types";

interface MainFooterProps {
  variant?: "light" | "dark";
  site?: SiteData;
}

const socialIcons: Record<SocialPlatform, React.ElementType> = {
  facebook: Icons.Facebook,
  linkedin: Icons.Linkedin,
  instagram: Icons.Instagram,
  behance: Icons.Behance,
};

const socialLabels: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  behance: "Behance",
};

const MainFooter = ({
  variant = "light",
  site = defaultSite,
}: MainFooterProps) => {
  const isDark = variant === "dark";
  const { footerColumns, contact, socials } = site;

  const emailBlock = (
    <div className="min-w-0 max-w-full">
      <div
        className={`main-footer__email-label ${
          isDark ? twClasses.dark_email_label : twClasses.email_label
        }`}
      >
        Email
      </div>
      <a
        href={`mailto:${contact.email}`}
        className={`main-footer__email ${
          isDark ? twClasses.dark_email : twClasses.email
        } ${twClasses.email.hover}`}
      >
        {contact.email}
      </a>
    </div>
  );

  const socialsBlock = (
    <nav
      aria-label="Social media"
      className={`main-footer__socials ${twClasses.socials}`}
    >
      {socials.map(({ platform, url }) => {
        const Icon = socialIcons[platform];
        return (
          <a
            key={`${platform}-${url}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLabels[platform]}
            className={`main-footer__social--link ${
              isDark ? twClasses.dark_social_link : twClasses.social_link
            } ${twClasses.social_link.hover} ${twClasses.social_link.group_hover}`}
          >
            <Icon
              className={isDark ? "icon-fill-current h-5 text-white" : "h-5"}
            />
          </a>
        );
      })}
    </nav>
  );

  if (isDark) {
    return (
      <footer
        data-widget="main-footer"
        className={`main-footer ${twClasses.dark_section}`}
      >
        <Container>
          <div className={twClasses.dark_inner}>
            <div className={`main-footer__main-grid ${twClasses.dark_grid}`}>
              <figure className={twClasses.dark_logo}>
                <Image
                  src="/images/home/footer-logo.svg"
                  alt="Happiest People Productions logo"
                  width={357}
                  height={259}
                />
              </figure>
              <div className={`main-footer__nav ${twClasses.dark_nav_wrapper}`}>
                {footerColumns.map((column, columnIndex) => (
                  <nav
                    key={columnIndex}
                    aria-label={`Footer links ${columnIndex + 1}`}
                    className={twClasses.dark_nav}
                  >
                    {column.map((item) => (
                      <Link
                        href={item.href}
                        key={`${item.href}-${item.label}`}
                        className={`main-footer__nav-link ${twClasses.dark_nav_link} ${twClasses.nav_link.hover}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                ))}
              </div>
            </div>

            <div className={`main-footer__bottom ${twClasses.dark_bottom}`}>
              {emailBlock}
              {socialsBlock}
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer
      data-widget="main-footer"
      className={`main-footer ${twClasses.section}`}
    >
      <Container>
        <div className={`main-footer__main-grid ${twClasses.main_grid}`}>
          <figure className="max-md:max-w-40">
            <Image
              src="/images/hpp-logo-with-text.svg"
              alt="Happiest People Productions logo in black"
              width={267}
              height={195}
            />
          </figure>
          <div className={`main-footer__nav ${twClasses.nav}`}>
            {footerColumns.flat().map((item) => (
              <Link
                href={item.href}
                key={`${item.href}-${item.label}`}
                className={`main-footer__nav-link ${twClasses.nav_link} ${twClasses.nav_link.hover}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={`main-footer__bottom ${twClasses.footer_bottom}`}>
          {emailBlock}
          {socialsBlock}
        </div>
      </Container>
    </footer>
  );
};

export default MainFooter;

const twClasses = twc({
  dark_section:
    "bg-[#010101] text-white xl:pt-[190px] xl:pb-[195px] lg:pt-28 lg:pb-24 pb-12 pt-16",
  dark_inner: "mx-auto max-w-[1360px]",
  dark_grid: "grid gap-12 md:grid-cols-2 md:gap-5",
  dark_logo: "max-w-48 md:max-w-[240px] lg:max-w-[357px]",
  dark_nav_wrapper:
    "grid grid-cols-2 gap-x-10 md:ps-[6%] lg:gap-x-[78px] lg:ps-[20%]",
  dark_nav: "flex flex-col gap-[24px]",
  dark_nav_link:
    "text-base font-medium tracking-[-0.01em] transition-colors duration-300 ease-in-out md:whitespace-nowrap 2xl:text-[19.9px]",
  dark_bottom:
    "flex flex-wrap items-end justify-between gap-6 pt-16 md:pt-20 xl:pt-[100px]",
  dark_email_label:
    "text-base font-medium tracking-[-0.01em] text-grey-100 2xl:text-[21.6px]",
  dark_email:
    "mt-3 inline-block max-w-full text-base font-semibold tracking-[-0.01em] underline underline-offset-2 transition-colors duration-300 ease-in-out [overflow-wrap:anywhere] 2xl:text-[21.6px]",
  dark_social_link:
    "flex size-12 items-center justify-center rounded-full border border-[#bbb] transition-transform duration-300 will-change-transform 2xl:size-[59px]",
  section: "xl:pt-32 xl:pb-14 lg:pt-28 pb-10 pt-16",
  main_grid: "grid md:grid-cols-2 md:gap-5 gap-10",
  nav: "grid grid-cols-2 gap-x-10 gap-y-3 md:ps-[6%] lg:ps-[20%]",
  nav_link: {
    DEFAULT: "transition-colors duration-300 ease-in-out",
    hover: "hover:text-primary",
  },
  email_label: "text-grey-100 text-sm font-medium",
  email: {
    DEFAULT:
      "font-semibold transition-colors duration-300 ease-in-out mt-2 inline-block max-w-full [overflow-wrap:anywhere]",
    hover: "hover:text-primary",
  },
  footer_bottom: "flex justify-between gap-3 md:pt-20 pt-16 flex-wrap",
  socials: "flex gap-3 group max-lg:mt-4",
  social_link: {
    DEFAULT:
      "border border-grey rounded-full size-12 flex justify-center items-center transition-transform duration-300 will-change-transform",
    hover: "hover:scale-110",
    group_hover: "group-hover:scale-90",
  },
});
