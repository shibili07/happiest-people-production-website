# Content management (Payload CMS + MongoDB)

The website content is edited in **Payload CMS**, which runs inside this same
Next.js project and stores everything in **MongoDB**. There is no separate
backend to deploy.

| What                | Where                                   |
| ------------------- | --------------------------------------- |
| Admin panel         | `/admin`                                |
| REST API            | `/api/<collection>` (e.g. `/api/works`) |
| GraphQL             | `/api/graphql`                          |
| CMS configuration   | `src/payload.config.ts`                 |
| Collections         | `src/collections/`                      |
| Pages & settings    | `src/globals/`                          |
| Website data layer  | `src/lib/cms/`                          |
| Built-in content    | `src/lib/cms/defaults.ts`               |

## First-time setup

1. **Start MongoDB.** Use a local instance or a MongoDB Atlas cluster. If the
   MongoDB Windows service will not start (it needs admin rights), run a
   throwaway instance with a project-local data folder instead:

   ```bash
   mkdir -p .data/mongo
   "C:/Program Files/MongoDB/Server/8.3/bin/mongod.exe" --dbpath .data/mongo
   ```

2. **Create `.env`** from the template and fill it in:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URI`: MongoDB connection string (local default is
     `mongodb://127.0.0.1:27017/hpp-cms`).
   - `PAYLOAD_SECRET`: a long random string (`openssl rand -hex 32`).

3. **Install and load the starting content:**

   ```bash
   npm install
   npm run seed
   ```

   The seed copies the content that was previously hard-coded in the website
   (works, services, clients, testimonials, job openings, page texts and
   images) into the CMS. It only fills sections that are still empty, so it is
   safe to run again. `SEED_FORCE=1 npm run seed` overwrites everything.

4. **Run the site:** `npm run dev`, then open
   <http://localhost:3000/admin>.

   - If `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set in `.env`,
     `npm run seed` creates that admin user for you. Use a strong password
     anywhere that is not your own machine.
   - Otherwise the first visit shows a "create first user" screen, and that
     first account becomes an `admin`.

## What editors can change

| Section (admin sidebar)  | Controls                                                                  |
| ------------------------ | ------------------------------------------------------------------------- |
| **Pages → Home page**    | Hero, section headings, about text and stats, studio gallery, SEO         |
| **Pages → About page**   | Hero, intro, careers invite, vision/mission, collage, founder note, SEO   |
| **Pages → Works page**   | Heading and empty-category message; each film's tab is its **Category** under Works |
| **Pages → Behind the scene page** | Heading and intro text; the reels are under **Portfolio → Behind the scenes** |
| **Portfolio → Behind the scenes** | Instagram reels: cover image, Instagram link, category tab, order |
| **Pages → Contact page** | Office and map photos, services dropdown options (address, phone and email come from Site settings) |
| **Pages → Careers page** | Hero, culture photos, openings heading, application form text and departments |
| **Pages → Clients page** | Headings for the client logos and media coverage                          |
| **Portfolio → Media coverage** | Press articles/reviews on `/clients` (publication, date, image, optional link) |
| **Portfolio → Works**    | Films shown on `/works`; tick "Feature on home page" for the home page    |
| **Content**              | Services, Testimonials, Clients (logo grid, used on Home and Clients), Brands (logo strip) |
| **Careers → Job openings** | Roles on `/careers`; untick "Accepting applications" to hide a role     |
| **Library → Media**      | All images (alt text is required)                                         |
| **Settings → Site settings** | Header menu, footer links, contact details, social links, closing banner |
| **Settings → Users**     | Admins manage users; editors can only edit content                        |

## Live preview

Every editable page opens with a **live preview** next to the form, with
mobile, tablet and laptop sizes.

- **Home, About, Works, Behind the scene, Careers, Clients and Contact pages and Site settings** autosave a *draft* as you type and
  the preview updates by itself. Visitors keep seeing the published version
  until you click **Publish changes**. Use the Versions tab to restore an
  earlier version.
- **Works, Services, Testimonials, Clients, Brands and Job openings** refresh
  the preview when you click **Save**.
- The preview is only available to signed-in editors (`/preview` checks your
  admin session). Click **Exit** in the preview pill, or open `/preview/exit`,
  to leave preview mode in your browser. Use the eye icon in the editor to hide
  or show the preview pane.

Saving content refreshes the affected pages immediately. Pages are otherwise
cached and re-checked every 60 seconds.

If a list is completely empty (for example no testimonials yet) the site shows
its built-in sample content for that block. If MongoDB cannot be reached the
whole site renders from the built-in content instead of failing.

## Everyday commands

```bash
npm run dev               # site + admin on http://localhost:3000
npm run seed              # load starting content into empty sections
npm run generate:types    # regenerate src/payload-types.ts after changing a collection
npm run generate:importmap  # after adding custom admin components
```

## Adding a new editable field

1. Add the field to the collection or global in `src/collections/` or
   `src/globals/`.
2. Run `npm run generate:types`.
3. Map it in `src/lib/cms/index.ts` (and give it a default in
   `src/lib/cms/defaults.ts`), then use it in the widget.

## Admin panel design

The admin matches the website (black surfaces, yellow accent, Figtree).

- Styles: `src/app/(payload)/custom.scss`. Keep it a single file — Turbopack
  does not hot-reload Sass partials.
- Custom screens and parts live in `src/components/payload/`: `Dashboard`
  (admin home), `NavHome` / `NavLive` (sidebar), `ViewSite` (top bar),
  `LoginIntro` and `Logo` (sign-in). They are registered in
  `src/payload.config.ts`; run `npm run generate:importmap` after adding one.
- Sidebar icons are set per link in `custom.scss` (`$nav-icons`, keyed by the
  collection or global slug). Add an entry there when you add a collection.

## Deploying

- Set `DATABASE_URI`, `PAYLOAD_SECRET` and `NEXT_PUBLIC_SERVER_URL` in the
  hosting provider's environment.
- **Uploads are stored on disk** in `/media` (git-ignored). Serverless hosts
  such as Vercel have no persistent disk, so add a Payload storage adapter
  (S3, Vercel Blob, Cloudflare R2, ...) before going live there. On a VPS or
  container with a persistent volume, mount `/media` and nothing else changes.
- Run `npm run seed` once against the production database to load the starting
  content, then create the first admin at `/admin`.
- Restrict the MongoDB user to this database and allow-list the server's IP.
