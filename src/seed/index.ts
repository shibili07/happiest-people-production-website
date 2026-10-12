/**
 * Copies the website's built-in content into the CMS so editors start from
 * what is already live.
 *
 *   npm run seed            only fills sections that are still empty
 *   SEED_FORCE=1 npm run seed   overwrites everything with the built-in content
 *
 * An admin user is created from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD (set
 * them in .env). If they are not set, no user is created and the first-run
 * screen at /admin creates the initial admin instead.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";

import config from "../payload.config";
import {
  defaultAbout,
  defaultBts,
  defaultBtsPage,
  defaultCareers,
  defaultClientsPage,
  defaultContactPage,
  DEFAULT_MAP_QUERY,
  defaultCoverage,
  defaultHome,
  defaultJobs,
  defaultSite,
  defaultWorks,
  defaultWorksPage,
} from "../lib/cms/defaults";
import type { CmsImage } from "../lib/cms/types";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");
const force = process.env.SEED_FORCE === "1" || process.env.SEED_FORCE === "true";

const payload = await getPayload({ config });

const log = (message: string) => console.log(`[seed] ${message}`);

/* -------------------------------- media ----------------------------------- */

const mediaIds = new Map<string, string>();

async function uploadImage(image: CmsImage): Promise<string> {
  const cached = mediaIds.get(image.url);
  if (cached) return cached;

  const filePath = path.join(publicDir, image.url);
  const filename = path.basename(image.url);

  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  if (existing.docs[0]) {
    mediaIds.set(image.url, existing.docs[0].id);
    return existing.docs[0].id;
  }

  const doc = await payload.create({
    collection: "media",
    data: {
      alt: image.alt || filename,
      focalX: image.focalX,
      focalY: image.focalY,
    },
    filePath,
  });
  mediaIds.set(image.url, doc.id);
  return doc.id;
}

/* ------------------------------ collections -------------------------------- */

async function isEmpty(collection: Parameters<typeof payload.count>[0]["collection"]) {
  const { totalDocs } = await payload.count({ collection, overrideAccess: true });
  return totalDocs === 0;
}

async function reset(collection: Parameters<typeof payload.delete>[0]["collection"]) {
  await payload.delete({ collection, where: { id: { exists: true } } });
}

async function seedCollection(
  collection:
    | "works"
    | "brands"
    | "clients"
    | "services"
    | "testimonials"
    | "jobs"
    | "media-coverage"
    | "behind-the-scenes",
  create: () => Promise<void>,
) {
  if (force) await reset(collection);
  else if (!(await isEmpty(collection))) {
    log(`${collection}: already has content, skipped`);
    return;
  }
  await create();
  log(`${collection}: seeded`);
}

await seedCollection("works", async () => {
  for (const [order, work] of defaultWorks.entries()) {
    await payload.create({
      collection: "works",
      data: {
        title: work.title,
        thumbnail: await uploadImage(work.image),
        youtubeId: work.videoId,
        category: work.category,
        featuredOnHome: order < 2,
        order,
      },
    });
  }
});

await seedCollection("brands", async () => {
  for (const [order, brand] of defaultHome.brands.entries()) {
    await payload.create({
      collection: "brands",
      data: { name: brand.name, logo: await uploadImage(brand.image), order },
    });
  }
});

await seedCollection("clients", async () => {
  for (const [order, client] of defaultHome.clients.items.entries()) {
    await payload.create({
      collection: "clients",
      data: { name: client.name, logo: await uploadImage(client.image), order },
    });
  }
});

await seedCollection("services", async () => {
  for (const [order, service] of defaultHome.services.items.entries()) {
    await payload.create({
      collection: "services",
      data: { ...service, order },
    });
  }
});

await seedCollection("testimonials", async () => {
  for (const [order, item] of defaultHome.testimonials.items.entries()) {
    await payload.create({
      collection: "testimonials",
      data: {
        authorName: item.name,
        authorRole: item.role.join("\n"),
        company: item.company.name,
        industry: item.tag,
        companyLogo: item.company.logo
          ? await uploadImage(item.company.logo)
          : undefined,
        quote: item.quote.join("\n\n"),
        photo: await uploadImage(item.photo),
        youtubeId: item.videoId,
        order,
      },
    });
  }
});

