import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import type {
  AboutPage,
  BehindTheScene,
  BehindTheScenePage,
  Brand,
  CareersPage,
  Client,
  ClientsPage,
  ContactPage,
  HomePage,
  Job,
  MediaCoverage,
  Media,
  Service,
  SiteSetting,
  Testimonial,
  Work,
  WorksPage,
} from "@/payload-types";
import {
  defaultAbout,
  defaultBtsPage,
  defaultCareers,
  defaultClientsPage,
  defaultContactPage,
  defaultCoverage,
  defaultHome,
  defaultJobs,
  defaultSite,
  defaultWorks,
  defaultWorksPage,
} from "./defaults";
import { isPreview } from "./preview";
import { buildMapEmbedUrl } from "./map";
import { DEFAULT_WORK_CATEGORY } from "./categories";
import type {
  AboutData,
  BehindTheScenePageData,
  BtsItem,
  CareersData,
  ClientsPageData,
  CmsImage,
  CmsLink,
  CmsLogo,
  ContactPageData,
  CoverageItem,
  HomeData,
  JobItem,
  ServiceItem,
  SiteData,
  TestimonialItem,
  WorkItem,
  WorksPageData,
} from "./types";

export * from "./types";

/* -------------------------------------------------------------------------- */
/* helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getClient = () => getPayload({ config });

/**
 * Runs a CMS query. If the database is unreachable (or the query fails) the
 * site falls back to its built-in content instead of returning a 500.
 */
async function safely<T>(label: string, run: () => Promise<T>, fallback: T) {
  try {
    return await run();
  } catch (error) {
    console.error(`[cms] "${label}" failed, using built-in content.`, error);
    return fallback;
  }
}

const toImage = (value: unknown): CmsImage | null => {
  if (!value || typeof value !== "object") return null;
  const media = value as Media;
  if (!media.url) return null;
  return {
    url: media.url,
    alt: media.alt ?? "",
    width: media.width ?? undefined,
    height: media.height ?? undefined,
    focalX: media.focalX ?? undefined,
    focalY: media.focalY ?? undefined,
  };
};

const toParagraphs = (text?: string | null) =>
  (text ?? "")
    .split(/\r?\n\s*\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean);

