const track = document.getElementById('testimonial-track')!;
const slides = track.querySelectorAll<HTMLElement>(':scope > div');
const totalSlides = slides.length;

const dotsDesktop = document.querySelectorAll<HTMLButtonElement>('#testimonial-dots-desktop [data-dot]');
const dotsMobile = document.querySelectorAll<HTMLButtonElement>('#testimonial-dots [data-dot]');

let current = 0;
let autoplayInterval: ReturnType<typeof setInterval>;

function getSlideWidth(): number {
  return window.innerWidth >= 768 ? 50 : 100;
}

function updateDots(dots: NodeListOf<HTMLButtonElement>, index: number) {
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.style.background = 'var(--accent-primary)';
      dot.style.width = '24px';
    } else {
      dot.style.background = 'var(--text-muted)';
      dot.style.width = '8px';
    }
  });
}

function goTo(index: number) {
  current = index;
  const width = getSlideWidth();
  track.style.transform = `translateX(-${current * width}%)`;
  updateDots(dotsDesktop, current);
  updateDots(dotsMobile, current);
}

function next() {
  const maxIndex = window.innerWidth >= 768 ? totalSlides - 2 : totalSlides - 1;
  goTo(current >= maxIndex ? 0 : current + 1);
}

[...dotsDesktop, ...dotsMobile].forEach((dot, i) => {
  const idx = Number(dot.dataset.dot);
  dot.addEventListener('click', () => {
    goTo(idx);
    resetAutoplay();
  });
});

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(next, 4000);
}

resetAutoplay();
window.addEventListener('resize', () => goTo(current));
