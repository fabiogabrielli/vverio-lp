const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded','false');
    mobileMenu.hidden = true;
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* Agenzia waitlist */
const waitlistModal = document.getElementById('agenziaWaitlistModal');
const waitlistForm = document.getElementById('agenziaWaitlistForm');
const waitlistEmail = document.getElementById('agenziaWaitlistEmail');
const waitlistSubmit = document.getElementById('agenziaWaitlistSubmit');
const waitlistSuccess = document.getElementById('agenziaWaitlistSuccess');
const waitlistError = document.getElementById('agenziaWaitlistError');
const waitlistCloseButtons = document.querySelectorAll('[data-waitlist-close]');

waitlistCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (waitlistModal?.open) waitlistModal.close();
  });
});

if (waitlistModal) {
  waitlistModal.addEventListener('click', (event) => {
    if (event.target === waitlistModal) {
      waitlistModal.close();
    }
  });

  waitlistModal.addEventListener('close', () => {
    if (!waitlistForm) return;
    waitlistForm.hidden = false;
    if (waitlistSuccess) waitlistSuccess.hidden = true;
    if (waitlistError) waitlistError.hidden = true;
  });
}

if (waitlistForm && waitlistEmail) {
  waitlistForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (waitlistSuccess) waitlistSuccess.hidden = true;
    if (waitlistError) waitlistError.hidden = true;

    const email = waitlistEmail.value.trim();
    if (!email) return;

    if (waitlistSubmit) {
      waitlistSubmit.disabled = true;
      waitlistSubmit.textContent = 'Invio in corso...';
    }

    try {
      const response = await fetch(
        'https://app.vverio.com/api/public/agency-waitlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            marketCode: 'IT',
            source: 'landing_page'
          })
        }
      );

      if (!response.ok) {
        throw new Error('waitlist_error');
      }

      waitlistForm.hidden = true;
      if (waitlistSuccess) waitlistSuccess.hidden = false;
      waitlistEmail.value = '';
    } catch (error) {
      if (waitlistError) waitlistError.hidden = false;
    } finally {
      if (waitlistSubmit) {
        waitlistSubmit.disabled = false;
        waitlistSubmit.textContent = 'Avvisami';
      }
    }
  });
}
