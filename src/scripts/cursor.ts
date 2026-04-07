const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (dot && ring && window.matchMedia('(hover: hover)').matches) {
  const ringEl = ring;
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Spotlight sur sections sombres
  const spotlight = document.createElement('div');
  spotlight.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9997;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(91,150,245,0.10) 0%, rgba(32,96,216,0.04) 40%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease;
    opacity: 0;
    left: -999px;
    top: -999px;
  `;
  document.body.appendChild(spotlight);

  document.querySelectorAll('[data-dark-section]').forEach(section => {
    section.addEventListener('mouseenter', () => {
      spotlight.style.opacity = '1';
    });
    section.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    spotlight.style.left = `${mouseX}px`;
    spotlight.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ringEl.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactives = 'a, button, input, textarea, [data-tilt]';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      ringEl.style.width = '50px';
      ringEl.style.height = '50px';
      ringEl.style.borderColor = 'var(--accent-light)';
    });
    el.addEventListener('mouseleave', () => {
      ringEl.style.width = '36px';
      ringEl.style.height = '36px';
      ringEl.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
  });
}
