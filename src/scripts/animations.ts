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

// Hero headline text animation
const heroHeadline = document.getElementById('hero-headline');
if (heroHeadline) {
  gsap.from(heroHeadline.children, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    delay: 0.3,
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

// Process line draw animation — supprimé (section process redessinée en sticky cards)
