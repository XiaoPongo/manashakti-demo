# Task 2-b — full-stack-developer (top sections)

## Scope
Built the top 6 sections of the Manashakti single-page site. Did NOT touch page.tsx, navbar, or chrome (other agents own those in parallel).

## Files produced
1. `src/components/sections/hero.tsx` — `Hero`
2. `src/components/sections/quick-start.tsx` — `QuickStart`
3. `src/components/sections/trust.tsx` — `Trust`
4. `src/components/sections/about-doctor.tsx` — `AboutDoctor`
5. `src/components/sections/when-to-seek-help.tsx` — `WhenToSeekHelp`
6. `src/components/sections/how-it-works.tsx` — `HowItWorks`

All files start with `"use client"`.

## Imports used (shared contract — do NOT recreate)
- `Section` from `@/components/site/section`
- `SectionHeading` from `@/components/site/section-heading`
- `FadeUp, Stagger, StaggerItem, Parallax, usePrefersReducedMotion` from `@/components/site/motion`
- `AnimatedCounter` from `@/components/site/animated-counter`
- `Icon` (and `type IconName`) from `@/components/site/icon`
- `CalmBlobs` from `@/components/site/calm-blobs`
- `useBooking` from `@/components/site/booking-context`
- shadcn `Button`, `Card`, `Badge` from `@/components/ui/*`
- `clinic`, `quickStartOptions`, `whenToSeekHelp`, `howItWorks` from `@/lib/clinic-data`
- `cn` from `@/lib/utils` (only where needed)
- `next/image` for the doctor photo

## Wiring notes for the page assembler
- `Hero` already includes `id="home"` and `min-h-[92vh]`. Place it first.
- `QuickStart` uses `id="quick-start"`.
- `AboutDoctor` uses `id="about"`.
- `WhenToSeekHelp` uses `id="when-to-seek-help"`.
- `HowItWorks` uses `id="how-it-works"`.
- `Trust` has `id="trust"` but is not in navLinks — fine to drop in between QuickStart and AboutDoctor as a calm band.
- All booking CTAs go through `useBooking()` → `openBooking('new'|'followup'|'enquiry')` or `openWhatsApp()`. The booking modals themselves are owned by Task 2-c/3 (booking-context already provides the state).
- The hero's WhatsApp button uses an inline brand SVG (Lucide has no WhatsApp glyph); color is `#25D366`.

## Key visual decisions
- Hero h1 uses a `bg-gradient-to-br from-teal via-teal to-sage bg-clip-text` accent on "Balance, Strength & Peace".
- Doctor portrait in both hero and about uses `object-cover object-top` so the face stays framed.
- Stats use distinct Lucide icons per card: Clock, HeartHandshake, Target, Star.
- How It Works has a horizontal animated timeline (desktop, scaleX gradient line) and a vertical animated timeline (mobile, scaleY gradient line), both respecting `prefers-reduced-motion`.

## Lint status
`bun run lint` — clean (no warnings, no errors).

## Issues encountered
None. The shared contract was complete and consistent; all imports resolved on first compile. Dev server (`/home/z/my-project/dev.log`) shows successful compilation after the new files were added.
