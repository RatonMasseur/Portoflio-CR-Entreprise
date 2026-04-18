const navbar = document.getElementById('navbar')!;
const navbarBg = document.getElementById('navbar-bg')!;
const menuToggle = document.getElementById('menu-toggle')!;
const mobileMenu = document.getElementById('mobile-menu')!;
const bar1 = document.getElementById('bar1')!;
const bar2 = document.getElementById('bar2')!;
const bar3 = document.getElementById('bar3')!;
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');

// ── Hide/show + opacity on scroll ────────────────────────────
let lastScrollY = 0;
let isMenuOpen = false;

window.addEventListener('scroll', () => {
  if (isMenuOpen) return;
  const currentY = window.scrollY;
  const scrollingDown = currentY > lastScrollY && currentY > 100;

  if (scrollingDown) {
    navbar.style.transition = 'top 0.4s ease';
    navbar.style.top = '-80px';
  } else {
    // Réapparition instantanée
    navbar.style.transition = 'top 0s';
    navbar.style.top = '16px';
  }

  lastScrollY = currentY;
});

// ── Mobile menu ───────────────────────────────────────────────
menuToggle.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
    bar1.style.transform = 'rotate(45deg) translate(3px, 3px)';
    bar2.style.opacity = '0';
    bar3.style.transform = 'rotate(-45deg) translate(3px, -3px)';
    document.body.style.overflow = 'hidden';
  } else {
    closeMobileMenu();
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    closeMobileMenu();
  });
});

function closeMobileMenu() {
  mobileMenu.classList.add('opacity-0', 'pointer-events-none');
  mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
  bar1.style.transform = '';
  bar2.style.opacity = '1';
  bar3.style.transform = '';
  document.body.style.overflow = '';
}

// ── Section active highlight ──────────────────────────────────
const sectionIds = ['services', 'realisations', 'a-propos', 'outils', 'processus', 'faq'];

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) activeObserver.observe(el);
});
