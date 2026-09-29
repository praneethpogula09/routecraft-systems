(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      if (open) menu.querySelector('a')?.focus();
    });

    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  window.sa_event = window.sa_event || function () {
    const args = [].slice.call(arguments);
    window.sa_event.q ? window.sa_event.q.push(args) : window.sa_event.q = [args];
  };

  document.querySelectorAll('[data-event]').forEach(element => {
    element.addEventListener('click', () => window.sa_event(element.dataset.event));
  });

  const inquiryForm = document.querySelector('#qualified-inquiry');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', () => {
      window.sa_event('lead_form_submit');
      const button = inquiryForm.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending securely…';
      }
    });
  }

  if (document.body.dataset.page === 'thank-you') {
    window.sa_event('lead_form_success_proxy');
  }

  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });
})();
