# Fessel FC — Feature Status & Roadmap

This document is the product of a codebase audit. It lists **every feature that is
incomplete, stubbed, or not yet implemented**, grouped by logical build order and
tagged with a **priority level**. File references are given so each item can be
verified quickly (`file:line`).

## How to read this document

Each item is one of:

- **🔴 Incomplete** — the UI exists but is mocked, local-only, or dead-ended.
- **🟡 Gap** — something advertised or referenced is missing entirely.
- **🟢 Potential** — a logical, not-yet-built feature for the product.

### Levels

| Level | Meaning |
|-------|---------|
| **L1 — Foundation (money & core correctness)** | Do first. Payments, order persistence, and the purchase flows must actually work before anything else is built on top. |
| **L2 — Platform completeness** | Admin workflows, auth resilience, full CRUD, support operations. |
| **L3 — Engagement** | Community features, live data, search, communication. |
| **L4 — Scale & polish** | Reliability, internationalization, analytics, advanced features. |

---

## L1 — Foundation: payments, orders & purchase flows

> Nothing on the public site currently charges money, records an order, or persists a purchase.

1. **🔴 Donations are simulated** — `src/app/(public)/donate/page.tsx:33-43`
   `handleDonationSubmit` only runs a `setTimeout(2000)` then flips to a "thank you" screen
   (`DonateComfirmation`, line 773). Card / Mobile Money / bank transfer / PayPal fields and
   the sponsorship form collect data but nothing is charged or stored. The "Company Logo"
   file input (line 719) is never uploaded.
   → Wire to a payment provider (see L1-6); record donations in the DB; attach receipts.

2. **🔴 Shop checkout does nothing** — `src/app/(public)/shop/checkout/page.tsx:208-214`
   "Complete Order" calls `clearCart()` then redirects to `/shop`. No card/PayPal charge,
   no shipping capture (the shipping form at lines 55-158 is never read), no order record.
   Shipping is hardcoded (`itemCount > 2 ? "Free" : "$6"`, line 199).
   → Validate the form, charge, create an `Order`, persist shipping, show confirmation.

3. **🔴 No order persistence / order history** — `src/context/cart-context.tsx`
   The cart lives in `localStorage` (`fcfassell-cart`, lines 44 & 57) only. There is no
   `Order` model in `prisma/schema.prisma`, no account order history, and nothing in the
   admin UI to manage orders.
   → Add an `Order`/`OrderItem` model; move checkout to a server API; add "My orders" to
   the account area and an admin orders view.

4. **🔴 Ticket purchase dead-ends** — `src/app/(public)/tickets/buy/[id]/_component/ticket-client.tsx:337-339`
   "Proceed to Checkout" is `<Link href="#">`. Section/quantity selection (adult/child/
   senior × sections) is computed client-side and never submitted. Ticket stock in the
   match's `tickets.sections[].available` (see `prisma/schema.prisma:101`) is never
   decremented.
   → Build a real ticket booking flow (section availability, price calc, payment, e-ticket/QR,
   confirmation), and an admin tickets page (see L2).

5. **🟡 Coupon code is UI-only** — `src/app/(public)/shop/cart/page.tsx:123`
   "Enter code" input applies nothing.
   → Implement coupon validation (and a coupon admin UI).

6. **🟢 No payment gateway integration** — No Stripe / Flutterwave / Paystack / MTN MoMo /
   Orange Money SDK or API call exists anywhere in the repo. This is the blocker for items 1, 2, 4.
   → Chose providers per market (USD cards + local mobile money), centralize in a
   `lib/payments` module.

7. **🔴 Currency/units inconsistent** — Donate page prices are **LRD** (`donate/page.tsx:626`,
   `.toLocaleString()`), admin revenue chart is **RWF** (`revenue-overview.tsx:50`), admin
   financials are **USD** (`quick-actions.tsx:41-60`). No currency model/formatting util.
   → Single currency config + `Intl.NumberFormat`/`currency` helper.

---

## L2 — Platform completeness: admin, CRUD & auth

### Admin

