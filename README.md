# Avanish Singh — Personal Portfolio Website

A personal portfolio website developed with vanilla **HTML5**, **CSS3**, and **JavaScript**, designed with a modern tech aesthetic (`#0B0F19` dark canvas, `#151B2B` card surfaces, `#6366F1` electric indigo, and `#22D3EE` cyan accents).

---

## 🚀 Live Demo & Links
- **Live Website:** [https://happyy01.github.io/portfolio/](https://happyy01.github.io/portfolio/) *(Once deployed via GitHub Pages)*
- **GitHub Repository:** [https://github.com/HappyY01/portfolio](https://github.com/HappyY01/portfolio)
- **LinkedIn:** [Avanish Singh](https://www.linkedin.com/in/avanish-singh-77819b2a4/)
- **Email:** [avanishhh0111@gmail.com](mailto:avanishhh0111@gmail.com)

---

## 📌 Project Overview
Built for academic assignment submission and professional networking:
- **About Me:** Honest, student-centric introduction highlighting background, academic timeline at Shri Ramswaroop Memorial University (SRMU), core problem-solving strengths, and **"The High-Difficulty Mindset"** showcase (translating maximum-difficulty gaming discipline into engineering tenacity).
- **Education:** B.Tech in Computer Science and Engineering (2025–2029) with full relevant coursework listing.
- **Skills:** Clear separation between established languages (C, Python, SQL) and currently exploring technologies (HTML, CSS, JavaScript, DSA, Data Analysis).
- **Projects:** 
  1. **Vediccare** (Major Web Project)
  2. **ConstructAi** (Major AI/ML Project)
  3. **Netflix Dataset Analysis** (Data Analysis / EDA in Python)
  4. **Personal Portfolio Website** (Vanilla HTML/CSS/JS)
  5. **Data Structures & Academic Exercises** (C & Python fundamentals)
- **Contact:** Live-validated interactive contact form with real-time feedback and direct channels.

---

## 🛠️ Tech Stack & Interactive Features
- **Semantic HTML5:** Accessible document outline, ARIA roles, modern tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Modern CSS3:**
  - CSS Variables for Dark and Light themes.
  - Fully responsive design (Desktop, Tablet, Mobile) using CSS Grid and Flexbox.
  - Glassmorphic navigation bar with `backdrop-filter`.
- **Vanilla JavaScript (ES6+):**
  - **Dynamic Typing Animation:** Alternates titles in the hero headline.
  - **Dark / Light Theme Toggle:** Persisted automatically across visits via `localStorage`.
  - **Mobile Hamburger Navigation:** Smooth drawer toggle with auto-close on navigation.
  - **ScrollSpy:** Dynamic active menu indicator during scrolling.
  - **Project Filtering:** Real-time client-side filter by project category (All, Major, Data & Python, Web).
  - **Interactive Project Modal:** Full details dialog with keyboard (`Esc`) and backdrop dismissal.
  - **Form Validation & Toast Notification:** Validates input fields and email pattern before showing animated toast confirmation.
  - **Back-to-Top Button:** Scroll-aware floating trigger.

---

## 📂 Project Structure
```text
avanish-portfolio/
│
├── index.html        # Semantic markup and structure
├── style.css         # Custom styling, dark/light theme, responsive media queries
├── script.js         # Interactive features, typing effect, validation, filtering
├── profile.jpg       # Profile photo
└── README.md         # Documentation and GitHub deployment instructions
```

---

## 🌐 How to Deploy to GitHub Pages

1. **Open PowerShell / Terminal** in this folder:
   ```powershell
   cd C:\Users\avani\.gemini\antigravity\scratch\avanish-portfolio
   ```

2. **Initialize Git and Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete responsive portfolio website"
   ```

3. **Create a New Repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Repository name: `portfolio` (or `portfolio-website`).
   - Keep it **Public**.
   - Do **NOT** initialize with README (we already have one).

4. **Link and Push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/HappyY01/portfolio.git
   git push -u origin main
   ```

5. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/HappyY01/portfolio`.
   - Click **Settings** (gear icon) > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**:
     - Select `main`.
     - Select `/ (root)`.
     - Click **Save**.
   - Wait 1–2 minutes, and your site will be live at:
     **`https://happyy01.github.io/portfolio/`**
