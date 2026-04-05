# Portfolio V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-mode, animation-rich freelancer portfolio for Robin targeting French local businesses and artisans, using Astro + Tailwind + GSAP.

**Architecture:** Single-page Astro site with component-per-section architecture. Each section is an `.astro` component with its own markup and Tailwind classes. Animations are centralized in a single GSAP script that targets data attributes. Lenis handles smooth scrolling. Contact form uses Formspree.

**Tech Stack:** Astro 5, Tailwind CSS 4, GSAP 3 (ScrollTrigger plugin), Lenis, Space Grotesk + Inter fonts

---

## File Structure

```
src/
  layouts/
    Layout.astro              — HTML shell, meta tags, font loading, global CSS import
  components/
    Navbar.astro              — floating pill navbar + mobile hamburger
    Hero.astro                — hero section with CTAs
    Marquee.astro             — infinite scrolling tech stack banner
    Services.astro            — 2x2 service card grid
    Portfolio.astro           — project showcase cards
    About.astro               — photo + bio split layout
    Process.astro             — 4-step timeline
    Testimonials.astro        — testimonial carousel
    FAQ.astro                 — accordion
    Contact.astro             — CTA + contact form
    Footer.astro              — minimal footer
  scripts/
    animations.ts             — GSAP ScrollTrigger for all scroll reveals
    cursor.ts                 — custom cursor (dot + ring)
    lenis.ts                  — smooth scroll init
    navbar.ts                 — scroll hide/show + mobile menu toggle
    faq.ts                    — accordion expand/collapse
    testimonials.ts           — carousel auto-scroll + dot nav
    tilt.ts                   — 3D card tilt on hover
  styles/
    global.css                — Tailwind directives + CSS custom properties
  pages/
    index.astro               — assembles all components
public/
  fonts/
    SpaceGrotesk-Bold.woff2
    SpaceGrotesk-Medium.woff2
    Inter-Regular.woff2
    Inter-Medium.woff2
  images/
    robin.webp                — about section photo (placeholder for now)
    project-menuisier.webp    — portfolio screenshot
    project-electricien.webp  — portfolio screenshot
    project-paysagiste.webp   — portfolio screenshot
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`
- Create: `src/pages/index.astro`

- [ ] **Step 1: Initialize Astro project**

Run:
```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install @astrojs/tailwind tailwindcss gsap @studio-freight/lenis
```

- [ ] **Step 3: Configure Astro with Tailwind**

Update `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwindcss()],
});
```

- [ ] **Step 4: Create global CSS with design tokens**

Write `src/styles/global.css`:
```css
@import 'tailwindcss';

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}

:root {
  --bg-primary: #0a0a1a;
  --bg-card: rgba(255, 255, 255, 0.03);
  --border-card: rgba(59, 130, 246, 0.12);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-primary: #3b82f6;
  --accent-light: #60a5fa;
  --accent-deep: #2563eb;
  --gradient-cta: linear-gradient(135deg, #3b82f6, #2563eb);
  --glow: rgba(59, 130, 246, 0.25);
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  color: var(--text-primary);
}

::selection {
  background: var(--accent-primary);
  color: white;
}
```

- [ ] **Step 5: Create base layout**

Write `src/layouts/Layout.astro`:
```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preload" href="/fonts/SpaceGrotesk-Bold.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 6: Create index page shell**

Write `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Robin Carivenc — Développeur Web Freelance en Alsace"
  description="Sites web sur-mesure pour artisans et entreprises locales. Design moderne, SEO local, livraison rapide. Basé en Alsace."
>
  <main>
    <p class="text-white text-center py-20">Portfolio V2 — En construction</p>
  </main>
</Layout>
```

- [ ] **Step 7: Download fonts to public/fonts/**

Run:
```bash
mkdir -p public/fonts public/images
```

Download Space Grotesk Bold + Medium and Inter Regular + Medium as `.woff2` files from Google Fonts and place them in `public/fonts/`. Use the following:
```bash
curl -o public/fonts/SpaceGrotesk-Bold.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2"
curl -o public/fonts/SpaceGrotesk-Medium.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPb94Cw.woff2"
curl -o public/fonts/Inter-Regular.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.woff2"
curl -o public/fonts/Inter-Medium.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.woff2"
```

- [ ] **Step 8: Verify dev server starts**

Run:
```bash
npm run dev
```
Expected: Astro dev server starts, page shows "Portfolio V2 — En construction" on dark background at `localhost:4321`.

- [ ] **Step 9: Commit**

```bash
git init
echo "node_modules/\ndist/\n.astro/\n.superpowers/" > .gitignore
git add -A
git commit -m "chore: scaffold Astro project with Tailwind, fonts, and design tokens"
```

---

### Task 2: Navbar Component

**Files:**
- Create: `src/components/Navbar.astro`
- Create: `src/scripts/navbar.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Navbar component**

