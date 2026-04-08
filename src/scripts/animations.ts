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

// Fade-up animations
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

// Hero headline — text reveal mot par mot
const heroHeadline = document.getElementById('hero-headline');
if (heroHeadline) {
  // Wrap chaque nœud texte direct des enfants h1 en spans par mot
  heroHeadline.querySelectorAll('h1').forEach(el => {
    // Ne splitter que les nœuds texte directs (préserve les spans enfants comme .hero-underline)
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const words = node.textContent.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        words.forEach(part => {
          if (/\s+/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
          } else if (part) {
            const wrap = document.createElement('span');
            wrap.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom; line-height:inherit;';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.style.display = 'inline-block';
            inner.textContent = part;
            wrap.appendChild(inner);
            fragment.appendChild(wrap);
          }
        });
        node.replaceWith(fragment);
      }
    });
  });

  gsap.from(heroHeadline.querySelectorAll('.word-inner'), {
    y: '110%',
    rotation: 3,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out',
    stagger: 0.055,
    delay: 0.2,
  });
}

// Parallax sur les images de projets
gsap.utils.toArray<HTMLElement>('[data-parallax-img]').forEach(img => {
  gsap.fromTo(img,
    { y: -30 },
    {
      y: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.portfolio-card') as Element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
});

// Tools illustration — lignes SVG + lévitation des cartes + flèche manuscrite
const toolsIllustration = document.getElementById('tools-illustration');
if (toolsIllustration) {
  // Lignes : se dessinent au scroll
  gsap.to('.tool-line', {
    strokeDashoffset: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: toolsIllustration,
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
  });

  // Cartes : lévitation désynchronisée
  document.querySelectorAll<HTMLElement>('.tool-card').forEach((card, i) => {
    gsap.to(card, {
      y: -10,
      duration: 1.8 + i * 0.3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: i * 0.2,
    });
  });

  // Flèche manuscrite : se dessine après les lignes
  gsap.to('.handwritten-arrow-path', {
    strokeDashoffset: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: toolsIllustration,
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
    delay: 1.4,
  });
}

// Hero orbs — GSAP mesh gradient (remplace les keyframes CSS float-1/2/3)
const orbs = document.querySelectorAll<HTMLElement>('.orb');
orbs.forEach((orb, i) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  // Deux positions aléatoires pour un mouvement organique continu
  tl.to(orb, {
    x: gsap.utils.random(-70, 70),
    y: gsap.utils.random(-50, 50),
    scale: gsap.utils.random(0.92, 1.12),
    duration: gsap.utils.random(16, 22),
    ease: 'sine.inOut',
  }).to(orb, {
    x: gsap.utils.random(-70, 70),
    y: gsap.utils.random(-50, 50),
    scale: gsap.utils.random(0.88, 1.08),
    duration: gsap.utils.random(14, 20),
    ease: 'sine.inOut',
  });
  // Décalage de phase pour désynchroniser les 3 orbs
  tl.progress(i * 0.33);
});
