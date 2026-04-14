# Portfolio V2 — Redesign Spec
**Date :** 2026-04-14  
**Scope :** Process, Hero, Boutons, Navbar, Footer, Capsules sections, Logo SVG

---

## Contexte

La section Process est buggée (React island mal hydraté). Le hero manque de structure (trop grand, mal aligné, pas d'animation). Les boutons ont des flèches à supprimer. La navbar glass est illisible. Le footer montre un flash blanc. Services et Tools n'ont pas de délimitation visuelle forte. Le logo est en WebP basse résolution.

---

## 1. Process — Sticky Cards GSAP

**Fichiers :** `src/components/Process.astro`, supprimer `src/components/ProcessCards.tsx`

### Étapes
| # | Tag | Titre |
|---|-----|-------|
| 01 | Étape 01 | Cahier des charges |
| 02 | Étape 02 | Design |
| 03 | Étape 03 | Réalisation |
| 04 | Étape 04 | Mise en ligne |

### Structure HTML
```
<section id="processus" style="background: var(--bg-primary)">
  <!-- Header -->
  <div class="process-header max-w-3xl mx-auto px-6 pt-32 pb-16 text-center">
    <span class="section-label">Processus</span>
    <h2>Comment ça <span style="color: var(--accent-primary)">se passe ?</span></h2>
    <p>Un process simple et transparent, du brief à la mise en ligne en 7 jours.</p>
  </div>

  <!-- Desktop: sticky track -->
  <div class="process-track hidden md:block" style="height: 400vh">
    <div class="process-sticky" style="position:sticky; top:0; height:100vh; display:flex; align-items:center; justify-content:center;">
      <!-- 4× .process-card (absolute, superposées) -->
      <div class="process-card" data-card="0">…</div>
      <div class="process-card" data-card="1">…</div>
      <div class="process-card" data-card="2">…</div>
      <div class="process-card" data-card="3">…</div>
    </div>
  </div>

  <!-- Mobile: liste verticale -->
  <div class="md:hidden …">…</div>
</section>
```

### Mécanique GSAP
- ScrollTrigger sur `.process-track` : `start: "top top"`, `end: "bottom bottom"`, `scrub: true`
- À chaque 25% du scroll (4 cartes), `progress` passe de 0→1
- Carte active : `scale(1)`, `opacity(1)`, `translateY(0)`
- Cartes précédentes : `scale(0.95 → 0.85)`, `translateY(-20px × i)`
- Les cartes sont `position: absolute`, superposées au centre du sticky container
- GSAP calculé dans `src/scripts/animations.ts` (nouvelle fonction `initProcessCards()`)

### Apparence carte
- Background : `#0f0d0a` (01), `#0d1420` (02), `#0b1626` (03), `#09182e` (04)
- Largeur : `min(768px, 90vw)`, `border-radius: 20px`
- Border : `1px solid rgba(255,255,255,0.06)`
- Header : tag bleu `rgba(91,150,245,0.65)` + titre blanc
- Body : description + bullet points
- Numéro décoratif : `right: -12px; bottom: -24px; opacity: 0.06; font-size: 180px`

---

## 2. Hero — Layout centré + titre animé

**Fichier :** `src/components/Hero.astro`

### Layout
- Section : `min-h-screen flex flex-col items-center justify-center text-center px-6`
- Background : conserve `HeroBackground` (shader) + `.hero-grid` + `.grain-hero`
- Label "Développeur Web Freelance · Alsace" centré en haut du contenu

### Titre
```html
<h1>
  Pas une agence.<br />
  Pas un template.
</h1>
<div class="hero-animated-line">
  Votre
  <span class="hero-word-container">
    <span class="hero-word">présence</span>  <!-- initial -->
  </span>
  .
</div>
```
- Taille h1 : `clamp(2.2rem, 5vw, 4.5rem)` (au lieu de `--type-display`)
- `.hero-animated-line` : même taille, `color: var(--accent-light)`, italic
- `.hero-word-container` : `display: inline-block; overflow: hidden; vertical-align: bottom`
- Animation JS vanilla dans `<script>` : `setTimeout` toutes les 2500ms, cycle `['présence', 'vitrine', 'site']`
- Transition : mot sortant → `translateY(-110%) skewY(-12deg)`, mot entrant → `translateY(0) skewY(0)` avec `transition: 0.5s cubic-bezier(0.76, 0, 0.24, 1)`

### Boutons
- Remplacent les `.btn-primary` et `.btn-outline-dark` actuels
- Classe `.btn-primary` et `.btn-outline-dark` (voir section 3)
- Plus de SVG flèche dans le hero

---

## 3. Boutons — Skew text animation

**Fichier :** `src/styles/global.css`

Suppression des `.btn-arrow-icon`, `.btn-arrow-inner`, `.btn-arrow-light`, `.btn-arrow-white` de tous les composants.

### Nouveau `.btn-primary`
```css
.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  background: var(--gradient-cta);
  color: #fff;
  border-radius: 100px;
  padding: 12px 28px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-primary span {
  display: block;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}
.btn-primary .btn-text-back {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(110%) skewY(12deg);
}
.btn-primary:hover .btn-text-front { transform: translateY(-110%) skewY(-12deg); }
.btn-primary:hover .btn-text-back  { transform: translateY(0) skewY(0); }
```

Même mécanique pour `.btn-outline-dark` (variante bord blanc, fond transparent).  
Structure HTML des boutons : `<a class="btn-primary"><span class="btn-text-front">Texte</span><span class="btn-text-back">Texte</span></a>`

**Composants à mettre à jour :** `Hero.astro`, `Footer.astro`, `Contact.astro`  
La navbar `.contact-nav-btn` **n'est pas modifiée** (mini-bouton avec son propre style).

---

## 4. Navbar — Adaptive dark/light

**Fichiers :** `src/components/Navbar.astro`, `src/scripts/navbar.ts`

### Logo
- Remplacer `<img src="/images/logo-white.webp">` par le SVG inline (ou `<img src="/images/logo.svg">`)
- Le SVG "CR Logo Blanc" (sans fond carré) est sauvegardé dans `public/images/logo.svg`
- Dans le SVG, remplacer `fill="#000000"` par `fill="currentColor"` sur le `<g>`
- CSS : `.navbar-logo { color: white; }` en mode dark, `color: #0f0d0a` en mode light

### Comportement scroll (déjà dans `navbar.ts`)
- Scroll down > 100px → `navbar.style.top = '-80px'` ✓ (existant, garder)
- Scroll up → `navbar.style.top = '16px'` ✓ (existant, garder)

### Thème adaptatif (nouveau dans `navbar.ts`)
```ts
// Observer les sections dark
const darkSections = document.querySelectorAll('[data-dark-section]');
const navbarBg = document.getElementById('navbar-bg')!;
const logo = document.querySelector('.navbar-logo')!;

const themeObserver = new IntersectionObserver((entries) => {
  // Si une section dark intersecte le top de l'écran → mode dark
  // Sinon → mode light
}, { rootMargin: '-0px 0px -90% 0px' });

darkSections.forEach(s => themeObserver.observe(s));
```

- **Mode dark** : `navbarBg` → `background: rgba(10,8,6,0.85)`, texte/logo blanc
- **Mode light** : `navbarBg` → `background: rgba(255,255,255,0.92)`, texte/logo `#0f0d0a`
- Transition CSS `0.3s ease` sur background et color

**Supprimer** le `<script>` inline dans `Navbar.astro` (logique dupliquée).

---

## 5. Footer — Gradient imperceptible

**Fichiers :** `src/components/Contact.astro`, `src/components/Footer.astro`

### Problème
Le dégradé `#fff → #0a0806 at 62%` est trop abrupt. Le `<footer>` à `background: #0a0806` commence visuellement après la section contact, créant un flash blanc.

### Solution
Dans `Contact.astro` :
```css
section#contact {
  background: linear-gradient(
    to bottom,
    #ffffff 0%,
    #ffffff 35%,
    rgba(10,8,6,0.0) 40%,   /* imperceptible début */
    #0a0806 75%
  );
}
```

Dans `Footer.astro` :
```css
.footer-cta-section {
  background: #0a0806;  /* inchangé */
  margin-top: 0;        /* colle directement */
}
footer.footer-bar {
  background: #0a0806;
}
```

Ajouter `data-dark-section` sur `.footer-cta-section` et `footer.footer-bar` pour que la navbar reste en mode dark en bas de page.

Assurer que la section `#contact` et la `footer-cta-section` sont **contiguës dans le DOM** sans gap ni padding parasite entre les deux.

---

## 6. Capsules — Services + Tools

**Fichiers :** `src/components/Services.astro`, `src/components/Tools.astro`

### Structure
```html
<!-- Avant -->
<section id="services" style="background: #080808;" data-dark-section>
  <!-- contenu -->
</section>

<!-- Après -->
<section id="services" class="py-16 px-6" style="background: var(--bg-primary);" data-dark-section>
  <div class="section-capsule">
    <!-- contenu identique -->
  </div>
</section>
```

```css
.section-capsule {
  max-width: 1200px;
  margin: 0 auto;
  background: #080808;
  border-radius: 24px;
  overflow: hidden;
  padding: 4rem 2rem;
  box-shadow: 0 8px 64px rgba(0,0,0,0.2);
}
```

La section parent passe à fond blanc. La capsule contient tout le dark content. `data-dark-section` reste sur la section parent pour que la navbar détecte correctement.

---

## 7. Logo SVG

**Fichiers :** `public/images/logo.svg` (nouveau), `public/images/logo-footer.svg` (optionnel)

- Utiliser "CR Logo Blanc.svg" (sans fond carré noir)
- Modifier `fill="#000000"` → `fill="currentColor"` sur le `<g>`
- Sauvegarder dans `public/images/logo.svg`
- Dans `Navbar.astro` : `<img src="/images/logo.svg" class="navbar-logo" style="height:52px; color: white;">` (SVG avec currentColor répond à `color` CSS)
- Dans `Footer.astro` : même fichier, `color: white`
- Supprimer `logo-white.webp` une fois remplacé

---

## Ordre d'implémentation recommandé

1. Logo SVG (rapide, indépendant)
2. Boutons global.css + mise à jour Hero/Footer/Contact
3. Navbar adaptive (dark/light + logo dynamique)
4. Hero centré + animation titre
5. Footer gradient fix
6. Process GSAP (le plus complexe)
7. Capsules Services + Tools

---

## Vérification

- `npm run dev` → vérifier visuellement chaque section
- Scroll lent sur Process → cartes s'empilent correctement
- Scroll navbar → disparaît en descendant, réapparaît en montant
- Navbar dark au-dessus du hero, light au-dessus des sections blanches
- Mobile : Process affiche la liste verticale (pas de sticky)
- Gradient Contact → Footer : aucun flash blanc visible
- Boutons : hover skew text fonctionne sur btn-primary et btn-outline-dark