Write `src/components/Navbar.astro`:
```astro
<nav
  id="navbar"
  class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl px-6 py-3 rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(10,10,26,0.8)] backdrop-blur-xl transition-transform duration-300"
>
  <div class="flex items-center justify-between">
    <a href="#" class="text-white font-bold text-lg font-['Space_Grotesk']">CR</a>

    <!-- Desktop links -->
    <div class="hidden md:flex items-center gap-6 text-sm text-[var(--text-muted)]">
      <a href="#services" class="hover:text-white transition-colors">Services</a>
      <a href="#realisations" class="hover:text-white transition-colors">Réalisations</a>
      <a href="#a-propos" class="hover:text-white transition-colors">À propos</a>
      <a href="#processus" class="hover:text-white transition-colors">Processus</a>
      <a href="#faq" class="hover:text-white transition-colors">FAQ</a>
    </div>

    <a
      href="#contact"
      class="hidden md:block px-5 py-2 rounded-full text-sm text-white font-medium"
      style="background: var(--gradient-cta);"
    >
      Contact
    </a>

    <!-- Mobile hamburger -->
    <button
      id="menu-toggle"
      class="md:hidden flex flex-col gap-1.5 p-2"
      aria-label="Ouvrir le menu"
    >
      <span class="block w-6 h-0.5 bg-white transition-all duration-300 origin-center" id="bar1"></span>
      <span class="block w-6 h-0.5 bg-white transition-all duration-300" id="bar2"></span>
      <span class="block w-6 h-0.5 bg-white transition-all duration-300 origin-center" id="bar3"></span>
    </button>
  </div>
</nav>

<!-- Mobile overlay -->
<div
  id="mobile-menu"
  class="fixed inset-0 z-40 bg-[rgba(10,10,26,0.95)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl opacity-0 pointer-events-none transition-opacity duration-300"
>
  <a href="#services" class="text-white hover:text-[var(--accent-light)] transition-colors mobile-link">Services</a>
  <a href="#realisations" class="text-white hover:text-[var(--accent-light)] transition-colors mobile-link">Réalisations</a>
  <a href="#a-propos" class="text-white hover:text-[var(--accent-light)] transition-colors mobile-link">À propos</a>
  <a href="#processus" class="text-white hover:text-[var(--accent-light)] transition-colors mobile-link">Processus</a>
  <a href="#faq" class="text-white hover:text-[var(--accent-light)] transition-colors mobile-link">FAQ</a>
  <a
    href="#contact"
    class="px-8 py-3 rounded-full text-lg text-white font-medium mobile-link"
    style="background: var(--gradient-cta);"
  >
    Contact
  </a>
</div>

<script src="../scripts/navbar.ts"></script>
```

- [ ] **Step 2: Create navbar scroll/menu script**

Write `src/scripts/navbar.ts`:
```ts
const navbar = document.getElementById('navbar')!;
const menuToggle = document.getElementById('menu-toggle')!;
const mobileMenu = document.getElementById('mobile-menu')!;
const bar1 = document.getElementById('bar1')!;
const bar2 = document.getElementById('bar2')!;
const bar3 = document.getElementById('bar3')!;
const mobileLinks = document.querySelectorAll('.mobile-link');

let lastScrollY = 0;
let isMenuOpen = false;

// Hide/show navbar on scroll
window.addEventListener('scroll', () => {
  if (isMenuOpen) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 100) {
    navbar.style.transform = 'translate(-50%, -100%)';
  } else {
    navbar.style.transform = 'translate(-50%, 0)';
  }
  lastScrollY = currentY;
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
    bar1.style.transform = 'rotate(45deg) translate(3px, 3px)';
    bar2.style.opacity = '0';
    bar3.style.transform = 'rotate(-45deg) translate(3px, -3px)';
    document.body.style.overflow = 'hidden';
  } else {
    closeMobileMenu();
  }
});

// Close on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    closeMobileMenu();
  });
});

function closeMobileMenu() {
  mobileMenu.classList.add('opacity-0', 'pointer-events-none');
  mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
  bar1.style.transform = '';
  bar2.style.opacity = '1';
  bar3.style.transform = '';
  document.body.style.overflow = '';
}
```

- [ ] **Step 3: Add Navbar to index page**

Update `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
---

<Layout
  title="Robin Carivenc — Développeur Web Freelance en Alsace"
  description="Sites web sur-mesure pour artisans et entreprises locales. Design moderne, SEO local, livraison rapide. Basé en Alsace."
>
  <Navbar />
  <main>
    <p class="text-white text-center py-20">Portfolio V2 — En construction</p>
  </main>
</Layout>
```

- [ ] **Step 4: Verify navbar works**

Run: `npm run dev`
Expected: Floating pill navbar visible, scrolls hide/show works, mobile hamburger opens overlay on narrow viewport.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.astro src/scripts/navbar.ts src/pages/index.astro
git commit -m "feat: add floating pill navbar with scroll hide and mobile menu"
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

