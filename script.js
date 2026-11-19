/**
 * Avanish Singh - Personal Portfolio JavaScript
 * Features:
 * - Typing Animation (Hero section)
 * - Dark / Light Theme Switcher with LocalStorage
 * - Mobile Navigation Menu Toggle & Auto-close
 * - ScrollSpy & Sticky Navbar Styling
 * - Project Category Filtering
 * - Project Detail Modal with Esc / Overlay Dismissal
 * - Client-side Contact Form Validation & Toast Alerts
 * - Back-to-Top Floating Trigger
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Typing Effect in Hero Section
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typing-text');
  const words = [
    'CSE Student',
    'Python Developer',
    'Aspiring Software Engineer',
    'Tech Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* --------------------------------------------------------------------------
     2. Dark / Light Theme Toggle with LocalStorage
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      toggleMenu(!isOpen);
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  function toggleMenu(open) {
    if (!navMenu || !navToggleBtn) return;
    if (open) {
      navMenu.classList.add('open');
      navToggleBtn.classList.add('open');
      navToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Lock background scroll on mobile
    } else {
      navMenu.classList.remove('open');
      navToggleBtn.classList.remove('open');
      navToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  // Auto-close menu if resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 880 && navMenu && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  /* --------------------------------------------------------------------------
     4. Sticky Navbar & Scrollspy (Active Link Tracking)
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section.section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sticky shadow
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link highlight
    const scrollTrigger = scrollPos + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollTrigger >= top && scrollTrigger < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  /* --------------------------------------------------------------------------
     5. Back to Top Button
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Project Category Filtering
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.split(' ').includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. Project Details Modal System
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const modalTriggers = document.querySelectorAll('.project-modal-btn');

  // Detailed Project Descriptions
  const projectDetails = {
    vediccare: {
      title: 'Vediccare',
      tagline: 'Bridging Ancient Wellness with Digital Accessibility',
      description: 'Vediccare is a health and lifestyle initiative developed to modernize Ayurvedic wellness guidance. The application organizes holistic remedies, lifestyle tips, and diet recommendations into an intuitive, accessible web interface.',
      highlights: [
        'Curated wellness catalog organized by wellness goals and categories',
        'Clean, accessible user flow optimized for mobile and desktop screens',
        'Built with responsive frontend components and modular JavaScript',
        'Active development repository on GitHub under @HappyY01'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'Git']
    },
    constructai: {
      title: 'ConstructAi',
      tagline: 'Intelligent Workflows for Construction & Architecture',
      description: 'ConstructAi investigates practical ways AI and automation can aid architectural estimations, material tracking, and structural project calculations, helping reduce manual errors.',
      highlights: [
        'Explores algorithmic estimation models for architectural materials',
        'Built to automate repetitive calculations and reduce human error',
        'Integration of Python scripts for data processing and scenario modeling',
        'Open-source repository on GitHub under @HappyY01'
      ],
      stack: ['Python', 'AI/ML Principles', 'Data Processing', 'Automation']
    },
    netflix: {
      title: 'Netflix Dataset Analysis',
      tagline: 'Exploratory Data Analysis (EDA) on Streaming Catalog',
      description: 'An academic and practical exploratory data analysis investigating the content catalog of Netflix titles across movies and TV shows.',
      highlights: [
        'Data cleaning: Handling missing values, parsing dates, and formatting genres',
        'Uncovered distributions of content additions by release year and country',
        'Visualized movie durations, TV show seasons, and rating classifications',
        'Documented reproducible findings and charts using Jupyter Notebook'
      ],
      stack: ['Python', 'Pandas', 'Matplotlib / Seaborn', 'Jupyter Notebook']
    },
    portfolio: {
      title: 'Personal Portfolio Website',
      tagline: 'Modern, Responsive Developer Portfolio',
      description: 'Designed and built from the ground up as a responsive personal portfolio to present academic milestones, core coursework, honest skill development, and projects.',
      highlights: [
        'Crafted with semantic HTML5, modern CSS3 variables, and clean vanilla JavaScript',
        'Dark and light mode with preference persistence via localStorage',
        'Real-time form validation with custom interactive toast notifications',
        'Deployed directly on GitHub Pages with complete mobile responsiveness'
      ],
      stack: ['HTML5', 'CSS3 Variables', 'Vanilla JavaScript (ES6+)', 'GitHub Pages']
    },
    dsa: {
      title: 'Data Structures & Academic Exercises',
      tagline: 'Foundations of Computer Science & Algorithmic Logic',
      description: 'A growing repository of academic coursework implementations, algorithmic problem-solving tasks, and core computer science fundamentals.',
      highlights: [
        'Linear data structures: Arrays, Linked Lists, Stacks, and Queues implemented in C',
        'Sorting & Searching: Bubble sort, Selection sort, Binary search, and complexity review',
        'Object-Oriented Programming exercises and utility scripts in Python',
        'Strengthening algorithmic thinking and memory management techniques'
      ],
      stack: ['C Language', 'Python', 'Data Structures', 'Algorithmic Problem Solving']
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <p class="modal-tagline">${data.tagline}</p>
      <p>${data.description}</p>

      <div class="modal-key-points">
        <h4>Key Highlights:</h4>
        <ul>
          ${data.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="project-stack">
        ${data.stack.map(tech => `<span class="stack-badge">${tech}</span>`).join('')}
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     8. Contact Form Validation & Toast Notification
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      // Validation Rules
      if (!nameInput.value.trim()) {
        showError(nameInput, true);
        isValid = false;
      } else {
        showError(nameInput, false);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, true);
        isValid = false;
      } else {
        showError(emailInput, false);
      }

      if (!subjectInput.value.trim()) {
        showError(subjectInput, true);
        isValid = false;
      } else {
        showError(subjectInput, false);
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, true);
        isValid = false;
      } else {
        showError(messageInput, false);
      }

      if (isValid) {
        // Successful mock submission
        const senderName = nameInput.value.trim();
        contactForm.reset();

        showToast(
          'Message Sent!',
          `Thank you ${senderName}. Your message has been sent to Avanish.`
        );
      }
    });

    // Real-time error clear on typing
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        showError(input, false);
      });
    });
  }

  function showError(inputElement, hasError) {
    const parentField = inputElement.closest('.form-field');
    if (!parentField) return;

    if (hasError) {
      parentField.classList.add('has-error');
    } else {
      parentField.classList.remove('has-error');
    }
  }

  function showToast(title, body) {
    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastBody) toastBody.textContent = body;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  /* --------------------------------------------------------------------------
     9. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
