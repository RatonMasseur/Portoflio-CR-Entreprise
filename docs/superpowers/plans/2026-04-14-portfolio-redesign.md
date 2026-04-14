# Portfolio V2 — Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réécrire la section Process en GSAP pur, recentrer le Hero avec titre animé, remplacer les boutons par l'animation skew-text, rendre la navbar adaptive dark/light, corriger le gradient footer, et wrapper Services/Tools dans des capsules, tout en remplaçant le logo WebP par SVG.

**Architecture:** Astro SSG + GSAP ScrollTrigger + vanilla JS. Aucun React island dans Process (suppression de ProcessCards.tsx). Toute la logique de scroll/thème navbar consolidée dans `navbar.ts`. Le logo SVG utilise `fill="currentColor"` via inline SVG dans Navbar.astro.

**Tech Stack:** Astro, GSAP + ScrollTrigger, Lenis, Tailwind CSS, vanilla JS/TS

---

## File Map

| Action | Fichier |
|--------|---------|
| Modify | `src/components/Navbar.astro` |
| Modify | `src/scripts/navbar.ts` |
| Modify | `src/components/Hero.astro` |
| Modify | `src/styles/global.css` |
| Modify | `src/components/Contact.astro` |
| Modify | `src/components/Footer.astro` |
| Modify | `src/components/Process.astro` |
| Modify | `src/scripts/animations.ts` |
| Modify | `src/components/Services.astro` |
| Modify | `src/components/Tools.astro` |
| Delete | `src/components/ProcessCards.tsx` |
| Create | `public/images/logo.svg` |

---

## Task 1 : Logo SVG

**Files:**
- Create: `public/images/logo.svg`
- Modify: `src/components/Navbar.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1 : Créer le fichier SVG**

Créer `public/images/logo.svg` avec le contenu suivant (issu de "CR Logo Blanc.svg", `fill` remplacé par `currentColor`, viewBox réduit au contenu utile sans fond noir) :

```svg
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 500 500"
  fill="currentColor"
  aria-label="Robin Carivenc"
  role="img">
  <path d="M1880 3409 c-116 -21 -117 -22 -130 -97 -15 -87 -58 -177 -116 -241
  -91 -101 -188 -149 -324 -159 l-84 -7 -24 -75 c-47 -149 -46 -333 2 -471 95
  -274 349 -495 641 -560 84 -19 311 -16 403 5 41 9 103 28 138 42 65 26 154 72
  154 80 0 2 -34 71 -75 153 l-74 150 -58 -29 c-84 -42 -165 -60 -268 -60 -164
  0 -277 44 -375 146 -37 39 -73 89 -93 131 -30 64 -32 74 -32 183 0 112 1 117
  37 193 70 147 187 232 360 263 132 24 272 2 386 -61 l42 -24 75 149 c41 83 75
  152 75 154 0 12 -107 70 -171 91 -144 50 -359 69 -489 44z"/>
  <path d="M2590 2600 l0 -790 180 0 180 0 2 307 3 307 210 -271 209 -272 24 47
  c27 54 75 107 114 128 15 8 53 20 83 27 l55 13 -150 179 c-82 99 -150 182
  -150 185 0 3 27 17 59 32 223 104 317 375 219 635 -27 74 -119 168 -200 206
  -109 52 -155 57 -510 57 l-328 0 0 -790z m497 500 c40 -5 90 -18 110 -29 70
  -35 107 -141 83 -231 -27 -102 -86 -138 -236 -147 l-94 -6 0 212 0 211 33 0
  c17 0 65 -5 104 -10z"/>
  <path d="M3578 1907 c-95 -80 -36 -220 86 -204 59 8 96 52 96 113 0 39 -5 51
  -34 80 -28 28 -41 34 -77 34 -31 0 -52 -7 -71 -23z"/>
</svg>
```

Note: Le SVG source utilise un système de coordonnées `scale(0.1,-0.1)` avec origine en bas. Conserver le fichier SVG original tel quel mais remplacer uniquement `fill="#000000"` par `fill="currentColor"` sur le `<g>`. Voici le fichier complet exact à créer :

```svg
<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000"
 preserveAspectRatio="xMidYMid meet"
 aria-label="Robin Carivenc" role="img">
