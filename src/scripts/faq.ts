document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const parent = trigger.parentElement!;
    const content = parent.querySelector('.faq-content') as HTMLElement;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Fermer tous les autres
    document.querySelectorAll('.faq-trigger').forEach(other => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        const otherContent = other.parentElement!.querySelector('.faq-content') as HTMLElement;
        otherContent.classList.remove('open');
      }
    });

    if (isOpen) {
      trigger.setAttribute('aria-expanded', 'false');
      content.classList.remove('open');
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      content.classList.add('open');
    }
  });
});