await seedCollection("media-coverage", async () => {
  for (const [order, item] of defaultCoverage.entries()) {
    await payload.create({
      collection: "media-coverage",
      data: {
        title: item.title,
        label: item.label,
        publishedOn: item.publishedOn,
        image: await uploadImage(item.image),
        order,
      },
    });
  }
});

await seedCollection("behind-the-scenes", async () => {
  for (const [order, item] of defaultBts.entries()) {
    await payload.create({
      collection: "behind-the-scenes",
      data: {
        title: item.title,
        category: item.category,
        thumbnail: await uploadImage(item.image),
        instagramUrl: item.url,
        order,
      },
    });
  }
});

await seedCollection("jobs", async () => {
  for (const [order, job] of defaultJobs.entries()) {
    await payload.create({
      collection: "jobs",
      data: {
        title: job.title,
        type: job.type,
        description: job.description as never,
        isOpen: true,
        order,
      },
    });
  }
});

/* --------------------------------- globals --------------------------------- */

const joinParagraphs = (paragraphs: string[]) => paragraphs.join("\n\n");

async function seedGlobal(
  slug:
    | "home-page"
    | "about-page"
    | "careers-page"
    | "clients-page"
    | "works-page"
    | "behind-the-scene-page"
    | "contact-page"
    | "site-settings",
  isConfigured: (doc: Record<string, unknown>) => boolean,
  build: () => Promise<Record<string, unknown>>,
) {
  const current = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<
    string,
    unknown
  >;
  if (!force && isConfigured(current)) {
    log(`${slug}: already configured, skipped`);
    return;
  }
  await payload.updateGlobal({
    slug,
    draft: false,
    // The page globals use drafts, so seeded content is published straight away.
    data: { ...(await build()), _status: "published" } as never,
  });
  log(`${slug}: seeded`);
}

const home = defaultHome;
await seedGlobal(
  "home-page",
  // Payload fills fields that have a defaultValue even for a never-saved
  // global, so check a field that has none.
  (doc) => Boolean((doc.about as { description?: string } | undefined)?.description),
  async () => ({
    hero: {
      titleLine1: home.hero.titleLine1,
      titleLine2: home.hero.titleLine2,
      titleEmphasis: home.hero.titleEmphasis,
      cta: home.hero.cta,
    },
    works: {
      eyebrow: home.works.eyebrow,
      titleLead: home.works.title.lead,
      titleEmphasis: home.works.title.emphasis,
      description: home.works.description,
      viewAllLabel: home.works.viewAllLabel,
    },
    about: {
      eyebrow: home.about.eyebrow,
      titleLine1: home.about.title.lead,
      titleEmphasis: home.about.title.emphasis,
      description: joinParagraphs(home.about.paragraphs),
      cta: home.about.cta,
      stats: home.about.stats,
    },
    workspace: {
      eyebrow: home.workspace.eyebrow,
      titleBefore: home.workspace.titleBefore,
      titleAfter: home.workspace.titleAfter,
      titleEmphasis: home.workspace.titleEmphasis,
      description: joinParagraphs(home.workspace.paragraphs),
      highlight: home.workspace.highlight,
      images: await Promise.all(
        home.workspace.images.map(async (image) => ({
          image: await uploadImage(image),
        })),
      ),
    },
    services: {
      titleLead: home.services.title.lead,
      titleEmphasis: home.services.title.emphasis,
    },
    clients: {
      titleLead: home.clients.title.lead,
      titleEmphasis: home.clients.title.emphasis,
      description: home.clients.description,
    },
    testimonials: {
      titleLead: home.testimonials.title.lead,
      titleEmphasis: home.testimonials.title.emphasis,
      description: home.testimonials.description,
    },
    seo: home.seo,
  }),
);

