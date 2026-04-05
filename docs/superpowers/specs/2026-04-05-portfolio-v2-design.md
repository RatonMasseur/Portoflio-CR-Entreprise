# Portfolio V2 — Design Spec

## Overview

Rebuild of cr-entreprise.com as a modern, dark-mode freelancer portfolio targeting local businesses and artisans in France. The site's purpose is clarity — helping potential clients understand what Robin does, how he works, and how to get in touch. It is not a hard-sell landing page; it's an informative, visually impressive showcase that builds confidence in Robin's skills.

## Target Audience

French local businesses and artisans who need a professional website. Many are not tech-savvy. The design must impress without intimidating — the animations show technical competence, while the structure and copy keep things simple and clear.

## Tech Stack

- **Astro** — static-site generator, ships zero JS by default, excellent performance
- **Tailwind CSS** — utility-first CSS framework for consistent, rapid styling
- **GSAP** (GreenSock) — animation library for scroll-triggered reveals, text animations, parallax, hover effects
- **Lenis** — smooth scrolling library for premium scroll feel

## Design Direction

**Approach:** Premium Dashboard — structured, card-based layout with glassmorphism elements. Clear sections, easy to scan, visually impressive through animations and polish rather than narrative flow.

**Language:** French only.

**No pricing displayed.** Pricing is discussed in consultation.

**Copy:** Adapted from existing cr-entreprise.com content. Key tagline preserved: "Pas une agence. Pas un template. Votre site."

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a1a` | Page background (deep navy-black) |
| `--bg-card` | `rgba(255,255,255,0.03)` | Card backgrounds |
| `--border-card` | `rgba(59,130,246,0.12)` | Card borders |
| `--text-primary` | `#ffffff` | Headlines |
| `--text-secondary` | `#94a3b8` | Body text |
| `--text-muted` | `#64748b` | Descriptions, captions |
| `--accent-primary` | `#3b82f6` | Primary blue accent |
| `--accent-light` | `#60a5fa` | Light blue for emphasis, tags |
| `--accent-deep` | `#2563eb` | Deep blue for glow orbs |
| `--gradient-cta` | `linear-gradient(135deg, #3b82f6, #2563eb)` | CTA buttons |
| `--glow` | `rgba(59,130,246,0.25)` | Background glow orbs |

## Typography

- **Headlines:** Space Grotesk (bold, modern geometric sans-serif)
- **Body:** Inter (clean, highly readable)
- **Emphasis:** Italic for key phrases (e.g., "Votre site.")
- **Scale:** Responsive clamp() values — no jarring breakpoints

## Navigation

Floating pill-shaped navbar with glassmorphism effect (backdrop blur + semi-transparent background + subtle blue border).

