# Portfolio V2 — Redesign Conversion & Refonte Visuelle

**Date:** 2026-04-18

## Context

Le portfolio actuel est trop sombre (#0a0806 partout) et souffre de 4 problèmes de conversion :
1. Boutons CTA hétérogènes (arrow vs text-change)
2. Section Réalisations en carousel (instable, peu lisible)
3. Animation Process (stacking cards) instable sur mobile
4. Transitions inconsistantes sur le site

Décision : refonte complète vers fond blanc + palette pastel colorée (style bento grid moderne), unification des boutons, et stabilisation des animations.

---

## 1. Nouveau Système de Couleurs

### Tokens à ajouter dans `src/styles/global.css`

```css
--color-lavender: #E8DCFF;
--color-lavender-text: #6B21A8;
--color-rose: #FFD6E0;
--color-rose-text: #BE185D;
--color-sage: #D4F1C7;
--color-sage-text: #166534;
--color-lemon: #FFF3C4;
--color-lemon-text: #854D0E;
--color-peach: #FFE4CC;
--color-peach-text: #9A3412;
--color-sky: #D6EEFF;
--color-sky-text: #1E40AF;
```

### Tokens à modifier

```css
--bg-primary: #ffffff;        /* était sombre */
--bg-secondary: #F9FAFB;
--text-primary: #111827;      /* noir profond */
--text-secondary: #6B7280;    /* gris moyen */
```

---

## 2. Hero — Passage Light

**Fichier :** `src/components/Hero.astro`

### Suppressions
- Attribut `data-dark-section` sur `<section>`
- `.grain-hero` (overlay grain, inutile sur fond blanc)

### Modifications
- Grille `.hero-grid` : lignes `rgba(59,130,246,0.18)` → `rgba(139,92,246,0.10)` (violet subtil)
- `.hero-separator` : `rgba(255,255,255,0.12)` → `rgba(0,0,0,0.12)`
- `.hero-available` : `rgba(255,255,255,0.45)` → `var(--text-secondary)`
- `.hero-desc` : `rgba(255,255,255,0.58)` → `var(--text-secondary)`
- `.hero-footnote` : `rgba(255,255,255,0.35)` → `var(--text-secondary)`
- `.hero-scroll-label` : `rgba(255,255,255,0.3)` → `var(--text-secondary)`
- `.hero-scroll-line` : gradient blanc → gradient `rgba(0,0,0,0.15)`
- `btn-outline-dark` → `btn-outline` (variante globale)
- Canvas `hero-bg` : vérifier que `hero-background.ts` fonctionne sur fond blanc (adapter couleurs orbs si nécessaire)

---

## 3. Bento Grid — Section Réalisations

**Fichier :** `src/components/Portfolio.astro`

### Remplacement complet du carousel EmblaCarousel

Supprimer : import EmblaCarousel, boutons prev/next, dots, logique JS carousel.

### Structure HTML (CSS Grid)

```astro
<div class="bento-grid">
  <div class="bento-card bento-large" style="--card-bg: var(--color-lavender); --card-text: var(--color-lavender-text);">
    ...
  </div>
  <!-- etc. -->
</div>
```

### Layout CSS

```css
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  gap: 1rem;
}

/* Card sizes */
.bento-large  { grid-column: 1; grid-row: span 1; min-height: 320px; }
.bento-tall   { grid-column: 2; grid-row: span 2; min-height: 480px; }
.bento-medium { min-height: 220px; }
.bento-wide   { grid-column: 1 / -1; min-height: 260px; }

@media (max-width: 768px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-tall { grid-row: span 1; }
  .bento-wide { grid-column: 1; }
}
```

### Assignation couleurs

| Projet | Couleur |
|--------|---------|
| Paysagiste | lavande |
| Électricien | rose |
| Fleuriste | vert sauge |
| Charpentier | jaune |
| Coiffeur | pêche |
| Boucher | bleu ciel |

### Anatomie d'une card

```html
<div class="bento-card" style="background: var(--card-bg);">
  <!-- Image fond -->
  <img class="bento-img" src="..." alt="..." />
  <!-- Contenu -->
  <div class="bento-content">
    <span class="bento-type" style="color: var(--card-text);">Site Vitrine</span>
    <h3 class="bento-title" style="color: var(--card-text);">Paysagiste · Mulhouse</h3>
  </div>
  <!-- Hover overlay -->
  <div class="bento-hover">
    <p class="bento-result">Livré en 5 jours · Clients +30%</p>
  </div>
</div>
```

### Hover behavior

```css
.bento-hover {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.55);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex; align-items: flex-end; padding: 1.5rem;
}
.bento-card:hover .bento-hover { opacity: 1; }
.bento-card:hover .bento-img { transform: scale(1.04); }
.bento-img { transition: transform 0.3s ease-in-out; }
```

---

## 4. Boutons — Unification Text-Change

### Principe
Tous les CTAs du site utilisent le même pattern :
```html
<a class="btn-primary"> <!-- ou btn-outline -->
  <span class="btn-text-front">Label</span>
  <span class="btn-text-back">Label</span>
</a>
```

### Fichiers à modifier

| Fichier | Bouton actuel | Action |
|---------|---------------|--------|
| `src/components/About.astro` | `.btn-arrow-dark` "Travaillons ensemble" | → `btn-primary` avec deux spans |
| `src/components/FAQ.astro` | `.btn-arrow-light` "Poser ma question" | → `btn-outline` avec deux spans |
| `src/components/Personas.astro` | `.btn-arrow-light` "Démarrer" (×3) | → `btn-primary` avec deux spans |
| `src/components/Navbar.astro` | `.contact-nav-arrow-icon` | → `btn-outline` avec deux spans, taille réduite |

### Supprimer de `global.css`
- Classes `.btn-arrow-icon`, `.btn-arrow-inner`, `.btn-arrow-dark`, `.btn-arrow-light`
- Styles `.contact-nav-arrow-icon`, `.contact-nav-arrow-inner` (dans Navbar.astro scoped)

---

## 5. Process Animation — Fix GSAP + Lenis

**Fichier :** `src/scripts/animations.ts`

### Problème
Conflit entre Lenis (smooth scroll) et ScrollTrigger (qui lit `window.scrollY` directement).

### Fix
Ajouter le proxy Lenis **avant** l'initialisation des ScrollTriggers :

```typescript
// Dans animations.ts, après import Lenis et avant tout ScrollTrigger.create()
import lenis from './lenis'; // adapter selon l'export existant

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) lenis.scrollTo(value);
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
});

lenis.on('scroll', ScrollTrigger.update);
ScrollTrigger.addEventListener('refresh', () => lenis.resize());
```

### Mobile
Sur mobile (`window.innerWidth < 768`), désactiver la version stacking cards et afficher uniquement la version liste verticale (déjà présente dans le HTML).

---

## 6. Transitions — Standardisation 0.3s

Remplacer toutes les valeurs de transition hover/card/overlay par `0.3s ease-in-out`.

**Exceptions à conserver :**
- Boutons text-change : `0.5s cubic-bezier(0.76,0,0.24,1)` — intentionnel premium
- GSAP scroll animations : durées GSAP inchangées
- Lenis : 1.2s inchangé

**Fichiers concernés :** `global.css`, `Personas.astro`, `FAQ.astro`, `Contact.astro`, `Portfolio.astro`, `Navbar.astro`

---

## Ordre d'implémentation

1. **Tokens CSS** — `global.css` (fondation, tout le reste en dépend)
2. **Hero** — passage light
3. **Boutons** — unification text-change (global.css + 4 composants)
4. **Bento Grid** — Portfolio.astro
5. **Process fix** — animations.ts
6. **Transitions** — standardisation finale

---

## Vérification

- [ ] `npm run build` passe sans erreur
- [ ] Hero visible sur fond blanc, texte lisible
- [ ] Bento grid s'affiche correctement desktop + mobile
- [ ] Tous les boutons ont l'animation text-change au hover
- [ ] Process cards s'animent sans saccade (desktop + mobile)
- [ ] Toutes les transitions hover = 0.3s