<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1880 3409 c-116 -21 -117 -22 -130 -97 -15 -87 -58 -177 -116 -241
-91 -101 -188 -149 -324 -159 l-84 -7 -24 -75 c-47 -149 -46 -333 2 -471 95
-274 349 -495 641 -560 84 -19 311 -16 403 5 41 9 103 28 138 42 65 26 154 72
154 80 0 2 -34 71 -75 153 l-74 150 -58 -29 c-84 -42 -165 -60 -268 -60 -164
0 -277 44 -375 146 -37 39 -73 89 -93 131 -30 64 -32 74 -32 183 0 112 1 117
37 193 70 147 187 232 360 263 132 24 272 2 386 -61 l42 -24 75 149 c41 83 75
152 75 154 0 12 -107 70 -171 91 -144 50 -359 69 -489 44z"/>
<path d="M2590 2600 l0 -790 180 0 180 0 2 307 3 307 210 -271 209 -272 24 47
c27 54 75 107 114 128 15 8 53 20 83 27 l55 13 -150 179 c-82 99 -150 182
-150 185 0 3 27 17 59 32 223 104 317 375 219 635 -27 74 -119 168 -200 206
-109 52 -155 57 -510 57 l-328 0 0 -790z m497 500 c40 -5 90 -18 110 -29 70
-35 107 -141 83 -231 -27 -102 -86 -138 -236 -147 l-94 -6 0 212 0 211 33 0
c17 0 65 -5 104 -10z"/>
<path d="M3578 1907 c-95 -80 -36 -220 86 -204 59 8 96 52 96 113 0 39 -5 51
-34 80 -28 28 -41 34 -77 34 -31 0 -52 -7 -71 -23z"/>
</g>
</svg>
```

- [ ] **Step 2 : Mettre à jour Navbar.astro — remplacer img par inline SVG**

Dans `src/components/Navbar.astro`, remplacer le bloc `<a href="#">` contenant l'image logo par :

```html
<a href="#" class="navbar-logo shrink-0 relative z-10" style="color: white;">
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="44" height="44" viewBox="0 0 500 500"
    preserveAspectRatio="xMidYMid meet"
    aria-label="Robin Carivenc" role="img"
    style="display:block;">
    <g transform="translate(0,500) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M1880 3409 c-116 -21 -117 -22 -130 -97 -15 -87 -58 -177 -116 -241 -91 -101 -188 -149 -324 -159 l-84 -7 -24 -75 c-47 -149 -46 -333 2 -471 95 -274 349 -495 641 -560 84 -19 311 -16 403 5 41 9 103 28 138 42 65 26 154 72 154 80 0 2 -34 71 -75 153 l-74 150 -58 -29 c-84 -42 -165 -60 -268 -60 -164 0 -277 44 -375 146 -37 39 -73 89 -93 131 -30 64 -32 74 -32 183 0 112 1 117 37 193 70 147 187 232 360 263 132 24 272 2 386 -61 l42 -24 75 149 c41 83 75 152 75 154 0 12 -107 70 -171 91 -144 50 -359 69 -489 44z"/>
      <path d="M2590 2600 l0 -790 180 0 180 0 2 307 3 307 210 -271 209 -272 24 47 c27 54 75 107 114 128 15 8 53 20 83 27 l55 13 -150 179 c-82 99 -150 182 -150 185 0 3 27 17 59 32 223 104 317 375 219 635 -27 74 -119 168 -200 206 -109 52 -155 57 -510 57 l-328 0 0 -790z m497 500 c40 -5 90 -18 110 -29 70 -35 107 -141 83 -231 -27 -102 -86 -138 -236 -147 l-94 -6 0 212 0 211 33 0 c17 0 65 -5 104 -10z"/>
      <path d="M3578 1907 c-95 -80 -36 -220 86 -204 59 8 96 52 96 113 0 39 -5 51 -34 80 -28 28 -41 34 -77 34 -31 0 -52 -7 -71 -23z"/>
    </g>
  </svg>
</a>
```

- [ ] **Step 3 : Mettre à jour Footer.astro — remplacer img par inline SVG**

Dans `src/components/Footer.astro`, remplacer `<img src="/images/logo-white.webp" ...>` par :

```html
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="40" height="40" viewBox="0 0 500 500"
  preserveAspectRatio="xMidYMid meet"
  aria-label="Robin Carivenc" role="img"
  style="display:block; color: rgba(255,255,255,0.6);">
  <g transform="translate(0,500) scale(0.1,-0.1)" fill="currentColor" stroke="none">
    <path d="M1880 3409 c-116 -21 -117 -22 -130 -97 -15 -87 -58 -177 -116 -241 -91 -101 -188 -149 -324 -159 l-84 -7 -24 -75 c-47 -149 -46 -333 2 -471 95 -274 349 -495 641 -560 84 -19 311 -16 403 5 41 9 103 28 138 42 65 26 154 72 154 80 0 2 -34 71 -75 153 l-74 150 -58 -29 c-84 -42 -165 -60 -268 -60 -164 0 -277 44 -375 146 -37 39 -73 89 -93 131 -30 64 -32 74 -32 183 0 112 1 117 37 193 70 147 187 232 360 263 132 24 272 2 386 -61 l42 -24 75 149 c41 83 75 152 75 154 0 12 -107 70 -171 91 -144 50 -359 69 -489 44z"/>
    <path d="M2590 2600 l0 -790 180 0 180 0 2 307 3 307 210 -271 209 -272 24 47 c27 54 75 107 114 128 15 8 53 20 83 27 l55 13 -150 179 c-82 99 -150 182 -150 185 0 3 27 17 59 32 223 104 317 375 219 635 -27 74 -119 168 -200 206 -109 52 -155 57 -510 57 l-328 0 0 -790z m497 500 c40 -5 90 -18 110 -29 70 -35 107 -141 83 -231 -27 -102 -86 -138 -236 -147 l-94 -6 0 212 0 211 33 0 c17 0 65 -5 104 -10z"/>
    <path d="M3578 1907 c-95 -80 -36 -220 86 -204 59 8 96 52 96 113 0 39 -5 51 -34 80 -28 28 -41 34 -77 34 -31 0 -52 -7 -71 -23z"/>
  </g>