Write `src/components/Hero.astro`:
```astro
<section class="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
  <!-- Glow orb -->
  <div
    class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
    style="background: var(--glow);"
  ></div>

  <div class="relative text-center max-w-3xl mx-auto" data-animate="fade-up">
    <p
      class="text-sm tracking-[0.2em] uppercase mb-6 font-medium"
      style="color: var(--accent-primary);"
    >
      Développeur Web Freelance
    </p>

    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" id="hero-headline">
      Pas une agence.<br />
      Pas un template.<br />
      <em class="not-italic" style="color: var(--accent-light);">Votre site.</em>
    </h1>

    <p class="text-lg md:text-xl max-w-xl mx-auto mb-10" style="color: var(--text-secondary);">
      Un site professionnel qui vous ressemble, conçu pour convertir vos visiteurs en clients.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#contact"
        class="px-8 py-4 rounded-lg text-white font-medium text-base transition-transform hover:scale-105"
        style="background: var(--gradient-cta);"
      >
        Parlons de votre projet
      </a>
      <a
        href="#realisations"
        class="px-8 py-4 rounded-lg font-medium text-base border transition-colors hover:bg-[rgba(59,130,246,0.1)]"
        style="color: var(--accent-light); border-color: rgba(59, 130, 246, 0.3);"
      >
        Voir mes réalisations
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Hero to index page**

Update `src/pages/index.astro` to import and render Hero below Navbar:
```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
---

<Layout
  title="Robin Carivenc — Développeur Web Freelance en Alsace"
  description="Sites web sur-mesure pour artisans et entreprises locales. Design moderne, SEO local, livraison rapide. Basé en Alsace."
>
  <Navbar />
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 3: Verify hero renders**

Run: `npm run dev`
Expected: Full-viewport hero with blue glow orb behind centered text. Two CTA buttons side by side on desktop, stacked on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section with glow orb and dual CTAs"
```

---

### Task 4: Marquee Component

**Files:**
- Create: `src/components/Marquee.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Marquee component**

Write `src/components/Marquee.astro`:
```astro
---
const items = [
  'Astro', 'React', 'Tailwind CSS', 'GSAP', 'WordPress',
  'SEO Local', 'Figma', 'TypeScript', 'Performance', 'Responsive Design'
];
// Duplicate for seamless loop
const allItems = [...items, ...items];
---

<div class="border-y border-[rgba(255,255,255,0.05)] py-4 overflow-hidden">
  <div class="marquee-track flex gap-8 whitespace-nowrap hover:[animation-play-state:paused]">
    {allItems.map(item => (
      <span class="text-sm tracking-[0.15em] uppercase text-[var(--text-muted)] flex items-center gap-8 shrink-0">
        {item}
        <span class="text-[var(--accent-primary)] text-xs">✦</span>
      </span>
    ))}
  </div>
</div>

<style>
  .marquee-track {
    animation: marquee 30s linear infinite;
    width: max-content;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>
```

- [ ] **Step 2: Add Marquee to index page**

Add `import Marquee from '../components/Marquee.astro';` and render `<Marquee />` after `<Hero />`.

- [ ] **Step 3: Verify marquee scrolls seamlessly**

Run: `npm run dev`
Expected: Horizontal scrolling banner of tech items, pauses on hover (desktop), loops seamlessly.

- [ ] **Step 4: Commit**

```bash
git add src/components/Marquee.astro src/pages/index.astro
git commit -m "feat: add infinite scrolling tech stack marquee"
```

---

### Task 5: Services Section

**Files:**
- Create: `src/components/Services.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Services component**

Write `src/components/Services.astro`:
```astro
---
const services = [
  {
    icon: '🌐',
    title: 'Création de site web',
    description: 'Site vitrine moderne, rapide et optimisé pour convertir vos visiteurs en clients.'
  },
  {
    icon: '📱',
    title: 'Design responsive',
    description: "Votre site s'adapte parfaitement sur mobile, tablette et desktop."
  },
  {
    icon: '🔍',
    title: 'SEO local',
    description: 'Apparaissez en premier quand vos clients vous cherchent sur Google.'
  },
  {
    icon: '⚡',
    title: 'Performance & maintenance',
    description: "Site rapide, sécurisé et maintenu à jour. Vous n'avez rien à gérer."
  }
];
---

