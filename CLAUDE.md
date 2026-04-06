# CLAUDE.md — Portfolio Robin Ration

## 1. Contexte Projet

**Qui** : Robin Ration, développeur web freelance, marché français.

**Clients cibles** : Artisans et PME locales — paysagistes, électriciens, fleuristes, charpentiers, plombiers, BTP en général. Ces clients ont une activité qui tourne mais aucune présence web crédible. Ils ne veulent pas gérer un site eux-mêmes.

**Problème résolu** : Donner à un artisan local un site professionnel qui inspire confiance à ses clients, sans la lourdeur d'une agence et sans le côté générique d'un template Wix.

**Positionnement** : "Pas une agence. Pas un template." — fait main, livré en 7 jours, relation 1:1. Robin est le seul interlocuteur du début à la fin.

**Vision esthétique** : "Artisanat Digital" — la précision technique d'un outil comme Mixpanel (propre, structuré, typographie forte) combinée à la chaleur humaine de Healthy Together. Direction décidée : **noir/blanc pur** avec hero sombre. Fond principal blanc `#ffffff`, hero `#0a0806` + orbs ambre, accent ambre conservé. Éviter le côté "template SaaS froid" ou "agence générique".

**Stack** : Astro (SSG) + Tailwind CSS + GSAP + ScrollTrigger + Lenis (smooth scroll)

---

## 2. Design Tokens

Ces valeurs sont figées. Ne jamais les hardcoder — toujours utiliser les variables CSS.

### Couleurs (définies dans `src/styles/global.css`)

```css
/* Fonds */
--bg-primary: #ffffff        /* Blanc — fond principal (sections claires) */
--bg-card: rgba(255,255,255,0.75)
--bg-card-hover: rgba(255,255,255,0.95)

/* Textes */
--text-primary: #0f0d0a
--text-secondary: #4a4035
--text-muted: #9a8f82

/* Accent ambre */
--accent-primary: #b87418
--accent-light: #e8a44a
--accent-deep: #8a5510

/* Bordures */
--border-card: rgba(0,0,0,0.08)
--border-hover: rgba(184,116,24,0.45)

/* Glass */
--glass-bg: rgba(255,255,255,0.65)
--glass-border: rgba(255,255,255,0.9)

/* Effets */
--glow: rgba(232,164,74,0.18)
--gradient-cta: linear-gradient(135deg, #e8a44a 0%, #b87418 100%)
```

### Typographie

**Familles :**
- Titres + chiffres : `font-['Syne'] font-extrabold` (brut, solide)
- Labels + citations : `font-['Fraunces'] italic font-light` (humain, élégant)
- Corps de texte : DM Sans Regular (défaut `body`)

**Échelle (variables CSS dans `:root`) :**
```css
--type-display: clamp(2.5rem, 6vw, 5rem)   /* hero h1 */
--type-h2:      clamp(2rem, 5vw, 3.5rem)   /* titres de section */
--type-h3:      clamp(1.25rem, 2.5vw, 1.75rem) /* sous-titres */
--type-body:    1rem                        /* corps de texte */
```

Ne jamais mélanger `clamp()` inline et classes `text-*` Tailwind pour les titres. Utiliser les variables CSS pour les titres, les classes Tailwind uniquement pour les textes de corps.

### Rythme Vertical (règle absolue)

```
py-32 (desktop) / py-20 (mobile) — TOUTES les sections sans exception.
```

Exception documentée et autorisée : Marquee → `py-6`.

Ne pas introduire `py-24`, `py-28`, `py-40`, `py-5`, `py-8` sur les wrappers de section.

### Ombres & Effets

```css
shadow-luxury : 0 20px 80px -15px rgba(0,0,0,0.1)  /* décoller les cards */
backdrop-blur-xl + border rgba(255,255,255,0.1)      /* glassmorphism */
blur-[120px]                                          /* glows ambiants */
```

---

## 3. Règles de Composants

### Classes utilitaires disponibles — toujours réutiliser

