# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

No single primary client — confirmed as a deliberate constraint, not an
undecided one. The site must speak credibly to all three of:

- **Funded scale-ups** with a shipped product and accumulated system
  complexity. Buyer is technical (CTO / VP Engineering).
- **Early-stage founders** needing a first product designed and engineered
  from nothing. Buyer may be non-technical.
- **SMB / established non-tech businesses** replacing legacy tooling. Longer
  cycles, procurement involved.

The job is the same across all three: hand a complex, ambiguous software
problem to one team and get back a product that keeps working and keeps
changing. Future work must not narrow the audience to one of these segments
without the user's approval.

## Product Purpose

Synk Innovations is a digital engineering studio. It designs and builds
software products — web applications, mobile apps, SaaS platforms, AI
features, backends and cloud infrastructure — and hands them over in a state
the client's own team can keep evolving.

The website is the studio's sales surface. Success is a qualified enquiry
from someone with something worth building.

## Positioning

**Design and engineering in one team.** No design-agency-to-dev-shop handoff:
the same team owns the work from interface through infrastructure. That is
the factual mechanism behind the brand argument of "complexity brought into
step" — coherence comes from one team holding every layer, not from a method
a neighbouring agency could rename and claim.

Supporting truths already committed in the codebase's copy: the studio maps
the whole system before rebuilding it, and optimises for the cost of the
_next_ decade of changes rather than the first release.

## Operating Context

- Prospects arrive from search or referral, usually on a phone or a work
  laptop, comparing several studios in one sitting. They scan for proof of
  competence before reading anything.
- Technical buyers look for specifics (architecture, stack, operational
  practice); non-technical buyers look for evidence that someone will own the
  outcome. Both audiences hit the same page.
- Engagements follow a six-stage sequence the site already documents:
  Discover → Define → Design → Engineer → Launch → Scale, each with named
  deliverables.
- Delivery is remote-first, working across UTC−5 to UTC+5:30.

## Capabilities and Constraints

**Service lines offered (confirmed, in `json/site/content.ts`):** web
applications, mobile applications, SaaS platforms, AI & intelligent systems,
backend & APIs, cloud & DevOps.

**Stack the studio builds with (as claimed on the site):** React, Next.js,
TypeScript, Three.js, React Native, Node.js, Python, PostgreSQL, MongoDB,
Docker, AWS, LLM APIs.

**This site's own implementation:** Next.js 16 (Pages Router), React 19,
TypeScript, Tailwind CSS v4, GSAP, Lenis smooth scroll, react-three-fiber /
Three.js with postprocessing. Deployed against
`https://www.synkinnovations.in`. All copy and datasets live in
`json/site/content.ts` — no component hardcodes copy, and that separation
must hold. Reduced-motion handling exists in `lib/motion.ts`,
`styles/globals.css` and the Three.js `Stage`; heavy 3D work must keep
respecting it.

**Contact route — open decision, blocking for launch.** Enquiries should go
through a **form on the site**, not a public email address. No form and no
handling API route exists yet (`pages/api/hello.ts` is the scaffold default).
The `mailto:hello@synkinnovations.com` links in `CONTACT` and `FOOTER` are
wrong and must be replaced, not reused.

**Unresolved facts future work must not invent:** the correct contact email
(the `@synkinnovations.com` address is confirmed incorrect), real LinkedIn /
GitHub / social URLs (the footer currently points at bare `linkedin.com` and
`github.com`), and team size or headcount.

## Brand Commitments

- Name: **Synk Innovations**, short form **Synk**.
- Tagline: "Designed for today. Engineered for what comes next."
- Domain: `synkinnovations.in` (confirmed correct).
- A complete logo system is generated from source in `brand-source/` and
  documented in `brand-source/BRAND.md`. Its rules are binding: monochrome by
  default; violet `#8B5CF6` is screen-only and only on dark enough
  backgrounds; minimum sizes 90 px (full lockup) / 16 px (mark); never
  re-draw the arcs, add gradient or shadow, stretch the lockup, box the mark,
  or set the wordmark in a font. Geometry in `json/site/logo.ts` and the SVGs
  are generated from one source — change one, regenerate the other.
- Voice, as established in the shipped copy: plain, specific, engineering-
  literate. Names the unglamorous layers out loud. No hype, no superlatives,
  no invented statistics.

## Evidence on Hand

- **Real client projects exist**, both nameable-with-substantiated-metrics
  and NDA-bound, but none have been supplied yet. Future work must request
  the real details rather than invent them or ship the placeholders.
- **Every metric currently in `CASE_STUDIES` is placeholder** and marked as
  such in the source. The four entries (Fintech, Travel, Healthcare,
  Commerce) are illustrative; no number in them may be treated as true or
  carried into new copy.
- No testimonials, press coverage, client logos, or public repos are
  available. None may be fabricated.
- `PRINCIPLES` is deliberately qualitative for this reason — real numbers go
  there only when substantiated.

## Product Principles

1. **One team, every layer.** Anything that implies a handoff between design
   and engineering contradicts the studio's only real differentiator.
2. **Credible to a CTO and to a first-time founder on the same page.** Never
   solve for one by making the other bounce.
3. **No invented proof, ever.** Placeholder metrics, fake logos and
   unsubstantiated claims are worse than an empty section — the studio sells
   engineering honesty.
4. **The unglamorous layers are the pitch.** Specificity about tenancy,
   idempotency, observability and handover is what separates this from every
   agency site that promises "digital transformation".
5. **Built to be handed over.** The product's own artifacts — this site
   included — should be maintainable by someone who didn't write them.

## Accessibility & Inclusion

No client-mandated standard was established. Product-specific requirements
already in the implementation and to be preserved: a working skip link,
reduced-motion paths for the smooth scroll, custom cursor and 3D scenes, and
usability on a phone for prospects who arrive there first.