<section id="services" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <p
      class="text-sm tracking-[0.2em] uppercase mb-4 font-medium"
      style="color: var(--accent-primary);"
      data-animate="fade-up"
    >
      Services
    </p>
    <h2 class="text-3xl md:text-4xl font-bold mb-12" data-animate="fade-up">
      Ce que je peux faire pour vous
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service, i) => (
        <div
          class="group p-6 rounded-2xl border transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          style="background: var(--bg-card); border-color: var(--border-card);"
          data-animate="fade-up"
          data-animate-delay={i * 100}
          data-tilt
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
            style="background: rgba(59, 130, 246, 0.1);"
          >
            {service.icon}
          </div>
          <h3 class="text-lg font-bold mb-2">{service.title}</h3>
          <p style="color: var(--text-muted);">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Services to index page**

Add `import Services from '../components/Services.astro';` and render `<Services />` after `<Marquee />`.

- [ ] **Step 3: Verify services render**

Run: `npm run dev`
Expected: 2x2 card grid on desktop, stacked on mobile. Blue border glow on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.astro src/pages/index.astro
git commit -m "feat: add services section with glassmorphism cards"
```

---

### Task 6: Portfolio Section

**Files:**
- Create: `src/components/Portfolio.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Portfolio component**

Write `src/components/Portfolio.astro`:
```astro
---
const projects = [
  {
    title: 'Menuisier · Strasbourg',
    tags: 'Site vitrine WordPress · Client autonome · SEO local',
    image: '/images/project-menuisier.webp'
  },
  {
    title: 'Électricien · Colmar',
    tags: 'Landing page statique · Génération de leads',
    image: '/images/project-electricien.webp'
  },
  {
    title: 'Paysagiste · Mulhouse',
    tags: 'Site vitrine WordPress · Galerie avant/après',
    image: '/images/project-paysagiste.webp'
  }
];
---

<section id="realisations" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <p
      class="text-sm tracking-[0.2em] uppercase mb-4 font-medium"
      style="color: var(--accent-primary);"
      data-animate="fade-up"
    >
      Réalisations
    </p>
    <h2 class="text-3xl md:text-4xl font-bold mb-4" data-animate="fade-up">
      Des sites qui font la différence
    </h2>
    <p class="mb-12" style="color: var(--text-muted);" data-animate="fade-up">
      Démos représentatives — les vraies réalisations arrivent dès les premiers clients.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <div
          class="group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-primary)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          style="background: var(--bg-card); border-color: var(--border-card);"
          data-animate="fade-up"
          data-animate-delay={i * 100}
        >
          <div class="overflow-hidden aspect-video bg-gradient-to-br from-[#1e293b] to-[#0f172a]">
            <img
              src={project.image}
              alt={project.title}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onerror="this.style.display='none'"
            />
          </div>
          <div class="p-5">
            <h3 class="text-base font-bold mb-1">{project.title}</h3>
            <p class="text-sm" style="color: var(--text-muted);">{project.tags}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Portfolio to index page**

Add `import Portfolio from '../components/Portfolio.astro';` and render `<Portfolio />` after `<Services />`.

- [ ] **Step 3: Verify portfolio renders**

Run: `npm run dev`
Expected: 3-column grid on large screens, 2 on medium, stacked on mobile. Cards lift on hover with blue border glow.

- [ ] **Step 4: Commit**

```bash
git add src/components/Portfolio.astro src/pages/index.astro
git commit -m "feat: add portfolio section with project cards"
```

---

### Task 7: About Section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create About component**

Write `src/components/About.astro`:
```astro
---
const traits = ['Réactif', 'Transparent', 'Passionné'];
---

<section id="a-propos" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
      <!-- Photo -->
      <div class="md:col-span-2" data-animate="fade-right">
        <div
          class="aspect-[3/4] rounded-2xl overflow-hidden border"
          style="border-color: var(--border-card);"
        >
          <img
            src="/images/robin.webp"
            alt="Robin Carivenc"
            class="w-full h-full object-cover"
            onerror="this.parentElement.style.background='linear-gradient(135deg, #1e293b, #0f172a)'"
          />
        </div>
      </div>

      <!-- Text -->
      <div class="md:col-span-3" data-animate="fade-left">
        <p
          class="text-sm tracking-[0.2em] uppercase mb-4 font-medium"
          style="color: var(--accent-primary);"
        >
          À propos
        </p>
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Robin, développeur web freelance
        </h2>
        <div class="space-y-4 text-base leading-relaxed" style="color: var(--text-secondary);">
          <p>
            Je m'appelle Robin, développeur web basé en Alsace. Je travaille en direct avec chaque client — pas d'intermédiaire, pas de chef de projet, pas de délai gonflé.
          </p>
          <p>
            Ce que vous obtenez concrètement : un interlocuteur unique du brief à la mise en ligne, une réponse sous 24h, et un site conçu spécifiquement pour votre métier et votre ville — pas un template générique.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 mt-8">
          {traits.map(trait => (
            <span
              class="px-4 py-2 rounded-lg text-sm font-medium"
              style="background: rgba(59, 130, 246, 0.1); color: var(--accent-light);"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add About to index page**

Add `import About from '../components/About.astro';` and render `<About />` after `<Portfolio />`.

- [ ] **Step 3: Verify about section renders**

Run: `npm run dev`
Expected: Split layout — photo left, text right on desktop. Stacks on mobile. Trait badges visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add about section with split photo/bio layout"
```

---

### Task 8: Process Section

**Files:**
- Create: `src/components/Process.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Process component**

Write `src/components/Process.astro`:
```astro
---
const steps = [
  {
    number: '1',
    title: 'Échange',
    description: 'On discute de votre activité, vos clients cibles, ce que vous voulez mettre en avant.'
  },
  {
    number: '2',
    title: 'Maquette',
    description: 'Je vous présente une maquette complète. On ajuste ensemble jusqu\'à ce que ce soit parfait.'
  },
  {
    number: '3',
    title: 'Développement',
    description: "Je code le site, j'optimise le SEO, je configure l'hébergement. Vous ne touchez à rien."
  },
  {
    number: '4',
    title: 'Mise en ligne',
    description: 'Votre site est en ligne. Je vous forme en 30 min à gérer votre contenu vous-même.'
  }
];
---

<section id="processus" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <p
      class="text-sm tracking-[0.2em] uppercase mb-4 font-medium text-center"
      style="color: var(--accent-primary);"
      data-animate="fade-up"
    >
      Processus
    </p>
    <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center" data-animate="fade-up">
      Comment ça se passe ?
    </h2>

    <!-- Desktop: horizontal timeline -->
    <div class="hidden md:grid grid-cols-4 gap-8 relative">
      <!-- Connecting line -->
      <div
        class="absolute top-[18px] left-[calc(12.5%+18px)] right-[calc(12.5%+18px)] h-px"
        style="background: var(--border-card);"
        id="process-line"
      ></div>

      {steps.map((step, i) => (
        <div class="text-center relative" data-animate="fade-up" data-animate-delay={i * 150}>
          <div
            class="w-10 h-10 rounded-full border flex items-center justify-center mx-auto mb-4 text-sm font-bold relative z-10"
            style="background: rgba(59, 130, 246, 0.15); border-color: var(--accent-primary); color: var(--accent-light); backdrop-filter: blur(4px);"
          >
            {step.number}
          </div>
          <h3 class="text-base font-bold mb-2">{step.title}</h3>
          <p class="text-sm" style="color: var(--text-muted);">{step.description}</p>
        </div>
      ))}
    </div>

    <!-- Mobile: vertical timeline -->
    <div class="md:hidden flex flex-col gap-8 relative pl-12">
      <div
        class="absolute left-[19px] top-[20px] bottom-[20px] w-px"
        style="background: var(--border-card);"
      ></div>

      {steps.map((step, i) => (
        <div class="relative" data-animate="fade-up" data-animate-delay={i * 100}>
          <div
            class="absolute -left-12 w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold"
            style="background: rgba(59, 130, 246, 0.15); border-color: var(--accent-primary); color: var(--accent-light);"
          >
            {step.number}
          </div>
          <h3 class="text-base font-bold mb-1">{step.title}</h3>
          <p class="text-sm" style="color: var(--text-muted);">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Process to index page**

Add `import Process from '../components/Process.astro';` and render `<Process />` after `<About />`.

- [ ] **Step 3: Verify process renders**

Run: `npm run dev`
Expected: 4-step horizontal timeline on desktop with connecting line. Vertical timeline on mobile with left-aligned numbers.

- [ ] **Step 4: Commit**

```bash
git add src/components/Process.astro src/pages/index.astro
git commit -m "feat: add process section with horizontal/vertical timeline"
```

---

### Task 9: Testimonials Section

**Files:**
- Create: `src/components/Testimonials.astro`
- Create: `src/scripts/testimonials.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Testimonials component**

Write `src/components/Testimonials.astro`:
```astro
---
const testimonials = [
  {
    quote: "Robin a parfaitement compris ce que je voulais. Mon site était en ligne en une semaine, exactement comme promis.",
    name: "Marie",
    role: "Fleuriste"
  },
  {
    quote: "Très professionnel et réactif. Je recommande à tous les artisans qui veulent un vrai site.",
    name: "Thomas",
    role: "Menuisier"
  },
  {
    quote: "Depuis que j'ai mon site, je reçois des appels de nouveaux clients chaque semaine. Ça change tout.",
    name: "Sophie",
    role: "Coiffeuse"
  },
  {
    quote: "Je n'y connaissais rien en informatique. Robin m'a tout expliqué simplement. Le résultat est top.",
    name: "Philippe",
    role: "Électricien"
  }
];
---

<section class="py-24 px-6 overflow-hidden">
  <div class="max-w-5xl mx-auto">
    <p
      class="text-sm tracking-[0.2em] uppercase mb-4 font-medium text-center"
      style="color: var(--accent-primary);"
      data-animate="fade-up"
    >
      Témoignages
    </p>
    <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center" data-animate="fade-up">
      Ce que disent mes clients
    </h2>

    <div class="relative" data-animate="fade-up">
      <div class="overflow-hidden" id="testimonial-viewport">
        <div class="flex transition-transform duration-500 ease-out" id="testimonial-track">
          {testimonials.map(t => (
            <div class="w-full shrink-0 px-4 md:w-1/2 lg:w-1/2">
              <div
                class="p-6 rounded-2xl border h-full"
                style="background: var(--bg-card); border-color: var(--border-card);"
              >
                <p class="text-base italic mb-4 leading-relaxed" style="color: var(--text-secondary);">
                  "{t.quote}"
                </p>
                <p class="text-sm font-medium">
                  <span class="text-white">{t.name}</span>
                  <span style="color: var(--accent-light);"> · {t.role}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-8" id="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            class="w-2 h-2 rounded-full transition-all duration-300"
            style={i === 0 ? 'background: var(--accent-primary); width: 24px;' : 'background: var(--text-muted);'}
            data-dot={i}
            aria-label={`Témoignage ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  </div>
</section>

<script src="../scripts/testimonials.ts"></script>
```

- [ ] **Step 2: Create testimonials carousel script**

Write `src/scripts/testimonials.ts`:
```ts
const track = document.getElementById('testimonial-track')!;
const dots = document.querySelectorAll<HTMLButtonElement>('[data-dot]');
const totalSlides = dots.length;

let current = 0;
let autoplayInterval: ReturnType<typeof setInterval>;

function getSlideWidth(): number {
  // On mobile show 1, on md+ show 2
  return window.innerWidth >= 768 ? 50 : 100;
}

function goTo(index: number) {
  current = index;
  const width = getSlideWidth();
  track.style.transform = `translateX(-${current * width}%)`;

  dots.forEach((dot, i) => {
    if (i === current) {
      dot.style.background = 'var(--accent-primary)';
      dot.style.width = '24px';
    } else {
      dot.style.background = 'var(--text-muted)';
      dot.style.width = '8px';
    }
  });
}

function next() {
  const maxIndex = window.innerWidth >= 768 ? totalSlides - 2 : totalSlides - 1;
  goTo(current >= maxIndex ? 0 : current + 1);
}

// Dot click
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goTo(i);
    resetAutoplay();
  });
});

