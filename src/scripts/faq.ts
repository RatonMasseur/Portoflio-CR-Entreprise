document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const parent = trigger.parentElement!;
    const content = parent.querySelector('.faq-content') as HTMLElement;
    const icon = trigger.querySelector('.faq-icon') as HTMLElement;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-trigger').forEach(other => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        const otherContent = other.parentElement!.querySelector('.faq-content') as HTMLElement;
        const otherIcon = other.querySelector('.faq-icon') as HTMLElement;
        otherContent.style.height = '0';
        otherIcon.style.transform = 'rotate(0deg)';
        otherIcon.textContent = '+';
      }
    });

    if (isOpen) {
      trigger.setAttribute('aria-expanded', 'false');
      content.style.height = '0';
      icon.style.transform = 'rotate(0deg)';
      icon.textContent = '+';
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      content.style.height = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(45deg)';
      icon.textContent = '×';
    }
  });
});