const about = defaultAbout;
await seedGlobal(
  "about-page",
  (doc) => Boolean((doc.hero as { titleLine1?: string } | undefined)?.titleLine1),
  async () => ({
    hero: {
      eyebrow: about.hero.eyebrow,
      titleLine1: about.hero.titleLine1,
      titleLine2: about.hero.titleLine2,
      cta: about.hero.cta,
    },
    intro: { text: about.intro.text, stats: about.intro.stats },
    careers: {
      titleLine1: about.careers.title.lead,
      titleEmphasis: about.careers.title.emphasis,
      description: about.careers.description,
      button: about.careers.button,
      images: await Promise.all(
        about.careers.images.map(async (image) => ({
          image: await uploadImage(image),
        })),
      ),
    },
    beliefs: {
      titleLead: about.beliefs.title.lead,
      titleEmphasis: about.beliefs.title.emphasis,
      items: about.beliefs.items,
    },
    collage: {
      image: await uploadImage(about.collage.image),
      title: about.collage.title,
      text: about.collage.text,
    },
    insight: {
      titleLine1: about.insight.title.lead,
      titleEmphasis: about.insight.title.emphasis,
      quote: joinParagraphs(about.insight.paragraphs),
      authorName: about.insight.authorName,
      authorRole: about.insight.authorRole,
      portrait: await uploadImage(about.insight.portrait),
    },
    seo: about.seo,
  }),
);

const careers = defaultCareers;
await seedGlobal(
  "careers-page",
  (doc) => Boolean((doc.application as { text?: string } | undefined)?.text),
  async () => ({
    hero: {
      titleLine1: careers.hero.titleLine1,
      titleLine2: careers.hero.titleLine2,
      titleEmphasis: careers.hero.titleEmphasis,
      buttonLabel: careers.hero.buttonLabel,
      image: await uploadImage(careers.hero.image),
    },
    culture: {
      titleLead: careers.culture.title.lead,
      titleEmphasis: careers.culture.title.emphasis,
      description: careers.culture.description,
      images: await Promise.all(
        careers.culture.images.map(async (image) => ({
          image: await uploadImage(image),
        })),
      ),
    },
    openings: {
      titleLead: careers.openings.title.lead,
      titleEmphasis: careers.openings.title.emphasis,
      emptyMessage: careers.openings.emptyMessage,
    },
    application: {
      title: careers.application.title,
      text: careers.application.text,
      departments: careers.application.departments.map((name) => ({ name })),
    },
    seo: careers.seo,
  }),
);

const clientsPage = defaultClientsPage;
await seedGlobal(
  "clients-page",
  (doc) => Boolean((doc.clients as { description?: string } | undefined)?.description),
  async () => ({
    clients: {
      titleLead: clientsPage.clients.title.lead,
      titleEmphasis: clientsPage.clients.title.emphasis,
      description: clientsPage.clients.description,
    },
    coverage: {
      title: clientsPage.coverage.title,
      description: clientsPage.coverage.description,
    },
    seo: clientsPage.seo,
  }),
);

const worksPage = defaultWorksPage;
await seedGlobal(
  "works-page",
  (doc) => Boolean((doc as { emptyMessage?: string }).emptyMessage && (doc as { titleLead?: string }).titleLead && (doc as { seo?: { title?: string } }).seo?.title),
  async () => ({
    titleLead: worksPage.title.lead,
    titleEmphasis: worksPage.title.emphasis,
    emptyMessage: worksPage.emptyMessage,
    seo: worksPage.seo,
  }),
);

const btsPage = defaultBtsPage;
await seedGlobal(
  "behind-the-scene-page",
  (doc) => Boolean((doc as { description?: string }).description),
  async () => ({
    title: btsPage.title,
    description: btsPage.description,
    emptyMessage: btsPage.emptyMessage,
    seo: btsPage.seo,
  }),
);

const contactPage = defaultContactPage;
await seedGlobal(
  "contact-page",
  (doc) => Boolean((doc as { officeImage?: unknown }).officeImage),
  async () => ({
    title: contactPage.title,
    description: contactPage.description,
    officeImage: await uploadImage(contactPage.officeImage),
    mapQuery: DEFAULT_MAP_QUERY,
    services: contactPage.services.map((name) => ({ name })),
    seo: contactPage.seo,
  }),
);

