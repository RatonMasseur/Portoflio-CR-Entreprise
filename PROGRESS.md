# PROGRESS — Portfolio Robin Ration

> Mis à jour à chaque fin de session. Synthèse passé, maximum de détail sur le présent.

---

## Stack
Astro (SSG) + Tailwind CSS + GSAP + ScrollTrigger + Lenis + @lottiefiles/dotlottie-web  
GitHub: https://github.com/RatonMasseur/Portoflio-CR-Entreprise — branche `main`

---

## État des sections

| Section | Statut |
|---------|--------|
| Hero (fond `#0A0A0A`, grille bleue `#3B82F6`, titre cyclique) | ✅ |
| Navbar (fond dark flottant, hide on scroll, transitions 300ms) | ✅ |
| Personas / Prestations | ✅ |
| Services bento (capsule `#111111`, bordures `#262626`) | ✅ |
| Portfolio carousel (Embla) | ✅ |
| About | ✅ |
| Tools SVG | ✅ |
| Process (GSAP sticky cards) | ✅ |
| Testimonials (fond dark, cards `#111111` + bordure) | ✅ |
| FAQ | ✅ |
| Contact (fond dark uniforme, plus de gradient blanc) | ✅ |
| Footer (fond dark continu) | ✅ |

---

## Passé — acquis (synthèse)

- Hero : fond sombre `#0a0806`, grille animée, grain, titre cyclique "présence/vitrine/site" — animation slide+fade vanilla JS, sans clipping
- Navbar : fond noir fixe (0.95), hide on scroll-down / réapparition instantanée, capsule pill, logo 72px — double style attr corrigé
- Services bento : capsule sombre, espacement augmenté (py-20 md:py-28, gap-6, padding capsule 5rem 3rem)
- Marquee compétences : supprimé
- Portfolio carousel (Embla) : interactions corrigées, vanilla JS
- Testimonials : fond noir `#0a0806`, cards dark, auto-scroll vanilla JS
- FAQ : ✅ inchangé
- Contact : formulaire fond blanc, gradient blanc→noir fluide sans ligne de démarcation
- Footer : fond noir continu, logo 64px
- React/Astro conflicts : tous supprimés, tout en vanilla JS

### Session 11 — Dark redesign complet (2026-04-18)
- Palette unifiée : fond `#0A0A0A`, texte `#FFFFFF`, accent `#3B82F6` (Tailwind blue-500)
- Token-first : tous les tokens mis à jour dans `global.css`, zéro hardcode dans les composants
- Cards : fond `#111111` + bordure `1px solid #262626` (`.card-sharp`, `.bento-card`, `.testimonial-card`)
- Transitions : uniformisées à `0.3s ease-in-out` partout (sauf cubic-bezier boutons + logique JS navbar)
- Espacement : `padding-block: 5rem` via CSS global, classes `py-*` supprimées des `<section>`
- Sweep rgba : anciens bleus `rgba(32,96,216,...)` / `rgba(91,150,245,...)` → nouveau système `rgba(59,130,246,...)` / `rgba(147,197,253,...)`
- Contact : gradient blanc→noir supprimé, fond dark uniforme
- Permissions Claude Code : `Bash(*), Read, Write, Edit, Glob, Grep, Agent` autorisés sans confirmation

---

## Contenu restant (hors bugs)

- [ ] Vraies réalisations dans `Portfolio.astro` (images + projets réels)
- [ ] Formspree ID dans `Contact.astro` (`YOUR_FORM_ID`)
- [ ] OG image `/images/og-image.jpg` pour partages sociaux
