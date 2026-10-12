"use client";
import React from "react";
import Container from "@/components/Container/container";
import Image from "next/image";
import Link from "next/link";
import useMainHeader from "./useMainHeader";
import { usePathname } from "next/navigation";
import { twc } from "@/utils";

interface MainHeaderProps {
  variant?: "light" | "dark";
  navLinks?: { label: string; href: string }[];
}

const MainHeader = ({
  variant = "light",
  navLinks = defaultNavLinks,
}: MainHeaderProps) => {
  const { isScrolled, isMenuOpen, setIsMenuOpen, menuRef } = useMainHeader();
  const pathname = usePathname();
  const isDark = variant === "dark";
  const isActive = (href: string) => {
    if (!href.startsWith("/")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };
  const getNavLinkClass = (href: string) =>
    `main-header__navigation--link ${twClasses.nav_link} ${
      twClasses.nav_link.hover
    } ${isDark ? twClasses.nav_link_dark : twClasses.nav_link_light} ${
      isActive(href)
        ? `${twClasses.nav_link_active} ${
            isDark
              ? twClasses.nav_link_active_dark
              : twClasses.nav_link_active_light
          }`
        : ""
    }`;

  return (
    <header
      data-widget="main-header"
      className={`main-header ${twClasses.header} ${
        isScrolled
          ? `py-4 ${
              isDark ? twClasses.header_scrolled_dark : twClasses.header_scrolled
            }`
          : "py-8"
      }`}
    >
      <Container className={`main-header__container ${twClasses.container}`}>
        <div className={`main-header__logo ${twClasses.logo}`}>
          <Link href="/">
            <Image
              src="/images/hpp-logo.svg"
              alt="Brand logo representing a yellow video camera icon with a smiling face inside on a dark gradient background"
              width={isScrolled ? 60 : 84}
              height={isScrolled ? 42 : 58}
              className={twClasses.logo_image}
            />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`${twClasses.hamburger} ${isMenuOpen ? "open" : ""} ${
            isDark
              ? "text-white"
              : isScrolled
              ? "text-black"
              : pathname !== "/" || isMenuOpen
              ? "text-black"
              : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <div
          ref={menuRef}
          className={`${twClasses.menu_container} ${
            isDark ? twClasses.menu_container_dark : twClasses.menu_container_light
          }`}
        >
          <nav
            className={`main-header__navigation ${twClasses.navigation} ${
              isDark
                ? `text-white ${twClasses.navigation_dark}`
                : isScrolled
                ? "text-black"
                : pathname !== "/"
                ? "text-black"
                : "text-white"
            }`}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={getNavLinkClass(href)}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;

const defaultNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/works", label: "Works" },
  { href: "/careers", label: "Careers" },
  { href: "/contact-us", label: "Contact Us" },
];

const twClasses = twc({
  header:
    "fixed top-0 left-0 w-full z-[1024] transition-all duration-300 ease-out",
  header_scrolled: "bg-white/90 backdrop-blur-sm shadow-lg",
  header_scrolled_dark: "bg-black/80 backdrop-blur-sm shadow-lg shadow-black/30",
  container: "flex justify-between items-center relative",
  logo: "flex items-center gap-4",
  logo_image: "transition-all duration-300 ease-out",
  navigation:
    "flex lg:items-center transition-all duration-300 ease-out lg:gap-10 max-lg:flex-col max-lg:w-full max-lg:pt-20",
  navigation_dark: "2xl:gap-[65px] 2xl:text-[24px]",
  menu_container:
    "max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-screen max-lg:w-[425px] max-lg:w-full max-lg:shadow-xl max-lg:transform max-lg:translate-x-full max-lg:z-50 max-lg:pt-8",
  menu_container_light: "max-lg:bg-white",
  menu_container_dark: "max-lg:bg-black",
  hamburger:
    "max-lg:flex hidden flex-col justify-center items-center w-8 h-8 gap-1.5 z-[1025] [&.open>span:nth-child(1)]:rotate-45 [&.open>span:nth-child(1)]:translate-y-[9px] [&.open>span:nth-child(2)]:opacity-0 [&.open>span:nth-child(3)]:-rotate-45 [&.open>span:nth-child(3)]:-translate-y-[9px] [&>span]:w-6 [&>span]:h-0.5 [&>span]:bg-[currentColor] [&>span]:rounded-full [&>span]:transition-all [&>span]:duration-300",
  nav_link: {
    DEFAULT:
      "relative max-lg:block max-lg:w-full max-lg:py-4 max-lg:px-8 max-lg:text-lg transition-colors duration-200",
    hover: "hover:lg:text-primary",
  },
  nav_link_light: "max-lg:text-black max-lg:hover:bg-gray-50",
  nav_link_dark: "max-lg:text-white max-lg:hover:bg-white/5",
  nav_link_active: "lg:!text-primary",
  nav_link_active_light: "max-lg:font-semibold",
  nav_link_active_dark: "max-lg:!text-primary",
});
