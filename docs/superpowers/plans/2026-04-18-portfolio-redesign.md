# Portfolio V2 — Redesign Conversion & Refonte Visuelle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refonte complète du portfolio — fond blanc, palette pastel colorée, boutons text-change unifiés, bento grid réalisations, process animation stabilisée.

**Architecture:** Token-first — on met à jour les variables CSS dans global.css en premier, la cascade propage les changements dans tous les composants. Ensuite les composants sont mis à jour section par section dans l'ordre de dépendance.

**Tech Stack:** Astro SSG, Tailwind CSS, GSAP + ScrollTrigger, Lenis, CSS Grid natif (remplace EmblaCarousel)

---

## File Map

| Fichier | Action |
|---------|--------|
| `src/styles/global.css` | Modifier tokens :root + ajouter variables palette + supprimer btn-arrow |
| `src/components/Hero.astro` | Passer en light (supprimer grain, data-dark-section, rgba blanc → sombre) |
| `src/components/About.astro` | Remplacer btn-arrow par text-change |
| `src/components/FAQ.astro` | Remplacer btn-arrow par text-change |
| `src/components/Personas.astro` | Remplacer btn-arrow par text-change |
| `src/components/Navbar.astro` | Remplacer contact-nav-arrow par text-change |
| `src/components/Portfolio.astro` | Remplacer carousel EmblaCarousel par bento grid CSS |
| `src/scripts/animations.ts` | Ajouter guard mobile sur initProcessCards() |

---

## Task 1 — Tokens CSS (fondation)

**Files:**
- Modify: `src/styles/global.css:21-43`

- [ ] **Step 1: Remplacer les tokens dark dans :root**

Dans `src/styles/global.css`, remplacer les lignes 21–43 par :

```css
  /* Backgrounds */
  --bg-primary:    #ffffff;
  --bg-card:       #F9FAFB;
  --bg-card-hover: #F3F4F6;

  /* Borders */
  --border-card:   #E5E7EB;
  --border-hover:  rgba(139, 92, 246, 0.45);

  /* Text */
  --text-primary:   #111827;
  --text-secondary: #6B7280;
  --text-muted:     rgba(17, 24, 39, 0.45);

  /* Accent (conservé) */
  --accent-primary: #3B82F6;
  --accent-light:   #60a5fa;
  --accent-deep:    #2563eb;
  --gradient-cta:   linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  --glow:           rgba(59, 130, 246, 0.12);

  /* Glass */
  --glass-bg:      rgba(0, 0, 0, 0.03);
  --glass-border:  rgba(0, 0, 0, 0.08);
```

- [ ] **Step 2: Ajouter les variables palette pastel après la fermeture de :root (ligne 44)**

Après `}` de `:root`, ajouter :

```css
/* ─── Palette bento — 6 couleurs ─────────────────────────── */
:root {
  --color-lavender:      #E8DCFF;
  --color-lavender-text: #6B21A8;
  --color-rose:          #FFD6E0;
  --color-rose-text:     #BE185D;
  --color-sage:          #D4F1C7;
  --color-sage-text:     #166534;
  --color-lemon:         #FFF3C4;
  --color-lemon-text:    #854D0E;
  --color-peach:         #FFE4CC;
  --color-peach-text:    #9A3412;
  --color-sky:           #D6EEFF;
  --color-sky-text:      #1E40AF;
}
```

- [ ] **Step 3: Build pour vérifier aucune erreur de compilation**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && npm run build 2>&1 | tail -20
```

Attendu : `build complete` sans erreurs.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: switch design tokens to light theme + add pastel palette"
```

---

## Task 2 — Hero Light

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Retirer data-dark-section et grain-hero**

Dans `src/components/Hero.astro` :

Ligne 3 — retirer l'attribut `data-dark-section` :
```html
<section
  class="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
  style="background: var(--bg-primary);"
>
```

Ligne 13 — supprimer entièrement la div `.grain-hero` :
```html
<!-- supprimer cette ligne -->
<div class="grain-hero"></div>
```

- [ ] **Step 2: Supprimer le bloc CSS .grain-hero dans `<style>`**

Supprimer les lignes 99–107 (bloc `.grain-hero { ... }`) de la balise `<style>`.

- [ ] **Step 3: Mettre à jour les couleurs hardcodées dans `<style>`**

Remplacer dans le bloc `<style>` :

