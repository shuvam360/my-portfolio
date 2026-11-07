<div align="center">

  <!-- Logo & Title -->
  <a href="https://github.com/shuvam360/my-portfolio">
    <img src="public/favicon.svg" alt="Shuvam Dikshit Logo" width="90" height="90" />
  </a>

  <h1 align="center">✨ Shuvam Dikshit | Personal Portfolio ✨</h1>

  <p align="center">
    <b>A high-performance, responsive personal developer portfolio showcasing AI, Machine Learning, IoT, and Full-Stack Engineering projects.</b>
  </p>

  <p align="center">
    <a href="https://shuvam360.github.io/my-portfolio/">
      <img src="https://img.shields.io/badge/Live_Demo-Visit_Portfolio-22c55e?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://github.com/shuvam360/my-portfolio/stargazers"><img src="https://img.shields.io/github/stars/shuvam360/my-portfolio?style=for-the-badge&color=e5c97b&logo=star&logoColor=1a1a2e" alt="Stars" /></a>
    <a href="https://github.com/shuvam360/my-portfolio/network/members"><img src="https://img.shields.io/github/forks/shuvam360/my-portfolio?style=for-the-badge&color=78a7ff&logo=git&logoColor=1a1a2e" alt="Forks" /></a>
    <a href="https://github.com/shuvam360/my-portfolio/issues"><img src="https://img.shields.io/github/issues/shuvam360/my-portfolio?style=for-the-badge&color=4ade80" alt="Issues" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-f43f5e?style=for-the-badge" alt="License" /></a>
  </p>

  <!-- Tech Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/GSAP_3-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=flat-square&logo=google&logoColor=white" alt="Google Apps Script" />
  </p>

  <p align="center">
    <a href="#live-demo">🌐 <b>Live Demo</b></a> •
    <a href="#features">⚡ <b>Key Features</b></a> •
    <a href="#tech-stack">🛠️ <b>Tech Stack</b></a> •
    <a href="#getting-started">🚀 <b>Getting Started</b></a> •
    <a href="#customization">⚙️ <b>Customization</b></a> •
    <a href="#featured-projects">🏆 <b>Projects</b></a> •
    <a href="#author">👨‍💻 <b>Author</b></a>
  </p>

</div>

---

<a id="overview"></a>
## 📌 Overview

Welcome to the official repository of **Shuvam Dikshit's Developer Portfolio**. This website is engineered from scratch to deliver a modern, lightning-fast, and immersive browsing experience. Designed specifically for showcasing cutting-edge work across **Artificial Intelligence**, **Machine Learning**, **IoT**, and **Full-Stack Web Development**.

Everything is structured with a **clean modular architecture**, data-driven rendering, sleek glassmorphism visuals, smooth GSAP animations, and an automated serverless backend for inquiries.

---

<a id="live-demo"></a>
## 🌐 Live Demo