// Autoplay
function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(next, 4000);
}

resetAutoplay();

// Recalculate on resize
window.addEventListener('resize', () => goTo(current));
```

- [ ] **Step 3: Add Testimonials to index page**

Add `import Testimonials from '../components/Testimonials.astro';` and render `<Testimonials />` after `<Process />`.

- [ ] **Step 4: Verify carousel works**

Run: `npm run dev`
Expected: Testimonial cards in a carousel, auto-scrolls every 4s, dots navigate manually. Shows 2 cards on desktop, 1 on mobile.

- [ ] **Step 5: Commit**

```bash
git add src/components/Testimonials.astro src/scripts/testimonials.ts src/pages/index.astro
git commit -m "feat: add testimonials carousel with autoplay and dot navigation"
```

---

### Task 10: FAQ Section

**Files:**
- Create: `src/components/FAQ.astro`
- Create: `src/scripts/faq.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create FAQ component**

Write `src/components/FAQ.astro`:
```astro
---
const faqs = [
  {
    question: 'Est-ce que je pourrai modifier mon site moi-même ?',
    answer: "Ça dépend de l'offre. Avec le Site Vitrine Complet (WordPress), oui — je vous forme en 30 minutes à modifier vos textes et photos depuis un panneau d'administration simple, sans toucher au code. Avec la Page Unique, c'est moi qui gère les modifications — vous m'envoyez un message et je m'en occupe sous 24h."
  },
  {
    question: '7 jours c\'est vraiment possible ?',
    answer: "Oui, à condition qu'on ait fait le brief ensemble et que vous m'ayez transmis vos photos et textes. Si vous n'avez pas le temps de rassembler ça, je peux rédiger les textes pour vous et utiliser des photos professionnelles libres de droits. On s'adapte."
  },
  {
    question: 'Est-ce que mon site sera vraiment visible sur Google ?',
    answer: "Chaque site est optimisé pour les recherches locales de votre secteur en Alsace. Le référencement prend 4 à 8 semaines pour s'installer après la mise en ligne — c'est le délai normal chez Google pour un nouveau site. Je configure aussi votre Google Business Profile gratuit pour accélérer."
  },
  {
    question: 'Je ne suis pas à l\'aise avec l\'informatique. C\'est pour moi ?',
    answer: "Oui, c'est exactement pour vous. Vous n'avez rien à faire côté technique — ni hébergement, ni configuration, ni domaine. Vous me donnez votre activité, vos photos si vous en avez, et je m'occupe de tout. À la livraison, je vous explique en 30 minutes comment utiliser votre site."
  }
];
---

<section id="faq" class="py-24 px-6">
  <div class="max-w-3xl mx-auto">
    <p
      class="text-sm tracking-[0.2em] uppercase mb-4 font-medium text-center"
      style="color: var(--accent-primary);"
      data-animate="fade-up"
    >
      FAQ
    </p>
    <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center" data-animate="fade-up">
      Questions fréquentes
    </h2>

    <div class="space-y-4">
      {faqs.map((faq, i) => (
        <div
          class="border rounded-xl overflow-hidden"
          style="border-color: var(--border-card); background: var(--bg-card);"
          data-animate="fade-up"
          data-animate-delay={i * 80}
        >
          <button
            class="faq-trigger w-full flex items-center justify-between p-5 text-left"
            aria-expanded="false"
          >
            <span class="text-white font-medium text-base pr-4">{faq.question}</span>
            <span
              class="faq-icon text-xl shrink-0 transition-transform duration-300"
              style="color: var(--accent-primary);"
            >+</span>
          </button>
          <div class="faq-content overflow-hidden" style="height: 0;">
            <p class="px-5 pb-5 leading-relaxed" style="color: var(--text-secondary);">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script src="../scripts/faq.ts"></script>
```

