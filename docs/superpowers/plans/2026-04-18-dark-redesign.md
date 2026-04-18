# Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Basculer le site entièrement en dark mode (#0A0A0A) avec accent bleu #3B82F6, transitions uniformes à 300ms, bordures fines sur les cartes.

**Architecture:** Token-first — tous les changements de couleurs passent d'abord par `global.css`. Les composants ne font que supprimer leurs valeurs hardcodées pour hériter des tokens. Aucune nouvelle abstraction.

**Tech Stack:** Astro SSG, Tailwind CSS v4, GSAP, CSS custom properties

---

## Inventory — Hardcodes identifiés (dry run)

| Fichier | Hardcode | Action |
|---|---|---|
| `Hero.astro` | `background: #0a0806` (inline section) | → `var(--bg-primary)` |
| `Hero.astro` | `color: #ffffff` sur `.hero-title` | → supprimer (hérite de `--text-primary`) |
| `Hero.astro` | `rgba(32, 96, 216, 0.18)` dans `.hero-grid` | → `rgba(59, 130, 246, 0.18)` |
| `Hero.astro` | `rgba(32, 96, 216, 0.6)` dans `.hero-dot` | → `rgba(59, 130, 246, 0.6)` |
| `Testimonials.astro` | `background: #0a0806` (inline section) | → `var(--bg-primary)` |
| `Testimonials.astro` | `rgba(91,150,245,0.15)` avatar bg | → `rgba(59,130,246,0.15)` |
| `Testimonials.astro` | `rgba(91,150,245,0.25)` avatar border | → `rgba(59,130,246,0.25)` |
| `Services.astro` | `rgba(32,96,216,0.18)` + `.06` dans glow | → `rgba(59,130,246,0.18)` + `.06` |
| `Services.astro` | `color: #ffffff` sur h2 | → supprimer |
| `Contact.astro` | `background: linear-gradient(#ffffff...#0a0806)` | → `var(--bg-primary)` |
| `Contact.astro` | `rgba(32,96,216,0.5)` dans box-shadow dot | → `rgba(59,130,246,0.5)` |
| `Footer.astro` | `background: #0a0806` dans `.footer-cta-section` | → `var(--bg-primary)` |
| `Footer.astro` | `background: #0a0806` dans `.footer-bar` | → `var(--bg-primary)` |
| `Footer.astro` | `color: #ffffff` dans `.footer-cta-title` | → supprimer |
| `Footer.astro` | `transition: color 0.2s` dans `.footer-link` | → `0.3s ease-in-out` |
| `Navbar.astro` | `transition-colors duration-200` (Tailwind) sur nav links | → `duration-300` |

**Cas particuliers — pas de changement :**
- `Navbar.astro` `#navbar-bg`: `rgba(10,8,6,0.95)` — fond flottant légèrement distinct, garde son rendu dark. Ne pas changer.
- `Navbar.astro` `transition: top 0.4s ease` (inline `<nav>`) — écrasé par JS (`navbar.ts`) pour le scroll. Ne pas toucher.
- `navbar.ts` — aucune modification. La logique hide/show au scroll gère ses propres durées via JS.
- `btn-text-front / btn-text-back` — cubic-bezier intentionnel, ne pas uniformiser.

---

### Task 1: Mettre à jour les tokens de couleur dans global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Remplacer le bloc `@theme`**

Dans `src/styles/global.css`, remplacer :
```css
@theme {
  --color-surface: #f5f0e9;
  --color-deep:    #0F1115;
  --color-accent:  #2060d8;
  --shadow-luxury: 0 20px 80px -15px rgba(0, 0, 0, 0.1), 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  --shadow-glass:  inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px 0 rgba(0, 0, 0, 0.05);
  --blur-huge:     120px;
}
```
Par :
```css
@theme {
  --color-surface: #0A0A0A;
  --color-deep:    #0A0A0A;
  --color-accent:  #3b82f6;
  --shadow-luxury: 0 20px 80px -15px rgba(0, 0, 0, 0.4), 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  --shadow-glass:  inset 0 1px 1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px 0 rgba(0, 0, 0, 0.3);
  --blur-huge:     120px;
}
```

