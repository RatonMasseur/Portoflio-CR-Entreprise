const track = document.getElementById('testimonial-track')!;
const dots = document.querySelectorAll<HTMLButtonElement>('[data-dot]');
const totalSlides = dots.length;

let current = 0;
let autoplayInterval: ReturnType<typeof setInterval>;

function getSlideWidth(): number {
  return window.innerWidth >= 768 ? 50 : 100;
}

function goTo(index: number) {
  current = index;
  const width = getSlideWidth();
  track.style.transform = `translateX(-${current * width}%)`;
  dots.forEach((dot, i) => {
    if (i === current) {
      dot.style.background = 'var(--accent-primary)';
      dot.style.width = '24px';
    } else {
      dot.style.background = 'var(--text-muted)';
      dot.style.width = '8px';
    }
  });
}

function next() {
  const maxIndex = window.innerWidth >= 768 ? totalSlides - 2 : totalSlides - 1;
  goTo(current >= maxIndex ? 0 : current + 1);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goTo(i);
    resetAutoplay();
  });
});

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(next, 4000);
}

resetAutoplay();
window.addEventListener('resize', () => goTo(current));