Explore the live portfolio in action:
👉 **[https://shuvam360.github.io/my-portfolio/](https://shuvam360.github.io/my-portfolio/)**

> 💡 **Tip:** Try toggling between **Dark Mode** and **Light Mode** using the theme switch button in the navigation bar to experience the custom-tuned color palettes!

---

<a id="features"></a>
## 🌟 Key Features

### 🎨 Modern Visuals & UI/UX
- **Glassmorphism Design Language:** Frosted acrylic cards, glowing neon accents, and smooth gradient highlights.
- **🌓 Seamless Dark / Light Mode:** Built-in theme switcher with automatic detection of user system preferences and persistent `localStorage` memory.
- **📊 Real-time Scroll Progress:** Visual indicator tracking reading progress across all portfolio sections.
- **📱 100% Responsive & Mobile-First:** Fluid layouts optimized for smartphones, tablets, laptops, and ultra-wide displays.

### ⚡ Animation & Interactions
- **GSAP 3 & ScrollTrigger Integration:** Silky 60 FPS entrance transitions, staggered reveals, and scroll-activated skill bars.
- **Interactive Micro-Interactions:** Magnetic-feel buttons, hover cards with glowing borders, and smooth anchor navigation.

### ⚙️ Architecture & Automation
- **Data-Driven Architecture:** All sections (bio, skills, projects, certifications, timeline) are decoupled into `src/data.js` for instant updates without touching HTML templates.
- **Automated Serverless Contact Form:** Powered by **Google Apps Script & Google Sheets**, capturing inquiries instantly into a cloud sheet and triggering automated email acknowledgments to visitors.
- **Fast Bundling with Vite:** Zero-lag development experience with Hot Module Replacement (HMR) and optimized production builds.

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack

| Category | Technologies & Tools |
| :--- | :--- |
| **Frontend Core** | `HTML5`, `Modern CSS3`, `JavaScript (ES6+ Modules)` |
| **Build Tool & Bundler** | `Vite 8` |
| **Animation Engine** | `GSAP 3.12`, `ScrollTrigger` |
| **Design Paradigm** | Responsive Flexbox/CSS Grid, CSS Variables, Glassmorphism, Theme Tokens |
| **Form Backend & DB** | `Google Apps Script`, `Google Sheets API`, `Serverless Webhook` |
| **Version Control** | `Git`, `GitHub` |

---

## 📁 Repository Structure

```text
my-portfolio/
├── 📂 public/
│   ├── 📄 favicon.svg           # Custom SD monogram gold vector favicon
│   ├── 📄 icons.svg             # SVG icon sprite sheet
│   ├── 🖼️ profile.png           # Professional high-res portrait image
│   └── 📄 resume.pdf            # Curated professional resume
├── 📂 src/
│   ├── 📂 assets/               # Bundled assets (logos, vectors)
│   ├── 📄 animations.js         # GSAP ScrollTrigger timeline & reveal handlers
│   ├── 📄 data.js               # Centralized data model (projects, skills, stats, bio)
│   ├── 📄 main.js               # Application logic, theme engine & form controller
│   └── 🎨 style.css             # Comprehensive CSS tokens, dark/light themes & styling
├── 📄 GOOGLE_SHEET_SETUP.md     # Complete step-by-step Google Sheet backend setup guide
├── 📄 index.html                # Semantic HTML5 single-page entry point
├── 📄 package.json              # Project scripts and Vite dev dependencies
└── 📄 README.md                 # Project documentation & GitHub showcase
```

---

<a id="getting-started"></a>
## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended):
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/shuvam360/my-portfolio.git
cd my-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local server URL (typically `http://localhost:5173`).

### 5. Build for Production
To generate an optimized production build in the `/dist` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

<a id="customization"></a>
## ⚙️ Customization & Data Setup

Updating portfolio content is effortless thanks to the data-driven architecture.

### Editing Portfolio Data
Open [`src/data.js`](src/data.js) to customize:
- **`personalInfo`**: Name, roles, tagline, bio, email, social links, resume URL.
- **`stats`**: Metrics and milestones (e.g., projects built, achievements, expected graduation).
- **`skills`**: Categorized technical skills with proficiency percentages (`0 - 100`).
- **`education`**: Degrees, institutions, durations, and coursework.
- **`certifications`**: Professional credentials and course details.
- **`achievements`**: Awards, hackathons, and exhibition honors.
- **`projects`**: Featured works with live demo links, repository links, tags, and custom accent colors.

### Contact Form Google Sheets Integration
The contact form submits inquiries via an asynchronous POST webhook to Google Apps Script. 
Refer to [**GOOGLE_SHEET_SETUP.md**](GOOGLE_SHEET_SETUP.md) for full deployment instructions, automated email responder scripts, and spreadsheet layout options.

---

<a id="featured-projects"></a>
## 🏆 Featured Projects Showcased

### 🛡️ [BhoomiSafe — AI Landslide Early Warning System](https://github.com/shuvam360/Bhoomi-safe.git)
- **Stack:** `FastAPI` • `XGBoost` • `Random Forest` • `Python` • `Geospatial AI`
- **Highlight:** Real-time ML landslide risk prediction platform for Northeast India and West Bengal's hill districts, achieving **0.887 ROC-AUC** trained on **1,328 historical landslide events**, complete with citizen reporting and emergency response escalation.
- 🔗 [Live Demo](https://shuvam360.github.io/Bhoomi-safe/) • 📦 [Repository](https://github.com/shuvam360/Bhoomi-safe.git)

### 📚 [Library Management System (LMS)](https://github.com/shuvam360/lmsbysd.git)
- **Stack:** `Python` • `Flask` • `SQLAlchemy` • `SQLite` • `Bootstrap`
- **Highlight:** End-to-end management platform featuring automated cataloging, member management, book issue/return tracking, automatic fine calculation, and an admin analytics dashboard.
- 📦 [Repository](https://github.com/shuvam360/lmsbysd.git)

---

<a id="author"></a>
## 👨‍💻 About the Author

<div align="center">
  <img src="public/profile.png" width="130" height="130" style="border-radius: 50%; object-fit: cover; border: 3px solid #e5c97b;" alt="Shuvam Dikshit" />
  
  ### **Shuvam Dikshit**
  *B.Tech in Computer Science & Engineering (AI / ML) Student*  
  **Brainware University (2024 – 2028)** • West Bengal, India

  <p>
    Passionate about solving real-world challenges through <b>Machine Learning</b>, <b>AI Automation</b>, and <b>IoT Systems</b>. Always eager to collaborate on innovative tech ventures, research, and high-impact engineering projects.
  </p>

  <p>
    <a href="https://linkedin.com/in/shuvam-dikshit"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
    <a href="https://github.com/shuvam360"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
    <a href="https://www.instagram.com/shuvamdikshit?stkn=MWt2aWlhZ3duM2xyOQ=="><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
    <a href="mailto:shuvamdikshit5@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  </p>
</div>

---

## 📄 License

This project is open-source and licensed under the **[MIT License](LICENSE)**. Feel free to use it as inspiration or as a starter template for your personal portfolio.

---

<div align="center">
  <sub>Designed & Developed with ❤️ by <a href="https://github.com/shuvam360">Shuvam Dikshit</a></sub>
  <br />
  <sub>⭐ If you like this project, please consider giving it a star on GitHub!</sub>
</div>