await seedGlobal(
  "site-settings",
  (doc) => Boolean((doc.contact as { email?: string } | undefined)?.email),
  async () => ({
    siteName: defaultSite.siteName,
    defaultDescription: defaultSite.defaultDescription,
    navLinks: defaultSite.navLinks,
    footerColumns: defaultSite.footerColumns.map((links) => ({ links })),
    contact: {
      ...defaultSite.contact,
      address: defaultSite.contact.address.join("\n"),
    },
    socials: defaultSite.socials,
    ctaBanner: {
      titleLead: defaultSite.ctaBanner.lead,
      titleEmphasis: defaultSite.ctaBanner.emphasis,
    },
  }),
);

/* ------------------------------ contact map -------------------------------- */

// The map used to be a static image; existing pages need the new map field once.
{
  const contact = (await payload.findGlobal({
    slug: "contact-page",
    depth: 0,
  })) as unknown as { officeImage?: unknown; mapQuery?: string };
  if (contact.officeImage && !contact.mapQuery) {
    await payload.updateGlobal({
      slug: "contact-page",
      draft: false,
      data: { mapQuery: DEFAULT_MAP_QUERY, _status: "published" } as never,
    });
    log("contact-page: set the map location");
  }
}

/* ------------------------- site settings: new pages ------------------------ */

// Existing databases were seeded before some pages existed; add them to the
// menu and footer once, without touching anything else editors changed.
{
  const settings = (await payload.findGlobal({
    slug: "site-settings",
    depth: 0,
  })) as unknown as {
    navLinks?: { label: string; href: string }[];
    footerColumns?: { links?: { label: string; href: string }[] }[];
  };

  const newPages = [
    { label: "Behind the Scene", href: "/behind-the-scene", before: "/clients" },
    { label: "Clients", href: "/clients", before: "/careers" },
  ];

  const navLinks = [...(settings.navLinks ?? [])];
  let navChanged = false;
  for (const page of newPages) {
    if (!navLinks.length || navLinks.some((link) => link.href === page.href)) continue;
    const at = navLinks.findIndex((link) => link.href === page.before);
    navLinks.splice(at === -1 ? navLinks.length : at, 0, { label: page.label, href: page.href });
    navChanged = true;
  }

  const columns = (settings.footerColumns ?? []).map((column) => ({
    links: [...(column.links ?? [])],
  }));
  let footerChanged = false;
  for (const page of newPages) {
    if (!columns.length) break;
    if (columns.some((column) => column.links.some((link) => link.href === page.href))) continue;
    const target =
      columns.find((column) => column.links.some((link) => link.href === "/careers")) ??
      columns[columns.length - 1];
    const at = target.links.findIndex((link) => link.href === page.before);
    target.links.splice(at === -1 ? target.links.length : at, 0, {
      label: page.label,
      href: page.href,
    });
    footerChanged = true;
  }

  if (navChanged || footerChanged) {
    await payload.updateGlobal({
      slug: "site-settings",
      draft: false,
      data: {
        ...(navChanged ? { navLinks } : {}),
        ...(footerChanged ? { footerColumns: columns } : {}),
        _status: "published",
      } as never,
    });
    log("site-settings: added new pages to the menu and footer");
  }
}

/* ---------------------------------- admin ---------------------------------- */

const adminEmail = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  log(
    "admin: SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set, skipped (use /admin to create the first user)",
  );
} else {
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: adminEmail } },
    limit: 1,
    depth: 0,
  });

  if (existing.docs[0]) {
    if (force) {
      await payload.update({
        collection: "users",
        id: existing.docs[0].id,
        data: { password: adminPassword, role: "admin" },
      });
      log(`admin: ${adminEmail} password reset`);
    } else {
      log(`admin: ${adminEmail} already exists, skipped`);
    }
  } else {
    await payload.create({
      collection: "users",
      data: {
        name: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      },
    });
    log(`admin: ${adminEmail} created`);
  }
}

log("done");
process.exit(0);
