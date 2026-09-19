# Folioblox — portfolio-app

A complete, responsive developer portfolio built with React 19, Vite 8, JavaScript/JSX, Tailwind CSS 4, Framer Motion, and Lucide icons. No routing library is needed for this single-page site.

## Development

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Structure

- `src/data/` — editable service, project, testimonial, recognition, FAQ, and navigation content.
- `src/components/sections/` — the portfolio's ten content sections plus technology marquee.
- `src/components/common/` — buttons, containers, section titles, loading screen, slider controls.
- `src/components/layout/` — navigation, mobile menu, page layout, footer.
- `src/components/visuals/` — original CSS sculpture and category-specific project compositions.
- `src/components/animations/` — shared viewport reveal animation.
- `src/hooks/` — scroll appearance and dialog focus management.
- `src/utils/contact.js` — validation, submission adapter, and local draft download.
- `src/index.css` — Tailwind theme, original visual compositions, and motion rules.

## Contact delivery

By default, the form validates input and prepares a downloadable text draft. It **does not send, persist, or claim to deliver an enquiry**. The page clearly explains this behavior.

To connect delivery, create `.env.local` from `.env.example` and set `VITE_CONTACT_ENDPOINT` to your own endpoint. Restart Vite or rebuild after changing it. The endpoint must accept a JSON `POST` containing `firstName`, `lastName`, `email`, `service`, `description`, and `consent`, and return a 2xx response only when the enquiry is accepted. Configure CORS if using a separate origin. Implement server-side validation, rate limiting, and actual delivery on that backend. Never place private API keys in `VITE_` variables, which are public client configuration.

The form has field-level accessible validation, an in-flight state, a 15-second timeout, retryable errors, and separate draft and delivery success states.

## Content and deployment

The supplied projects are presented as **concept studies**; recognition and testimonials are labeled **sample / illustrative**. Replace these with verified work and client-approved quotes before a commercial launch. Add real social URLs in the footer when available. The illustrative project visuals do not connect to external services.

Build output is in `dist/` and can be hosted on a static host. Set your production URL and absolute social-preview URL in `index.html` when a domain is assigned. Google Fonts uses `display=swap` with sans-serif fallbacks.

## Accessibility and interaction

- Skip link, semantic landmarks, visible keyboard focus, labeled inputs, and live form feedback.
- Mobile navigation and project dialogs trap focus, close on Escape, and restore focus.
- Project/recognition carousels support drag, touch, arrow keys, and labeled controls.
- FAQ and service rows expose expanded states; only one item opens at a time.
- System reduced-motion settings disable ambient CSS motion and reduce Framer Motion transforms.
- No external stock imagery, fabricated portraits, or fake outbound social links.

## Browser checks

With Chrome installed and the dev server running, run `npm run test:e2e`. The suite checks all nine requested viewport widths, keyboard interaction, dialog and menu focus, form validation, and draft downloads. Screenshots are saved in `test-results/`. Run `npm run format` to format source and tests.