```css
/* AVANT → APRÈS */

/* .hero-separator */
background: rgba(255, 255, 255, 0.12);
→ background: rgba(0, 0, 0, 0.12);

/* .hero-available */
color: rgba(255, 255, 255, 0.45);
→ color: var(--text-secondary);

/* .hero-desc */
color: rgba(255, 255, 255, 0.58);
→ color: var(--text-secondary);

/* .hero-footnote */
color: rgba(255, 255, 255, 0.35);
→ color: var(--text-secondary);

/* .hero-scroll-label */
color: rgba(255, 255, 255, 0.3);
→ color: var(--text-secondary);

/* .hero-scroll-line */
background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
→ background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent);

/* .hero-grid (couleur des lignes) */
rgba(59, 130, 246, 0.18) → rgba(139, 92, 246, 0.10)
(les 2 occurrences dans background-image)
```

- [ ] **Step 4: Remplacer btn-outline-dark par btn-outline dans le HTML**

Ligne 48 — changer la classe :
```html
<a href="#realisations" class="btn-outline">
  <span class="btn-text-front">Voir mes réalisations</span>
  <span class="btn-text-back">Voir mes réalisations</span>
</a>
```

Et supprimer le bloc CSS `.btn-outline-dark:hover { ... }` de la balise `<style>` du hero (il n'est plus utile).

- [ ] **Step 5: Build**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && npm run build 2>&1 | tail -20
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: hero passage light — supprimer grain, màj couleurs dark → clair"
```

---

## Task 3 — Boutons : unification text-change

**Files:**
- Modify: `src/components/About.astro:65-73`
- Modify: `src/components/FAQ.astro:61-69`
- Modify: `src/components/Personas.astro:83-91`
- Modify: `src/components/Navbar.astro:43-54`

- [ ] **Step 1: About.astro — remplacer le bouton arrow**

Remplacer les lignes 65–73 par :
```html
<a href="#contact" class="btn-outline inline-flex">
  <span class="btn-text-front">Travaillons ensemble</span>
  <span class="btn-text-back">Travaillons ensemble</span>
</a>
```

Supprimer aussi le bloc `<style>` scoped de About.astro qui contient les classes `.btn-arrow-icon`, `.btn-arrow-inner`, `.btn-arrow-dark` (s'il existe dans ce fichier).

- [ ] **Step 2: FAQ.astro — remplacer le bouton arrow**

Remplacer les lignes 61–69 par :
```html
<a href="#contact" class="btn-primary">
  <span class="btn-text-front">Poser ma question</span>
  <span class="btn-text-back">Poser ma question</span>
</a>
```

Supprimer les styles `.btn-arrow-*` scoped dans FAQ.astro si présents.

- [ ] **Step 3: Personas.astro — remplacer les boutons arrow (×3 dans le map)**

Remplacer les lignes 83–91 (dans le template du map, s'applique aux 3 cards) par :
```html
<a href="#contact" class="btn-primary mt-4 self-start text-sm py-2.5 px-5">
  <span class="btn-text-front">Démarrer</span>
  <span class="btn-text-back">Démarrer</span>
</a>
```

Supprimer les styles `.btn-arrow-*` scoped dans Personas.astro si présents.

- [ ] **Step 4: Navbar.astro — remplacer le CTA contact**

Remplacer les lignes 43–54 par :
```html
<a
  href="#contact"
  class="contact-nav-btn hidden md:inline-flex items-center shrink-0 z-10 btn-outline"
  style="padding: 8px 18px; font-size: 0.8rem;"
>
  <span class="btn-text-front">Contact</span>
  <span class="btn-text-back">Contact</span>
</a>
```

Supprimer le bloc `<style>` scoped de Navbar.astro pour `.contact-nav-arrow-icon`, `.contact-nav-arrow-inner` et leurs états hover/child.

- [ ] **Step 5: Build**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && npm run build 2>&1 | tail -20
```

- [ ] **Step 6: Commit**

```bash
git add src/components/About.astro src/components/FAQ.astro src/components/Personas.astro src/components/Navbar.astro
git commit -m "feat: unifier tous les boutons CTA sur le pattern text-change skew"
```

---

## Task 4 — Bento Grid Réalisations

**Files:**
- Modify: `src/components/Portfolio.astro` (réécriture complète)

- [ ] **Step 1: Réécrire Portfolio.astro**

Remplacer **tout le contenu** de `src/components/Portfolio.astro` par :

```astro
---
const projects = [
  {
    id: 'paysagiste',
    title: 'Paysagiste · Mulhouse',
    type: 'Site Vitrine',
    result: 'Livré en 5 jours · Visibilité locale +60%',
    href: '#',
    image: '/images/project-paysagiste.webp',
    cardBg: 'var(--color-lavender)',
    cardText: 'var(--color-lavender-text)',
    size: 'bento-large',
  },
  {
    id: 'electricien',
    title: 'Électricien · Colmar',
    type: 'Landing Page',
    result: 'Leads qualifiés ×3 en 30 jours',
    href: '#',
    image: '/images/project-electricien.webp',
    cardBg: 'var(--color-rose)',
    cardText: 'var(--color-rose-text)',
    size: 'bento-tall',
  },
  {
    id: 'fleuriste',
    title: 'Fleuriste · Strasbourg',
    type: 'E-Commerce',
    result: 'Boutique en ligne opérationnelle en 7 jours',
    href: '#',
    image: '/images/project-fleuriste.webp',
    cardBg: 'var(--color-sage)',
    cardText: 'var(--color-sage-text)',
    size: 'bento-medium',
  },
  {
    id: 'charpentier',
    title: 'Charpentier · Colmar',
    type: 'Site Vitrine',
    result: 'Premier contact client J+3 après lancement',
    href: '#',
    image: '/images/project-charpentier.webp',
    cardBg: 'var(--color-lemon)',
    cardText: 'var(--color-lemon-text)',
    size: 'bento-medium',
  },
  {
    id: 'coiffeur',
    title: 'Coiffeur · Strasbourg',
    type: 'Landing Page',
    result: 'Prise de RDV en ligne dès la semaine 1',
    href: '#',
    image: '/images/project-electricien.webp',
    cardBg: 'var(--color-peach)',
    cardText: 'var(--color-peach-text)',
    size: 'bento-medium',
  },
  {
    id: 'boulanger',
    title: 'Artisan Boucher · Mulhouse',
    type: 'Site Vitrine',
    result: 'Commandes en ligne +40% premier mois',
    href: '#',
    image: '/images/project-paysagiste.webp',
    cardBg: 'var(--color-sky)',
    cardText: 'var(--color-sky-text)',
    size: 'bento-wide',
  },
];
---

<section id="realisations">
  <div class="max-w-6xl mx-auto px-6">

    <div class="flex flex-col gap-3 mb-14" data-animate="fade-up">
      <span class="section-label">Réalisations</span>
      <h2 class="font-['Bricolage_Grotesque'] leading-tight" style="font-size: var(--type-h2); font-weight: 700; color: var(--text-primary);">
        Des sites qui font<br /><span style="color: var(--accent-primary);">la différence</span>
      </h2>
      <p class="max-w-xs text-sm mt-1" style="color: var(--text-muted);">
        Démos représentatives — les vraies réalisations arrivent dès les premiers clients.
      </p>
    </div>

    <div class="bento-grid">
      {projects.map((project) => (
        <a
          href={project.href}
          class={`bento-card ${project.size}`}
          style={`--card-bg: ${project.cardBg}; --card-text: ${project.cardText};`}
          data-animate="fade-up"
        >
          <img
            src={project.image}
            alt={project.title}
            class="bento-img"
            loading="lazy"
          />
          <div class="bento-content">
            <span class="bento-type">{project.type}</span>
            <h3 class="bento-title">{project.title}</h3>
          </div>
          <div class="bento-hover">
            <p class="bento-result">{project.result}</p>
          </div>
        </a>
      ))}
    </div>

  </div>
</section>

<style>
  /* ─── Grid layout ─────────────────────────────────────── */
  .bento-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }

  /* Card sizes */
  .bento-large  { min-height: 300px; }
  .bento-tall   { grid-row: span 2; min-height: 400px; }
  .bento-medium { min-height: 220px; }
  .bento-wide   { grid-column: 1 / -1; min-height: 240px; }

  @media (max-width: 768px) {
    .bento-grid { grid-template-columns: 1fr; }
    .bento-tall  { grid-row: span 1; }
    .bento-wide  { grid-column: 1; }
    .bento-large, .bento-tall, .bento-medium, .bento-wide { min-height: 220px; }
  }

  /* ─── Card base ───────────────────────────────────────── */
  .bento-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: var(--card-bg);
    display: block;
    text-decoration: none;
    cursor: pointer;
  }

  /* ─── Image ───────────────────────────────────────────── */
  .bento-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .bento-card:hover .bento-img {
    transform: scale(1.04);
    opacity: 0.25;
  }

  /* ─── Content (visible par défaut) ───────────────────── */
  .bento-content {
    position: absolute;
    inset: 0;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: opacity 0.3s ease-in-out;
  }

  .bento-card:hover .bento-content {
    opacity: 0;
  }

  .bento-type {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--card-text);
    margin-bottom: 0.4rem;
    opacity: 0.7;
  }

  .bento-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--card-text);
    line-height: 1.2;
  }

  /* ─── Hover overlay ───────────────────────────────────── */
  .bento-hover {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .bento-card:hover .bento-hover {
    opacity: 1;
  }

  .bento-result {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.4;
  }
</style>
```

- [ ] **Step 2: Build**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && npm run build 2>&1 | tail -20
```

Attendu : build sans erreur. Si erreur sur `EmblaCarousel` — vérifier que l'import a bien été retiré.

- [ ] **Step 3: Commit**

```bash
git add src/components/Portfolio.astro
git commit -m "feat: remplacer carousel EmblaCarousel par bento grid pastel"
```

---

## Task 5 — Process Animation — Fix mobile

**Files:**
- Modify: `src/scripts/animations.ts:184-238`

- [ ] **Step 1: Ajouter guard mobile dans initProcessCards()**

Dans `src/scripts/animations.ts`, à la ligne 184, la fonction `initProcessCards()` commence ainsi :

```typescript
function initProcessCards(): void {
  const track = document.querySelector<HTMLElement>('.process-track');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.process-card'));
  if (!track || cards.length === 0) return;
```

Ajouter un guard mobile juste après l'ouverture de la fonction :

```typescript
function initProcessCards(): void {
  // Sur mobile, la version liste (fade-up) est utilisée — pas de stacking
  if (window.innerWidth < 768) return;

  const track = document.querySelector<HTMLElement>('.process-track');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.process-card'));
  if (!track || cards.length === 0) return;
```

- [ ] **Step 2: Ajouter ScrollTrigger.refresh() après initProcessCards()**

À la dernière ligne du fichier (ligne 238, après `initProcessCards();`), ajouter :

```typescript
// Refresh après init pour corriger les positions avec Lenis
ScrollTrigger.refresh();
```

- [ ] **Step 3: Build**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && npm run build 2>&1 | tail -20
```

- [ ] **Step 4: Commit**

```bash
git add src/scripts/animations.ts
git commit -m "fix: process stacking cards — guard mobile + ScrollTrigger.refresh()"
```

---

## Task 6 — Transitions standardisation 0.3s

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Personas.astro`
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Vérifier les transitions non-standard dans global.css**

Rechercher et remplacer toute `transition` avec `0.2s`, `0.25s` ou `0.4s` sur des éléments de card/hover par `0.3s ease-in-out`. **Ne pas toucher** aux transitions boutons (0.5s cubic-bezier) ni GSAP.

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && grep -n "transition:.*0\.2s\|transition:.*0\.25s\|transition:.*0\.4s" src/styles/global.css
```

Pour chaque occurrence trouvée, vérifier si c'est un card/hover/overlay → remplacer par `0.3s ease-in-out`.

- [ ] **Step 2: Même vérification dans les composants**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && grep -rn "transition:.*0\.2s\|transition:.*0\.25s" src/components/ --include="*.astro" | grep -v "btn-text\|btn-primary\|btn-outline\|cubic-bezier"
```

Pour chaque occurrence de card/hover, remplacer par `0.3s ease-in-out`.

- [ ] **Step 3: Build final**

```bash
cd "d:/1_Robin/Websites/Portoflio V2" && npm run build 2>&1 | tail -20
```

Attendu : `build complete` sans erreurs.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "fix: standardiser toutes les transitions hover/card à 0.3s ease-in-out"
```

---

## Vérification finale

- [ ] `npm run build` passe sans erreur
- [ ] Hero : fond blanc, texte lisible, grille violette subtile
- [ ] Tout le site : fond blanc, plus aucune section sombre
- [ ] Bento grid : 6 cards colorées, hover révèle le résultat, responsive 1 col mobile
- [ ] Boutons : TOUS les CTAs ont l'animation text-change au hover (About, FAQ, Personas, Navbar, Hero, Footer, Contact)
- [ ] Aucun bouton avec icône flèche SVG visible sur le site
- [ ] Process : stacking cards desktop fluide, mobile = liste simple
- [ ] Transitions : 0.3s partout sauf boutons (0.5s cubic-bezier)