- [ ] **Step 2: Create FAQ accordion script**

Write `src/scripts/faq.ts`:
```ts
document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const parent = trigger.parentElement!;
    const content = parent.querySelector('.faq-content') as HTMLElement;
    const icon = trigger.querySelector('.faq-icon') as HTMLElement;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.faq-trigger').forEach(other => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        const otherContent = other.parentElement!.querySelector('.faq-content') as HTMLElement;
        const otherIcon = other.querySelector('.faq-icon') as HTMLElement;
        otherContent.style.height = '0';
        otherIcon.style.transform = 'rotate(0deg)';
        otherIcon.textContent = '+';
      }
    });

    if (isOpen) {
      trigger.setAttribute('aria-expanded', 'false');
      content.style.height = '0';
      icon.style.transform = 'rotate(0deg)';
      icon.textContent = '+';
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      content.style.height = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(45deg)';
      icon.textContent = '×';
    }
  });
});
```

- [ ] **Step 3: Add FAQ to index page**

Add `import FAQ from '../components/FAQ.astro';` and render `<FAQ />` after `<Testimonials />`.

- [ ] **Step 4: Verify accordion works**

Run: `npm run dev`
Expected: Click a question — answer expands smoothly. Click another — previous closes, new one opens. Plus icon rotates to X.

