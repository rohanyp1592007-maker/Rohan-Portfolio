# Rohan Patil – Professional Developer Portfolio

A world-class, production-ready developer portfolio built with React, Vite, Tailwind CSS v4, and framer-motion. Designed with a meticulous focus on minimalist luxury, pixel-perfect typography, and buttery-smooth micro-interactions.

 <!-- Ensure you have a great preview image or replace this path -->

## 💎 Premium Features

- **Sophisticated Design System**: Utilizes a semantic CSS variable architecture mapping to Tailwind for seamless overriding and scaling.
- **Theme Engine**: Built-in, fully-typed Dark (default) and Light mode Context Provider with smooth transition interpolations.
- **Interactive Resume Viewer**: A dedicated `/resume` route featuring a dual-column layout and a fully functional toolbar:
  - 📄 Native `html2pdf.js` export engine
  - 🖥️ Fullscreen Web API integration
  - 🖨️ Automated Print styling (`@media print` support)
  - 📤 Native Web Share API + Clipboard fallbacks
- **Performance Optimized**:
  - `React.lazy` route-level code splitting
  - Strictly typed `decoding="async"` and `loading="lazy"` on heavy assets
  - Cleaned, un-bloated DOM eliminating all legacy CSS files
- **Editorial Typography & Motion**: Implements negative-space heavy layouts and custom `framer-motion` cubic-bezier easings (`[0.22, 1, 0.36, 1]`) for high-end reveals without bouncy clutter.
- **Client-Ready Contact Form**: Pre-validated client-side state hooks, architected to instantly plug into Formspree or EmailJS.

## 🏗️ Clean Component Architecture

The `src/components/` directory is strictly decoupled for maximum maintainability:

```text
src/
├── components/
│   ├── common/      # PageTransitions, Sections
│   ├── layout/      # Navbar, Footer
│   ├── project/     # Reusable ProjectCards
│   ├── resume/      # ResumeViewer module
│   ├── sections/    # Hero, About, Experience, Projects, Contact
│   └── ui/          # Atomic elements: HireMeButton, ScrollToTop, Loader
├── context/
│   └── ThemeContext.jsx
└── App.jsx          # Route orchestration & AnimatePresence
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:5173` with instant HMR.*

### Production Build

Generate a heavily-optimized, lazy-loaded production bundle:

```bash
npm run build
```

The resulting `/dist` folder is ready to distribute to Vercel, Netlify, or any static hosting provider.

## 🛠️ Tech Stack Validation

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 (PostCSS)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **PDF Engine**: html2pdf.js

## 📬 Contact & Integration

To activate the contact form, simply insert your Formspree ID into the `formspreeEndpoint` variable inside `src/components/sections/Contact.jsx`.

**Author**: Rohan Yogesh Patil  
**Location**: Nashik, India  
**Email**: rohanyp1592007@gmail.com

---
*Built with precision. Designed for impact.*
