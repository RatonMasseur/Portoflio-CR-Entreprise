import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Disable on mobile if issues arise
if ('ontouchstart' in window && window.innerWidth < 768) {
  lenis.destroy();
}

// Make lenis available for GSAP ScrollTrigger sync
(window as any).__lenis = lenis;