- [ ] **Step 2: Remplacer les tokens Backgrounds, Borders, Text**

Dans le bloc `:root`, remplacer :
```css
  /* Backgrounds */
  --bg-primary:    #ffffff;
  --bg-card:       rgba(255, 255, 255, 0.75);
  --bg-card-hover: rgba(255, 255, 255, 0.95);

  /* Borders */
  --border-card:   rgba(0, 0, 0, 0.08);
  --border-hover:  rgba(32, 96, 216, 0.45);

  /* Text */
  --text-primary:   #0f0d0a;
  --text-secondary: #4a4035;
  --text-muted:     #9a8f82;
```
Par :
```css
  /* Backgrounds */
  --bg-primary:    #0A0A0A;
  --bg-card:       #111111;
  --bg-card-hover: #161616;

  /* Borders */
  --border-card:   #262626;
  --border-hover:  rgba(59, 130, 246, 0.45);

  /* Text */
  --text-primary:   #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.72);
  --text-muted:     rgba(255, 255, 255, 0.45);
```

- [ ] **Step 3: Remplacer les tokens Accent et Glass**

Dans le bloc `:root`, remplacer :
```css
  /* Accent bleu électrique */
  --accent-primary: #2060d8;
  --accent-light:   #5b96f5;
  --accent-deep:    #1648a8;
  --gradient-cta:   linear-gradient(135deg, #5b96f5 0%, #2060d8 100%);
  --glow:           rgba(91, 150, 245, 0.18);

  /* Glass */
  --glass-bg:      rgba(255, 255, 255, 0.65);
  --glass-border:  rgba(255, 255, 255, 0.9);
```
Par :
```css
  /* Accent bleu */
  --accent-primary: #3B82F6;
  --accent-light:   #93c5fd;
  --accent-deep:    #2563eb;
  --gradient-cta:   linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  --glow:           rgba(59, 130, 246, 0.18);

  /* Glass */
  --glass-bg:      rgba(255, 255, 255, 0.05);
  --glass-border:  rgba(255, 255, 255, 0.08);
```

- [ ] **Step 4: Mettre à jour les classes utilitaires `.card-sharp` et `.glass`**

Remplacer `.glass` :
```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}
```

Remplacer `.card-sharp` et `.card-sharp:hover` :
```css
.card-sharp {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  transition: border-color 0.3s ease-in-out, background 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.card-sharp:hover {
  border-color: var(--border-hover);
  background: var(--bg-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
```

- [ ] **Step 5: Mettre à jour `.bento-card` et `.section-capsule`**

Remplacer `.bento-card` et `.bento-card:hover` :
```css
.bento-card {
  border-radius: 20px;
  padding: 2rem;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.bento-card:hover {
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.12);
  transform: translateY(-2px);
}
```

Remplacer `.section-capsule` :
```css
.section-capsule {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  background: #111111;
  border-radius: 24px;
  overflow: hidden;
  padding: 5rem 3rem;
  box-shadow: 0 8px 64px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 6: Mettre à jour `input:focus` et `textarea:focus`**

Remplacer :
```css
input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-primary) !important;
  background: rgba(32, 96, 216, 0.03) !important;
}
```
Par :
```css
input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-primary) !important;
  background: rgba(59, 130, 246, 0.04) !important;
}
```

- [ ] **Step 7: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: update design tokens to full dark mode (#0A0A0A + #3B82F6)"
```

---

### Task 2: Uniformiser les transitions dans global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Mettre à jour `.nav-link::after`**

Remplacer :
```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-primary);
  transition: width 0.25s ease;
}
```
Par :
```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-primary);
  transition: width 0.3s ease-in-out;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: uniformize hover transitions to 0.3s ease-in-out"
```

---

### Task 3: Ajouter les règles d'espacement des sections

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Ajouter les règles de spacing après le bloc `body`**

