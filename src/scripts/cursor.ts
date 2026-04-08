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
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(32,96,216,0.12) 0%, rgba(32,96,216,0.04) 40%, transparent 70%);
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
      dot.classList.add('on-dark');
    });
    section.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
      dot.classList.remove('on-dark');
    });
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateRing() {
    dot!.style.transform = `translate(${mouseX - 3.5}px, ${mouseY - 3.5}px)`;
    spotlight.style.left = `${mouseX}px`;
    spotlight.style.top = `${mouseY}px`;
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ringEl.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Liens et boutons — ring se remplit
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ringEl.classList.add('is-hovering');
      ringEl.classList.remove('is-viewing');
    });
    el.addEventListener('mouseleave', () => {
      ringEl.classList.remove('is-hovering');
    });
  });

  // Cards projets / tilt — ring devient sélecteur carré
  document.querySelectorAll('[data-tilt], .card-sharp').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ringEl.classList.add('is-viewing');
      ringEl.classList.remove('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      ringEl.classList.remove('is-viewing');
    });
  });
}