8. **🔴 Admin "Edit" is disabled for matches, players, news** —
   `src/app/(admin)/admin/matches/match-client.tsx:308`, `player-client.tsx:217`,
   `news/news-client.tsx:169` all render an Edit button behind a **commented-out** `<Link>`.
   The `[id]` API routes (`src/app/api/news/[id]/route.ts`, `api/player/[id]/route.ts`,
   `api/match/[id]/route.ts`) only implement `DELETE` — there are no `GET`/`PUT`/`PATCH/update`
   handlers and no edit pages (`/admin/news/edit/[id]`, etc.).
   → Add update endpoints + edit pages; the list pages already promise "View, add, edit, and delete".

9. **🔴 Admin sidebar placeholders go nowhere** —
   `src/components/admin/layout/app-sidebar.tsx:53-67`: **Settings** (`url:"#"`),
   **Support** (`url:"#"`), **Feedback** (`url:"#"`).

10. **🔴 Quick Action "Tickets" → 404** — `src/components/admin/dashboard/quick-actions.tsx:28-30`
    links to `/admin/tickets`, which has no page file.

11. **🟡 No admin user/role management** — No page to list users or promote them to
    `ADMIN`/`PLAYER` (roles exist in `prisma/schema.prisma:12-16` and the session
    `role` field, but only signups set `USER`).

12. **🟡 Support tickets have no admin workflow** — Public users can submit tickets
    (`/api/support`, model `SupportTicket`), but nothing in admin views, replies to, or
    closes them (status stays `OPEN` forever). Related: no email notification on new tickets.