- **Behavior:** Visible on load, hides on scroll down, reveals on scroll up
- **Items:** Logo (CR or Robin's brand) | Services | Réalisations | À propos | Processus | FAQ | Contact (gradient CTA button)
- **Mobile:** Hamburger menu with full-screen overlay, smooth open/close animation

## Sections (top to bottom)

### 1. Hero

- Centered layout
- Small label above headline: "DÉVELOPPEUR WEB FREELANCE" in accent blue, letter-spaced
- Main headline: "Pas une agence. Pas un template. *Votre site.*" — animated text reveal (words/lines stagger in with GSAP)
- Subtitle: "Un site professionnel qui vous ressemble, conçu pour convertir vos visiteurs en clients."
- Two CTAs: "Parlons de votre projet" (primary gradient button) + "Voir mes réalisations" (outline button with blue border)
- Background: radial blue glow orb centered behind headline
- Smooth fade-in on page load

### 2. Marquee (Tech Stack)

- Infinite horizontal scrolling banner
- Shows technologies/skills: Astro, React, Tailwind, GSAP, SEO, Figma, WordPress, etc.
- Subtle separator dots between items
- Thin top/bottom borders (`rgba(255,255,255,0.05)`)
- Pauses on hover (desktop)

### 3. Services

- Section label: "SERVICES" in accent blue
- Headline: "Ce que je peux faire pour vous"
- 2x2 grid of glassmorphism cards (collapses to 1-column on mobile)
- Each card: icon (in blue-tinted container) + title + short description
- Cards: Création de site web, Design responsive, SEO local, Performance & maintenance
- **Hover effect:** Card tilts slightly (3D transform) + blue glow appears on border
- Scroll-triggered: cards stagger in from bottom

### 4. Portfolio / Réalisations

- Section label: "RÉALISATIONS"
- Headline: "Des sites qui font la différence"
- Grid of project cards (2 columns desktop, 1 column mobile)
- Each card: screenshot area at top + project name + tags (e.g., "Site vitrine • SEO local • Réservation en ligne")
- **Hover effect:** Card lifts (translateY), screenshot scales slightly, border glows blue
- Content: demo/representative sites initially, replaced with real client work over time
- Scroll-triggered reveal with stagger

### 5. About / À propos

- Split layout: photo on left (1fr), text on right (1.5fr). Stacks vertically on mobile.
- Photo: rounded corners, subtle blue border, optional parallax shift on scroll
- Section label: "À PROPOS"
- Headline: "Robin, développeur web freelance"
- Bio text adapted from current site — passionate, focused on quality and results for local businesses
- Trait badges below: "Réactif", "Transparent", "Passionné" — small blue-tinted pill tags
- Scroll-triggered: photo slides in from left, text from right

### 6. Process / Processus

- Section label: "PROCESSUS"
- Headline: "Comment ça se passe ?"
- 4-step horizontal timeline (stacks vertically on mobile)
- Each step: numbered circle (blue border + blue background tint) + title + short description
- Steps: Échange → Maquette → Développement → Mise en ligne
- Animated connecting line between steps that draws on scroll
- Steps reveal one by one as user scrolls

### 7. Testimonials / Témoignages

- Auto-scrolling carousel of testimonial cards
- Each card: glassmorphism style, quote in italic, client name + business type below in accent blue
- Navigation dots below for manual control
- Content adapted from current site testimonials (names can be anonymized if needed)
- Scroll-triggered fade-in

### 8. FAQ

- Section label: "FAQ"
- Accordion style — question visible, click to expand answer
- Smooth height animation (GSAP or CSS transition calculating real content height)
- Blue "+" icon that rotates to "×" on open
- Content adapted from current site, pricing-related questions removed
- Scroll-triggered stagger reveal

### 9. Contact

- Background: subtle blue glow orb behind section for visual emphasis
- Bold CTA headline: "Prêt à lancer votre projet ?"
- Subtitle: "Parlons-en. Réponse sous 24h."
- Simple form: Name, Email, Message fields + gradient blue submit button
- Form fields: dark background, blue border on focus, clean labels
- Below form: optional direct email/phone link

### 10. Footer

- Minimal: copyright, social links (if any), back-to-top button
- Consistent dark styling

## Animations & Interactions

All animations are mobile-adapted as noted.

| Effect | Implementation | Mobile Adaptation |
|--------|---------------|-------------------|
| Scroll-triggered reveals | GSAP ScrollTrigger — fade + translateY on all section elements, staggered for lists | Same, shorter distances |
| Custom cursor | Dot (10px) + ring (36px), color shifts on hover, enlarges on interactive elements | Hidden on touch devices |
| Text animations | GSAP SplitText or manual split — hero headline words stagger in | Simpler fade-in, no per-word split |
| Parallax | GSAP ScrollTrigger — subtle Y-offset on background elements, about photo | Reduced or disabled to avoid jank |
| Interactive hover | CSS 3D transforms (tilt) + box-shadow glow on cards and buttons | Tap feedback instead (scale + glow) |
| Scrolling marquee | CSS animation (translateX loop) or GSAP | Same, no pause-on-hover |
| Smooth scroll | Lenis library — momentum-based smooth scrolling | Native scroll (Lenis can cause issues on some mobile browsers) |
| Glow orbs | CSS radial gradients, positioned absolute, blur filter | Same, possibly smaller |
| Section transitions | Scroll-triggered opacity/transform shifts between sections | Same |

## Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| > 1024px | Full desktop layout — 2-column grids, horizontal timeline, floating nav |
| 768–1024px | Tablet — grids may collapse to 1 column, nav stays visible |
| < 768px | Mobile — single column, hamburger nav, stacked layouts, reduced animations, no custom cursor |

## Performance Goals

- Lighthouse Performance score: 95+
- First Contentful Paint: < 1.5s
- Total page weight: < 500KB (excluding images)
- Zero layout shift (CLS: 0)
- All animations use `transform` and `opacity` only (GPU-accelerated, no layout thrashing)

## Project Structure (Astro)

```
src/
  layouts/
    Layout.astro          — base HTML shell, fonts, global styles, Lenis init
  components/
    Navbar.astro          — floating pill nav
    Hero.astro            — hero section
    Marquee.astro         — tech stack scrolling banner
    Services.astro        — services grid
    Portfolio.astro       — project cards
    About.astro           — split photo + bio
    Process.astro         — 4-step timeline
    Testimonials.astro    — carousel
    FAQ.astro             — accordion
    Contact.astro         — form + CTA
    Footer.astro          — footer
    Cursor.astro          — custom cursor (client-side JS)
  scripts/
    animations.ts         — GSAP ScrollTrigger setup for all sections
    cursor.ts             — custom cursor logic
    lenis.ts              — smooth scroll init
  styles/
    global.css            — Tailwind base + custom properties (colors, fonts)
  pages/
    index.astro           — assembles all components
public/
  fonts/                  — Space Grotesk, Inter (self-hosted for performance)
  images/                 — project screenshots, about photo
```

## Out of Scope

- Multi-page routing (single page for now)
- Blog or content management
- Client login/dashboard
- E-commerce or payment integration
- Multilingual support (French only)
- Pricing display
- Analytics integration (can be added later)
- Backend/API (contact form will use a third-party service like Formspree or Resend)
