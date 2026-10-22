# Hosea Minds

A community mental health tracker and personal journal platform for Kenyans.

Your feelings are valid. Your journey is yours.

Hosea Minds is a Next.js 16 application built on top of the uploaded DentCare template structure.
The template files in `dentcare-1.0.0/` are kept untouched as a read-only reference: every colour, font,
and layout decision in the application is ported from that stylesheet rather than invented.

## Template inheritance

| Token | Value | Where it came from |
| --- | --- | --- |
| `--primary` | `#06A3DA` | `dentcare-1.0.0/css/style.css` `:root` |
| `--secondary` | `#F57E57` | `dentcare-1.0.0/css/style.css` `:root` |
| `--light` | `#EEF9FF` | `dentcare-1.0.0/css/style.css` `:root` |
| `--dark` | `#091E3E` | `dentcare-1.0.0/css/style.css` `:root` |
| Display font | Jost 500/600/700 | `index.html` Google Fonts link |
| Body font | Open Sans 400/600 | `index.html` Google Fonts link |

The template rules for headings, buttons, `.section-title` brackets, `.top-shape`, `.icon` transitions and
the `#spinner` preloader are reproduced in `app/globals.css`. Nothing was redesigned: only content, images
and branding changed.

## Getting started

```bash
npm ci
cp .env.example .env.local   # fill in what you have
npm run dev
```

Open http://localhost:3000.

The app runs without any environment variables, in a local fallback mode:

- sessions use a development secret, so set `AUTH_SECRET` for anything real
- storage falls back to `.hosea-data/` on disk (gitignored) when Vercel KV is not configured
- photo uploads are disabled with a clear message when Vercel Blob is not configured
- reCAPTCHA is skipped when `RECAPTCHA_SECRET_KEY` is absent, and enforced automatically once it exists

## Environment variables

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=254112272061
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
PEXELS_API_KEY=
KV_REST_API_URL=
KV_REST_API_TOKEN=
BLOB_READ_WRITE_TOKEN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

`RECAPTCHA_SECRET_KEY`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN` and `SMTP_PASS` are server only.
Google sign in appears on `/login` only when both Google keys are present. `AUTH_SECRET` is also accepted by
NextAuth v5 as an alternative to `NEXTAUTH_SECRET`.

## Routes

Pages

- `/` homepage
- `/journal` private journal (authenticated)
- `/tracker` mood, energy and tag charts (authenticated)
- `/groups` peer support groups (authenticated)
- `/groups/[slug]` group room with thread, pinned resources, schedule (authenticated)
- `/resources` self help resources (public)
- `/check-in` quick daily check in (authenticated)
- `/profile` profile, notifications, danger zone (authenticated)
- `/crisis` crisis support (public, no forms, no captcha)
- `/login`, `/register`
- `/about`
- `/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`
- `/404` and `/500` branded pages, backed by `not-found.tsx` and `error.tsx`

API

- `POST /api/auth/register`
- `POST /api/journal/add`
- `POST /api/checkins/add`
- `POST /api/groups/message`
- `GET, POST /api/groups/membership` (join and leave, used by `/groups`)
- `PUT /api/profile/update`
- `DELETE /api/profile/delete`
- `POST /api/send-enquiry` (used by the `/about` enquiry form)
- `POST /api/upload` (optional journal photo to Vercel Blob)
- `GET, POST /api/auth/[...nextauth]`

## Privacy and safety notes

- Every journal, check in, and tracker query is scoped to the authenticated user id.
- `/api/profile/delete` erases journal entries, check ins, group messages, Blob uploads and the user row,
  then confirms what was deleted in the response.
- No advertising scripts, no Facebook Pixel, no TikTok Pixel. Vercel Analytics and Speed Insights are the
  only analytics, and they are disclosed in the cookie policy.
- `/crisis` requires no authentication, has no forms, and runs no reCAPTCHA. The voice tour never auto starts
  there.
- Under `prefers-reduced-motion`, the breathing circle stops and reads "Breathe slowly and gently", Lenis is
  not started, and GSAP counts jump straight to their final value.

## Dependency pins

The brief pins exact versions. Four packages had to move to a patched release to satisfy the
`npm audit --audit-level=high` gate in the brief itself (zero high and zero critical advisories):

| Package | Brief | Shipped | Why |
| --- | --- | --- | --- |
| `next-auth` | 5.0.0-beta.28 | 5.0.0-beta.32 | beta.28 pulls `@auth/core` with three critical advisories |
| `nodemailer` | 6.10.1 | 10.1.7 | 6.x carries several high severity SMTP and parser advisories |
| `jspdf` | 3.0.1 | 4.2.1 | 3.0.1 has critical PDF injection advisories |
| `@vercel/blob` | 0.29.4 | 2.8.2 | 0.29.4 does not exist on npm, and older releases pull a vulnerable `undici` |

Additions beyond the brief, all required to build on this template:

- `@tailwindcss/postcss` 4.1.10, because Tailwind v4 ships no PostCSS plugin in the core package.
- `motion-dom` and `motion-utils` overrides pinned to 12.18.2, because framer-motion 12.18.0 breaks when
  npm resolves newer minors under a legacy peer dependency install.
- `eslint` 9.39.5 and `typescript-eslint` 8.72.0 with a flat config, because `next lint` was removed in
  Next 16. `eslint-config-next` is deliberately not used: it pulls a `braces` chain with open high severity
  advisories, which would fail the audit gate below.
- A `.npmrc` with `legacy-peer-deps=true`, because next-auth beta still declares a Next 15 peer range while
  this brief requires Next 16.

## Verification

```bash
npm ci
npx tsc --noEmit
npm run lint
npx next build
npm audit --audit-level=high
```

All five pass: zero TypeScript errors, zero lint problems, a clean production build, and
`found 0 vulnerabilities`.

Image credits live in `image-credits.md`.
