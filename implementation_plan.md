# Personal Portfolio Website — "Mukeshwar Raudra | Quantum Learner"
## Enhanced Implementation Plan

This implementation plan covers the design, layout, content structure, and interactive components of a single-page premium portfolio website for Mukeshwar Raudra, built as static `HTML/CSS/JS` with a cinematic "Quantum Dungeon" identity (dark academia × sci-fi × liquid glassmorphism).

---

## Design System

### 1. Typography & Colors
- **Colors**:
  - Background (Dark Academia / Depth): `#1B1716` (Near-Black)
  - Text & Light Surfaces (Cream): `#EDEBDE` (Cream/Bone)
  - Primary Accent: `#810100` (Deep Crimson)
  - Secondary Accent & Glows: `#630102` (Dark Wine Red)
  - Derived tints: `#1B1716` @ 40–70% opacity for glass panels; `#810100` @ 15–30% for glow halos
- **Fonts**:
  - Headings/Display: `Playfair Display` (serif, Google Fonts — Regular + Italic, weights 400/700/900)
  - Body/UI: `League Spartan` (sans-serif, Google Fonts — weights 300/400/600/700)
  - Accent/Mono: `Space Mono` for stat labels, percentages, "ONLINE" badge, metadata tags
- **Atmosphere**: Cinematic quantum chamber — radial crimson glows, hollow watermark typography, grain texture overlay, glass panels with soft inner borders, floating elements with organic motion.

### 2. Global Assets (sourced from `RESOURCE/` folder, all `.jpg`)
- `RESOURCE/Logo.jpg` — Custom "MJ" Logo Emblem (nav center / toggle)
- `RESOURCE/Mukesh.jpg` — Profile portrait (Home + About)
- `RESOURCE/Codesapiens.jpg` — Floating badge (Home, left)
- `RESOURCE/Nexora.jpg` — Floating badge (Home, left)
- `RESOURCE/google.jpg` — Floating badge (Home, right)
- `RESOURCE/Promptbase.jpg` — Floating badge (Home, right)
- GitHub mark — inline SVG (no external asset needed), used in My Works badge + Contact

### 3. Animation Vocabulary (used consistently across all sections)
- **Float loop**: `translateY` oscillation, 3–5s ease-in-out infinite, staggered delays per element (badges, ambient shapes)
- **Stagger reveal**: opacity 0→1 + translateY 24px→0, 0.6s ease-out, 0.08–0.15s stagger between siblings, triggered via Intersection Observer
- **Hollow text watermark**: `-webkit-text-stroke: 1px rgba(237,235,222,0.08)`, `color: transparent`, massive font-size (12–20vw), positioned absolute behind content
- **Glow pulse**: radial-gradient background-position/opacity breathing animation, 6–8s loop, for ambient orbs
- **Liquid fill**: skill capsules animate `width` (or clip-path) 0%→target% with easing, triggered on scroll-into-view
- **Card fan transform**: per-card `rotate()` + `translateX/Y` based on index distance from center, smooth `transition: transform 0.4s cubic-bezier(...)` on hover/active

---

## Proposed Changes

We will create a pure, high-performance static web experience with three structured source files in the project workspace:

1. `index.html` — Structural layout, semantic sections, SEO meta tags, accessibility attributes
2. `index.css` — Modern responsive styles, glassmorphic rules, radial glow maps, hollow-text utility, keyframe animations, fan-card positioning, responsive breakpoints
3. `script.js` — Entry flow controller, nav toggle + active-section tracker, Intersection Observer animations, skills fill controller, projects deck/carousel controller, custom cursor (optional), smooth scroll

### Component Hierarchy

```mermaid
graph TD
    A[index.html] --> B[Name Capture Overlay]
    A --> C[Floating Circular Navigation]
    A --> D[Section 1: Home]
    A --> E[Section 2: About]
    A --> F[Section 3: My Works]
    A --> G[Section 4: Contact]
    B --> B1[Glass Card + Input + Submit]
    C --> C1[Logo Toggle Button]
    C --> C2[Expanded Pill: Home / About | Logo | My Works / Contact]
    D --> D1[Hollow PROFESSOR Watermark]
    D --> D2[Center Portrait + Floating Badges x4]
    D --> D3[Hi NAME i'm MUKESHWAR RAUDRA]
    D --> D4[QUANTUM LEARNER Badge]
    E --> E1[Asymmetric Bio Layout]
    E --> E2[Liquid Skill Capsules x9]
    F --> F1[Arc Fan Card Deck x5 visible]
    F --> F2[Prev/Next Arrows]
    F --> F3[Circular GitHub Badge: My Projects / Follow me on]
    G --> G1[CTA Headline]
    G --> G2[Social Glass Icons: LinkedIn/GitHub/Instagram]
```

---

### [NEW] `index.html`