const toLines = (text?: string | null) =>
  (text ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const orDefault = <T>(value: T | null | undefined, fallback: T): T =>
  value ?? fallback;

const nonEmpty = <T>(list: T[], fallback: T[]) => (list.length ? list : fallback);

const toLogos = (docs: (Brand | Client)[]): CmsLogo[] =>
  docs.flatMap((doc) => {
    const image = toImage(doc.logo);
    return image ? [{ name: doc.name, image }] : [];
  });

const toWorks = (docs: Work[]): WorkItem[] =>
  docs.flatMap((doc) => {
    const image = toImage(doc.thumbnail);
    return image
      ? [
          {
            title: doc.title,
            image,
            videoId: doc.youtubeId || undefined,
            // Films created before categories existed count as commercials.
            category: doc.category ?? DEFAULT_WORK_CATEGORY,
          },
        ]
      : [];
  });

const toServices = (docs: Service[]): ServiceItem[] =>
  docs.map((doc) => ({
    title: doc.title,
    description: doc.description,
    icon: doc.icon,
  }));

const toTestimonials = (docs: Testimonial[]): TestimonialItem[] =>
  docs.flatMap((doc) => {
    const photo = toImage(doc.photo);
    if (!photo) return [];
    const logo = toImage(doc.companyLogo);
    return [
      {
        company: { name: doc.company, logo: logo ?? undefined },
        tag: doc.industry,
        quote: toParagraphs(doc.quote),
        name: doc.authorName,
        role: toLines(doc.authorRole),
        photo,
        videoId: doc.youtubeId || undefined,
      },
    ];
  });

const toLinks = (links?: { label: string; href: string }[] | null): CmsLink[] =>
  (links ?? []).map(({ label, href }) => ({ label, href }));

/* -------------------------------------------------------------------------- */
/* site-wide settings                                                         */
/* -------------------------------------------------------------------------- */

export const getSite = cache(async (): Promise<SiteData> => {
  const draft = await isPreview();
  return safely(
    "site-settings",
    async () => {
      const payload = await getClient();
      const doc = (await payload.findGlobal({
        slug: "site-settings",
        depth: 0,
        draft,
      })) as SiteSetting;

      const navLinks = toLinks(doc.navLinks);
      const footerColumns = (doc.footerColumns ?? []).map((column) =>
        toLinks(column.links),
      );

      return {
        siteName: orDefault(doc.siteName, defaultSite.siteName),
        defaultDescription: orDefault(
          doc.defaultDescription,
          defaultSite.defaultDescription,
        ),
        navLinks: nonEmpty(navLinks, defaultSite.navLinks),
        footerColumns: nonEmpty(
          footerColumns.filter((column) => column.length),
          defaultSite.footerColumns,
        ),
        contact: doc.contact?.email
          ? {
              email: doc.contact.email,
              phone: doc.contact.phone ?? undefined,
              phoneNote: doc.contact.phoneNote ?? undefined,
              address: toLines(doc.contact.address),
              mapUrl: doc.contact.mapUrl ?? undefined,
            }
          : defaultSite.contact,
        socials: nonEmpty(
          (doc.socials ?? []).map(({ platform, url }) => ({ platform, url })),
          defaultSite.socials,
        ),
        ctaBanner: doc.ctaBanner?.titleLead
          ? {
              lead: doc.ctaBanner.titleLead,
              emphasis: doc.ctaBanner.titleEmphasis,
            }
          : defaultSite.ctaBanner,
      };
    },
    defaultSite,
  );
});

/* -------------------------------------------------------------------------- */
/* home                                                                       */
/* -------------------------------------------------------------------------- */

export const getHome = cache(async (): Promise<HomeData> => {
  const draft = await isPreview();
  return safely(
    "home",
    async () => {
      const payload = await getClient();

      const [page, featured, firstWorks, brands, services, clients, stories] =
        await Promise.all([
          payload.findGlobal({
            slug: "home-page",
            depth: 2,
            draft,
          }) as Promise<HomePage>,
          payload.find({
            collection: "works",
            where: { featuredOnHome: { equals: true } },
            sort: "order",
            limit: 4,
            depth: 1,
            pagination: false,
          }),
          payload.find({
            collection: "works",
            sort: "order",
            limit: 2,
            depth: 1,
            pagination: false,
          }),
          payload.find({ collection: "brands", sort: "order", depth: 1, limit: 24, pagination: false }),
          payload.find({ collection: "services", sort: "order", depth: 0, limit: 12, pagination: false }),
          payload.find({ collection: "clients", sort: "order", depth: 1, limit: 48, pagination: false }),
          payload.find({ collection: "testimonials", sort: "order", depth: 1, limit: 24, pagination: false }),
        ]);

      const d = defaultHome;
      const featuredItems = toWorks(featured.docs);
      const workItems = featuredItems.length
        ? featuredItems
        : toWorks(firstWorks.docs);

      const workspaceImages = (page.workspace?.images ?? []).flatMap((row) => {
        const image = toImage(row.image);
        return image ? [image] : [];
      });

      return {
        seo: {
          title: page.seo?.title || d.seo.title,
          description: page.seo?.description || d.seo.description,
        },
        hero: page.hero?.titleLine1
          ? {
              titleLine1: page.hero.titleLine1,
              titleLine2: page.hero.titleLine2,
              titleEmphasis: page.hero.titleEmphasis,
              cta: { label: page.hero.cta.label, href: page.hero.cta.href },
            }
          : d.hero,
        works: {
          ...(page.works?.titleLead
            ? {
                eyebrow: page.works.eyebrow,
                title: {
                  lead: page.works.titleLead,
                  emphasis: page.works.titleEmphasis,
                },
                description: page.works.description,
                viewAllLabel: page.works.viewAllLabel,
              }
            : {
                eyebrow: d.works.eyebrow,
                title: d.works.title,
                description: d.works.description,
                viewAllLabel: d.works.viewAllLabel,
              }),
          items: nonEmpty(workItems, d.works.items),
        },
        brands: nonEmpty(toLogos(brands.docs), d.brands),
        about: page.about?.titleLine1
          ? {
              eyebrow: page.about.eyebrow,
              title: {
                lead: page.about.titleLine1,
                emphasis: page.about.titleEmphasis,
              },
              paragraphs: toParagraphs(page.about.description),
              cta: { label: page.about.cta.label, href: page.about.cta.href },
              stats: nonEmpty(
                (page.about.stats ?? []).map(({ value, label }) => ({ value, label })),
                d.about.stats,
              ),
            }
          : d.about,
        workspace: page.workspace?.titleBefore
          ? {
              eyebrow: page.workspace.eyebrow,
              titleBefore: page.workspace.titleBefore,
              titleAfter: page.workspace.titleAfter,
              titleEmphasis: page.workspace.titleEmphasis,
              paragraphs: toParagraphs(page.workspace.description),
              highlight: page.workspace.highlight || undefined,
              images: nonEmpty(workspaceImages, d.workspace.images),
            }
          : d.workspace,
        services: {
          title: page.services?.titleLead
            ? {
                lead: page.services.titleLead,
                emphasis: page.services.titleEmphasis,
              }
            : d.services.title,
          items: nonEmpty(toServices(services.docs), d.services.items),
        },
        clients: {
          title: page.clients?.titleLead
            ? {
                lead: page.clients.titleLead,
                emphasis: page.clients.titleEmphasis,
              }
            : d.clients.title,
          description: page.clients?.description || d.clients.description,
          items: nonEmpty(toLogos(clients.docs), d.clients.items),
        },
        testimonials: {
          title: page.testimonials?.titleLead
            ? {
                lead: page.testimonials.titleLead,
                emphasis: page.testimonials.titleEmphasis,
              }
            : d.testimonials.title,
          description:
            page.testimonials?.description || d.testimonials.description,
          items: nonEmpty(toTestimonials(stories.docs), d.testimonials.items),
        },
      };
    },
    defaultHome,
  );
});

/* -------------------------------------------------------------------------- */
/* about                                                                      */
/* -------------------------------------------------------------------------- */

export const getAbout = cache(async (): Promise<AboutData> => {
  const draft = await isPreview();
  return safely(
    "about",
    async () => {
      const payload = await getClient();
      const page = (await payload.findGlobal({
        slug: "about-page",
        depth: 2,
        draft,
      })) as AboutPage;
      const d = defaultAbout;

      const careerImages = (page.careers?.images ?? []).flatMap((row) => {
        const image = toImage(row.image);
        return image ? [image] : [];
      });
      const collageImage = toImage(page.collage?.image);
      const portrait = toImage(page.insight?.portrait);

      return {
        seo: {
          title: page.seo?.title || d.seo.title,
          description: page.seo?.description || d.seo.description,
        },
        hero: page.hero?.titleLine1
          ? {
              eyebrow: page.hero.eyebrow,
              titleLine1: page.hero.titleLine1,
              titleLine2: page.hero.titleLine2,
              cta: { label: page.hero.cta.label, href: page.hero.cta.href },
            }
          : d.hero,
        intro: page.intro?.text
          ? {
              text: page.intro.text,
              stats: nonEmpty(
                (page.intro.stats ?? []).map(({ value, label }) => ({ value, label })),
                d.intro.stats,
              ),
            }
          : d.intro,
        careers: page.careers?.titleLine1
          ? {
              title: {
                lead: page.careers.titleLine1,
                emphasis: page.careers.titleEmphasis,
              },
              description: page.careers.description,
              button: {
                label: page.careers.button.label,
                href: page.careers.button.href,
              },
              images: nonEmpty(careerImages, d.careers.images),
            }
          : d.careers,
        beliefs: page.beliefs?.items?.length
          ? {
              title: {
                lead: page.beliefs.titleLead,
                emphasis: page.beliefs.titleEmphasis,
              },
              items: page.beliefs.items.map(({ icon, title, description }) => ({
                icon,
                title,
                description,
              })),
            }
          : d.beliefs,
        collage:
          page.collage?.title && collageImage
            ? {
                image: collageImage,
                title: page.collage.title,
                text: page.collage.text,
              }
            : d.collage,
        insight:
          page.insight?.quote && portrait
            ? {
                title: {
                  lead: page.insight.titleLine1,
                  emphasis: page.insight.titleEmphasis,
                },
                paragraphs: toParagraphs(page.insight.quote),
                authorName: page.insight.authorName,
                authorRole: page.insight.authorRole,
                portrait,
              }
            : d.insight,
      };
    },
    defaultAbout,
  );
});

/* -------------------------------------------------------------------------- */
/* works + careers                                                            */
/* -------------------------------------------------------------------------- */

export const getWorksPage = cache(async (): Promise<WorksPageData> => {
  const draft = await isPreview();
  return safely(
    "works-page",
    async () => {
      const payload = await getClient();
      const [page, works] = await Promise.all([
        payload.findGlobal({
          slug: "works-page",
          depth: 0,
          draft,
        }) as Promise<WorksPage>,
        payload.find({
          collection: "works",
          sort: "order",
          depth: 1,
          limit: 100,
          pagination: false,
        }),
      ]);
      const d = defaultWorksPage;
      return {
        seo: {
          title: page.seo?.title || d.seo.title,
          description: page.seo?.description || d.seo.description,
        },
        title: page.titleLead
          ? { lead: page.titleLead, emphasis: page.titleEmphasis }
          : d.title,
        emptyMessage: page.emptyMessage || d.emptyMessage,
        items: nonEmpty(toWorks(works.docs), d.items),
      };
    },
    defaultWorksPage,
  );
});

export const getWorks = cache(async (): Promise<WorkItem[]> => {
  return safely(
    "works",
    async () => {
      const payload = await getClient();
      const result = await payload.find({
        collection: "works",
        sort: "order",
        depth: 1,
        limit: 100,
        pagination: false,
      });
      return nonEmpty(toWorks(result.docs), defaultWorks);
    },
    defaultWorks,
  );
});

export const getJobs = cache(async (): Promise<JobItem[]> => {
  return safely(
    "jobs",
    async () => {
      const payload = await getClient();
      const open = await payload.find({
        collection: "jobs",
        where: { isOpen: { equals: true } },
        sort: "order",
        depth: 0,
        limit: 50,
        pagination: false,
      });

      if (!open.docs.length) {
        // An empty list is a valid state (all roles closed). Only show the
        // sample roles when no job has ever been created.
        const anyJob = await payload.count({
          collection: "jobs",
          overrideAccess: true,
        });
        return anyJob.totalDocs === 0 ? defaultJobs : [];
      }

      return open.docs.map(
        (doc: Job): JobItem => ({
          id: doc.id,
          title: doc.title,
          type: doc.type,
          description: doc.description as JobItem["description"],
        }),
      );
    },
    defaultJobs,
  );
});

/* -------------------------------------------------------------------------- */
/* careers                                                                    */
/* -------------------------------------------------------------------------- */

export const getCareers = cache(async (): Promise<CareersData> => {
  const draft = await isPreview();
  return safely(
    "careers",
    async () => {
      const payload = await getClient();
      const page = (await payload.findGlobal({
        slug: "careers-page",
        depth: 2,
        draft,
      })) as CareersPage;
      const d = defaultCareers;

      const heroImage = toImage(page.hero?.image);
      const cultureImages = (page.culture?.images ?? []).flatMap((row) => {
        const image = toImage(row.image);
        return image ? [image] : [];
      });
      const departments = (page.application?.departments ?? [])
        .map((row) => row.name)
        .filter(Boolean);

      return {
        seo: {
          title: page.seo?.title || d.seo.title,
          description: page.seo?.description || d.seo.description,
        },
        hero:
          page.hero?.titleLine1 && heroImage
            ? {
                titleLine1: page.hero.titleLine1,
                titleLine2: page.hero.titleLine2,
                titleEmphasis: page.hero.titleEmphasis,
                buttonLabel: page.hero.buttonLabel,
                image: heroImage,
              }
            : d.hero,
        culture:
          page.culture?.titleLead && page.culture.description
            ? {
                title: {
                  lead: page.culture.titleLead,
                  emphasis: page.culture.titleEmphasis,
                },
                description: page.culture.description,
                // The collage needs all three tiles.
                images: cultureImages.length === 3 ? cultureImages : d.culture.images,
              }
            : d.culture,
        openings: page.openings?.titleLead
          ? {
              title: {
                lead: page.openings.titleLead,
                emphasis: page.openings.titleEmphasis,
              },
              emptyMessage: page.openings.emptyMessage || d.openings.emptyMessage,
            }
          : d.openings,
        application: page.application?.text
          ? {
              title: page.application.title,
              text: page.application.text,
              departments: nonEmpty(departments, d.application.departments),
            }
          : d.application,
      };
    },
    defaultCareers,
  );
});

/* -------------------------------------------------------------------------- */
/* clients + media coverage                                                   */
/* -------------------------------------------------------------------------- */

const toCoverage = (docs: MediaCoverage[]): CoverageItem[] =>
  docs.flatMap((doc) => {
    const image = toImage(doc.image);
    if (!image) return [];
    return [
      {
        id: doc.id,
        title: doc.title,
        label: doc.label,
        publishedOn: doc.publishedOn,
        image,
        url: doc.url || undefined,
      },
    ];
  });

export const getClientsPage = cache(async (): Promise<ClientsPageData> => {
  const draft = await isPreview();
  return safely(
    "clients-page",
    async () => {
      const payload = await getClient();
      const [page, clients, coverage] = await Promise.all([
        payload.findGlobal({
          slug: "clients-page",
          depth: 0,
          draft,
        }) as Promise<ClientsPage>,
        payload.find({ collection: "clients", sort: "order", depth: 1, limit: 48, pagination: false }),
        payload.find({ collection: "media-coverage", sort: "order", depth: 1, limit: 48, pagination: false }),
      ]);
      const d = defaultClientsPage;

      return {
        seo: {
          title: page.seo?.title || d.seo.title,
          description: page.seo?.description || d.seo.description,
        },
        clients: {
          title: page.clients?.titleLead
            ? { lead: page.clients.titleLead, emphasis: page.clients.titleEmphasis }
            : d.clients.title,
          description: page.clients?.description || d.clients.description,
          items: nonEmpty(toLogos(clients.docs), d.clients.items),
        },
        coverage: {
          title: page.coverage?.title || d.coverage.title,
          description: page.coverage?.description || d.coverage.description,
          // An empty list is valid once editors have curated it; only fall
          // back to the samples if nothing has ever been created.
          items: nonEmpty(toCoverage(coverage.docs), defaultCoverage),
        },
      };
    },
    defaultClientsPage,
  );
});

/* -------------------------------------------------------------------------- */
/* contact                                                                    */
/* -------------------------------------------------------------------------- */

export const getContactPage = cache(async (): Promise<ContactPageData> => {
  const draft = await isPreview();
  const site = await getSite();
  return safely(
    "contact-page",
    async () => {
      const payload = await getClient();
      const [page, services] = await Promise.all([
        payload.findGlobal({
          slug: "contact-page",
          depth: 1,
          draft,
        }) as Promise<ContactPage>,
        payload.find({ collection: "services", sort: "order", depth: 0, limit: 24, pagination: false }),
      ]);
      const d = defaultContactPage;

      const officeImage = toImage(page.officeImage);
      const options = (page.services ?? []).map((row) => row.name).filter(Boolean);
      const fromServices = services.docs.map((doc) => doc.title);

      return {
        seo: {
          title: page.seo?.title || d.seo.title,
          description: page.seo?.description || d.seo.description,
        },
        title: page.title || d.title,
        // An empty description is a valid choice, so only fall back when unset.
        description: page.description ?? d.description,
        officeImage: officeImage ?? d.officeImage,
        mapEmbedUrl: page.mapQuery ? buildMapEmbedUrl(page.mapQuery) : d.mapEmbedUrl,
        services: options.length
          ? options
          : fromServices.length
            ? [...fromServices, "Other"]
            : d.services,
        contact: site.contact,
      };
    },
    { ...defaultContactPage, contact: site.contact },
  );
});

/* -------------------------------------------------------------------------- */
/* behind the scene                                                           */
/* -------------------------------------------------------------------------- */

const toBts = (docs: BehindTheScene[]): BtsItem[] =>
  docs.flatMap((doc) => {
    const image = toImage(doc.thumbnail);
    if (!image) return [];
    return [
      {
        id: doc.id,
        title: doc.title,
        category: doc.category ?? DEFAULT_WORK_CATEGORY,
        image,
        url: doc.instagramUrl,
      },
    ];
  });

export const getBehindTheScene = cache(
  async (): Promise<BehindTheScenePageData> => {
    const draft = await isPreview();
    return safely(
      "behind-the-scene",
      async () => {
        const payload = await getClient();
        const [page, reels] = await Promise.all([
          payload.findGlobal({
            slug: "behind-the-scene-page",
            depth: 0,
            draft,
          }) as Promise<BehindTheScenePage>,
          payload.find({
            collection: "behind-the-scenes",
            sort: "order",
            depth: 1,
            limit: 100,
            pagination: false,
          }),
        ]);
        const d = defaultBtsPage;
        return {
          seo: {
            title: page.seo?.title || d.seo.title,
            description: page.seo?.description || d.seo.description,
          },
          title: page.title || d.title,
          description: page.description ?? d.description,
          emptyMessage: page.emptyMessage || d.emptyMessage,
          items: nonEmpty(toBts(reels.docs), d.items),
        };
      },
      defaultBtsPage,
    );
  },
);