- [ ] **Step 5: Commit**

```bash
git add src/components/FAQ.astro src/scripts/faq.ts src/pages/index.astro
git commit -m "feat: add FAQ section with smooth accordion"
```

---

### Task 11: Contact Section + Footer

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Contact component**

Write `src/components/Contact.astro`:
```astro
<section id="contact" class="py-24 px-6 relative overflow-hidden">
  <!-- Glow orb -->
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
    style="background: var(--glow);"
  ></div>

  <div class="max-w-2xl mx-auto relative">
    <div class="text-center mb-12" data-animate="fade-up">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Prêt à lancer votre projet ?
      </h2>
      <p style="color: var(--text-secondary);">
        Parlons-en. Réponse sous 24h.
      </p>
    </div>

    <form
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
      class="space-y-5"
      data-animate="fade-up"
    >
      <div>
        <label for="name" class="block text-sm font-medium text-white mb-2">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-full px-4 py-3 rounded-xl text-white placeholder-[var(--text-muted)] border focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          style="background: rgba(255, 255, 255, 0.05); border-color: var(--border-card);"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-white mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="w-full px-4 py-3 rounded-xl text-white placeholder-[var(--text-muted)] border focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          style="background: rgba(255, 255, 255, 0.05); border-color: var(--border-card);"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-white mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          class="w-full px-4 py-3 rounded-xl text-white placeholder-[var(--text-muted)] border focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
          style="background: rgba(255, 255, 255, 0.05); border-color: var(--border-card);"
          placeholder="Décrivez votre projet..."
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full py-4 rounded-xl text-white font-medium text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style="background: var(--gradient-cta);"
      >
        Envoyer ma demande
      </button>
    </form>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-sm" style="color: var(--text-muted);" data-animate="fade-up">
      <span>📍 Alsace · Partout en France</span>
      <span class="hidden sm:inline">·</span>
      <span>⚡ Réponse sous 24h</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create Footer component**

Write `src/components/Footer.astro`:
```astro
<footer class="py-8 px-6 border-t" style="border-color: rgba(255, 255, 255, 0.05);">
  <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style="color: var(--text-muted);">
    <p>© 2026 Robin Carivenc · Tous droits réservés</p>
    <div class="flex gap-6">
      <a href="#" class="hover:text-white transition-colors">Mentions légales</a>
      <a href="#" class="hover:text-white transition-colors">CGV</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Add Contact and Footer to index page**

Add imports and render `<Contact />` after `<FAQ />` and `<Footer />` after `</main>` (inside Layout but outside main).

Final `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import Marquee from '../components/Marquee.astro';
import Services from '../components/Services.astro';
import Portfolio from '../components/Portfolio.astro';
import About from '../components/About.astro';
import Process from '../components/Process.astro';
import Testimonials from '../components/Testimonials.astro';
import FAQ from '../components/FAQ.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  title="Robin Carivenc — Développeur Web Freelance en Alsace"
  description="Sites web sur-mesure pour artisans et entreprises locales. Design moderne, SEO local, livraison rapide. Basé en Alsace."
>
  <Navbar />
  <main>
    <Hero />
    <Marquee />
    <Services />
    <Portfolio />
    <About />
    <Process />
    <Testimonials />
    <FAQ />
    <Contact />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 4: Verify all sections render end to end**

Run: `npm run dev`
Expected: Full page with all 10 sections visible, correct colors, proper spacing. Contact form fields are styled.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add contact form and footer sections"
```

---

### Task 12: Lenis Smooth Scroll

**Files:**
- Create: `src/scripts/lenis.ts`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create Lenis init script**

Write `src/scripts/lenis.ts`:
```ts
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Disable on mobile if issues arise
if ('ontouchstart' in window && window.innerWidth < 768) {
  lenis.destroy();
}

// Make lenis available for GSAP ScrollTrigger sync
(window as any).__lenis = lenis;
```

- [ ] **Step 2: Add Lenis script to Layout**

Update `src/layouts/Layout.astro` — add before `</body>`:
```astro
<script src="../scripts/lenis.ts"></script>
```

- [ ] **Step 3: Verify smooth scroll works**