#### Global Structure
- `<head>`: meta viewport, title `"Mukeshwar Raudra | Quantum Learner"`, Google Fonts preconnect + links (Playfair Display, League Spartan, Space Mono), favicon (`RESOURCE/Logo.jpg`), Open Graph tags
- `<body>` contains, in order: Name Capture Overlay → Grain/Glow Background Layer → Floating Nav → `<main>` with 4 sections → `<script src="script.js">`

#### 1. Name Capture Overlay (`#name-gate`)
- Fixed, full-viewport, `z-index: 9999`, dark backdrop (`#1B1716` @ 92% + blur)
- Centered glass card (`.glass-panel`):
  - Playfair Italic prompt: *"Before we begin... what's your name?"*
  - `<input type="text" id="visitor-name" placeholder="Your name">` — glass-styled
  - Submit button (`#enter-site`) — glass pill with crimson glow on hover, label "Enter"
  - Pressing Enter or clicking submits
- On submit: validate non-empty (fallback to "Traveler" if blank) → store in `localStorage` (optional persistence) and JS variable → trigger fade-out (`.gate-exit` class, opacity+scale transition) → `display:none` after transition → trigger `document.body.classList.add('site-revealed')` to kick off Home entrance animations

#### 2. Floating Navigation (`#nav-toggle`, `#nav-pill`)
- `#nav-toggle`: fixed `top: 24px`, `left: 50%`, `translateX(-50%)`, circular glass button containing `RESOURCE/Logo.jpg`, `z-index: 1000`
- Click toggles `.nav-open` class on `#nav-pill`
- `#nav-pill`: hidden by default (`opacity:0; pointer-events:none; scale(0.9)`), becomes visible/interactive horizontal glass pill on toggle:
  - Left group: `<a href="#home">Home</a>` `<a href="#about">About</a>`
  - Center: `RESOURCE/Logo.jpg` (also clickable to collapse)
  - Right group: `<a href="#works">My Works</a>` `<a href="#contact">Contact</a>`
- Active link gets `.active` class (crimson underline/glow) via scroll-position tracking
- Mobile (`<768px`): pill becomes vertical stacked glass menu, full-width dropdown below toggle

#### 3. Section 1 — Home (`#home`)
- `<section id="home" class="section home">`
- `.bg-watermark`: absolutely positioned `<h1 class="hollow-text">PROFESSOR</h1>`, centered, ~18vw, low-opacity stroke
- `.top-emblem`: small `RESOURCE/Logo.jpg`, top-center above watermark
- `.tagline`: Playfair Italic quote: *"Remember Why you had Started and Come this All along"* — typewriter or fade-in on load
- `.portrait-wrap`: `RESOURCE/Mukesh.jpg`, center, soft-edge mask (radial gradient mask or feathered shadow), scale-in entrance
- `.floating-badges`:
  - `.badge.left.badge-1` → `RESOURCE/Codesapiens.jpg` (upper-left of portrait)
  - `.badge.left.badge-2` → `RESOURCE/Nexora.jpg` (lower-left)
  - `.badge.right.badge-1` → `RESOURCE/Promptbase.jpg` (upper-right)
  - `.badge.right.badge-2` → `RESOURCE/google.jpg` (lower-right)
  - Each: white rounded-square glass card ~90px, individual float animation with unique `animation-delay`/`duration`
- `.hero-name-block` (bottom-left):
  - `<span class="hero-greeting">Hi <span id="visitor-name-display">NAME</span> i'm</span>`
  - `<h2 class="hero-title">MUKESHWAR<br>RAUDRA</h2>`
- `.quantum-badge` (bottom-right):
  - `<span class="outline-word">QUANTUM</span><span class="solid-word">LEARNER</span>` with glow `text-shadow`

#### 4. Section 2 — About (`#about`)
- `.bg-watermark-about`: hollow text `"ABOUT"` or `"RAUDRA"`, repositioned for texture
- `.about-grid`: CSS grid, asymmetric (e.g., `grid-template-columns: 1.2fr 0.9fr` desktop)
- `.about-portrait`: `RESOURCE/Mukesh.jpg`, right column, crimson glass frame, slight rotation (`-3deg`), parallax via scroll listener (translateY based on scroll offset)
- `.about-bio` (left/center column):
  - Pull-quote line (Playfair Italic, large): personal intro line
  - Body paragraphs (League Spartan): Ex-Google Student Mentor, Founder of Nexora Community, Secondary Lead of Codesapiens, Tamil Nadu tech community organizer, AI/quantum/creative-tech enthusiast
