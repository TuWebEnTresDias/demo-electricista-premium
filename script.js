(() => {
  'use strict';

  const localParams = new URLSearchParams(window.location.search);
  let params = localParams;
  if (!localParams.toString()) {
    try {
      if (window.parent && window.parent !== window) params = new URLSearchParams(window.parent.location.search);
    } catch (error) { /* Cross-origin parent: keep local defaults. */ }
  }

  const rawCompany = params.get('e');
  const rawName = params.get('n');
  const safeName = (rawCompany || rawName || '').trim().slice(0, 80);
  const identity = safeName || 'Electricista';
  const rawPhone = params.get('t');
  const cleanPhone = (rawPhone || '1158055802').replace(/[\s\-()]/g, '');
  const whatsappPhone = `549${cleanPhone}`;
  const displayPhone = cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2-$3');

  const messages = {
    diagnostico: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero contar un problema eléctrico para orientar el diagnóstico.`,
    falla: `Hola, soy ____. Me comunico desde la página de ${identity}. Tengo una falla eléctrica: ocurre desde hace ____ y afecta ____. ¿Podemos orientar el próximo paso?`,
    instalacion: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero consultar una instalación o mejora eléctrica. El espacio es ____ y necesito ____ .`,
    inspeccion: `Hola, soy ____. Me comunico desde la página de ${identity}. Quiero consultar una inspección eléctrica. Es una ____ y me preocupa ____ .`
  };

  document.querySelectorAll('[data-dynamic="logo"],[data-dynamic="footer-name"]').forEach((el) => {
    el.textContent = `${identity} / premium`;
  });
  if (safeName) {
    document.title = `${identity} | Diagnóstico eléctrico claro`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${identity}: demo comercial de diagnóstico por WhatsApp y trabajos eléctricos con alcance transparente.`;
  }

  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const intent = link.dataset.intent || 'diagnostico';
    link.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messages[intent] || messages.diagnostico)}`;
  });
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => { link.href = `tel:${cleanPhone}`; });
  document.querySelectorAll('[data-phone-display]').forEach((el) => { el.textContent = displayPhone; });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.getElementById('currentYear').textContent = new Date().getFullYear();
})();
