import React from "react";
import Link from "next/link";
import { Gutter } from "@payloadcms/ui";
import type { Payload } from "payload";

import { AdminIcon, iconNameFor } from "./icons";

type Entity = { slug: string; type: string; label: unknown };
type NavGroup = { label: unknown; entities: Entity[] };

type DashboardProps = {
  payload: Payload;
  navGroups?: NavGroup[];
  user?: { name?: unknown; email?: string } | null;
};

const GROUP_ORDER = [
  "Pages",
  "Portfolio",
  "Content",
  "Careers",
  "Library",
  "Settings",
];

const text = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const relativeTime = (iso?: string | null) => {
  if (!iso) return "";
  const diff = new Date(iso).getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86_400_000],
    ["hour", 3_600_000],
    ["minute", 60_000],
  ];
  for (const [unit, ms] of units) {
    if (Math.abs(diff) >= ms) return rtf.format(Math.round(diff / ms), unit);
  }
  return "just now";
};

type PageCard = {
  slug: string;
  label: string;
  description: string;
  status: "published" | "draft" | null;
  updatedAt: string | null;
};

type Recent = {
  id: string;
  slug: string;
  collection: string;
  title: string;
  updatedAt: string;
};

/** Custom admin home: quick stats, the site's pages, and recent edits. */
export const Dashboard = async ({
  payload,
  navGroups = [],
  user,
}: DashboardProps) => {
  const { config } = payload;
  const entities = navGroups.flatMap((group) =>
    group.entities.map((entity) => ({
      ...entity,
      group: text(group.label),
    })),
  );
  const collections = entities.filter((e) => e.type === "collections");
  // Content pages first, then settings.
  const globals = entities
    .filter((e) => e.type === "globals")
    .sort((a, b) => Number(b.group === "Pages") - Number(a.group === "Pages"));

  const describe = (slug: string, kind: "collections" | "globals") => {
    const entry = (
      kind === "collections" ? config.collections : config.globals
    ).find((item) => item.slug === slug);
    return text(entry?.admin?.description);
  };

  const titleField = (slug: string) =>
    config.collections.find((c) => c.slug === slug)?.admin?.useAsTitle;

  // ---- data (every call is guarded so the dashboard never breaks) ----------
  const safe = async <T,>(run: () => Promise<T>, fallback: T): Promise<T> => {
    try {
      return await run();
    } catch {
      return fallback;
    }
  };

  const counts = Object.fromEntries(
    await Promise.all(
      collections.map(async ({ slug }) => [
        slug,
        await safe(
          async () =>
            (
              await payload.count({
                collection: slug as never,
                user: user as never,
                overrideAccess: false,
              })
            ).totalDocs,
          null as number | null,
        ),
      ]),
    ),
  ) as Record<string, number | null>;

  const openRoles = collections.some((c) => c.slug === "jobs")
    ? await safe(
        async () =>
          (
            await payload.count({
              collection: "jobs" as never,
              where: { isOpen: { equals: true } },
            })
          ).totalDocs,
        null as number | null,
      )
    : null;

  const pages: PageCard[] = await Promise.all(
    globals.map(async ({ slug, label }) => {
      const doc = await safe(
        async () =>
          (await payload.findGlobal({
            slug: slug as never,
            depth: 0,
            draft: true,
          })) as unknown as { _status?: string; updatedAt?: string },
        null,
      );
      const status =
        doc?._status === "published" || doc?._status === "draft"
          ? doc._status
          : null;
      return {
        slug,
        label: text(label, slug),
        description: describe(slug, "globals"),
        status,
        updatedAt: doc?.updatedAt ?? null,
      };
    }),
  );

  const recent: Recent[] = (
    await Promise.all(
      collections.map(({ slug, label }) =>
        safe(async () => {
          const result = await payload.find({
            collection: slug as never,
            depth: 0,
            limit: 3,
            sort: "-updatedAt",
            user: user as never,
            overrideAccess: false,
          });
          const field = titleField(slug);
          return (result.docs as unknown as Record<string, unknown>[]).map(
            (doc) => ({
              id: String(doc.id),
              slug,
              collection: text(label, slug),
              title: text(
                field ? doc[field] : undefined,
                text(doc.filename, text(doc.title, `Untitled ${text(label)}`)),
              ),
              updatedAt: text(doc.updatedAt),
            }),
          );
        }, [] as Recent[]),
      ),
    )
  )
    .flat()
    .filter((item) => item.updatedAt)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 6);

  const name = text(user?.name).split(" ")[0] || null;
  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  // ---- stat tiles -----------------------------------------------------------
  const stats = [
    { slug: "works", label: "Films", value: counts.works },
    {
      slug: "behind-the-scenes",
      label: "Behind-the-scene reels",
      value: counts["behind-the-scenes"],
    },
    {
      slug: "media-coverage",
      label: "Press features",
      value: counts["media-coverage"],
    },
    {
      slug: "testimonials",
      label: "Client stories",
      value: counts.testimonials,
    },
    { slug: "jobs", label: "Open roles", value: openRoles ?? counts.jobs },
    { slug: "media", label: "Media files", value: counts.media },
  ].filter((stat) => stat.value !== undefined && stat.value !== null);

  // ---- collection sections, in a sensible order -----------------------------
  const sections = [...new Set(collections.map((c) => c.group))]
    .sort(
      (a, b) =>
        (GROUP_ORDER.indexOf(a) + 1 || 99) - (GROUP_ORDER.indexOf(b) + 1 || 99),
    )
    .map((group) => ({
      group,
      items: collections.filter((c) => c.group === group),
    }));

  return (
    <Gutter className="hpp-dash">
      <header className="hpp-dash__hero">
        <div className="hpp-dash__hero-copy">
          <p className="hpp-dash__eyebrow">
            <span className="hpp-dash__pulse" aria-hidden="true" />
            {today}
          </p>
          <h1 className="hpp-dash__title">
            {greeting()}
            {name ? `, ` : ""}
            {name && <em>{name}</em>}
          </h1>
          <p className="hpp-dash__lead">
            Edit the website here. Pages show a live preview beside the form —
            click <strong>Publish changes</strong> to put an edit on the site.
            Films, press, roles and other lists go live as soon as you save.
          </p>
        </div>
        <div className="hpp-dash__hero-actions">
          <a
            className="hpp-btn hpp-btn--primary"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View live site
            <AdminIcon name="external" size={16} />
          </a>
          {collections.some((c) => c.slug === "media") && (
            <Link
              className="hpp-btn hpp-btn--ghost"
              href="/admin/collections/media"
            >
              <AdminIcon name="media" size={16} />
              Media library
            </Link>
          )}
        </div>
      </header>

      {stats.length > 0 && (
        <ul className="hpp-dash__stats">
          {stats.map((stat) => (
            <li key={stat.slug}>
              <Link
                href={`/admin/collections/${stat.slug}`}
                className="hpp-stat"
              >
                <span className="hpp-stat__icon">
                  <AdminIcon name={iconNameFor(stat.slug)} size={18} />
                </span>
                <span className="hpp-stat__value">{stat.value}</span>
                <span className="hpp-stat__label">{stat.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="hpp-dash__layout">
        <div className="hpp-dash__main">
          {pages.length > 0 && (
            <section className="hpp-section">
              <div className="hpp-section__head">
                <h2 className="hpp-section__title">Pages &amp; settings</h2>
                <p className="hpp-section__hint">
                  Click a page to edit its text and images.
                </p>
              </div>
              <ul className="hpp-pages">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/admin/globals/${page.slug}`}
                      className="hpp-page"
                    >
                      <span className="hpp-page__icon">
                        <AdminIcon name={iconNameFor(page.slug)} size={20} />
                      </span>
                      <span className="hpp-page__body">
                        <span className="hpp-page__name">{page.label}</span>
                        {page.description && (
                          <span className="hpp-page__desc">
                            {page.description}
                          </span>
                        )}
                        <span className="hpp-page__meta">
                          {page.status && (
                            <span
                              className={`hpp-chip hpp-chip--${page.status}`}
                            >
                              {page.status === "published"
                                ? "Published"
                                : "Unpublished changes"}
                            </span>
                          )}
                          {page.updatedAt && (
                            <span className="hpp-page__time">
                              Edited {relativeTime(page.updatedAt)}
                            </span>
                          )}
                        </span>
                      </span>
                      <AdminIcon
                        name="arrow"
                        size={18}
                        className="hpp-page__go"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="hpp-section">
            <div className="hpp-section__head">
              <h2 className="hpp-section__title">Lists &amp; library</h2>
              <p className="hpp-section__hint">
                Open a list to edit it, or use + to add a new entry.
              </p>
            </div>
            <div className="hpp-groups">
              {sections.map(({ group, items }) => (
                <div className="hpp-group" key={group}>
                  <h3 className="hpp-group__title">{group}</h3>
                  <ul className="hpp-collections">
                    {items.map((item) => (
                      <li className="hpp-collection" key={item.slug}>
                        <Link
                          href={`/admin/collections/${item.slug}`}
                          className="hpp-collection__main"
                        >
                          <span className="hpp-collection__icon">
                            <AdminIcon
                              name={iconNameFor(item.slug)}
                              size={18}
                            />
                          </span>
                          <span className="hpp-collection__body">
                            <span className="hpp-collection__name">
                              {text(item.label, item.slug)}
                            </span>
                            <span className="hpp-collection__desc">
                              {describe(item.slug, "collections")}
                            </span>
                          </span>
                          {typeof counts[item.slug] === "number" && (
                            <span className="hpp-collection__count">
                              {counts[item.slug]}
                            </span>
                          )}
                        </Link>
                        <Link
                          href={`/admin/collections/${item.slug}/create`}
                          className="hpp-collection__add"
                          aria-label={`Add new ${text(item.label, item.slug)}`}
                          title="Add new"
                        >
                          <AdminIcon name="plus" size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="hpp-dash__side">
          <section className="hpp-panel">
            <h2 className="hpp-panel__title">
              <AdminIcon name="clock" size={16} />
              Recently updated
            </h2>
            {recent.length > 0 ? (
              <ul className="hpp-recent">
                {recent.map((item) => (
                  <li key={`${item.slug}-${item.id}`}>
                    <Link
                      href={`/admin/collections/${item.slug}/${item.id}`}
                      className="hpp-recent__item"
                    >
                      <span className="hpp-recent__title">{item.title}</span>
                      <span className="hpp-recent__meta">
                        {item.collection} · {relativeTime(item.updatedAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="hpp-panel__empty">Nothing edited yet.</p>
            )}
          </section>

          <section className="hpp-panel hpp-panel--tips">
            <h2 className="hpp-panel__title">
              <AdminIcon name="check" size={16} />
              How publishing works
            </h2>
            <ol className="hpp-steps">
              <li>
                <strong>Pages</strong> — edit, check the live preview, then{" "}
                <em>Publish changes</em>. Drafts autosave and stay private.
              </li>
              <li>
                <strong>Lists</strong> (films, press, roles) — go live the
                moment you click <em>Save</em>.
              </li>
              <li>
                <strong>Images</strong> — add them to the Media library with alt
                text first.
              </li>
            </ol>
          </section>
        </aside>
      </div>
    </Gutter>
  );
};
