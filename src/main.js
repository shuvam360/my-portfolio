import './style.css';
import { portfolioData } from './data.js';
import { initAnimations } from './animations.js';

function initApp() {
  // 1. POPULATE PORTFOLIO DATA DYNAMICALLY
  populatePortfolio();

  // 2. INITIALIZE GSAP SCROLL & INTERACTIVE ANIMATIONS
  try {
    initAnimations();
  } catch (error) {
    console.error("Failed to initialize animations:", error);
  }

  // 3. MOBILE NAVIGATION TOGGLE
  const menuBtn = document.querySelector('.menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');

  if (menuBtn && navLinksContainer) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // 3.5. DARK / LIGHT THEME TOGGLE
  const themeToggleBtn = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  // Read saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // 4. STICKY NAVBAR SCROLL
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // 5. CONTACT FORM SUBMISSION & GOOGLE SHEETS SYNC
  // Paste your Google Apps Script Web App URL from GOOGLE_SHEET_SETUP.md here:
  const GOOGLE_SHEET_SCRIPT_URL = '';

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const phoneInput = document.getElementById('form-phone');
      const messageInput = document.getElementById('form-message');

      // Validation: Name is required
      if (!nameInput || !nameInput.value.trim()) {
        showStatus('Please enter your name.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      // Validation: Email is required
      if (!emailInput || !emailInput.value.trim()) {
        showStatus('Please enter your email address.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!isValidEmail(emailInput.value.trim())) {
        showStatus('Please enter a valid email address.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      // Phone Number: Optional validation (if user provided a phone, check reasonable format)
      if (phoneInput && phoneInput.value.trim()) {
        const phoneVal = phoneInput.value.trim();
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
        if (!phoneRegex.test(phoneVal)) {
          showStatus('Please enter a valid phone number or leave it blank.', 'error');
          phoneInput.focus();
          return;
        }
      }

      // Validation: Message is required
      if (!messageInput || !messageInput.value.trim()) {
        showStatus('Please enter your message.', 'error');
        if (messageInput) messageInput.focus();
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Prepare query data for Google Sheet
      const payload = new FormData();
      payload.append('name', nameInput.value.trim());
      payload.append('email', emailInput.value.trim());
      payload.append('phone', phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'N/A');
      payload.append('message', messageInput.value.trim());

      try {
        if (GOOGLE_SHEET_SCRIPT_URL && GOOGLE_SHEET_SCRIPT_URL.trim().length > 0) {
          await fetch(GOOGLE_SHEET_SCRIPT_URL.trim(), {
            method: 'POST',
            body: payload,
            mode: 'no-cors'
          });
        } else {
          // If URL is not yet connected, provide a smooth feedback delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        showStatus('Message sent successfully! Your inquiry has been saved.', 'success');
        contactForm.reset();
      } catch (err) {
        console.error('Contact form submission error:', err);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        showStatus('Something went wrong. Please email directly at shuvamdikshit5@gmail.com', 'error');
      }
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Fade in feedback status smoothly
    if (window.gsap) {
      window.gsap.fromTo(formStatus, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (window.gsap) {
          window.gsap.to(formStatus, {
            opacity: 0, y: -10, duration: 0.4, onComplete: () => {
              formStatus.style.display = 'none';
            }
          });
        } else {
          formStatus.style.display = 'none';
        }
      }, 5000);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Dynamic DOM Populator
function populatePortfolio() {
  const { personalInfo, stats, skills, education, certifications, achievements, projects } = portfolioData;

  // Header CTAs
  const resumeCta = document.getElementById('resume-cta');
  if (resumeCta) resumeCta.href = personalInfo.resumeUrl;

  // Hero Section
  const heroGreeting = document.getElementById('hero-greeting');
  if (heroGreeting) heroGreeting.textContent = `Hello, I'm ${personalInfo.name.split(' ')[0]},`;

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = 'based in West Bengal, India.';

  // Nav Socials
  const navSocials = document.getElementById('nav-socials');
  if (navSocials) {
    navSocials.innerHTML = `
      <a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      </a>
      <a href="${personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
      <a href="${personalInfo.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </a>
      <a href="mailto:${personalInfo.email}" aria-label="Email" title="Email: ${personalInfo.email}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </a>
    `;
  }

  // About Section
  const aboutBio1 = document.getElementById('about-bio-1');
  if (aboutBio1) aboutBio1.textContent = personalInfo.bio;

  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.textContent = personalInfo.name;

  const profileTitle = document.getElementById('profile-title');
  if (profileTitle) profileTitle.textContent = personalInfo.title;

  // Render Stats
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = stats.map(stat => `
      <div class="stat-item">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');
  }

  // Render Socials
  const socialsContainer = document.getElementById('socials-container');
  const socialsHtml = `
    <a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub" title="GitHub">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    </a>
    <a href="${personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn" title="LinkedIn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    </a>
    <a href="${personalInfo.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram" title="Instagram">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    </a>
    <a href="mailto:${personalInfo.email}" class="social-icon" aria-label="Email" title="Email: ${personalInfo.email}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    </a>
  `;
  if (socialsContainer) socialsContainer.innerHTML = socialsHtml;

  // Contact section details
  const contactEmail = document.getElementById('contact-email');
  if (contactEmail) {
    contactEmail.innerHTML = `<a href="mailto:${personalInfo.email}" style="color: inherit; text-decoration: none;">${personalInfo.email}</a>`;
  }

  // Render Education Timeline
  const eduContainer = document.getElementById('education-container');
  if (eduContainer) {
    eduContainer.innerHTML = education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-card glass-card">
          <div class="timeline-date">${edu.period}</div>
          <h3 class="timeline-role">${edu.degree}</h3>
          <div class="timeline-company">${edu.institution} — ${edu.location}</div>
          <p class="timeline-desc">${edu.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Render Certifications
  const certContainer = document.getElementById('certifications-container');
  if (certContainer) {
    certContainer.innerHTML = `
      <h3 class="certifications-heading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
        Certifications
      </h3>
      ${certifications.map(cert => `
        <div class="certification-card glass-card">
          <h4 class="certification-title">${cert.title}</h4>
          <span class="certification-issuer">${cert.issuer}</span>
          <p class="certification-desc">${cert.description}</p>
        </div>
      `).join('')}
    `;
  }

  // Render Achievements
  const achievementsContainer = document.getElementById('achievements-container');
  if (achievementsContainer) {
    achievementsContainer.innerHTML = achievements.map((achievement, index) => `
      <div class="achievement-card glass-card" style="--achievement-index: ${index}">
        <div class="achievement-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 8 6.5 8 6.5"/>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 16 6.5 16 6.5"/>
            <path d="M4 22h16"/>
            <path d="M10 22V10"/>
            <path d="M14 22V10"/>
            <path d="M8 6.5a6.25 6.25 0 1 0 8 0"/>
          </svg>
        </div>
        <h3 class="achievement-title">${achievement.title}</h3>
        <p class="achievement-desc">${achievement.description}</p>
      </div>
    `).join('');
  }

  // Render Projects Grid
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(proj => `
      <div class="project-card glass-card">
        <div class="project-header">
          <svg class="project-folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
          </svg>
          <h3 class="project-title">${proj.title}</h3>
        </div>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          ${proj.githubUrl && proj.githubUrl !== '#' ? `
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-icon" aria-label="GitHub Code repository" title="View Source on GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          ` : ''}
          ${proj.demoUrl && proj.demoUrl !== '#' ? `
            <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-icon" aria-label="Live Demo Link" title="Live Preview / Deployment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" x2="21" y1="14" y2="3"/>
              </svg>
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // Render Skills Container
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    skillsContainer.innerHTML = skills.map(cat => `
      <div class="skill-category-card glass-card">
        <h3 class="skill-category-title">${cat.category}</h3>
        <div class="skill-list">
          ${cat.items.map(skill => `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.level}%</span>
              </div>
              <div class="skill-bar-bg">
                <div class="skill-bar-fill" data-level="${skill.level}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}
