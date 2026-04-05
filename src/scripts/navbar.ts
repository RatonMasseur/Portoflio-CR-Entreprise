const navbar = document.getElementById('navbar')!;
const menuToggle = document.getElementById('menu-toggle')!;
const mobileMenu = document.getElementById('mobile-menu')!;
const bar1 = document.getElementById('bar1')!;
const bar2 = document.getElementById('bar2')!;
const bar3 = document.getElementById('bar3')!;
const mobileLinks = document.querySelectorAll('.mobile-link');

let lastScrollY = 0;
let isMenuOpen = false;

window.addEventListener('scroll', () => {
  if (isMenuOpen) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 100) {
    navbar.style.top = '-80px';
  } else {
    navbar.style.top = '24px';
  }
  lastScrollY = currentY;
});

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
