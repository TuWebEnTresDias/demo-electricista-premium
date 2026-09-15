(() => {
  'use strict';
  const params = new URLSearchParams(window.location.search);
  const name = params.get('n') || params.get('e');
  if (name) {
    const safeName = name.trim().slice(0, 80);
    document.querySelectorAll('[data-dynamic="logo"],[data-dynamic="footer-name"]').forEach((el) => {
      el.textContent = `${safeName} / premium`;
    });
    document.title = `${safeName} | Diagnóstico eléctrico claro`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${safeName}: demo comercial de diagnóstico y trabajos eléctricos con alcance transparente.`;
  }

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Demo: el formulario no envió datos. En una implementación real, aquí se conectaría el canal acordado.';
    form.reset();
  });
  document.getElementById('currentYear').textContent = new Date().getFullYear();
})();
