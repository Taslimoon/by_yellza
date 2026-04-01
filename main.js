/* ══════════════════════════════════════════
   BY YELLZA — main.js
   Animations, Navbar, FAQ, Form
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SERVICES TABS ──────────────────────── */
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels with fade
      tabPanels.forEach(panel => {
        if (panel.id === `tab-${target}`) {
          panel.style.animation = 'none';
          panel.style.display = 'grid';
          requestAnimationFrame(() => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(16px)';
            requestAnimationFrame(() => {
              panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              panel.style.opacity = '1';
              panel.style.transform = 'translateY(0)';
            });
          });
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  /* ── NAVBAR scroll behavior ─────────────── */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── HAMBURGER MENU ─────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger spans
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });

  /* ── REVEAL ON SCROLL ───────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings inside the same parent
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          siblings.forEach((el, index) => {
            if (el === entry.target) {
              // Use the index among currently intersecting to stagger
            }
          });
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  // Stagger cards & items that are siblings
  const staggerGroups = [
    '.services-grid .service-card',
    '.temoignages-grid .temoignage-card',
    '.gallery-grid .gallery-item',
  ];

  staggerGroups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── FAQ ACCORDION ──────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').classList.remove('open');
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', !isExpanded);
      answer.classList.toggle('open', !isExpanded);
    });
  });

  /* ── CONTACT FORM ───────────────────────── */
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = document.getElementById('btnText');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours…';

    // Simulate async network call (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Success
    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    successMsg.classList.add('visible');
    submitBtn.disabled = false;
    btnText.textContent = 'Envoyer ma demande';

    // Reset after delay
    setTimeout(() => {
      form.reset();
      form.style.opacity = '';
      form.style.pointerEvents = '';
      successMsg.classList.remove('visible');
    }, 6000);
  });

  /* ── SMOOTH ANCHOR SCROLL (offset for navbar) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── SIGNATURE BAND: duplicate for seamless loop ── */
  const band = document.querySelector('.signature-band');
  if (band) {
    // Already doubled in HTML for infinite scroll, ensure animation is fluid
    const totalWidth = band.scrollWidth / 2;
    // If CSS animation isn't enough, JS fallback:
    // (CSS-only marquee handles it with the doubled spans)
  }

  /* ── ACTIVE NAV LINK on scroll ─────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // Add active style for nav
  const style = document.createElement('style');
  style.textContent = '.nav-links a.active { color: var(--gold) !important; }';
  document.head.appendChild(style);

});