- `.skills-section`:
  - Grid of `.skill-capsule` elements, each: `<div class="skill-capsule" data-percent="40"><span class="skill-name">CSS</span><div class="capsule-track"><div class="capsule-fill"></div></div><span class="skill-percent">0%</span></div>`
  - Skills list: CSS 40, Python 50, Numpy 20, Java 40, Canva 70, JavaScript 35, MySQL 42, Qiskit 30, C++ 50
  - On `IntersectionObserver` trigger: `.capsule-fill` width animates 0→`data-percent`%, `.skill-percent` counts up via `requestAnimationFrame` or interval

#### 5. Section 3 — My Works (`#works`)
- Heading: `<h2>My <em>Works</em></h2>` (Playfair, italic on "Works")
- `.deck-container`: holds `.prev-arrow` (glass circular button, left), `.fan-deck` (center), `.next-arrow` (right)
- `.fan-deck`: contains 5 visible `.project-card` elements at a time, positioned via inline `transform: rotate(Ndeg) translate(Xpx, Ypx)` based on `data-position` (`-2,-1,0,1,2`)
- `.project-card`:
  - `<a class="project-card" href="{repo_url}" target="_blank" data-position="0">`
  - Cream (`#EDEBDE`) background, rounded corners, `<span class="project-label">{Project Name}</span>` rotated to match card angle
  - Hover: lifts (`translateY(-12px) rotate(0deg) scale(1.03)`), crimson glow border
  - `UNDER CONSTRUCTION` cards: add `.coming-soon` class — desaturated filter, ribbon overlay "Coming Soon", `href="#"` + `e.preventDefault()` in JS, or non-anchor `<div>`
- `.deck-controls` JS: arrow clicks shift `currentIndex` through project array (modulo wrap), re-render 5 cards with recalculated `data-position` + transforms, smooth transition
- `.github-badge` (bottom-center): circular dark glass disc, SVG `<textPath>` for curved "My Projects" (top arc) and "Follow me on" (bottom arc), center GitHub icon SVG linking to `https://github.com/P-r-o-f-e-s-s-o-r`

**Projects Data Array** (`script.js`):
```js
const projects = [
  { name: "VLEARN", url: "https://github.com/P-r-o-f-e-s-s-o-r/VLEARN" },
  { name: "Final Reboot 2.5", url: "https://github.com/P-r-o-f-e-s-s-o-r/Final-Reboot-2.5" },
  { name: "D3", url: "https://github.com/P-r-o-f-e-s-s-o-r/d3communityofficial.github.io" },
  { name: "Quantum Qubit Visualizer", url: "https://github.com/P-r-o-f-e-s-s-o-r/Quantum-Qubit-representation" },
  { name: "Solo Leveling Habit Tracker", url: "https://github.com/P-r-o-f-e-s-s-o-r/Solo_Lvl_Habit" },
  { name: "Students Result Predictor", url: "https://github.com/P-r-o-f-e-s-s-o-r/STUDENTS-RESULT-PREDICTOR" },
  { name: "Payroll Management System", url: "https://github.com/P-r-o-f-e-s-s-o-r/Payroll-Management-" },
  { name: "Community Site", url: null, comingSoon: true },
  { name: "Prompt Base", url: null, comingSoon: true }
];
```

#### 6. Section 4 — Contact (`#contact`)
- `.bg-watermark-contact`: hollow `"CONTACT"` watermark
- `.contact-cta`: large Playfair Italic headline — *"Let's Build Something Together"*
- `.social-grid`: 3 `.social-glass-card` elements (LinkedIn, GitHub, Instagram), each with SVG icon + label, hover glow/scale, `target="_blank"`
  - LinkedIn → `https://www.linkedin.com/in/mukeshwar-raudra/`
  - GitHub → `https://github.com/P-r-o-f-e-s-s-o-r`
  - Instagram → `https://www.instagram.com/mukeshwar_raudra/`
- Ambient floating shapes (reuse `.float` animation class) in background for continuity

---

### [NEW] `index.css`

- **Reset & base**: `box-sizing`, `margin/padding` reset, `scroll-behavior: smooth`, base font on `body` = League Spartan, `background: #1B1716`, `color: #EDEBDE`
- **Grain overlay**: fixed full-screen `::before` pseudo-element with inline SVG noise data-URI, `opacity: 0.04`, `mix-blend-mode: overlay`, `pointer-events: none`, `z-index: 1`
- **Radial glow utility classes** (`.glow-crimson`, `.glow-wine`): large `radial-gradient` backgrounds positioned per-section, blurred via filter or large gradient spread
- **Glass panel utility** (`.glass-panel`):
```css
  background: rgba(27, 23, 22, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(237, 235, 222, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
```
- **Hollow text utility** (`.hollow-text`):
```css
  color: transparent;
  -webkit-text-stroke: 1px rgba(237, 235, 222, 0.08);
  font-family: 'Playfair Display', serif;
  font-weight: 900;
```
- **Keyframes**:
  - `@keyframes float` — `translateY(0) → translateY(-14px) → translateY(0)`, used with varied `animation-duration` (3.2s–4.8s) and `animation-delay` (0–1.5s) per badge
  - `@keyframes fadeUp` — opacity 0→1, translateY(24px)→0
  - `@keyframes glowPulse` — opacity/background-position breathing for ambient orbs
  - `@keyframes typewriter` (optional) — for tagline reveal
