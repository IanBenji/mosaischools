# MOSAI Schools — Website

Marketing website for **MOSAI Schools**, Katabi, Wakiso District, Uganda — a
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

Notes:

- All variables are **`VITE_`-prefixed** so they are exposed to the browser at
  build time. Only use values that are safe to be public (EmailJS public keys
  and the hCaptcha site key are designed for client-side use).
- The default `VITE_HCAPTCHA_SITE_KEY` in `.env.example`
  (`10000000-ffff-ffff-ffff-000000000001`) is hCaptcha's **test key** — it
  always passes and must be replaced with a real site key for production.
- `.env` is git-ignored. Never commit real secrets; share config via
  `.env.example` only.

---

## Pages & routes

| Route          | Page         | Description                                  |
| -------------- | ------------ | -------------------------------------------- |
| `/`            | Home         | Hero, programs, stats, school life, CTA      |
| `/about`       | About        | Mission, history, leadership                 |
| `/programs`    | Programs     | Academic programs & levels                   |
| `/admissions`  | Admissions   | Enquiry form + admissions info               |
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
                Gallery, Contact, Privacy, Terms, NotFound)
  sections/     Home-page sections (Hero, Programs, Stats, SchoolLife,
                WhyChooseUs, Campuses, Testimonial, CTABanner, Announcements)
  components/   Navbar, Footer, Button, CustomCursor, NewsTicker,
                LoginModal, ScrollToTop, ScrollRestoration, ProtectedRoute
  context/      AuthContext (used only by the disabled portal)
  dashboards/   Parent / Teacher / Admin portal (DISABLED — see below)
  lib/          formSecurity (rate-limit, sanitize helpers)
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