Après le bloc `body { ... }` (ligne ~64), ajouter :
```css
/* ─── Section spacing ─────────────────────────────────────── */
section {
  padding-block: 5rem;
}

section + section {
  margin-top: 2.5rem;
}

/* Hero exempt — min-h-screen gère l'espace */
section:has(#hero-headline) {
  padding-block: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add uniform section spacing (py-20 + my-10)"
```

---

### Task 4: Corriger les hardcodes dans Hero.astro

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Remplacer le background hardcodé sur `<section>`**

Dans `Hero.astro`, changer l'attribut de la balise `<section>` :
```
style="background: #0a0806;"
```
Par :
```
style="background: var(--bg-primary);"
```

- [ ] **Step 2: Supprimer `color: #ffffff` hardcodé sur `.hero-title`**

Dans le `<style>` scoped de Hero.astro, remplacer :
```css
  .hero-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 0.95;
    tracking: tight;
  }
```
Par :
```css
  .hero-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 800;
    color: var(--text-primary);
    line-height: 0.95;
    tracking: tight;
  }
```

- [ ] **Step 3: Mettre à jour les couleurs accent dans `.hero-grid` et `.hero-dot`**

Dans le `<style>` scoped, remplacer `.hero-grid` :
```css
  .hero-grid {
    position: absolute;
    bottom: -10%;
    left: 50%;
    width: 240%;
    height: 75%;
    transform: translateX(-50%) perspective(700px) rotateX(58deg);
    transform-origin: center bottom;
    background-image:
      linear-gradient(rgba(59, 130, 246, 0.18) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.18) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 65%);
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 65%);
    animation: grid-flow 5s linear infinite;
  }
```

Et `.hero-dot` :
```css
  .hero-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-primary);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
    flex-shrink: 0;
  }
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "fix: replace hardcoded colors in Hero.astro with tokens"
```

---

### Task 5: Corriger les hardcodes dans Testimonials.astro

**Files:**
- Modify: `src/components/Testimonials.astro`

- [ ] **Step 1: Remplacer le background hardcodé sur `<section>`**

Dans `Testimonials.astro`, changer uniquement l'inline style de la balise `<section>` :
```
style="background: #0a0806;"
```
Par :
```
style="background: var(--bg-primary);"
```
Garder `data-dark-section` — peut être référencé en JS/animations.

- [ ] **Step 2: Mettre à jour les couleurs avatar**

Dans le `.map()` des témoignages, remplacer l'inline style de l'avatar :
```
style="background: rgba(91,150,245,0.15); color: var(--accent-light); border: 1px solid rgba(91,150,245,0.25);"
```
Par :
```
style="background: rgba(59,130,246,0.15); color: var(--accent-light); border: 1px solid rgba(59,130,246,0.25);"
```

- [ ] **Step 3: Mettre à jour la transition `.testimonial-card`**

Dans le `<style>` scoped, remplacer :
```css
  .testimonial-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    transition: border-color 0.25s, background 0.25s;
  }
```
Par :
```css
  .testimonial-card {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    transition: border-color 0.3s ease-in-out, background 0.3s ease-in-out;
  }
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonials.astro
git commit -m "fix: replace hardcoded colors in Testimonials.astro with tokens"
```

---

### Task 6: Corriger les hardcodes dans Services.astro

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Mettre à jour le glow et le h2**

Dans `Services.astro`, trouver le glow bas-droite et remplacer :
```
style="background: radial-gradient(ellipse at 80% 100%, rgba(32,96,216,0.18) 0%, rgba(32,96,216,0.06) 40%, transparent 70%);"
```
Par :
```
style="background: radial-gradient(ellipse at 80% 100%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 40%, transparent 70%);"
```

Sur le h2, remplacer :
```
style="font-size: var(--type-h2); font-weight: 700; color: #ffffff;"
```
Par :
```
style="font-size: var(--type-h2); font-weight: 700; color: var(--text-primary);"
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.astro
git commit -m "fix: update accent rgba and remove hardcoded white in Services.astro"
```

---

### Task 7: Corriger les hardcodes dans Contact.astro

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Remplacer le gradient background par fond uniforme**

Sur la balise `<section>` de `Contact.astro`, remplacer :
```
style="background: linear-gradient(to bottom, #ffffff 0%, #ffffff 28%, #0a0806 82%);"
```
Par :
```
style="background: var(--bg-primary);"
```