</svg>
```

- [ ] **Step 4 : Vérifier visuellement**

Lancer `npm run dev` et vérifier que le logo CR apparaît correctement dans la navbar et le footer.

- [ ] **Step 5 : Commit**

```bash
git add public/images/logo.svg src/components/Navbar.astro src/components/Footer.astro
git commit -m "feat: replace logo WebP with inline SVG (currentColor)"
```

---

## Task 2 : Boutons — skew text animation

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Contact.astro`

- [ ] **Step 1 : Remplacer les classes de boutons dans global.css**

Dans `src/styles/global.css`, trouver et remplacer la section `.btn-primary` existante ainsi que toutes les classes `.btn-arrow-*` :

```css
/* ─── Boutons — skew text animation ──────────────────────── */
.btn-primary,
.btn-outline,
.btn-outline-dark {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 100px;
  padding: 13px 28px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  text-decoration: none;
  min-height: 44px;
  transition: opacity 0.2s;
}

.btn-primary {
  background: var(--gradient-cta);
  color: #ffffff;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: var(--text-primary);
}

.btn-outline-dark {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
}

.btn-primary:hover,
.btn-outline:hover,
.btn-outline-dark:hover {
  opacity: 0.85;
}

/* Texte intérieur — deux copies pour l'animation skew */
.btn-text-front,
.btn-text-back {
  display: block;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1),
              opacity 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

.btn-text-back {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(110%) skewY(12deg);
  opacity: 0;
}

.btn-primary:hover .btn-text-front,
.btn-outline:hover .btn-text-front,
.btn-outline-dark:hover .btn-text-front {
  transform: translateY(-110%) skewY(-12deg);
  opacity: 0;
}

.btn-primary:hover .btn-text-back,
.btn-outline:hover .btn-text-back,
.btn-outline-dark:hover .btn-text-back {
  transform: translateY(0) skewY(0);
  opacity: 1;
}
```

Supprimer également les classes suivantes si elles existent dans global.css :
`.btn-arrow-icon`, `.btn-arrow-inner`, `.btn-arrow-light`, `.btn-arrow-white`

- [ ] **Step 2 : Mettre à jour les boutons dans Hero.astro**

Dans `src/components/Hero.astro`, remplacer les deux boutons :

```html
<div class="flex flex-wrap gap-4 justify-center">
  <a href="#contact" class="btn-primary">
    <span class="btn-text-front">Parlons de votre projet</span>
    <span class="btn-text-back">Parlons de votre projet</span>
  </a>
  <a href="#realisations" class="btn-outline-dark">
    <span class="btn-text-front">Voir mes réalisations</span>
    <span class="btn-text-back">Voir mes réalisations</span>
  </a>
</div>
```

Supprimer tous les `<span class="btn-arrow-icon ...">` et leurs SVG enfants.

- [ ] **Step 3 : Mettre à jour le bouton dans Footer.astro**

Dans `src/components/Footer.astro`, remplacer le bouton CTA :

```html
<a href="#contact" class="btn-primary text-base px-8 py-4">
  <span class="btn-text-front">Démarrer le projet</span>
  <span class="btn-text-back">Démarrer le projet</span>
</a>
```

- [ ] **Step 4 : Mettre à jour le bouton dans Contact.astro**

Dans `src/components/Contact.astro`, remplacer le `<button type="submit">` :

```html
<button type="submit" class="btn-primary w-full justify-center text-base py-4">
  <span class="btn-text-front">Envoyer ma demande</span>
  <span class="btn-text-back">Envoyer ma demande</span>
</button>
```

- [ ] **Step 5 : Vérifier visuellement**

`npm run dev` — survoler chaque bouton et vérifier l'animation skew. Vérifier que les anciens SVG flèches sont absents.

- [ ] **Step 6 : Commit**

