# CLAUDE.md — Portfolio Robin Ration

## 1. Contexte

Freelance web, marché FR, clients artisans/PME locales. Positionnement : "Pas une agence. Pas un template." — fait main, livré 7 jours, relation 1:1.
Vision : "Artisanat Digital" — noir/blanc pur, hero sombre `#0a0806` + orbs ambre, accent ambre. Pas SaaS froid, pas template générique.
Stack : Astro (SSG) + Tailwind CSS + GSAP + ScrollTrigger + Lenis + @lottiefiles/dotlottie-web

---

## 2. Règles Design Tokens

Les valeurs sont dans `src/styles/global.css`. Règles d'utilisation :

- **Jamais de couleur hardcodée** — toujours `var(--token)`, jamais `#fff`, `#000` ou hex direct dans un composant
- **Rythme vertical absolu** : `py-32` desktop / `py-20` mobile sur toutes les sections. Exception unique : Marquee → `py-6`. Ne pas introduire d'autres valeurs.
- **Titres** : toujours `var(--type-display)` / `var(--type-h2)` / `var(--type-h3)`. Jamais `text-4xl` ni `clamp()` inline.
- **Ne pas mélanger** `clamp()` inline et classes `text-*` Tailwind pour les titres.
- **`style=""` inline** : interdit pour couleurs et espacements. Exception : valeurs dynamiques JS (position de glow calculée).
- **`text-white` sur fond clair** : interdit. Uniquement sur fond dark explicite (`#0a0806`).

---

## 3. Classes Utilitaires — toujours réutiliser

| Besoin | Classe |
|--------|--------|
| Card avec backdrop clair | `.glass` |
| Card projet/portfolio | `.card-sharp` |
| Card bento sombre | `.bento-dark` (scoped Services.astro) |
| Bouton principal | `.btn-primary` |
| Bouton secondaire | `.btn-outline` |
| Bouton secondaire sur fond dark | `.btn-outline-dark` (scoped Hero.astro) |
| Petit label tech | `.label-tech` |
| Étiquette de section | `.section-label` |
| Lien nav avec underline | `.nav-link` |

---

## 4. Sélecteurs GSAP — ne jamais renommer sans mettre à jour `animations.ts`

| Attribut | Composant | Effet |
|----------|-----------|-------|
| `id="hero-headline"` | Hero.astro | Stagger enfants directs (y: 30→0, opacity) |
| `id="tools-illustration"` | Tools.astro | Trigger lignes SVG + lévitation cards |
| `data-animate="fade-up"` | Tout composant | Fade bas (y: 40→0) |
| `data-animate="fade-right"` | About photo | Fade gauche (x: -60→0) |
| `data-animate="fade-left"` | About texte | Fade droite (x: 60→0) |
| `data-animate-delay="Xms"` | Tout composant | Délai déclenchement |
| `data-parallax-img` | Images portfolio | Parallaxe scroll |
| `data-tilt` | Cards | Effet 3D tilt hover |
| `.process-card` | Process.astro | Entrée GSAP y: 60→0 |
| `.tool-card` | Tools.astro | Lévitation yoyo continue |
| `.tool-line` | Tools.astro | SVG stroke-dashoffset draw |
| `.handwritten-arrow-path` | Tools.astro | Flèche SVG draw scroll |
| `canvas[data-lottie-src]` | Services.astro | DotLottie via IntersectionObserver |

---

## 5. Hero Dark — Gotchas

- **Ne jamais** mettre `overflow-hidden` sur `<section>` hero — clippe grille + orbs. Le wrapper interne gère ça.
- **Orb-2 supprimée** — il y a orb-1 et orb-3 uniquement. Ne pas recréer orb-2.
- **Grain séparé** : `.grain-hero` dans Hero.astro (`opacity: 0.07`, `mix-blend-mode: overlay`) ≠ grain global dans `body::after` (`opacity: 0.055`, `mix-blend-mode: soft-light`). Ne jamais fusionner.
- **Spline iframe** : `.spline-bg hidden md:block`, `position: absolute; left: 35%`, masqué mobile.
- **`.btn-outline-dark`** : variante locale Hero.astro — ne pas modifier `.btn-outline` global.
- **Glows ambiants** : `.ambient-glow-1` / `.ambient-glow-2` dans Layout.astro — ne pas remettre en `style=""` inline.
- **Transition hero → sections claires** : rupture franche, pas de dégradé.