Run: `npm run dev`
Expected: Scrolling feels buttery smooth on desktop with momentum. Mobile uses native scroll.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/lenis.ts src/layouts/Layout.astro
git commit -m "feat: add Lenis smooth scrolling with mobile fallback"
```

---

### Task 13: GSAP Scroll Animations

**Files:**
- Create: `src/scripts/animations.ts`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create GSAP animations script**

Write `src/scripts/animations.ts`:
```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sync ScrollTrigger with Lenis
const lenis = (window as any).__lenis;
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Fade-up animations for all [data-animate="fade-up"] elements
gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach(el => {
  const delay = parseInt(el.dataset.animateDelay || '0') / 1000;
  gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});

// Fade-right (about photo)
gsap.utils.toArray<HTMLElement>('[data-animate="fade-right"]').forEach(el => {
  gsap.from(el, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

// Fade-left (about text)
gsap.utils.toArray<HTMLElement>('[data-animate="fade-left"]').forEach(el => {
  gsap.from(el, {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

// Hero headline text animation
const heroHeadline = document.getElementById('hero-headline');
if (heroHeadline) {
  gsap.from(heroHeadline.children, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    delay: 0.3,
  });
}

// Process line draw animation
const processLine = document.getElementById('process-line');
if (processLine) {
  gsap.from(processLine, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: processLine,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}
```

- [ ] **Step 2: Add animations script to Layout**

Update `src/layouts/Layout.astro` — add after the Lenis script:
```astro
<script src="../scripts/animations.ts"></script>
```

- [ ] **Step 3: Verify scroll animations work**

Run: `npm run dev`
Expected: Elements fade/slide in as you scroll down. Hero headline lines stagger in on load. Process connecting line draws across. About section photo slides from left, text from right.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/animations.ts src/layouts/Layout.astro
git commit -m "feat: add GSAP scroll-triggered animations for all sections"
```

---

### Task 14: Custom Cursor

**Files:**
- Create: `src/scripts/cursor.ts`
- Create: `src/components/Cursor.astro`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create Cursor component**

Write `src/components/Cursor.astro`:
```astro
<div id="cursor-dot" class="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] mix-blend-difference" style="background: white;"></div>
<div id="cursor-ring" class="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] border border-white/50 mix-blend-difference"></div>

<style>
  @media (hover: none), (pointer: coarse) {
    #cursor-dot, #cursor-ring { display: none !important; }
  }
  @media (hover: hover) {
    * { cursor: none !important; }
  }
</style>
```

- [ ] **Step 2: Create cursor script**

Write `src/scripts/cursor.ts`:
```ts
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (dot && ring && window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge on interactive elements
  const interactives = 'a, button, input, textarea, [data-tilt]';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'var(--accent-light)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
  });
}
```

- [ ] **Step 3: Add Cursor to Layout**

Update `src/layouts/Layout.astro` — add inside `<body>`, before `<slot />`:
```astro
---
import Cursor from '../components/Cursor.astro';
---
```
And in the body:
```astro
<Cursor />
<slot />
```
Add after other scripts:
```astro
<script src="../scripts/cursor.ts"></script>
```

- [ ] **Step 4: Verify custom cursor works**

Run: `npm run dev`
Expected: Custom dot + ring cursor follows mouse on desktop. Ring enlarges + turns blue on hover over links/buttons/cards. Hidden on touch devices.

- [ ] **Step 5: Commit**

```bash
git add src/components/Cursor.astro src/scripts/cursor.ts src/layouts/Layout.astro
git commit -m "feat: add custom cursor with hover enlargement and mobile detection"
```

---

### Task 15: 3D Card Tilt Effect

**Files:**
- Create: `src/scripts/tilt.ts`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Create tilt script**

Write `src/scripts/tilt.ts`:
```ts
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(card => {
    card.style.transition = 'transform 0.3s ease';
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}
```

- [ ] **Step 2: Add tilt script to Layout**

Add in `src/layouts/Layout.astro` after other scripts:
```astro
<script src="../scripts/tilt.ts"></script>
```

- [ ] **Step 3: Verify tilt works on service cards**

Run: `npm run dev`
Expected: Service cards (which have `data-tilt`) tilt toward the mouse pointer with subtle 3D perspective. Resets on mouse leave.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/tilt.ts src/layouts/Layout.astro
git commit -m "feat: add 3D tilt effect on hover for service cards"
```

---

### Task 16: Final Polish & Build Verification

**Files:**
- Modify: `src/pages/index.astro` (if needed)
- Verify: all files

- [ ] **Step 1: Run production build**

Run:
```bash
npm run build
```
Expected: Build completes with no errors. Output in `dist/`.

- [ ] **Step 2: Preview production build**

Run:
```bash
npm run preview
```
Expected: Site loads at `localhost:4321` with all sections, animations, and interactions working.

- [ ] **Step 3: Check responsiveness**

Open browser DevTools, test at:
- 1440px (desktop)
- 768px (tablet)
- 375px (mobile)

Expected: All sections adapt correctly. No horizontal overflow. Nav switches to hamburger on mobile.

- [ ] **Step 4: Verify all animations fire**

Scroll through the entire page slowly.
Expected: Every section element fades/slides in on scroll. Hero text animates on load. Process line draws. Cards tilt on hover. Cursor works.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Portfolio V2 — all sections, animations, responsive"
```
