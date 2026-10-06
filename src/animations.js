// Animations module using GSAP and ScrollTrigger from CDN (window.gsap)
// Adapted for the warm cream aesthetic — no custom cursor or Three.js

export function initAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (!gsap || !ScrollTrigger) {
    console.error("GSAP or ScrollTrigger not found on window object.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // --- SCROLL PROGRESS BAR ---
  gsap.to('#scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // --- HERO ENTRANCE ANIMATION ---
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, delay: 0.2 })
    .from('.hero-content h1', { opacity: 0, y: 40, duration: 0.9 }, '-=0.4')
    .from('.hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.hero-ctas .btn-primary', { opacity: 0, x: -20, duration: 0.5 }, '-=0.3')
    .from('.hero-ctas .btn-secondary', { opacity: 0, x: 20, duration: 0.5 }, '-=0.4')
    .from('.hero-photo-wrapper', { opacity: 0, scale: 0.85, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
    .from('.hero-photo-ring', { opacity: 0, scale: 0.7, rotation: -90, duration: 1.2, ease: 'power3.out' }, '-=0.8')
    .from('.deco-cross', { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, '-=0.6')
    .from('.deco-lines', { opacity: 0, x: -20, duration: 0.5 }, '-=0.3')
    .from('.scroll-indicator', { opacity: 0, y: 15, duration: 0.6 }, '-=0.2');

  // --- SECTION HEADER ANIMATIONS ---
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    if (header) {
      const h2 = header.querySelector('h2');
      const p = header.querySelector('p');
      const divider = header.querySelector('.section-divider');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      if (h2) tl.from(h2, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
      if (p) tl.from(p, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      if (divider) tl.from(divider, { scaleX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    }
  });

  // --- ABOUT SECTION STAGGER ---
  const aboutSection = document.querySelector('#about-section');
  if (aboutSection) {
    gsap.from('#about .about-text h3', {
      opacity: 0, x: -30, duration: 0.7,
      scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' }
    });

    gsap.from('#about-bio-1', {
      opacity: 0, x: -20, duration: 0.7, delay: 0.15,
      scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' }
    });

    gsap.from('#about-bio-2', {
      opacity: 0, x: -20, duration: 0.7, delay: 0.3,
      scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' }
    });

    // Stats animation
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0, y: 25, scale: 0.95,
        duration: 0.5, delay: index * 0.1,
        scrollTrigger: { trigger: '#stats-container', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    // Profile card
    gsap.from('.profile-card', {
      opacity: 0, x: 40, scale: 0.97, duration: 0.8,
      scrollTrigger: { trigger: '#about', start: 'top 70%', toggleActions: 'play none none reverse' }
    });
  }

  // --- TIMELINE ANIMATIONS ---
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      const card = item.querySelector('.timeline-card');
      const side = index % 2 === 0 ? -60 : 60;

      gsap.from(card, {
        opacity: 0,
        x: side,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // --- SKILLS ANIMATION ---
  const skillsSection = document.querySelector('#skills-section');
  if (skillsSection) {
    const skillCards = document.querySelectorAll('.skill-category-card');
    skillCards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0, y: 40, scale: 0.97,
        duration: 0.7, delay: index * 0.15,
        scrollTrigger: { trigger: skillsSection, start: 'top 70%', toggleActions: 'play none none reverse' }
      });
    });

    // Animate skill bars
    gsap.from('.skill-bar-fill', {
      scrollTrigger: {
        trigger: skillsSection,
        start: 'top 75%',
        onEnter: () => {
          document.querySelectorAll('.skill-bar-fill').forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            setTimeout(() => {
              bar.style.width = `${level}%`;
            }, index * 60);
          });
        }
      }
    });
  }

  // --- ACHIEVEMENTS ANIMATION ---
  const achievementsSection = document.querySelector('#achievements-section');
  if (achievementsSection) {
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.7,
        delay: index * 0.15,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: achievementsSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // --- CERTIFICATIONS ANIMATION ---
  const certCards = document.querySelectorAll('.certification-card');
  certCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      x: index % 2 === 0 ? -40 : 40,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // --- PROJECT CARDS ---
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.7,
      delay: index * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#projects-container',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // --- CONTACT SECTION ANIMATION ---
  const contactSection = document.querySelector('#contact-section');
  if (contactSection) {
    gsap.from('.contact-info h3', {
      opacity: 0, y: 25, duration: 0.7,
      scrollTrigger: { trigger: contactSection, start: 'top 75%', toggleActions: 'play none none reverse' }
    });

    gsap.from('.contact-info > p', {
      opacity: 0, y: 15, duration: 0.5, delay: 0.15,
      scrollTrigger: { trigger: contactSection, start: 'top 75%', toggleActions: 'play none none reverse' }
    });

    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
      gsap.from(method, {
        opacity: 0, x: -25, duration: 0.5, delay: 0.2 + index * 0.1,
        scrollTrigger: { trigger: contactSection, start: 'top 70%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.from('.contact-form-card', {
      opacity: 0, x: 40, scale: 0.98, duration: 0.7,
      scrollTrigger: { trigger: contactSection, start: 'top 70%', toggleActions: 'play none none reverse' }
    });
  }

  // --- NAVBAR ACTIVE LINK HIGHLIGHTING ---
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
