const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const themeButton = document.querySelector('[data-theme-toggle]');

// Persist the visitor's preference and keep the button state understandable to assistive technology.
function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  themeButton.querySelector('span').textContent = isDark ? '☀' : '☾';
  localStorage.setItem('miga-theme', theme);
}

setTheme(localStorage.getItem('miga-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

themeButton.addEventListener('click', () => setTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('.sr-only').textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 8), { passive: true });
header.classList.toggle('is-scrolled', scrollY > 8);

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