```bash
git add src/styles/global.css src/components/Hero.astro src/components/Footer.astro src/components/Contact.astro
git commit -m "feat: replace arrow buttons with skew text animation"
```

---

## Task 3 : Navbar — adaptive dark/light + consolidation

**Files:**
- Modify: `src/components/Navbar.astro`
- Modify: `src/scripts/navbar.ts`

- [ ] **Step 1 : Supprimer le script inline de Navbar.astro**

Dans `src/components/Navbar.astro`, supprimer entièrement le bloc `<script>…</script>` en fin de fichier (de la ligne `const navbarBg = document.getElementById('navbar-bg')!;` jusqu'à la fermeture `</script>`). Toute la logique est déplacée dans `navbar.ts`.

- [ ] **Step 2 : Ajouter les attributs data-dark-section**

Dans `src/components/Hero.astro`, vérifier que la `<section>` porte `data-dark-section` (elle l'a déjà).

Dans `src/components/Services.astro`, vérifier que la `<section id="services">` porte `data-dark-section` (déjà présent).

Dans `src/components/Tools.astro`, vérifier/ajouter `data-dark-section` sur la `<section id="outils">`.

Dans `src/components/Footer.astro`, ajouter `data-dark-section` sur le `<div class="footer-cta-section">` et sur `<footer class="footer-bar">`.

- [ ] **Step 3 : Réécrire navbar.ts**

Remplacer entièrement le contenu de `src/scripts/navbar.ts` :

```typescript
const navbar = document.getElementById('navbar')!;
const navbarBg = document.getElementById('navbar-bg')!;
const navbarLogo = navbar.querySelector<SVGElement | HTMLElement>('.navbar-logo')!;
const menuToggle = document.getElementById('menu-toggle')!;
const mobileMenu = document.getElementById('mobile-menu')!;
const bar1 = document.getElementById('bar1')!;
const bar2 = document.getElementById('bar2')!;
const bar3 = document.getElementById('bar3')!;
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');

// ── Hide/show on scroll ──────────────────────────────────────
let lastScrollY = 0;
let isMenuOpen = false;

window.addEventListener('scroll', () => {
  if (isMenuOpen) return;
  const currentY = window.scrollY;
  navbar.style.top = (currentY > lastScrollY && currentY > 100) ? '-80px' : '16px';
  lastScrollY = currentY;
});

// ── Dark / Light theme detection ─────────────────────────────
function applyDarkTheme() {
  navbarBg.style.background = 'rgba(10,8,6,0.88)';
  navbarBg.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)';
  navbarLogo.style.color = '#ffffff';
  navbar.querySelectorAll<HTMLElement>('.nav-link, .contact-nav-btn').forEach(el => {
    if (!el.classList.contains('contact-nav-btn')) {
      el.style.color = 'rgba(255,255,255,0.85)';
    }
  });
}

function applyLightTheme() {
  navbarBg.style.background = 'rgba(255,255,255,0.92)';
  navbarBg.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.06)';
  navbarLogo.style.color = '#0f0d0a';
  navbar.querySelectorAll<HTMLElement>('.nav-link').forEach(el => {
    el.style.color = 'rgba(15,13,10,0.75)';
  });
}

// Observer: si une section dark intersecte le tiers supérieur de l'écran → dark navbar
const darkSections = document.querySelectorAll<HTMLElement>('[data-dark-section]');
let darkCount = 0;

const themeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      darkCount++;
    } else {
      darkCount = Math.max(0, darkCount - 1);
    }
  });
  if (darkCount > 0) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
}, {
  rootMargin: '-0px 0px -85% 0px', // déclenche quand la section touche les 15% supérieurs
  threshold: 0,
});

darkSections.forEach(s => themeObserver.observe(s));

// État initial basé sur la première section visible
if (darkSections.length > 0) {
  applyDarkTheme(); // Hero est toujours la première section → dark par défaut
}

// ── Mobile menu ───────────────────────────────────────────────
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

// ── Section active highlight ──────────────────────────────────
const sectionIds = ['services', 'realisations', 'a-propos', 'outils', 'processus', 'faq'];

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) activeObserver.observe(el);
});
```

- [ ] **Step 4 : Ajouter transition CSS sur navbarBg**

Dans `src/components/Navbar.astro`, dans le `<style>`, ajouter :

```css
#navbar-bg {
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.navbar-logo {
  transition: color 0.3s ease;
}
.nav-link {
  transition: color 0.3s ease;
}
```

- [ ] **Step 5 : Vérifier visuellement**

`npm run dev` — scroller lentement. La navbar doit :
- Être dark (fond sombre, texte blanc) au-dessus du hero
- Passer light (fond blanc, texte sombre) sur les sections claires
- Revenir dark au-dessus de Services/Tools/Footer
- Disparaître en scrollant vers le bas, réapparaître vers le haut

- [ ] **Step 6 : Commit**

```bash
git add src/components/Navbar.astro src/scripts/navbar.ts src/components/Services.astro src/components/Tools.astro src/components/Footer.astro
git commit -m "feat: navbar adaptive dark/light theme + consolidated scroll logic"
```

---

## Task 4 : Hero — layout centré + titre animé

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1 : Réécrire Hero.astro**

Remplacer entièrement le contenu de `src/components/Hero.astro` :

```astro
---
import HeroBackground from './HeroBackground.tsx';
---
<section
  class="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
  style="background: #0a0806;"
  data-dark-section
>

  <!-- Fond (orbs, grille, grain) — identique, ne pas modifier -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <HeroBackground client:only="react" />
    <div class="hero-grid"></div>
    <div class="grain-hero"></div>
  </div>

  <div class="relative w-full max-w-3xl mx-auto flex flex-col items-center gap-8" style="z-index: 3;">

    <!-- Label -->
    <div class="flex items-center gap-3" data-animate="fade-up">
      <span class="section-label">Développeur Web Freelance · Alsace</span>
      <div class="h-px w-10" style="background: rgba(255,255,255,0.12);"></div>
      <span class="w-2 h-2 rounded-full" style="background: var(--accent-primary); box-shadow: 0 0 10px rgba(32,96,216,0.6);"></span>
      <span class="label-tech" style="color: rgba(255,255,255,0.45);">Disponible</span>
    </div>

    <!-- Titre -->
    <div id="hero-headline">
      <h1 class="font-['Bricolage_Grotesque'] leading-[0.95] tracking-tight" style="font-size: clamp(2.2rem, 5vw, 4.5rem); font-weight: 800; color: #ffffff;">
        Pas une agence.<br />
        Pas un template.
      </h1>
      <div class="hero-animated-line font-['Bricolage_Grotesque'] italic mt-3" style="font-size: clamp(2.2rem, 5vw, 4.5rem); font-weight: 800; color: var(--accent-light);">
        Votre&nbsp;<span class="hero-word-outer"><span class="hero-word-inner" id="hero-cycling-word">présence</span></span>.
      </div>
    </div>

    <!-- Description -->
    <p class="text-lg leading-relaxed max-w-md" style="color: rgba(255,255,255,0.58);" data-animate="fade-up" data-animate-delay="100">
      Un site professionnel qui vous ressemble, conçu pour convertir vos visiteurs en clients. Livré en 7 jours.
    </p>

    <!-- CTAs -->
    <div class="flex flex-wrap gap-4 justify-center" data-animate="fade-up" data-animate-delay="180">
      <a href="#contact" class="btn-primary">
        <span class="btn-text-front">Parlons de votre projet</span>
        <span class="btn-text-back">Parlons de votre projet</span>
      </a>
      <a href="#realisations" class="btn-outline-dark">
        <span class="btn-text-front">Voir mes réalisations</span>
        <span class="btn-text-back">Voir mes réalisations</span>
      </a>
    </div>

    <!-- Disponibilité -->
    <p class="label-tech" style="color: rgba(255,255,255,0.35);" data-animate="fade-up" data-animate-delay="240">
      Disponible pour nouveaux projets · Délai garanti
    </p>

  </div>

  <!-- Scroll indicator -->
  <div class="absolute right-6 bottom-8 hidden lg:flex flex-col items-center gap-3">
    <p class="label-tech" style="writing-mode: vertical-rl; color: rgba(255,255,255,0.3);">Découvrir</p>
    <div class="w-px h-12" style="background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);"></div>
  </div>

</section>

<style>
  .hero-grid {
    position: absolute;
    bottom: -10%;
    left: 50%;
    width: 240%;
    height: 75%;
    transform: translateX(-50%) perspective(700px) rotateX(58deg);
    transform-origin: center bottom;
    background-image:
      linear-gradient(rgba(32, 96, 216, 0.18) 1px, transparent 1px),
      linear-gradient(90deg, rgba(32, 96, 216, 0.18) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 65%);
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 65%);
    animation: grid-flow 5s linear infinite;
  }

  @keyframes grid-flow {
    from { background-position: 0 0; }
    to   { background-position: 0 80px; }
  }

  .grain-hero {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    opacity: 0.07;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  /* Bouton outline adapté fond dark — scoped Hero */
  .btn-outline-dark {
    border-color: rgba(255, 255, 255, 0.2);
  }
  .btn-outline-dark:hover {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.05);
    opacity: 1;
  }

  /* Animation titre cyclique */
  .hero-word-outer {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
  }

  .hero-word-inner {
    display: inline-block;
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1),
                opacity 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .hero-word-inner.exit {
    transform: translateY(-110%) skewY(-12deg);
    opacity: 0;
  }

  .hero-word-inner.enter {
    transform: translateY(110%) skewY(12deg);
    opacity: 0;
  }
</style>

<script>
  const words = ['présence', 'vitrine', 'site'];
  let currentIndex = 0;
  const outer = document.querySelector<HTMLElement>('.hero-word-outer')!;
  const initial = document.getElementById('hero-cycling-word')!;

  function cycleWord() {
    currentIndex = (currentIndex + 1) % words.length;

    // Créer le nouvel élément
    const next = document.createElement('span');
    next.className = 'hero-word-inner enter';
    next.textContent = words[currentIndex];
    outer.appendChild(next);

    // Animer sortie de l'actuel
    const current = outer.children[0] as HTMLElement;
    current.classList.add('exit');

    // Après transition : nettoyer et activer le nouvel élément
    setTimeout(() => {
      current.remove();
      next.classList.remove('enter');
    }, 500);
  }

  // Démarrer après un premier délai
  setInterval(cycleWord, 2500);
</script>
```

- [ ] **Step 2 : Vérifier visuellement**

`npm run dev` — vérifier :
- Hero centré verticalement et horizontalement
- Titre en deux lignes statiques + ligne animée en bleu italic
- Les mots "présence" → "vitrine" → "site" cyclent toutes les 2.5s avec animation skew
- Boutons centrés sous la description

- [ ] **Step 3 : Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: hero centered layout + animated cycling title"
```

---

## Task 5 : Footer — gradient imperceptible

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1 : Adoucir le gradient de Contact.astro**

Dans `src/components/Contact.astro`, trouver la propriété `background` de la `<section id="contact">` (actuellement inline style) et la remplacer :

```html
<section id="contact" class="py-32 md:py-20 px-6 relative"
  style="background: linear-gradient(to bottom, #ffffff 0%, #ffffff 35%, rgba(10,8,6,0) 42%, #0a0806 72%);">
```

- [ ] **Step 2 : Vérifier visuellement**

Scroller jusqu'au footer. Le passage blanc → noir doit être imperceptible dans sa zone de début. Comparer avec le screenshot Mixpanel : le gradient doit démarrer invisible.

- [ ] **Step 3 : Commit**

```bash
git add src/components/Contact.astro
git commit -m "fix: soften contact→footer gradient, eliminate white flash"
```

---

## Task 6 : Capsules — Services + Tools

**Files:**
- Modify: `src/components/Services.astro`
- Modify: `src/components/Tools.astro`

- [ ] **Step 1 : Wrapper la section Services dans une capsule**

Dans `src/components/Services.astro`, modifier la `<section>` ouvrante :

```html
<!-- Avant -->
<section id="services" class="py-32 md:py-20 px-6 relative overflow-hidden" style="background: #080808;" data-dark-section>

<!-- Après -->
<section id="services" class="py-16 px-4 md:px-6 relative" style="background: var(--bg-primary);" data-dark-section>
  <div class="section-capsule">
```

Ajouter la balise fermante `</div>` juste avant `</section>`.

Ajouter dans le `<style>` de Services.astro :

```css
.section-capsule {
  max-width: 1200px;
  margin: 0 auto;
  background: #080808;
  border-radius: 24px;
  overflow: hidden;
  padding: 4rem 2rem;
  box-shadow: 0 8px 64px rgba(0, 0, 0, 0.15);
}
```

- [ ] **Step 2 : Wrapper la section Tools dans une capsule**

Dans `src/components/Tools.astro`, même opération :

```html
<!-- Avant -->
<section id="outils" … style="background: #080808;" data-dark-section>

<!-- Après -->
<section id="outils" class="py-16 px-4 md:px-6 relative" style="background: var(--bg-primary);" data-dark-section>
  <div class="section-capsule">
```

Ajouter `</div>` avant `</section>`, et le même CSS `.section-capsule` dans le `<style>` scoped de Tools.astro (ou le déplacer dans global.css si déjà défini dans Services).

**Note :** Pour éviter la duplication, déplacer `.section-capsule` dans `global.css` après la section des boutons.

- [ ] **Step 3 : Vérifier visuellement**

`npm run dev` — les sections Services et Tools doivent apparaître comme des capsules sombres arrondies sur fond blanc de page. La navbar doit rester en mode dark quand on scrolle sur ces sections.

- [ ] **Step 4 : Commit**

```bash
git add src/components/Services.astro src/components/Tools.astro src/styles/global.css
git commit -m "feat: wrap Services and Tools in dark capsule on white background"
```

---

## Task 7 : Process — Sticky Cards GSAP (réécriture complète)

**Files:**
- Delete: `src/components/ProcessCards.tsx`
- Modify: `src/components/Process.astro`
- Modify: `src/scripts/animations.ts`

- [ ] **Step 1 : Supprimer ProcessCards.tsx**

```bash
rm src/components/ProcessCards.tsx
```

- [ ] **Step 2 : Réécrire Process.astro**

Remplacer entièrement le contenu de `src/components/Process.astro` :

```astro
---
const steps = [
  {
    tag: 'Étape 01',
    title: 'Cahier des charges',
    description: "On discute de votre activité, vos clients cibles, ce que vous voulez mettre en avant. 30 minutes suffisent.",
    details: ['Appel découverte gratuit', 'Cahier des charges simple', 'Devis sous 24h'],
    bg: '#0f0d0a',
    num: '01',
  },
  {
    tag: 'Étape 02',
    title: 'Design',
    description: "Je vous présente une maquette complète du site. On ajuste ensemble jusqu'à ce que ce soit parfait.",
    details: ['Maquette Figma interactive', 'Révisions illimitées', 'Validation avant développement'],
    bg: '#0d1420',
    num: '02',
  },
  {
    tag: 'Étape 03',
    title: 'Réalisation',
    description: "Je code le site à la main, optimise le SEO, configure l'hébergement. Vous ne touchez à rien.",
    details: ['Code propre & performant', 'SEO technique inclus', 'Tests mobile & desktop'],
    bg: '#0b1626',
    num: '03',
  },
  {
    tag: 'Étape 04',
    title: 'Mise en ligne',
    description: 'Votre site est en ligne. Je vous forme en 30 minutes à gérer votre contenu — et je reste disponible.',
    details: ['Déploiement & DNS', 'Formation contenu incluse', 'Support 3 mois offert'],
    bg: '#09182e',
    num: '04',
  },
];
---

<section id="processus" style="background: var(--bg-primary); overflow-x: clip;">

  <!-- Header -->
  <div class="max-w-3xl mx-auto px-6 pt-32 pb-16 text-center" data-animate="fade-up">
    <span class="section-label mb-4 block">Processus</span>
    <h2 class="font-['Bricolage_Grotesque'] leading-tight" style="font-size: var(--type-h2); font-weight: 700; color: var(--text-primary);">
      Comment ça<br />
      <span style="color: var(--accent-primary);">se passe ?</span>
    </h2>
    <p class="mt-4 text-base max-w-sm mx-auto" style="color: var(--text-muted);">
      Un process simple et transparent, du brief à la mise en ligne en 7 jours.
    </p>
  </div>

  <!-- Desktop: sticky stack -->
  <div class="process-track hidden md:block" style="height: 400vh;">
    <div class="process-sticky">
      {steps.map((step, i) => (
        <div class="process-card" data-card={i} style={`background: ${step.bg};`}>
          <!-- Header card -->
          <div class="process-card-header">
            <span class="process-card-tag">{step.tag}</span>
            <h3 class="process-card-title">{step.title}</h3>
          </div>
          <!-- Body card -->
          <div class="process-card-body">
            <p class="process-card-desc">{step.description}</p>
            <ul class="process-card-list">
              {step.details.map((d) => (
                <li>
                  <span class="process-card-dot"></span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <!-- Numéro décoratif -->
          <span class="process-card-num" aria-hidden="true">{step.num}</span>
        </div>
      ))}
    </div>
  </div>

  <!-- Mobile: liste verticale -->
  <div class="md:hidden max-w-3xl mx-auto px-6 pb-20 flex flex-col gap-4">
    {steps.map((step, i) => (
      <div
        class="rounded-2xl p-8"
        style={`background: ${step.bg};`}
        data-animate="fade-up"
        data-animate-delay={i * 80}
      >
        <span class="process-card-tag mb-3 block">{step.tag}</span>
        <h3 class="font-['Bricolage_Grotesque'] font-bold mb-3" style="font-size: var(--type-h3); color: #ffffff;">{step.title}</h3>
        <p class="text-sm leading-relaxed" style="color: rgba(255,255,255,0.55);">{step.description}</p>
      </div>
    ))}
  </div>

</section>

<style>
  .process-track {
    position: relative;
  }

  .process-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .process-card {
    position: absolute;
    width: min(768px, 90vw);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    transform-origin: top center;
    /* État initial géré par GSAP */
  }

  .process-card-header {
    padding: 28px 48px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .process-card-tag {
    display: block;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(91, 150, 245, 0.65);
    margin-bottom: 6px;
  }

  .process-card-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    color: #ffffff;
    margin: 0;
    line-height: 1.2;
  }

  .process-card-body {
    padding: 28px 48px 40px;
    position: relative;
    z-index: 1;
  }

  .process-card-desc {
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.55);
  }

  .process-card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .process-card-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.45);
  }

  .process-card-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(91, 150, 245, 0.6);
    flex-shrink: 0;
  }

  .process-card-num {
    position: absolute;
    right: -12px;
    bottom: -24px;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800;
    font-size: clamp(100px, 16vw, 180px);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    color: rgba(91, 150, 245, 0.06);
  }
</style>
```

- [ ] **Step 3 : Ajouter initProcessCards() dans animations.ts**

À la fin de `src/scripts/animations.ts`, ajouter :

```typescript
// ── Process — Sticky Cards GSAP ─────────────────────────────
function initProcessCards(): void {
  const track = document.querySelector<HTMLElement>('.process-track');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.process-card'));
  if (!track || cards.length === 0) return;

  const n = cards.length; // 4

  // État initial : première carte visible, les autres en dessous
  cards.forEach((card, i) => {
    gsap.set(card, {
      y: i === 0 ? 0 : 80,
      scale: 1,
      opacity: i === 0 ? 1 : 0,
    });
  });

  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: ({ progress }) => {
      const cardProgress = progress * n; // 0 → 4
      const activeIndex = Math.min(Math.floor(cardProgress), n - 1);
      const localProgress = cardProgress - Math.floor(cardProgress); // 0→1 dans le slot courant

      cards.forEach((card, i) => {
        if (i < activeIndex) {
          // Cartes passées : empilées sous la carte active
          const depth = activeIndex - i;
          gsap.set(card, {
            scale: Math.max(0.85, 1 - depth * 0.05),
            y: -depth * 20,
            opacity: 1,
          });
        } else if (i === activeIndex) {
          // Carte active : pleinement visible
          gsap.set(card, { scale: 1, y: 0, opacity: 1 });
        } else if (i === activeIndex + 1) {
          // Carte suivante : entre depuis le bas
          gsap.set(card, {
            scale: gsap.utils.interpolate(0.95, 1, localProgress),
            y: gsap.utils.interpolate(80, 0, localProgress),
            opacity: gsap.utils.interpolate(0, 1, localProgress),
          });
        } else {
          // Cartes futures : cachées sous
          gsap.set(card, { scale: 1, y: 80, opacity: 0 });
        }
      });
    },
  });
}

