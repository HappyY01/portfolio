/**
 * Avanish Singh - Personal Portfolio JavaScript (v4.0)
 * Upgraded Features:
 * 1. Dynamic Typing Animation (Hero section)
 * 2. Dark / Light Theme Switcher with LocalStorage
 * 3. Mobile Navigation Menu with Scroll Lock
 * 4. ScrollSpy & Sticky Navbar Styling
 * 5. Project Category Filtering
 * 6. Rich Project Detail Modal with Interactive Visual Architecture Previews
 * 7. Live GitHub REST API Telemetry Feed (@HappyY01)
 * 8. macOS-Inspired Interactive CLI Terminal (Easter Egg & Header Launcher)
 * 9. Curriculum Vitae (Resume) Modal with Instant Print / Save PDF Engine
 * 10. Real Email Delivery via FormSubmit AJAX to avanishhh0111@gmail.com
 * 11. Back-to-Top Floating Trigger & Dynamic Copyright
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

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
    return newTheme;
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
     3. Mobile Navigation Menu Toggle with Body Scroll Lock
     -------------------------------------------------------------------------- */
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      toggleMenu(!isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

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
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('open');
      navToggleBtn.classList.remove('open');
      navToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

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
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

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

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Project Category Filtering
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
     6. Enriched Project Details Modal System with Visual Architecture
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const modalTriggers = document.querySelectorAll('.project-modal-btn');

  const projectDetails = {
    vediccare: {
      title: 'Vediccare',
      tagline: 'Bridging Ancient Ayurvedic Wellness with Modern Web UI',
      description: 'Vediccare is a digital health and wellness initiative created to modernize Ayurvedic principles into accessible, everyday digital routines. It delivers curated holistic remedies, nutritional insights, and interactive lifestyle evaluations.',
      diagramTitle: 'Architecture Workflow',
      diagram: `┌─ Client Web Application (HTML5 / CSS3 / ES6+)
│   ├─ Ayurvedic Symptom & Goal Profiler
│   ├─ Curated Remedy & Nutritional Recommendation Catalog
│   └─ Local Storage Session State & Mobile Responsive Design
└─ Deployment: GitHub Pages / Continuous Delivery`,
      highlights: [
        'Structured categorical browsing for herbs, nutrition, and daily wellness habits',
        'Clean, accessible user flow optimized for mobile, tablet, and desktop viewports',
        'Built with responsive frontend components and modular JavaScript architecture',
        'Active development repository on GitHub under @HappyY01'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'Git']
    },
    constructai: {
      title: 'ConstructAi',
      tagline: 'Intelligent Workflows & Calculations for Architecture & Construction',
      description: 'ConstructAi investigates algorithmic estimation models and automation routines designed to minimize manual calculation errors in architectural planning, material tracking, and structural estimations.',
      diagramTitle: 'Processing Pipeline',
      diagram: `┌─ Architectural Input Specs (Dimensions, Raw Materials, Labor Rates)
│   ├─ Python Estimation & Quantity Survey Calculation Engine
│   ├─ Error Reduction & Waste Percentage Optimizer
│   └─ Structured Cost Breakdown & Material Summary Generation
└─ Output: Formatted Estimate Report & Data Tables`,
      highlights: [
        'Algorithmic estimation models for concrete, structural elements, and finishes',
        'Built to automate repetitive calculations and reduce human calculation errors',
        'Integration of Python scripts for data processing and scenario modeling',
        'Open-source repository on GitHub under @HappyY01'
      ],
      stack: ['Python', 'AI/ML Principles', 'Data Processing', 'Automation']
    },
    netflix: {
      title: 'Netflix Dataset Analysis',
      tagline: 'Exploratory Data Analysis (EDA) on Streaming Catalog',
      description: 'An academic exploratory data analysis investigating the content catalog of Netflix titles across movies and TV shows, examining release trends, country-wise distribution, and content growth.',
      diagramTitle: 'Data Pipeline',
      diagram: `┌─ Raw Dataset: 8,800+ Titles (Movies & TV Series)
│   ├─ Data Cleaning: Handling Nulls, Date Conversion, Genre Tokenization
│   ├─ Exploratory Analytics: Release Year Trends, Ratings Distribution
│   └─ Visualizations: Matplotlib & Seaborn Categorical Charts
└─ Output: Reproducible Jupyter Notebook Analysis`,
      highlights: [
        'Comprehensive data cleaning: Handled missing director/cast entries and formatted genres',
        'Uncovered distributions of content additions by release year and production country',
        'Visualized movie durations, TV show seasons, and rating classifications',
        'Documented reproducible findings and charts using Jupyter Notebook'
      ],
      stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebook']
    },
    portfolio: {
      title: 'Personal Portfolio Website',
      tagline: 'Apple Minimalist Responsive Developer Portfolio',
      description: 'Designed and built from scratch as a responsive personal portfolio to present academic milestones, core coursework, honest skill development, and projects.',
      diagramTitle: 'Frontend Structure',
      diagram: `┌─ Semantic HTML5 & Apple Design System
│   ├─ Fluid Typography via CSS clamp() & Mobile Breakpoints
│   ├─ Interactive macOS CLI Terminal & Real Email Delivery
│   └─ LocalStorage Dark/Light State Persistence
└─ Host: GitHub Pages with Automated Git Deployments`,
      highlights: [
        'Crafted with semantic HTML5, modern CSS3 variables, and clean vanilla JavaScript',
        'Apple aesthetic with pure black canvas, frosted glass blur, and restrained colors',
        'Real working contact form with asynchronous email delivery to Gmail',
        'Interactive CLI terminal easter egg and complete CV preview with PDF export'
      ],
      stack: ['HTML5', 'CSS3 Variables', 'Vanilla JavaScript (ES6+)', 'GitHub Pages']
    },
    dsa: {
      title: 'Data Structures & Academic Exercises',
      tagline: 'Foundations of Computer Science & Algorithmic Logic',
      description: 'A growing repository of academic coursework implementations, algorithmic problem-solving tasks, and core computer science fundamentals.',
      diagramTitle: 'Curriculum Scope',
      diagram: `┌─ Core Algorithms & Linear Data Structures (C Language)
│   ├─ Memory Management: Pointers, Structs & Dynamic Allocation
│   ├─ Abstract Data Types: Stacks, Queues, Singly & Doubly Linked Lists
│   ├─ Sorting & Searching: Binary Search, Bubble, Selection, Insertion
└─ Applied Logic & OOP Fundamental Scripts in Python`,
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

      <div class="project-preview-box">
        <div class="preview-chip-header">
          <span><i class="fa-solid fa-diagram-project"></i> ${data.diagramTitle}</span>
          <span class="preview-status"><i class="fa-solid fa-circle-check"></i> Verified</span>
        </div>
        <pre class="preview-diagram">${data.diagram}</pre>
      </div>

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
    document.body.style.overflow = 'hidden';
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

  /* --------------------------------------------------------------------------
     7. Live GitHub REST API Integration (@HappyY01)
     -------------------------------------------------------------------------- */
  const ghRepoCountEl = document.getElementById('gh-repo-count');
  const ghFollowersEl = document.getElementById('gh-followers');
  const ghStatusEl = document.getElementById('github-api-status');

  async function fetchGitHubTelemetry() {
    try {
      const userRes = await fetch('https://api.github.com/users/HappyY01');
      if (userRes.ok) {
        const userData = await userRes.json();
        if (ghRepoCountEl) ghRepoCountEl.textContent = userData.public_repos || '5+';
        if (ghFollowersEl) ghFollowersEl.textContent = userData.followers || '0';
        if (ghStatusEl) ghStatusEl.textContent = `Connected (@${userData.login})`;
      } else {
        throw new Error('API Rate Limited or Unreachable');
      }
    } catch (err) {
      // Graceful fallback for offline or unauthenticated API limits
      if (ghRepoCountEl) ghRepoCountEl.textContent = '5+';
      if (ghFollowersEl) ghFollowersEl.textContent = 'Active';
      if (ghStatusEl) ghStatusEl.textContent = 'Cached Telemetry (@HappyY01)';
    }
  }

  fetchGitHubTelemetry();

  /* --------------------------------------------------------------------------
     8. Curriculum Vitae (Resume) Modal & Print Engine
     -------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resume-modal');
  const resumeBackdrop = document.getElementById('resume-backdrop');
  const resumeClose = document.getElementById('resume-close');
  const resumeOpenBtn = document.getElementById('resume-open-btn');
  const resumePrintBtn = document.getElementById('resume-print-btn');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (resumeOpenBtn) resumeOpenBtn.addEventListener('click', openResume);
  if (resumeClose) resumeClose.addEventListener('click', closeResume);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResume);

  if (resumePrintBtn) {
    resumePrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* --------------------------------------------------------------------------
     9. macOS Interactive CLI Terminal (Easter Egg & Header Launcher)
     -------------------------------------------------------------------------- */
  const terminalModal = document.getElementById('terminal-modal');
  const terminalBackdrop = document.getElementById('terminal-backdrop');
  const terminalCloseBtn = document.getElementById('terminal-close-btn');
  const terminalMinBtn = document.getElementById('terminal-min-btn');
  const terminalMaxBtn = document.getElementById('terminal-max-btn');
  const terminalToggle = document.getElementById('terminal-toggle');
  const codeBadgeTrigger = document.getElementById('code-badge-trigger');
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalWindow = document.getElementById('terminal-window');

  const cmdHistory = [];
  let historyIndex = -1;

  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    terminalModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (terminalInput) terminalInput.focus();
    }, 150);
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    terminalModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (terminalToggle) terminalToggle.addEventListener('click', openTerminal);
  if (codeBadgeTrigger) {
    codeBadgeTrigger.addEventListener('click', openTerminal);
    codeBadgeTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openTerminal();
    });
  }
  if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', closeTerminal);
  if (terminalMinBtn) terminalMinBtn.addEventListener('click', closeTerminal);
  if (terminalBackdrop) terminalBackdrop.addEventListener('click', closeTerminal);

  if (terminalMaxBtn && terminalWindow) {
    terminalMaxBtn.addEventListener('click', () => {
      terminalWindow.classList.toggle('maximized');
    });
  }

  // Keyboard shortcut: Ctrl + ` or Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (terminalModal && terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) closeModal();
      if (resumeModal && resumeModal.classList.contains('active')) closeResume();
      if (terminalModal && terminalModal.classList.contains('active')) closeTerminal();
    }
  });

  // CLI Command Interpreter
  const terminalCommands = {
    help: () => `Available Commands:
  • about       - Overview of background and goals
  • education   - University, degree, CGPA, and coursework
  • skills      - Languages, tools, and currently exploring
  • projects    - Featured major and academic repositories
  • gaming      - High-difficulty conquests and speedrun records
  • contact     - Official email, LinkedIn, and GitHub links
  • theme       - Toggle between Apple Dark and Light mode
  • resume      - Open the Curriculum Vitae preview
  • clear       - Clear terminal screen
  • exit        - Close terminal session`,

    about: () => `Avanish Singh — B.Tech CSE (SRMU Lucknow)
Interested in software systems, artificial intelligence, and data science.
Focused on building practical real-world applications and rapid skill acquisition.`,

    education: () => `Bachelor of Technology (B.Tech) — Computer Science & Engineering
University: Shri Ramswaroop Memorial University (SRMU), Lucknow
Academic Tie-up: Special Collaboration with L&T EduTech
Timeline: 2025 – 2029 | First Year CGPA: 8.65 / 10.0
Coursework: C, Data Structures, Python, OOP, DBMS / SQL, Discrete Math.`,

    skills: () => `Core Languages: C, Python, SQL
Currently Exploring: HTML5, CSS3, JavaScript, DSA, Data Analysis
Tools & Environments: VS Code, Jupyter Notebook, Git & GitHub, Linux CLI`,

    projects: () => `1. Vediccare       [Major]  - Ayurvedic health & wellness platform
2. ConstructAi     [Major]  - Architectural estimation & calculation AI
3. Netflix EDA     [Data]   - Content analysis on 8,800+ titles
4. Portfolio       [Web]    - Apple-inspired minimalist website (v4.0)
5. DSA & Logic     [C/Py]   - Foundational data structures and exercises`,

    gaming: () => `The High-Difficulty Mindset:
• God of War & Ragnarok (Max Difficulty parrying & boss pattern decoding)
• Batman: Arkham Knight (Knightmare mode counter-combat & stealth)
• Marvel's Spider-Man Trilogy (Spider-Man 1, Miles Morales & 2)
• GTA V (4x Replays) & GTA Online (Full Business Empire 100%)
• Red Dead Redemption (Main story completed in 48 hours)
• Where Winds Meet (Accelerated progression: Level 80 in 2-3 days)`,

    contact: () => `Email:    avanishhh0111@gmail.com
GitHub:   https://github.com/HappyY01
LinkedIn: https://www.linkedin.com/in/avanish-singh-77819b2a4/
Location: Lucknow, Uttar Pradesh, India`,

    theme: () => {
      const mode = toggleTheme();
      return `Theme switched to: Apple ${mode.toUpperCase()} mode.`;
    },

    resume: () => {
      setTimeout(openResume, 200);
      return `Launching Curriculum Vitae modal...`;
    },

    clear: () => {
      if (terminalHistory) terminalHistory.innerHTML = '';
      return '';
    },

    exit: () => {
      closeTerminal();
      return 'Session terminated.';
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim();
        terminalInput.value = '';

        if (!inputVal) return;

        cmdHistory.push(inputVal);
        historyIndex = cmdHistory.length;

        const cmdKey = inputVal.toLowerCase();
        let output = '';

        if (terminalCommands[cmdKey]) {
          output = terminalCommands[cmdKey]();
        } else {
          output = `zsh: command not found: ${inputVal}. Type 'help' to view valid commands.`;
        }

        if (cmdKey !== 'clear' && terminalHistory) {
          const entry = document.createElement('div');
          entry.className = 'term-cmd-entry';
          entry.innerHTML = `
            <div class="term-cmd-line"><span class="term-prompt">avanish@portfolio:~$</span> ${inputVal}</div>
            <div class="term-output">${output}</div>
          `;
          terminalHistory.appendChild(entry);
        }

        if (terminalScreen) {
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = cmdHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          terminalInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. Real Email Delivery via FormSubmit AJAX to avanishhh0111@gmail.com
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitIcon = document.getElementById('submit-icon');
  const submitText = document.getElementById('submit-text');
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      // Validation
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

      if (!isValid) return;

      // Set Loading State
      if (submitBtn) submitBtn.disabled = true;
      if (submitIcon) submitIcon.className = 'fa-solid fa-spinner fa-spin';
      if (submitText) submitText.textContent = 'Sending Message...';

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        _subject: `Portfolio Message from ${nameInput.value.trim()}: ${subjectInput.value.trim()}`,
        _captcha: 'false'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/avanishhh0111@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const senderName = nameInput.value.trim();
          contactForm.reset();
          showToast(
            'Message Delivered!',
            `Thank you ${senderName}. Your message was dispatched directly to Avanish's email.`
          );
        } else {
          throw new Error('Endpoint returned error status');
        }
      } catch (err) {
        // Fallback: If network or blocker interrupts, fallback gracefully to prefilled mailto
        const mailtoUrl = `mailto:avanishhh0111@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message + "\n\nFrom: " + payload.name + " (" + payload.email + ")")}`;
        window.open(mailtoUrl, '_blank');
        showToast(
          'Email Client Opened',
          'Connecting via your default email application to deliver your message.'
        );
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitIcon) submitIcon.className = 'fa-solid fa-paper-plane';
        if (submitText) submitText.textContent = 'Send Message';
      }
    });

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
    }, 5000);
  }

  /* --------------------------------------------------------------------------
     11. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