13. **🔴 Admin dashboard revenue is fabricated** —
    `src/components/admin/dashboard/revenue-overview.tsx:14-55` renders a hard-coded bar
    array and fake ticket-sales percentages; "View Report" (line 21) does nothing.
    `quick-actions.tsx:33-64` shows mocked `$45,000`-style values.
    Stats *counts* (matches/news/players) are real (`stats-cards.tsx` uses React Query),
    but revenue/sales are not (and can't be, until L1-1..L1-4 exist).
    → Build real charts from orders/tickets/donations data.

14. **🟡 No donations/sponsorship/feedback record-keeping** — Donate and sponsorship forms
    exist only as UI; a `SponsorshipRequest`/`Donation` model, admin list, and pipeline
    don't exist.

### Auth & account

15. **🟡 No password reset / forgot-password** — `src/components/auth/login-form.tsx` and
    the sign-in page have no "forgot password" link; Better Auth `requestPasswordReset` /
    `resetPassword` are not used. Requires an email/reset transport (see L3-23).

16. **🟡 No email verification** — `users.emailVerified` is always `false` on signup;
    Better Auth's `emailAndPassword.requireEmailVerification` and the email verification
    plugin aren't enabled; `sign-up` completes without verification.

17. **🟡 Email change not possible** — `/account/profile` shows email as read-only
    (`edit-profile-form.tsx`, "Email cannot be changed yet") and there is no
    `changeEmail`/re-verification flow.

18. **🟡 Social-only accounts can't set a password** — `/account/settings` hides the
    password form when no `credential` account exists; there's no "add a password" path.

19. **🟡 GitHub sign-in off by default** — `src/lib/auth.ts:7-9,50-57` enables GitHub only
    when `GITHUB_CLIENT_ID/SECRET` are set; neither `.env.example` value is provided, and a
    "Connect GitHub" button is only shown when enabled (`account-settings.tsx`).

20. **🔴 PLAYER role is unused** — `UserRole.PLAYER` exists but there is no player portal,
    no member area, and admins can't assign roles (ties to L2-11). A role-based access
    layer beyond "admin vs everyone" isn't implemented.

---

## L3 — Engagement: community, live data & communication

21. **🔴 Fan zone is local-only with fake uploads** —
    `src/app/(public)/fan-zone/page.tsx:28-43` seeds forum posts + gallery photos from
    static data into `localStorage`; posts/photos/likes never reach a server.
    Line 111: `// In a feature update, I will upload the file to a server`.
    Comment counts are display-only (`src/components/fan-zone/fan-forum.tsx:111`), and
    share buttons (`fan-forum.tsx:118-119`) do nothing.
    → Add `FanPost`/`FanPhoto` (or reuse Cloudinary + Prisma) models, an API, moderation,
    and real likes/comments.

22. **🔴 Fan club join is not persisted** — `src/app/(public)/fan-zone/join/page.tsx:44-66`
    validates the form and shows a success toast only; no membership record or member
    benefits/gating.

23. **🟡 No email/notification system anywhere** — No SMTP transport, no Better Auth email
    plugins (verification/reset), no order/ticket/donation receipts (the shop FAQ at
    `account/support` promises "a confirmation email" that is never sent), and no support
    ticket notifications. This is the common dependency for items 15, 16, 17, 12 and 1/2/4
    receipts.

24. **🔴 Live score tracker is a mock** — `src/components/home/live-score-tracker.tsx:24-63`
    uses `mockLiveMatches` and randomizes scores on `setInterval`; `isLive` is hard-coded
    (`const isLive = true`, line 43) and never reads a match's real `isLive`/`isFeatured`/
    `matchResult` fields from the DB.

25. **🟡 No site search** — No global search, no news search, and the shop has **no search
    input** (only category/price filters + sort, `shop/page.tsx:34-62`) despite an empty-state
    message referencing a "search query" (`shop/page.tsx:182`).

26. **🟡 Gallery is static** — `src/app/(public)/gallery/page.tsx` renders `src/data/gallery-data.ts`
    (local JPEG assets); no uploads, votes, or comments. Tabs are the only filter.

27. **🟡 Footer dead links & placeholder socials** — `src/layout/Footer.tsx:154,160,166`
    use `href="#"` (likely terms/privacy/FAQ), and social icons point to generic
    `https://facebook.com` / `https://twitter.com` (lines 12-27).

28. **🟢 Newsletter** — no newsletter signup anywhere.

---

## L4 — Scale & polish

29. **🟢 Role-based areas & permissions** — A real access-control layer (PLAYER portal,
    USER-only e-tickets/orders, admin) based on the existing `role` field.

30. **🟢 Analytics & A/B** — No analytics integration (no GA/Vercel/Plausible tag).

31. **🟢 PWA / offline / push notifications** — No service worker, manifest, or push.
    (Better Auth is cookie-based, so a PWA is straightforward.)

32. **🟢 i18n** — UI is single-language (English), no `next-intl`/dictionary setup; the club
    markets to an LRD (Liberia) audience.

33. **🟢 Donation/sponsorship content is hard-coded** — `DonateTestimonial`, `DonateFAQ`,
    and partner tiers are static JSX in `donate/page.tsx` (lines 766-769, 600-697); no
    admin CRUD to manage testimonial/FAQ/tier content.

34. **🟢 Match extra content is data-only** — Play-off stats, head-to-head (`backToback`),
    highlights, and `playersToWatch` are stored as JSON on matches
    (`prisma/schema.prisma:94-100`) but are only partially surfaced in the match detail UI;
    e.g., no standings/league table view.

35. **🟢 Order/ticket/seat management** — Section-level availability, refunds/exchanges,
    seat maps, and e-ticket delivery all depend on L1-4.

36. **🟢 Stale badge** — `README.md:8` still advertises "Auth.js" in the shields row; the
    project now uses Better Auth.

---

## Suggested build sequence

1. **Foundation (L1)**: payment module → donations → shop checkout + orders → ticket booking.
   Order/donation/ticket `Prisma` models land here.
2. **Platform (L2)**: update endpoints + edit pages for matches/players/news → admin
   orders/tickets/support → user/role management → real revenue charts.
3. **Engagement (L3)**: SMTP + Better Auth email plugins (reset/verify/change-email) →
   fan-zone persistence & moderation → gallery uploads → live scores → search → newsletter.
4. **Scale (L4)**: roles/PWA/i18n/analytics/content CMS.

## Appendix — items that already work (for contrast)

- Auth: login/signup/logout, Google OAuth, sessions, `/account` (profile, settings,
  support) — live and tested.
- CRUD **add + delete** for matches/players/news (admin), backed by `/api/*` routes + Prisma.
- Public content pages read real DB via API (`news`, `players`, `matches` use
  `src/utils/helpers/handle-fetch.ts`).
- Cloudinary image upload (matches, players, news, avatars), dark/light theme, cart badge.