initProcessCards();
```

- [ ] **Step 4 : Vérifier visuellement**

`npm run dev` — scroller lentement sur la section Process :
- La carte 01 "Cahier des charges" est visible en arrivant
- En scrollant, la carte 02 monte depuis le bas, la 01 se réduit légèrement et monte
- Idem pour 03 et 04
- Les cartes s'empilent visuellement (décalage + scale)
- Sur mobile, la liste verticale est affichée à la place

- [ ] **Step 5 : Commit**

```bash
git add src/components/Process.astro src/scripts/animations.ts
git commit -m "feat: rebuild Process section with pure GSAP sticky cards, remove React island"
git rm src/components/ProcessCards.tsx
git commit -m "chore: remove unused ProcessCards.tsx React island"
```

---

## Self-Review

**Spec coverage :**
- ✅ Task 1 — Logo SVG (section 7 spec)
- ✅ Task 2 — Boutons skew animation (section 3 spec)
- ✅ Task 3 — Navbar adaptive dark/light + consolidation (section 4 spec)
- ✅ Task 4 — Hero centré + titre animé (section 2 spec)
- ✅ Task 5 — Footer gradient (section 5 spec)
- ✅ Task 6 — Capsules Services + Tools (section 6 spec)
- ✅ Task 7 — Process GSAP (section 1 spec)

**Placeholders scan :** Aucun TBD, aucun "implement later". Chaque step a son code complet.

**Type consistency :**
- `initProcessCards()` définie et appelée dans Task 7, pas référencée ailleurs
- `.btn-text-front` / `.btn-text-back` définis en Task 2 Step 1, utilisés dans Steps 2/3/4
- `.section-capsule` défini en Task 6 Step 1, réutilisé Step 2 avec note de déduplication
- `.navbar-logo` référencé en Task 3 Step 3 (`navbar.querySelectorAll('.navbar-logo')`), l'élément porte cette classe depuis Task 1 Step 2

---

## Ordre d'implémentation

Les tâches sont indépendantes et peuvent être faites dans cet ordre recommandé :

1. **Task 1** (Logo SVG) — rapide, visible immédiatement
2. **Task 2** (Boutons) — s'assurer que les styles sont prêts avant Hero
3. **Task 3** (Navbar) — dépend de `data-dark-section` sur Hero (existant)
4. **Task 4** (Hero) — réutilise les boutons de Task 2
5. **Task 5** (Footer gradient) — indépendant
6. **Task 6** (Capsules) — ajoute `data-dark-section` sur Tools, ce qui améliore Task 3
7. **Task 7** (Process) — le plus long, fait en dernier