- **Fan card positioning**: `.project-card[data-position="-2"]` through `"2"` each get distinct `transform: rotate(Ndeg) translate(Xpx, Ypx) scale(S)` and `z-index` (center highest)
- **Liquid capsule fill**: `.capsule-track` (rounded full bar, dark glass), `.capsule-fill` (gradient `#810100→#630102`, `width: 0%` default, `transition: width 1.2s cubic-bezier(0.22,1,0.36,1)`)
- **Responsive breakpoints**: `@media (max-width: 1024px)` and `@media (max-width: 768px)`:
  - Home: portrait + badges scale down, badges reposition closer/stack
  - About: grid → single column, portrait moves above bio
  - Works: fan deck → simplified stack or horizontal scroll-snap carousel (single card visible, swipe)
  - Nav: pill → vertical dropdown menu

---

### [NEW] `script.js`

- **Name Handling**:
  - `#enter-site` click / Enter keypress → read `#visitor-name` value (trim, fallback "Traveler")
  - Update all `#visitor-name-display` elements with entered name
  - Add `.gate-exit` to `#name-gate`, after `transitionend` set `display:none`
  - Add `.site-revealed` to `<body>` to trigger Home stagger-in animations

- **Navigation**:
  - `#nav-toggle` click → toggle `.nav-open` on `#nav-pill`
  - Click on Logo inside pill or any nav link → close pill (`.nav-open` removed) after scroll
  - `scroll` listener (throttled via `requestAnimationFrame`) → determine active section by viewport position → toggle `.active` class on corresponding nav link

- **Intersection Observer (general)**:
  - Observe all `.fade-up` elements (section headings, bio blocks, contact cards) → add `.visible` class with staggered `transition-delay` based on `data-stagger-index`

- **Skills Animation Controller**:
  - Observe `.skills-section` → on first intersection, iterate `.skill-capsule` elements:
    - Read `data-percent`
    - Animate `.capsule-fill` width via class toggle (CSS transition handles easing)
    - Animate `.skill-percent` text from 0 to target using `setInterval`/`requestAnimationFrame` count-up (~800ms duration)

- **Projects Deck Controller**:
  - `currentIndex` state (default 0)
  - `renderDeck()`: computes 5 visible projects centered on `currentIndex` (wrap via modulo on `projects.length`), assigns `data-position` (-2..2) and content (name, link, coming-soon state) to the 5 `.project-card` DOM nodes
  - `.prev-arrow` / `.next-arrow` click → decrement/increment `currentIndex` (mod array length) → `renderDeck()`
  - Card click: if `comingSoon`, `preventDefault()`; else navigate to `url` in new tab (handled natively via `<a target="_blank">` or `window.open`)

- **Parallax (About portrait)**:
  - `scroll` listener → compute offset relative to `#about` section → apply `transform: translateY(offset * 0.1px)` to `.about-portrait`

---

## Verification Plan

### Automated Checks
- Validate HTML via W3C validator (no unclosed tags, proper semantic structure)
- Lint `script.js` (no syntax errors, no undefined variable references)
- Confirm all `RESOURCE/*.jpg` paths referenced consistently and `<img>` tags include `alt` attributes

### Manual Verification
- Serve via local static server (e.g., `python -m http.server`) and open in browser
- **Name Gate**: enter a name → confirm gate fades out → confirm `MUKESHWAR RAUDRA` hero block shows `Hi {Name} i'm` correctly
- **Navigation**: confirm pill hidden on load → toggle reveals glass pill with correct left/center/right grouping → links scroll to correct sections → active link highlights on scroll
- **Home**: confirm hollow `PROFESSOR` watermark renders behind portrait; confirm all 4 badges float independently with staggered timing
- **About**: confirm asymmetric layout renders correctly at desktop/tablet/mobile; confirm skill capsules animate fill + percentage count-up only once, on scroll into view
- **My Works**: confirm 5-card fan renders with correct rotation/offset; confirm arrow navigation cycles through all 9 projects (including 2 coming-soon); confirm clickable cards open correct GitHub URLs in new tabs; confirm coming-soon cards are visually distinct and non-navigable
- **Contact**: confirm all 3 social links open correct URLs in new tabs with correct hover effects
- **Responsiveness**: test at 1920px, 1024px, 768px, 375px — confirm no overflow, glass effects render (with fallback for unsupported `backdrop-filter`), floating elements don't overlap text
- **Performance**: confirm grain overlay and glows don't cause jank on scroll; animations use `transform`/`opacity` only