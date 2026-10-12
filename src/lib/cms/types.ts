import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { WorkCategory } from "./categories";

/**
 * View-model types: the shape the website components consume. They are
 * deliberately independent from Payload's generated types so the UI does not
 * care whether content came from the CMS or from the built-in defaults.
 */

export interface CmsImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Focal point (0-100) chosen in the media library, used for cropping. */
  focalX?: number;
  focalY?: number;
}

export interface CmsLink {
  label: string;
  href: string;
}

export interface CmsStat {
  value: string;
  label: string;
}

/** Section heading: plain lead text plus an italic accent word. */
export interface CmsHeading {
  lead: string;
  emphasis: string;
}

export interface CmsSeo {
  title?: string;
  description?: string;
}

export interface CmsLogo {
  name: string;
  image: CmsImage;
}

export type SocialPlatform = "facebook" | "linkedin" | "instagram" | "behance";

export interface SiteData {
  siteName: string;
  defaultDescription: string;
  navLinks: CmsLink[];
  footerColumns: CmsLink[][];
  contact: {
    email: string;
    phone?: string;
    phoneNote?: string;
    address: string[];
    mapUrl?: string;
  };
  socials: { platform: SocialPlatform; url: string }[];
  ctaBanner: CmsHeading;
}

export interface WorkItem {
  title: string;
  image: CmsImage;
  videoId?: string;
  category: WorkCategory;
}

export interface WorksPageData {
  seo: CmsSeo;
  title: CmsHeading;
  emptyMessage: string;
  items: WorkItem[];
}

export interface BtsItem {
  id: string;
  title: string;
  category: WorkCategory;
  image: CmsImage;
  url: string;
}

export interface BehindTheScenePageData {
  seo: CmsSeo;
  title: string;
  description: string;
  emptyMessage: string;
  items: BtsItem[];
}

export interface ContactPageData {
  seo: CmsSeo;
  title: string;
  description: string;
  officeImage: CmsImage;
  /** Ready-to-use Google Maps embed URL. */
  mapEmbedUrl: string;
  services: string[];
  contact: SiteData["contact"];
}

export type ServiceIconType = "tv" | "play" | "camera";

export interface ServiceItem {
  title: string;
  description: string;
  icon: ServiceIconType;
}

export interface TestimonialItem {
  company: { name: string; logo?: CmsImage };
  tag: string;
  quote: string[];
  name: string;
  role: string[];
  photo: CmsImage;
  videoId?: string;
}

export interface JobItem {
  id: string;
  title: string;
  type: string;
  description: SerializedEditorState | null;
}

export interface HomeData {
  seo: CmsSeo;
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleEmphasis: string;
    cta: CmsLink;
  };
  works: {
    eyebrow: string;
    title: CmsHeading;
    description: string;
    viewAllLabel: string;
    items: WorkItem[];
  };
  brands: CmsLogo[];
  about: {
    eyebrow: string;
    title: CmsHeading;
    paragraphs: string[];
    cta: CmsLink;
    stats: CmsStat[];
  };
  workspace: {
    eyebrow: string;
    titleBefore: string;
    titleAfter: string;
    titleEmphasis: string;
    paragraphs: string[];
    highlight?: string;
    images: CmsImage[];
  };
  services: { title: CmsHeading; items: ServiceItem[] };
  clients: { title: CmsHeading; description: string; items: CmsLogo[] };
  testimonials: {
    title: CmsHeading;
    description: string;
    items: TestimonialItem[];
  };
}

export interface CareersData {
  seo: CmsSeo;
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleEmphasis: string;
    buttonLabel: string;
    image: CmsImage;
  };
  culture: {
    title: CmsHeading;
    description: string;
    images: CmsImage[];
  };
  openings: { title: CmsHeading; emptyMessage: string };
  application: { title: string; text: string; departments: string[] };
}

export interface CoverageItem {
  id: string;
  title: string;
  label: string;
  /** ISO date string */
  publishedOn: string;
  image: CmsImage;
  url?: string;
}

export interface ClientsPageData {
  seo: CmsSeo;
  clients: { title: CmsHeading; description: string; items: CmsLogo[] };
  coverage: { title: string; description: string; items: CoverageItem[] };
}

export interface AboutData {
  seo: CmsSeo;
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    cta: CmsLink;
  };
  intro: { text: string; stats: CmsStat[] };
  careers: {
    title: CmsHeading;
    description: string;
    button: CmsLink;
    images: CmsImage[];
  };
  beliefs: {
    title: CmsHeading;
    items: {
      icon: "vision" | "mission";
      title: string;
      description: string;
    }[];
  };
  collage: { image: CmsImage; title: string; text: string };
  insight: {
    title: CmsHeading;
    paragraphs: string[];
    authorName: string;
    authorRole: string;
    portrait: CmsImage;
  };
}
