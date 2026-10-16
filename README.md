# Folioblox — portfolio-app

The portfolio site for Folioblox, an independent full-stack developer. It's a single-page React application with client-side routing, an editorial dark theme with blue accents, data-driven projects and services, and a contact form backed by a small serverless function.

**Stack:** React 19 · Vite 8 · React Router 7 · Tailwind CSS 4 · Framer Motion · Lucide icons · Playwright.

## Quick start

```sh
npm install
cp .env.example .env.local   # fill in what you have; empty values are hidden on the site
npm run dev                  # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/`, including `robots.txt` and, when `VITE_SITE_URL` is set, `sitemap.xml` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test:e2e` | Playwright suite. Starts its own dev server on port 5174 and needs Google Chrome installed |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: hero, selected work, technical expertise, services, process, experience (once added), about, technologies, contact CTA |
| `/about` | Approach, principles, ongoing exploration (the lab) |
| `/services`, `/services/:slug` | All services, plus one page per service (8 in total) |
| `/projects`, `/projects/:slug` | Filterable project list and full case studies |
| `/process` | Scroll-driven walkthrough of how projects run |
| `/experience` | Verified roles (when added), areas of practice, ways to work together |
| `/contact` | Contact form and FAQ |
| anything else | 404 page with links back into the site (marked `noindex`) |

Every route except Home is lazy-loaded.

## Making it yours

Personal details are never hard-coded. Anything not provided is hidden rather than shown as a placeholder.

1. **Identity and links:** set these in `.env.local`, or in your host's environment settings for production:

   | Variable | Used for |
   | --- | --- |
   | `VITE_SITE_URL` | Production origin with no trailing slash, e.g. `https://www.example.dev`. Enables canonical URLs, absolute social-image URLs and `sitemap.xml` |
   | `VITE_OWNER_NAME` | Hero greeting and footer copyright |
   | `VITE_LOCATION` | Location line (defaults to "Remote · Working worldwide") |
   | `VITE_CONTACT_EMAIL` | Footer email, contact fallback and error messages |
   | `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_X_URL` | Profile links in the hero and footer (must be `https://`) |
   | `VITE_RESUME_URL` | "Download CV" link in the footer, e.g. `/resume/cv.pdf` (put the file in `public/resume/`) |
   | `VITE_CONTACT_ENDPOINT` | Where the form posts. Use `/api/contact` for the bundled function |

   Every `VITE_` variable ends up in public JavaScript, so never put secrets in them.

2. **Projects:** edit `src/data/projects.js` for card-level fields and `src/data/caseStudies.js` for the long-form case study, keyed by the same `kind`. The comment at the top of `projects.js` is a copy-ready template. Supported fields:
   - `status`: `live`, `in-progress` or `concept`
   - `liveUrl` and `repoUrl`: hidden when empty
   - `thumbnail` and `images`: screenshots, which replace the illustrative mock-up. Put them in `public/images/projects/`, preferably as WebP, and include `width`, `height` and descriptive `alt` text
   - `contributions` and `decisions`
   - `results`: verified results only
   - `draft: true`: keeps a project off the site while you write it up

   The four current projects are self-initiated **concept studies** and are labelled as such everywhere. Replace or supplement them with real work. Filters on `/projects` only show categories that have at least one project.

3. **Experience:** add verified roles to `experience` in `src/data/experience.js`. The homepage Experience section and the timeline on `/experience` appear automatically once there's at least one entry.

4. **Testimonials and awards:** `src/data/testimonials.js` and `src/data/awards.js` are intentionally empty, and their sections stay hidden until you add entries. Only add quotes you have permission to publish, and awards you can verify.

5. **Brand:** the "FOLIOBLOX" wordmark appears in `src/config/site.js`, the navbar, the footer and `index.html`. The social-preview image is `public/social-preview.png` (1200×630). The favicon is `public/favicon.svg`, with PNG icons alongside it.

## Design system

All colours are tokens in the `@theme` block at the top of `src/index.css`. Tailwind exposes each one as a utility, e.g. `bg-surface`, `text-accent-soft`, `border-line`.

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#17191D` | Page background |
| `surface` / `surface-raised` | `#22252B` / `#2B2F36` | Alternating sections, cards |
| `line` | `#363B45` | Borders |
| `accent` | `#2563EB` | Buttons, active states, focus rings, bars, glows (white text on it is 5.2:1) |
| `accent-deep` | `#1D4ED8` | Hover fills, and blue text on light sections (6.0:1) |
| `accent-soft` | `#6B9AF2` | Blue **text and icons** on dark backgrounds (6.3:1 on `background`) |
| `text` / `muted` | `#F1F3F5` / `#A7ADB7` | Body text and secondary text on dark (muted is 7.8:1) |
| `light` / `mid` | `#F1F3F5` / `#D9DEE5` | Light sections (contact) and light mock-ups |
| `ink` / `ink-muted` | `#252932` / `#4B5260` | Text on light backgrounds |
| `danger` | `#B42318` | Form errors only |

Typography uses DM Sans for body text and Space Grotesk for display text. Both load as variable fonts from Google Fonts, with `preconnect` and `display=swap`. Use `accent` for fills and `accent-soft` for text: `#2563EB` text on the dark grey fails WCAG contrast.

## Contact form

The form collects name, email, subject and message. The same rules in `src/utils/contactValidation.js` validate it in the browser and on the server. A hidden honeypot field catches simple bots. The form only reports success after the endpoint returns a 2xx response.

How the form behaves depends on configuration:

| Configuration | Behaviour |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` set | Posts JSON and shows sending, sent and error states. Server-side field errors are mapped back onto the inputs |
| No endpoint, `VITE_CONTACT_EMAIL` set | Opens the visitor's email app with the message pre-filled, and says so plainly |
| Neither | Shows a short "online enquiries are paused" notice instead of the form |

### Bundled endpoint (Vercel + Resend)

`api/contact.js` is a Vercel Node.js function. It accepts only `POST` with JSON, checks the optional origin allow-list, rate-limits each IP to 5 requests per 10 minutes, revalidates input, drops honeypot hits silently, and sends a plain-text email through [Resend](https://resend.com)'s HTTP API with `reply_to` set to the visitor's address.

1. Create a Resend account. The free tier is enough for a portfolio. Verify your sending domain.
2. In the Vercel project settings, add these server-side environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`, the inbox that receives enquiries
   - `CONTACT_FROM_EMAIL`, e.g. `Folioblox <hello@your-domain.com>` on the verified domain
   - `CONTACT_ALLOWED_ORIGIN` (optional), e.g. `https://www.your-domain.com`
3. Set `VITE_CONTACT_ENDPOINT=/api/contact` and redeploy.

The rate limit is in-memory per function instance, so it resets on cold starts. For stricter limits, use a shared store such as Upstash Redis, or add Cloudflare Turnstile. Any other HTTPS endpoint works too, as long as it accepts `{ name, email, subject, message, website }` as JSON and returns 2xx only on delivery, 422 with `{ errors: { field: message } }` for invalid input, and 429 when rate-limited.

## SEO and social sharing

- `index.html` holds a default title, description, Open Graph and Twitter tags, theme colour, icons and manifest. Crawlers that don't run JavaScript still get meaningful metadata.
- `src/components/common/SEO.jsx` updates the title, description, social tags and canonical URL on every route, editing the existing tags rather than duplicating them.
- A small plugin in `vite.config.js` handles the build-time pieces:
  - It adds the canonical URL, `og:url` and absolute `og:image`/`twitter:image` URLs when `VITE_SITE_URL` is set.
  - It always emits `robots.txt`.
  - It emits `sitemap.xml` from the same data the router uses, so the 19 public routes stay in sync automatically.
  - Without `VITE_SITE_URL` it skips the canonical and sitemap rather than guessing the domain, and the build prints a warning.
- The site renders on the client. Google indexes it fine, but if other search engines or link previews matter, consider prerendering (e.g. `vite-plugin-prerender` or `react-snap`) or moving to an SSR framework.

## Deployment

The repository is set up for **Vercel**. `vercel.json` declares:

- the Vite build
- an SPA fallback that rewrites every non-`/api/` path to `index.html`, so deep links and refreshes work
- long-term caching for hashed assets
- basic security headers

Import the repository in Vercel, add the environment variables above, and deploy.

Other static hosts can serve `dist/`, but you need to add a SPA fallback and host the contact endpoint elsewhere:

| Host | SPA fallback |
| --- | --- |
| Netlify | `public/_redirects` containing `/* /index.html 200`. Port `api/contact.js` to a Netlify Function, or point `VITE_CONTACT_ENDPOINT` at another service |
| Cloudflare Pages | Serves `index.html` for unknown paths by default. Use a Pages Function for the endpoint |
| GitHub Pages | Copy `dist/index.html` to `dist/404.html` after building. There are no functions, so use the email fallback or a third-party form endpoint |
| Nginx / Apache | `try_files $uri /index.html;` or the `FallbackResource /index.html` equivalent |

Only add the configuration for the host you actually use.

## Accessibility and performance

- The site has a skip link, semantic landmarks, visible focus rings, labelled inputs with linked error messages, and live status messages.
- The mobile menu, project preview and gallery trap focus, close on Escape and return focus when closed.
- Carousels support keyboard arrows, drag and labelled buttons. Accordions expose their expanded state.
- `prefers-reduced-motion` turns off ambient animation, the custom cursor and the scroll-driven process page. The custom cursor only appears with a fine pointer at 1024px or wider.
- On phones the hero's 3D core is skipped entirely, so it doesn't sit behind the headline or cost main-thread time.
- Images use explicit dimensions and lazy loading. The route-loading placeholder fills the viewport so the footer doesn't shift.

Lighthouse 12.8 results against `npm run preview` (local, so real-world numbers will vary with hosting):

| Run | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop: `/`, `/about`, `/projects/forma` | 97–99 | 100 | 100 | 100 |
| Desktop: `/contact` | 84 | 100 | 100 | 100 |
| Mobile (simulated slow 4G): `/`, `/about`, `/contact`, `/projects/forma` | 85–88 | 100 | 100 | 100 |

Mobile performance is limited mainly by the size of the JavaScript bundle and font loading under simulated throttling. Self-hosting the two fonts would be the next improvement.

## Project structure

```
api/contact.js            Serverless contact endpoint (Vercel)
public/                   Favicon, icons, manifest, social-preview.png, images/
src/config/site.js        Identity, links and endpoint, read from env
src/data/                 Projects, case studies, services, experience, process, FAQ, technologies…
src/components/sections/  Page sections (Hero, Projects, Services, ExperienceSection, Contact…)
src/components/project/   ProjectCard, ProjectMedia, ProjectLinks, gallery, architecture diagram
src/components/common/    Buttons, links, containers, section titles, SEO
src/components/visuals/   Digital core, canvas ribbon sculpture, project and service mock-ups
src/pages/                Route components
src/utils/                Contact submission and shared validation
src/index.css             Design tokens, component styles and motion rules
tests/portfolio.spec.js   Playwright end-to-end suite
vercel.json               Build, SPA fallback, cache and security headers
```