| Besoin | Classe |
|--------|--------|
| Card avec backdrop | `.glass` |
| Card projet/portfolio | `.card-sharp` |
| Bouton principal | `.btn-primary` |
| Bouton secondaire | `.btn-outline` |
| Petit label tech | `.label-tech` |
| Étiquette de section | `.section-label` |
| Lien nav avec underline | `.nav-link` |

### Interdictions strictes

- **Couleurs hardcodées** : jamais `#fff`, `#000`, ou toute valeur hex directe dans un composant. Toujours `var(--token)`.
- **`text-white` sur fond clair** : uniquement sur un fond dark explicitement identifié (fond `--color-deep` ou équivalent).
- **`style=""` inline pour couleurs ou espacements** : toujours une classe CSS ou une variable. Exception acceptée : valeurs dynamiques JS (ex: position d'un glow calculée).
- **Tailles de titres sans variable** : toujours `var(--type-h2)` etc., pas `text-4xl` ou `clamp()` inline.

### Sélecteurs d'animation GSAP attendus

Ces `id` et `data-*` sont lus par `src/scripts/animations.ts`. Ne jamais les renommer sans mettre à jour le script.

| Attribut | Composant | Effet |
|----------|-----------|-------|
| `id="hero-headline"` | Hero.astro | Stagger enfants directs (y: 30→0, opacity) |
| `id="process-line"` | ~~Process.astro~~ | Supprimé — section remplacée par sticky scroll cards |
| `data-animate="fade-up"` | Tout composant | Fade depuis le bas (y: 40→0) |
| `data-animate="fade-right"` | About photo | Fade depuis la gauche (x: -60→0) |
| `data-animate="fade-left"` | About texte | Fade depuis la droite (x: 60→0) |
| `data-animate-delay="Xms"` | Tout composant | Délai de déclenchement en ms |
| `data-parallax-img` | Images portfolio | Parallaxe léger au scroll |
| `data-tilt` | Cards | Effet 3D tilt au survol |

### Hero dark — règles spécifiques

Le Hero est la **seule section** avec fond sombre (`#0a0806`). Toutes les autres sections utilisent `--bg-primary`.

- **Grille perspective** : `.hero-grid` — `background-image` avec 2 `linear-gradient` ambre (0.18 opacity), `transform: perspective(700px) rotateX(58deg)`, animation `grid-flow` 5s. Toujours dans le wrapper overflow-hidden.
- **Orbs animés** : 3 divs avec `animation: float-1/2/3` (18s/22s/15s désynchronisé), `will-change: transform`. Couleurs : `#b87418` (0.55), `#e8a44a` (0.3), `#7a4510` (0.4).
- **Texte sur dark** : `color: #ffffff` (acceptable sur fond dark explicite) ou `rgba(255,255,255,X)`
- **`.btn-outline-dark`** : variante locale dans `Hero.astro` — ne pas modifier `.btn-outline` global
- **Transition vers section claire** : rupture franche (pas de dégradé). Marquee a son propre fond via `--bg-primary`.
- **Ne jamais** mettre `overflow-hidden` sur `<section>` hero — ça clippe grille + orbs. Le wrapper interne gère ça.

### Textures obligatoires (déjà en place)

- **Grain global** : `body::after` — bruit SVG, `opacity: 0.055`, `mix-blend-mode: soft-light` (visible sur blanc). Ne jamais supprimer ni repasser en `multiply`.
- **Grain hero dark** : `.grain-hero` dans `Hero.astro` — même SVG, `opacity: 0.07`, `mix-blend-mode: overlay` (visible sur fond `#0a0806`). Séparé du grain global.
- **Glows ambiants** : `.ambient-glow-1` et `.ambient-glow-2` dans `Layout.astro` — animation CSS `breathe` désynchronisée (12s / 16s reverse). Ne pas remettre en `style=""` inline.
- **Glassmorphism** : via la classe `.glass` — ne pas recréer inline.

---

## 4. Workflow par Session

### Règles de base

1. **Lire le composant avant toute modification** — ne jamais coder à l'aveugle
2. **Vérifier le rythme vertical** après modification — la section a-t-elle `py-32 md:py-20` ?
3. **Aucune valeur hardcodée** — utiliser les tokens du CLAUDE.md
4. **`npm run dev` ouvert** — vérifier le rendu mobile (375px) avant de valider
5. **Une section à la fois** — ne jamais refaire toute la page en une session

### Comment travailler avec les inspirations

- **Partager des screenshots**, pas du code source HTML complet (trop lourd)
- Décrire précisément l'élément qui plaît : "l'animation du titre", "la grille des services", "le hover des cards"
- Le skill `ui-ux-pro-max` est disponible pour des recommandations de design approfondies

### Pour les nouveaux projets (important)

**Écrire ce CLAUDE.md AVANT la première ligne de code.**

Workflow recommandé :
1. Session 1 : brainstorming + CLAUDE.md (tokens, règles, personas) — rien dans `src/`
2. Session 2 : `Layout.astro` + `global.css` qui implémentent exactement les tokens
3. Session 3+ : sections une par une, chacune vérifiée contre le CLAUDE.md

Le CLAUDE.md est le contrat. Le code est la preuve du contrat.

---

## 5. Checklist de Livraison

Avant de déclarer une session terminée, vérifier chaque point :

### Images
- [ ] `/public/images/photo.jpg` — photo profil About
- [ ] `/public/images/project-paysagiste.webp`
- [ ] `/public/images/project-electricien.webp`
- [ ] `/public/images/project-fleuriste.webp`
- [ ] `/public/images/project-charpentier.webp`

### Fonctionnel
- [ ] Formspree ID configuré dans `Contact.astro` (remplacer `YOUR_FORM_ID`)
- [ ] `npm run build` sans erreurs TypeScript ou Astro

### SEO
- [ ] `og:title`, `og:description`, `og:image`, `og:url` dans `Layout.astro`
- [ ] `twitter:card`, `twitter:title` dans `Layout.astro`
- [ ] JSON-LD `LocalBusiness` dans `Layout.astro`

### Animations
- [ ] `id="hero-headline"` présent dans `Hero.astro`
- [ ] ~~`id="process-line"`~~ — supprimé, Process redessiné en sticky scroll
- [ ] Animations `fade-up` visibles au scroll (vérifier en dev)
- [ ] Orbs hero animés (float visible, non statiques)
- [ ] Grille perspective visible dans le hero

### Design
- [ ] Aucun `text-white` sur fond clair
- [ ] Rythme vertical uniforme sur toutes les sections (`py-32 md:py-20`)
- [ ] Aucune couleur hardcodée introduite
- [ ] Rendu mobile vérifié à 375px

---

## 6. Structure du Projet

```
src/
  components/        ← un fichier par section
    Hero.astro       ← fond dark #0a0806 + orbs animés + grille perspective
    Navbar.astro     ← pill dark floating, style visitors-now
    Personas.astro   ← 3 cards services (Landing Page / Site Vitrine / E-commerce)
    Marquee.astro    ← défilement tech stack (py-6 exception)
    Services.astro   ← liste numérotée 4 services
    Portfolio.astro  ← filtre par catégorie
    About.astro
    Process.astro    ← sticky scroll 4 cards sombres (redessiné)
    Testimonials.astro
    Contact.astro
    FAQ.astro
    Footer.astro
    Cursor.astro     ← curseur custom (desktop only)
  layouts/
    Layout.astro     ← head, fonts, SEO, ambient glows
  scripts/
    animations.ts    ← GSAP + ScrollTrigger (data-animate)
    cursor.ts        ← curseur custom
    tilt.ts          ← effet 3D cards
    faq.ts           ← accordion FAQ
    testimonials.ts  ← carousel témoignages
    lenis.ts         ← smooth scroll
    navbar.ts        ← mobile menu + scroll hide
  styles/
    global.css       ← tokens CSS, classes utilitaires, grain
public/
  images/            ← toutes les images du site
```
