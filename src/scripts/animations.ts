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

// Process line draw animation
const processLine = document.getElementById('process-line');
if (processLine) {
  gsap.from(processLine, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: processLine,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}
