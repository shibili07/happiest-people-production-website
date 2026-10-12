import path from "path";
import { fileURLToPath } from "url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { BehindTheScenes } from "./collections/BehindTheScenes";
import { Brands } from "./collections/Brands";
import { Clients } from "./collections/Clients";
import { Jobs } from "./collections/Jobs";
import { Media } from "./collections/Media";
import { MediaCoverage } from "./collections/MediaCoverage";
import { Services } from "./collections/Services";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { Works } from "./collections/Works";
import { AboutPage } from "./globals/AboutPage";
import { BehindTheScenePage } from "./globals/BehindTheScenePage";
import { CareersPage } from "./globals/CareersPage";
import { ClientsPage } from "./globals/ClientsPage";
import { ContactPage } from "./globals/ContactPage";
import { WorksPage } from "./globals/WorksPage";
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

// Which public page shows the content being edited.
const previewPaths: Record<string, string> = {
  "home-page": "/",
  "about-page": "/about",
  "careers-page": "/careers",
  "works-page": "/works",
  "behind-the-scene-page": "/behind-the-scene",
  "behind-the-scenes": "/behind-the-scene",
  "contact-page": "/contact-us",
  "clients-page": "/clients",
  "media-coverage": "/clients",
  "site-settings": "/",
  works: "/works",
  services: "/",
  testimonials: "/",
  clients: "/",
  brands: "/",
  jobs: "/careers",
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "dark",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      openByDefault: true,
      collections: [
        "works",
        "services",
        "testimonials",
        "clients",
        "brands",
        "jobs",
        "media-coverage",
        "behind-the-scenes",
      ],
      globals: [
        "home-page",
        "about-page",
        "careers-page",
        "clients-page",
        "works-page",
        "behind-the-scene-page",
        "contact-page",
        "site-settings",
      ],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 820, height: 1180 },
        { label: "Laptop", name: "laptop", width: 1440, height: 900 },
      ],
      // The /preview route checks the editor is signed in, turns on draft
      // mode and redirects to the page, so unsaved drafts are rendered.
      url: ({ collectionConfig, globalConfig }) => {
        const slug = collectionConfig?.slug ?? globalConfig?.slug ?? "";
        const path = previewPaths[slug] ?? "/";
        return `${serverURL}/preview?path=${encodeURIComponent(path)}`;
      },
    },
    meta: {
      titleSuffix: " · HPP Content Studio",
      description: "Manage the Happiest People Productions website.",
      icons: [{ rel: "icon", type: "image/x-icon", url: "/favicon.ico" }],
    },
    components: {
      graphics: {
        Logo: "/components/payload/Logo#Logo",
        Icon: "/components/payload/Icon#Icon",
      },
      beforeLogin: ["/components/payload/LoginIntro#LoginIntro"],
      beforeNavLinks: ["/components/payload/NavHome#NavHome"],
      afterNavLinks: ["/components/payload/NavLive#NavLive"],
      actions: ["/components/payload/ViewSite#ViewSite"],
      views: {
        dashboard: {
          Component: "/components/payload/Dashboard#Dashboard",
        },
      },
    },
  },
  collections: [
    Works,
    BehindTheScenes,
    MediaCoverage,
    Services,
    Testimonials,
    Clients,
    Brands,
    Jobs,
    Media,
    Users,
  ],
  globals: [
    HomePage,
    AboutPage,
    WorksPage,
    BehindTheScenePage,
    CareersPage,
    ClientsPage,
    ContactPage,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
    // Fail fast when MongoDB is down so pages can fall back to built-in content.
    connectOptions: { serverSelectionTimeoutMS: 5000 },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
});
