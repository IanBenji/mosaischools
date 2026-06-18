# MOSAI Schools — Website

Marketing website for **MOSAI Schools**, Katabi, Wakiso District, Uganda.
Built with **React 19 + Vite + Tailwind CSS**.

---

## Quick start

```bash
npm install
cp .env.example .env   # then fill in the values (see below)
npm run dev            # http://localhost:5173
```

### Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR        |
| `npm run build`   | Production build → `dist/`                |
| `npm run preview` | Preview the production build locally      |
| `npm run lint`    | Run ESLint                                |

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

> Without these, the forms render but submissions will fail.

---

## Project structure

```
src/
  pages/        Public pages (Home, About, Programs, Admissions,
                Gallery, Contact, Privacy, Terms, NotFound)
  sections/     Home-page sections (Hero, Programs, Stats, etc.)
  components/   Navbar, Footer, shared UI
  context/      AuthContext (used only by the disabled portal)
  dashboards/   Parent / Teacher / Admin portal (DISABLED — see below)
  lib/          formSecurity (rate-limit, sanitize, honeypot helpers)
public/         favicon, robots.txt, sitemap.xml
```

---

## ⚠️ Portal is disabled (requires a backend)

The **login** page and the **parent / teacher / admin dashboards** are built
but currently run on **mock / `localStorage` data only** — there is no real
authentication or database. They are commented out until a backend is added:

- Routes — see the commented block in [`src/App.jsx`](src/App.jsx)
- "Portal Login" UI — see the commented block in [`src/components/Navbar.jsx`](src/components/Navbar.jsx)

To re-enable once a backend exists, restore those commented sections and wire
`AuthContext` / `ProtectedRoute` to your real auth API.

The newsletter signup in the footer is likewise disabled (it needs a mailing-list
service); it currently links to an email instead.

---

## Deployment notes

- This is a single-page app using client-side routing. Configure your host to
  **rewrite all routes to `/index.html`** (e.g. Netlify `_redirects`, Vercel
  rewrites, or an Nginx `try_files` fallback) so deep links don't 404.
- Update the domain in `public/robots.txt`, `public/sitemap.xml`, and the
  canonical / Open Graph URLs in `index.html` if it isn't `www.mosaischools.ug`.
- Add a `public/og-image.jpg` (1200×630) for rich link previews — referenced by
  the Open Graph / Twitter tags in `index.html`.