- [ ] **Step 2: Mettre à jour le glow du dot de disponibilité**

Trouver le dot de disponibilité et remplacer :
```
style="background: var(--accent-primary); box-shadow: 0 0 8px rgba(32,96,216,0.5);"
```
Par :
```
style="background: var(--accent-primary); box-shadow: 0 0 8px rgba(59,130,246,0.5);"
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.astro
git commit -m "fix: replace gradient background and update accent glow in Contact.astro"
```

---

### Task 8: Corriger les hardcodes dans Footer.astro

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Mettre à jour les backgrounds dans le `<style>` scoped**

Dans le `<style>` scoped de `Footer.astro`, remplacer :
```css
  .footer-cta-section {
    background: #0a0806;
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .footer-cta-title {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 700;
    color: #ffffff;
  }

  .footer-bar {
    background: #0a0806;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .footer-link {
    color: rgba(255, 255, 255, 0.35);
    transition: color 0.2s;
  }
```
Par :
```css
  .footer-cta-section {
    background: var(--bg-primary);
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .footer-cta-title {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 700;
    color: var(--text-primary);
  }

  .footer-bar {
    background: var(--bg-primary);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .footer-link {
    color: rgba(255, 255, 255, 0.35);
    transition: color 0.3s ease-in-out;
  }
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "fix: replace hardcoded backgrounds and update transition in Footer.astro"
```

---

### Task 9: Vérifier Navbar.astro — transitions nav links

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Mettre à jour la durée de transition sur les nav links desktop**

Dans `Navbar.astro`, les liens desktop ont `transition-colors duration-200`. Remplacer `duration-200` par `duration-300` sur chaque lien :

```html
<a href="#services" class="nav-link hover:text-white transition-colors duration-300 tracking-wide">Services</a>
<a href="#realisations" class="nav-link hover:text-white transition-colors duration-300 tracking-wide">Réalisations</a>
<a href="#a-propos" class="nav-link hover:text-white transition-colors duration-300 tracking-wide">À propos</a>
<a href="#processus" class="nav-link hover:text-white transition-colors duration-300 tracking-wide">Processus</a>
<a href="#faq" class="nav-link hover:text-white transition-colors duration-300 tracking-wide">FAQ</a>
```

**Ne pas toucher** : `transition: top 0.4s ease` sur `<nav>` (géré par JS), `#navbar-bg` (fond floating dark intentionnel), `navbar.ts`.

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "fix: update nav link transition duration to 300ms"
```

---

### Task 10: Vérification visuelle finale

- [ ] **Step 1: Lancer le serveur de dev**

```bash
npm run dev
```
Ouvrir `http://localhost:4321` dans le navigateur.

- [ ] **Step 2: Checklist visuelle**

Vérifier dans l'ordre :
- [ ] Hero : fond `#0A0A0A`, grille bleue, dot bleu `#3B82F6`
- [ ] Services : capsule `#111111` sur fond `#0A0A0A`, bordures visibles
- [ ] Portfolio : fond dark, cartes `#111111` + bordure `#262626`
- [ ] Testimonials : fond dark, cartes `#111111`, avatar bleu
- [ ] Contact : fond uniforme dark (plus de gradient blanc→noir)
- [ ] Footer : fond dark continu depuis Contact
- [ ] Navbar : hover transitions fluides, disparition au scroll instantanée préservée
- [ ] Aucune section avec fond blanc ou clair visible au scroll

- [ ] **Step 3: Vérifier les contrastes**

- Texte principal sur `#0A0A0A` : blanc `#ffffff` → ratio ~21:1 ✓
- Texte secondaire `rgba(255,255,255,0.72)` sur `#0A0A0A` → ~15:1 ✓
- Accent `#3B82F6` sur `#0A0A0A` → ratio ~4.9:1 (AA ✓ pour texte large)

- [ ] **Step 4: Commit final si corrections mineures**

```bash
git add -p
git commit -m "fix: visual adjustments after dark mode verification"
```
