# Design Spec — Dark Redesign

**Date:** 2026-04-18
**Approche:** Token-first (A)

---

## Objectif

Basculer le site entièrement en dark mode : fond `#0A0A0A` partout, texte `#FFFFFF`, accent `#3B82F6`. Uniformiser les espacements entre sections et les transitions hover. Ajouter une bordure fine sur les cartes pour la structure.

---

## 1. Tokens `global.css`

Seul `global.css` est la source de vérité pour les couleurs. Aucune valeur hardcodée dans les composants après cette opération.

### `:root` — Nouveaux tokens

| Token | Ancienne valeur | Nouvelle valeur |
|---|---|---|
| `--bg-primary` | `#ffffff` | `#0A0A0A` |
| `--bg-card` | `rgba(255,255,255,0.75)` | `#111111` |
| `--bg-card-hover` | `rgba(255,255,255,0.95)` | `#161616` |
| `--border-card` | `rgba(0,0,0,0.08)` | `#262626` |
| `--border-hover` | `rgba(32,96,216,0.45)` | `rgba(59,130,246,0.45)` |
| `--text-primary` | `#0f0d0a` | `#ffffff` |
| `--text-secondary` | `#4a4035` | `rgba(255,255,255,0.72)` |
| `--text-muted` | `#9a8f82` | `rgba(255,255,255,0.45)` |
| `--accent-primary` | `#2060d8` | `#3B82F6` |
| `--accent-light` | `#5b96f5` | `#93c5fd` |
| `--accent-deep` | `#1648a8` | `#2563eb` |
| `--gradient-cta` | `linear-gradient(135deg, #5b96f5, #2060d8)` | `linear-gradient(135deg, #60a5fa, #3b82f6)` |
| `--glow` | `rgba(91,150,245,0.18)` | `rgba(59,130,246,0.18)` |
| `--glass-bg` | `rgba(255,255,255,0.65)` | `rgba(255,255,255,0.05)` |
| `--glass-border` | `rgba(255,255,255,0.9)` | `rgba(255,255,255,0.08)` |

### `@theme` — Tailwind

| Token | Ancienne valeur | Nouvelle valeur |
|---|---|---|
| `--color-surface` | `#f5f0e9` | `#0A0A0A` |
| `--color-deep` | `#0F1115` | `#0A0A0A` |
| `--color-accent` | `#2060d8` | `#3b82f6` |

### Classes utilitaires

**`.glass`** : `background: var(--glass-bg)`, `border: 1px solid var(--glass-border)`.

**`.card-sharp`** : `background: var(--bg-card)`, `border: 1px solid var(--border-card)`. Transition → `0.3s ease-in-out`.

**`.bento-card`** : hover ring → `rgba(59,130,246,0.5)`. Transition → `0.3s ease-in-out`.

**`.section-capsule`** : `background: #111111` (un cran au-dessus du fond global).

**`input:focus, textarea:focus`** : `border-color: var(--accent-primary)`, background → `rgba(59,130,246,0.04)`.

---

## 2. Transitions uniformisées

Règle : **toutes les transitions UI passent à `0.3s ease-in-out`**.

- `.card-sharp` : `0.25s` → `0.3s ease-in-out`
- `.testimonial-card` : `0.25s` → `0.3s ease-in-out`
- `.bento-card` : `0.3s ease` → `0.3s ease-in-out`
- `.nav-link::after` : `0.25s ease` → `0.3s ease-in-out`
- `.btn-text-front / .btn-text-back` : inchangés (cubic-bezier intentionnel)

### Exception Header (navbar.ts)

La logique JS de masquage/affichage au scroll dans `navbar.ts` conserve ses propres durées. On n'y touche pas. Si des transitions CSS sont définies dans `Navbar.astro`, on les isole avec un sélecteur spécifique (`[data-navbar]`) pour qu'elles ne soient pas écrasées par la règle globale.

---

## 3. Espacement entre sections

Ajout dans `global.css` :

```css
section {
  padding-block: 5rem; /* py-20 */
}

section + section {
  margin-top: 2.5rem; /* my-10 */
}
```

Remplace la convention CLAUDE.md `py-32` desktop / `py-20` mobile — override explicitement validé par le client.

**Note :** Le Hero (`min-h-screen`) est exempt — son espacement est géré par `flex items-center justify-center`. Ajouter une exception si nécessaire : `section:has(#hero-headline) { padding-block: 0; }`.

---

## 4. Hardcode sweep — Composants

### Protocole dry run

Avant tout remplacement, inventaire des fichiers concernés :
1. Lister tous les fichiers avec `style=""` inline contenant des couleurs
2. Identifier les cas particuliers (boutons sur fond spécifique, contrastes critiques)
3. Approbation avant chaque groupe de remplacements

### Fichiers ciblés (périmètre connu)

| Fichier | Hardcodes identifiés |
|---|---|
| `Hero.astro` | `background: #0a0806` sur `<section>`, `color: #ffffff` sur `.hero-title` |
| `Testimonials.astro` | `background: #0a0806` sur `<section>`, inline styles `color: var(--accent-light)` dans les dots |
| `Navbar.astro` | Potentielles couleurs de fond au scroll |
| `Services.astro` | `.section-capsule` hardcode `#080808` |
| `Contact.astro` | Inputs, fond section |
| `Footer.astro` | Fond |

### Règle de remplacement

- `background: #0a0806` → `background: var(--bg-primary)` ou supprimer si redondant
- `color: #ffffff` explicite sur texte → supprimer (devient la valeur par défaut via `h1-h4` et `body`)
- `color: rgba(255,255,255,0.xx)` → garder si valeur spécifique, sinon migrer vers `var(--text-secondary)` ou `var(--text-muted)`
- `background: rgba(91,150,245,0.15)` (avatar Testimonials) → adapter avec nouvelles valeurs accent

---

## Critères de succès

- Aucune section avec fond clair visible
- Toutes les transitions hover à `0.3s ease-in-out` (sauf cubic-bezier boutons et logique scroll header)
- Cartes avec `background: #111111` + `border: 1px solid #262626`
- Accent uniformément `#3B82F6`
- Aucune valeur hexadécimale hardcodée dans les composants après le sweep
