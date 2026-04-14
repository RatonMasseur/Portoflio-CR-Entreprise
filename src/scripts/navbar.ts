const navbar = document.getElementById('navbar')!;
const navbarBg = document.getElementById('navbar-bg')!;
const navbarLogo = navbar.querySelector<HTMLElement>('.navbar-logo')!;
const menuToggle = document.getElementById('menu-toggle')!;
const mobileMenu = document.getElementById('mobile-menu')!;
const bar1 = document.getElementById('bar1')!;
const bar2 = document.getElementById('bar2')!;
const bar3 = document.getElementById('bar3')!;
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');

// ── Hide/show on scroll ──────────────────────────────────────
let lastScrollY = 0;
let isMenuOpen = false;

window.addEventListener('scroll', () => {
  if (isMenuOpen) return;
  const currentY = window.scrollY;
  navbar.style.top = (currentY > lastScrollY && currentY > 100) ? '-80px' : '16px';
  lastScrollY = currentY;
});

// ── Dark / Light theme detection ─────────────────────────────
function applyDarkTheme() {
  navbarBg.style.background = 'rgba(10,8,6,0.88)';
  navbarBg.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)';
  navbarLogo.style.color = '#ffffff';
  navbar.querySelectorAll<HTMLElement>('.nav-link').forEach(el => {
    el.style.color = 'rgba(255,255,255,0.85)';
  });
}

function applyLightTheme() {
  navbarBg.style.background = 'rgba(255,255,255,0.92)';
  navbarBg.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.06)';
  navbarLogo.style.color = '#0f0d0a';
  navbar.querySelectorAll<HTMLElement>('.nav-link').forEach(el => {
    el.style.color = 'rgba(15,13,10,0.75)';
  });
}

// Observer: if a dark section intersects the top 15% of the screen → dark navbar
const darkSections = document.querySelectorAll<HTMLElement>('[data-dark-section]');
let darkCount = 0;

const themeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      darkCount++;
    } else {
      darkCount = Math.max(0, darkCount - 1);
    }
  });
  if (darkCount > 0) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
}, {
  rootMargin: '-0px 0px -85% 0px',
  threshold: 0,
});

darkSections.forEach(s => themeObserver.observe(s));

// Default: hero is always first → start dark
applyDarkTheme();

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
