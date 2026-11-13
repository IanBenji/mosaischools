# Mosai Schools — Website

Marketing website for **Mosai Schools**, Katabi, Wakiso District, Uganda — a
fast, responsive, SEO-ready single-page application built with
**React 19 + Vite + Tailwind CSS**.

The site presents the school's programs, campuses, gallery and admissions
information to prospective parents, and includes working **contact** and
**admissions enquiry** forms (delivered by EmailJS and protected by hCaptcha).
A full parent/teacher/admin portal is also built but currently disabled — see
[Portal](#️-portal-is-disabled-requires-a-backend) below.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Pages & routes](#pages--routes)
- [Project structure](#project-structure)
- [Form handling & security](#form-handling--security)
- [Portal (disabled)](#️-portal-is-disabled-requires-a-backend)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

- ⚡ **Fast** — Vite build, code-split routes, optimized `.webp` imagery.
- 📱 **Fully responsive** — mobile-first layouts via Tailwind CSS.
- 🔍 **SEO-ready** — canonical URLs, Open Graph / Twitter meta tags,
  `robots.txt`, and `sitemap.xml`.
- ✉️ **Working forms** — contact & admissions enquiries sent through EmailJS,
  no backend required.
- 🛡️ **Spam protection** — hCaptcha, client-side rate limiting, input
  sanitization, and a honeypot field (see [Form handling](#form-handling--security)).
- 🎨 **Polished UX** — custom cursor, scroll restoration, animated sections,
  and a news ticker.
- 🧩 **Portal-ready** — parent/teacher/admin dashboards are scaffolded and
  ready to be wired to a real backend.

---

## Tech stack

| Layer        | Technology                                            |
| ------------ | ----------------------------------------------------- |
| Framework    | [React 19](https://react.dev)                         |
| Build tool   | [Vite 8](https://vite.dev)                            |
| Styling      | [Tailwind CSS 3](https://tailwindcss.com) + PostCSS   |
| Routing      | [React Router 7](https://reactrouter.com)             |
| Icons        | [lucide-react](https://lucide.dev)                    |
| Email        | [@emailjs/browser](https://emailjs.com)               |
| Anti-spam    | [@hcaptcha/react-hcaptcha](https://hcaptcha.com)      |
| Images       | [sharp](https://sharp.pixelplumbing.com) (build-time) |
| Linting      | [ESLint 9](https://eslint.org)                         |

**Requirements:** Node.js **18+** (Vite 8) and npm.

---

## Quick start

```bash
git clone https://github.com/IanBenji/mosaischools.git
cd mosaischools

npm install
cp .env.example .env    # then fill in the values (see below)
npm run dev             # http://localhost:5173
```

The site runs without `.env` values, but the contact/admissions forms will fail
to send until they are configured.

---

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR        |
| `npm run build`   | Production build → `dist/`                 |
| `npm run preview` | Preview the production build locally       |
| `npm run lint`    | Run ESLint over the project                |

---

## Environment variables

The **contact** and **admissions** forms send email through
[EmailJS](https://emailjs.com) and are protected by
[hCaptcha](https://hcaptcha.com). Copy `.env.example` to `.env` and fill in:

| Variable                          | Purpose                                            |
| --------------------------------- | -------------------------------------------------- |
| `VITE_EMAILJS_PUBLIC_KEY`         | EmailJS public key                                 |
| `VITE_EMAILJS_SERVICE_ID`         | EmailJS email service ID                           |
| `VITE_EMAILJS_CONTACT_TEMPLATE`   | Template ID for the contact form                   |
| `VITE_EMAILJS_ADMISSION_TEMPLATE` | Template ID for the admissions form                |
| `VITE_HCAPTCHA_SITE_KEY`          | hCaptcha site key (a test key is set by default)   |
| `VITE_GA_MEASUREMENT_ID`          | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `VITE_SHEET_ANNOUNCEMENTS`        | Published CSV URL for the announcements sheet      |
| `VITE_SHEET_EVENTS`               | Published CSV URL for the term dates sheet         |
| `VITE_SHEET_DOCUMENTS`            | Published CSV URL for the documents sheet          |

Notes:

- All variables are **`VITE_`-prefixed** so they are exposed to the browser at
  build time. Only use values that are safe to be public (EmailJS public keys
  and the hCaptcha site key are designed for client-side use).
- The default `VITE_HCAPTCHA_SITE_KEY` in `.env.example`
  (`10000000-ffff-ffff-ffff-000000000001`) is hCaptcha's **test key** — it
  always passes and must be replaced with a real site key for production.
- `.env` is git-ignored. Never commit real secrets; share config via
  `.env.example` only.
- `VITE_GA_MEASUREMENT_ID` is **optional**. Leave it blank and analytics is
  fully inert — no Google script is loaded and no data leaves the browser.
  To switch it on, create a free GA4 property at
  [analytics.google.com](https://analytics.google.com) → *Admin → Data Streams →
  Web*, copy the Measurement ID, put it in `.env`, and redeploy (the value is
  baked in at build time).

---

## School editable content

Announcements, term dates and downloadable documents are **not** in the code.
Each is read at runtime from a Google Sheet the school publishes as CSV, so the
office can post a notice without a developer or a redeploy. This is the whole
point: a school website nobody can update goes stale within a term.

### One time setup (about 15 minutes)

For each of the three sheets:

1. Get the matching template. Easiest is the **Start from a template** panel on
   [`/admin`](#check-a-file-before-you-publish-it-admin), which offers each one
   with example rows or as headings only. The same files are committed under
   [`docs/sheet-templates/`](docs/sheet-templates). Import it into a new Google
   Sheet (*File → Import → Upload*).
2. Replace the example rows with real data. Keep the header row exactly as it is.
3. *Share → General access → **Anyone with the link → Viewer***. Publishing to
   the web is **not** needed: Google's export endpoint already sends
   `Access-Control-Allow-Origin: *`, so the site can read a link shared sheet
   directly. That removes the fiddliest step of the old instructions.
4. Take the sheet id from its address and put the export link into the matching
   `VITE_SHEET_*` variable in `.env`:
   `https://docs.google.com/spreadsheets/d/<sheet id>/export?format=csv`
   Optionally set the matching `VITE_SHEET_*_EDIT` to the normal editing address,
   which turns the save step on `/admin` into one button.
5. Run `npm run deploy` once. After that, **edits to the sheet appear on the site
   without any redeploy** (within ten minutes, which is how long responses are
   cached).

Leave a variable blank and that dataset quietly falls back to bundled defaults,
so a half finished setup never breaks the site.

### Check a file before you publish it: `/admin`

There is an unlisted staff page at **`/admin`**. Drop in the Excel file or CSV you are about to
import and it will, entirely inside your browser:

- work out which of the three sheets it is, from the column headings
- tell you if a required column is missing or a heading is misspelt
- flag dates it cannot read, including impossible ones such as 31 September, and end dates that
  fall before their start
- flag a campus value it does not recognise, since a typo there hides the entry completely
- flag links that will not open, and Google Drive links that preview rather than download
- warn about entries that have already expired or passed, so their absence is not a surprise
- **preview every entry exactly as parents will see it**, with a switch between the two campuses
- offer a tidied copy of the file, with the columns in the expected order
- hand out a blank or worked template to start from, for any of the three sheets,
  as a real **Excel workbook** or as CSV

Templates are **generated from the same `SCHEMAS` the validator checks against**
(`src/lib/validateSheet.js`), so a template can never drift out of step with what
the site reads. The copies in `docs/sheet-templates/` are generated from that same
source; edit the schema, not the CSV files.

The Excel workbooks come with the heading row frozen and the columns sized. One
thing in there is deliberate and worth not "fixing": **date columns are written as
text, not as Excel date cells** (`src/lib/templateFile.js`). A real Excel date is
displayed in the machine's locale, so a workbook edited on a US configured laptop
returns `9/7/2026`, which our day first parser would read as 9 July rather than
7 September. Excel dates are also stored as timezone free serial numbers that
shift by the reader's offset when converted back. Text has neither problem. The
only cost is that Excel will not offer a date picker on those columns.

It also carries the office's recurring routine, so nobody has to remember it:

- an **Open the {sheet} sheet** button, so the office never hunts for the right
  spreadsheet. Set the three links in `.env` as `VITE_SHEET_ANNOUNCEMENTS_EDIT`,
  `VITE_SHEET_EVENTS_EDIT` and `VITE_SHEET_DOCUMENTS_EDIT`, or let staff paste a
  link once from the page itself, which is remembered in that browser
- a **Print these steps** button producing a one page guide for the office wall,
  written for someone who does not use computers much. It is the only thing that
  appears when the page is printed

It writes nothing and uploads nothing. It is a second pair of eyes before the import, not a
publishing tool. The save step is the Google Sheets import, and the page now says so plainly rather
than leaving people hunting for a Save button. The page is not linked from the site, is disallowed in `robots.txt`, sets a
`noindex` tag, and is code split so no visitor ever downloads it. Anyone who knows the address can
open it, but since it only reads a file you give it, there is nothing there to misuse.

### The sheets

| Sheet | Feeds | Key columns |
| ----- | ----- | ----------- |
| Announcements | `/news`, the home page strip, the scrolling ticker | `date`, `title`, `body`, `category`, `ticker`, `campus`, `pinned`, `expires`, `link` |
| Events        | `/calendar`, plus "Coming up" on `/news`           | `start`, `end`, `time`, `endtime`, `title`, `details`, `location`, `type`, `campus` |
| Documents     | `/downloads`                                       | `title`, `description`, `category`, `url`, `filetype`, `size`, `updated`, `campus` |

Conventions that apply to all three:

- **`campus`** — `nalugala`, `bunono`, or blank/`all` for both. Blank is the
  forgiving default, because the office will leave it empty most of the time.
- **Dates** — `2026-09-07`, `07/09/2026` and `7 September 2026` all work. Dates
  are read as local time, so an event never slips to the previous day.
- **Times** — optional. `09:00`, `9:00` and `2:30 pm` all work. Uganda is UTC+3
  year round with no daylight saving, which is what keeps the `.ics` export
  simple and correct.
- **`expires`** — an announcement disappears by itself after this date. Use it
  and old notices stop piling up.
- Column headings are matched loosely: `Start Date`, `start_date` and `startdate`
  are the same column, and several names are accepted for the same field.

### Why `/calendar` and `/downloads` start empty

Announcements ship with a fallback because those three notices were already
published on the site. Term dates and document links deliberately do **not**:
inventing plausible looking dates would put information in front of parents that
the school never approved, and parents act on term dates. Both pages render a
proper empty state, pointing at the phone number, until the school fills its
sheet.

---

## Analytics

Google Analytics 4, wired up in [`src/lib/analytics.js`](src/lib/analytics.js)
and [`src/components/RouteAnalytics.jsx`](src/components/RouteAnalytics.jsx).

Because this is a single-page app, page views are sent manually on every React
Router navigation (`send_page_view: false` + an explicit `page_view` event) —
otherwise the school would only ever see a hit on the home page. IP addresses
are anonymised. `trackEvent()` is also used for a couple of meaningful actions
(WhatsApp button taps, donation enquiries).

Analytics reports are **aggregate and anonymous**: visitor counts, pages,
country/city, device, and traffic source. They cannot identify an individual
visitor. This is explained to visitors in section 5 of the Privacy Policy page.

---

## Pages & routes

| Route          | Page         | Description                                  |
| -------------- | ------------ | -------------------------------------------- |
| `/`            | Home         | Hero, programs, stats, school life, CTA      |
| `/about`       | About        | Mission, history, leadership                 |
| `/programs`    | Programs     | Academic programs & levels                   |
| `/admissions`  | Admissions   | Enquiry form + admissions info               |
| `/scholarships`| Scholarships | Purpose, eligibility, selection, application |
| `/donate`      | Donate       | Why give, impact, ways to give, enquiry form |
| `/news`        | News         | Announcements, school editable (see below)   |
| `/calendar`    | Calendar     | Term dates and events, with .ics download    |
| `/downloads`   | Downloads    | Fee structure, forms, requirements lists     |
| `/gallery`     | Gallery      | Photo gallery                                |
| `/contact`     | Contact      | Contact form, map & details                  |
| `/privacy`     | Privacy      | Privacy policy                               |
| `/terms`       | Terms        | Terms of service                             |
| `*`            | NotFound     | 404 fallback                                 |

Routing is defined in [`src/App.jsx`](src/App.jsx). The public site is wrapped
with a shared `Navbar` and `Footer`; the (disabled) portal routes live in a
commented block in the same file.

---

## Project structure

```
src/
  pages/        Public pages (Home, About, Programs, Admissions,
                Scholarships, Donate, Gallery, Contact, Privacy, Terms,
                NotFound) — each with a bespoke *Bunono.jsx variant
  sections/     Home-page sections (Hero, Programs, Stats, SchoolLife,
                WhyChooseUs, Campuses, Testimonial, CTABanner, Announcements)
  components/   Navbar, Footer, Button, CustomCursor, NewsTicker,
                WhatsAppButton, RouteAnalytics, PageHeader, Doodles,
                WaveDivider, PhotoBand, LoginModal, ScrollToTop,
                ScrollRestoration, ProtectedRoute
  context/      CampusContext (active campus), AuthContext (disabled portal)
  dashboards/   Parent / Teacher / Admin portal (DISABLED — see below)
  lib/          campus (per-campus content), giving (scholarship + donation
                copy), fees, analytics, formSecurity
  assets/       Images (.webp), SVGs
public/         favicon, robots.txt, sitemap.xml
index.html      App entry + SEO/meta tags
```

---

## Form handling & security

Forms are submitted entirely client-side via EmailJS, with several layers of
abuse protection (see [`src/lib/formSecurity.js`](src/lib/formSecurity.js)):

- **hCaptcha** — a challenge must be solved before submission.
- **Rate limiting** — max **3 submissions per hour** per browser, tracked in
  `localStorage`.
- **Sanitization** — HTML tags are stripped and input length is capped to
  prevent injection and oversized payloads.
- **Honeypot** — a hidden field that real users never fill in; bots that do are
  rejected.

Because protection is client-side, treat it as defense-in-depth rather than a
guarantee. Configure EmailJS allowed-origins and hCaptcha for stronger
server-side enforcement.

---

## ⚠️ Portal is disabled (requires a backend)

The **login** page and the **parent / teacher / admin dashboards** are built
but currently run on **mock / `localStorage` data only** — there is no real
authentication or database. They are commented out until a backend is added:

- Routes — see the commented block in [`src/App.jsx`](src/App.jsx)
- "Portal Login" UI — see the commented block in [`src/components/Navbar.jsx`](src/components/Navbar.jsx)

The scaffolded dashboards include:

- **Admin** — students, teachers, admissions, payments, reports,
  announcements, settings
- **Teacher** — my students, mark attendance, upload results, messages,
  post announcements
- **Parent** — child profile, attendance, reports, messages, payments,
  announcements

To re-enable once a backend exists, restore those commented sections and wire
`AuthContext` / `ProtectedRoute` to your real auth API.

The newsletter signup in the footer is likewise disabled (it needs a mailing-list
service); it currently links to an email instead.

---

## Deployment

This is a single-page app using client-side routing, served as static files
from `dist/` after `npm run build`.

- **SPA fallback:** configure your host to **rewrite all routes to
  `/index.html`** (e.g. Netlify `_redirects`, Vercel rewrites, or an Nginx
  `try_files` fallback) so deep links don't 404.
- **Domain/SEO:** update the domain in `public/robots.txt`,
  `public/sitemap.xml`, and the canonical / Open Graph URLs in `index.html` if
  it isn't `www.mosaischools.ug`.
- **Link previews:** add a `public/og-image.jpg` (1200×630) for rich previews —
  referenced by the Open Graph / Twitter tags in `index.html`.
- **Environment:** set the `VITE_*` variables in your host's build settings so
  they're baked into the production build.

---

## Contributing

```bash
# work on a branch, then
git add -A
git commit -m "describe your change"
git push
```

Run `npm run lint` before committing. Keep secrets out of the repo — use `.env`
locally and document new variables in `.env.example`.
