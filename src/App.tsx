import { useState, useEffect, useRef } from 'react';

// Data Interfaces
interface Project {
  name: string;
  url?: string;
  tag: string;
  underConstruction: boolean;
}

interface Skill {
  name: string;
  percentage: number;
}

// Inline SVG Icons for premium and lightweight styling
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// Constants
const PROJECTS: Project[] = [
  { name: "VLEARN", url: "https://github.com/P-r-o-f-e-s-s-o-r/VLEARN", tag: "React / Edu", underConstruction: false },
  { name: "Final Reboot 2.5", url: "https://github.com/P-r-o-f-e-s-s-o-r/Final-Reboot-2.5", tag: "Python / CLI", underConstruction: false },
  { name: "D3", url: "https://github.com/P-r-o-f-e-s-s-o-r/d3communityofficial.github.io", tag: "HTML / CSS", underConstruction: false },
  { name: "Quantum Qbit Visualizer", url: "https://github.com/P-r-o-f-e-s-s-o-r/Quantum-Qubit-representation", tag: "Qiskit / Python", underConstruction: false },
  { name: "Solo Leveling Habit Tracker", url: "https://github.com/P-r-o-f-e-s-s-o-r/Solo_Lvl_Habit", tag: "React / Game", underConstruction: false },
  { name: "Students Result Predictor", url: "https://github.com/P-r-o-f-e-s-s-o-r/STUDENTS-RESULT-PREDICTOR", tag: "ML / Python", underConstruction: false },
  { name: "Payroll Management System", url: "https://github.com/P-r-o-f-e-s-s-o-r/Payroll-Management-", tag: "Java / DB", underConstruction: false },
  { name: "Community Site", tag: "Under Construction", underConstruction: true },
  { name: "Prompt Base", tag: "Under Construction", underConstruction: true }
];

const SKILLS: Skill[] = [
  { name: "CSS", percentage: 40 },
  { name: "Python", percentage: 50 },
  { name: "Numpy", percentage: 20 },
  { name: "Java", percentage: 40 },
  { name: "Canva", percentage: 70 },
  { name: "JavaScript", percentage: 35 },
  { name: "MySQL", percentage: 42 },
  { name: "Qiskit", percentage: 30 },
  { name: "C++", percentage: 50 }
];

export default function App() {
  // 1. Overlay state
  const [visitorName, setVisitorName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorAttempts, setErrorAttempts] = useState(0);

  // 2. Nav state
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLDivElement>(null);

  // 3. About state (skills animations)
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  // 4. Works carousel state
  const [centerIndex, setCenterIndex] = useState(0);

  // Submit Handler for name overlay
  const handleOverlaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed === "") {
      if (errorAttempts === 0) {
        setShowError(true);
        setErrorAttempts(1);
        // Trigger CSS shake animation on overlay input wrapper
        const inputEl = document.getElementById("overlay-input");
        if (inputEl) {
          inputEl.classList.remove("animate-shake");
          void inputEl.offsetWidth; // Reflow trigger
          inputEl.classList.add("animate-shake");
        }
      } else {
        // Defaults to Visitor on second continue click
        setVisitorName("Visitor");
        setOverlayFadeOut(true);
        setTimeout(() => {
          setShowOverlay(false);
        }, 600);
      }
    } else {
      setVisitorName(trimmed);
      setOverlayFadeOut(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 600);
    }
  };

  // Nav click smooth scroll helper
  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavExpanded(false);
  };

  // Click outside to collapse navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNavExpanded && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsNavExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavExpanded]);

  // Scroll reveal animations
  useEffect(() => {
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 120;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScrollReveal);
    // Initial check with brief delay to let page mount
    const timeout = setTimeout(handleScrollReveal, 150);

    return () => {
      window.removeEventListener("scroll", handleScrollReveal);
      clearTimeout(timeout);
    };
  }, []);

  // Update active section on scroll closest to screen center
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = ["home", "about", "works", "contact"];
      let current = "home";
      let minDiff = Infinity;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerDiff = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          if (centerDiff < minDiff) {
            minDiff = centerDiff;
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleActiveSection);
    return () => {
      window.removeEventListener("scroll", handleActiveSection);
    };
  }, []);

  // Intersection observer to trigger skill progress bars fill animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Cycle project deck handlers
  const handlePrevCard = () => {
    setCenterIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleNextCard = () => {
    setCenterIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  // Helper to get placement classes for carousel cards in fanned arc
  const getCardClass = (idx: number) => {
    let offset = idx - centerIndex;
    if (offset > 4) offset -= PROJECTS.length;
    if (offset < -4) offset += PROJECTS.length;

    if (offset === 0) return "pos-center";
    if (offset === -1) return "pos-1-left";
    if (offset === -2) return "pos-2-left";
    if (offset === 1) return "pos-1-right";
    if (offset === 2) return "pos-2-right";
    return "pos-hidden";
  };

  // Handle click on cards: center card opens link, flanking cards cycle them to center
  const handleCardClick = (idx: number, project: Project) => {
    let offset = idx - centerIndex;
    if (offset > 4) offset -= PROJECTS.length;
    if (offset < -4) offset += PROJECTS.length;

    if (offset === 0) {
      if (!project.underConstruction && project.url) {
        window.open(project.url, "_blank", "noopener,noreferrer");
      }
    } else if (Math.abs(offset) <= 2) {
      setCenterIndex(idx);
    }
  };

  return (
    <div className="bg-vignette">
      {/* 1. Name Capture Overlay */}
      {showOverlay && (
        <div className={`overlay-backdrop ${overlayFadeOut ? 'fade-out' : ''}`}>
          <div className="overlay-card glass-panel glass-panel-crimson-glow">
            <h2 className="overlay-prompt">
              "Before we begin... what's your name?"
            </h2>
            <form onSubmit={handleOverlaySubmit} className="overlay-form">
              <div className="overlay-input-wrapper">
                <input
                  id="overlay-input"
                  type="text"
                  placeholder="Your Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="overlay-input"
                  autoComplete="off"
                />
              </div>
              {showError && nameInput.trim() === "" && (
                <p className="overlay-error-msg">
                  Please enter your name, or click continue again to proceed as Visitor.
                </p>
              )}
              <button type="submit" className="overlay-btn">
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Morphing Navigation */}
      <nav className="nav-wrapper" ref={navRef}>
        <div className={`nav-container ${isNavExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="nav-links-left">
            <span onClick={() => handleNavClick("home")} className={`nav-link ${activeSection === "home" ? 'active' : ''}`}>
              Home
            </span>
            <span onClick={() => handleNavClick("about")} className={`nav-link ${activeSection === "about" ? 'active' : ''}`}>
              About
            </span>
          </div>

          <button onClick={() => setIsNavExpanded(!isNavExpanded)} className="nav-logo-btn">
            <img src="/RESOURCE/Logo.jpg" alt="Logo" />
          </button>

          <div className="nav-links-right">
            <span onClick={() => handleNavClick("works")} className={`nav-link ${activeSection === "works" ? 'active' : ''}`}>
              Works
            </span>
            <span onClick={() => handleNavClick("contact")} className={`nav-link ${activeSection === "contact" ? 'active' : ''}`}>
              Contact
            </span>
          </div>
        </div>
      </nav>

      {/* 3. Home Section */}
      <section id="home">
        <div className="home-logo-container fade-slide-in">
          <img src="/RESOURCE/Logo.jpg" alt="Logo Emblem" className="home-logo" />
          <p className="home-tagline">
            "Remember Why you had Started and Come this All along"
          </p>
        </div>

        <div className="home-center-container">
          <div className="wordmark-bg">PROFESSOR</div>
          <div className="portrait-container">
            <img src="/RESOURCE/Mukesh.jpg" alt="Mukesh portrait" className="portrait-img" />
          </div>

          {/* Floating tech badges */}
          <div className="badge-tile glass-panel badge-left-upper badge-float-1">
            <img src="/RESOURCE/Codesapiens.jpg" alt="Codesapiens" />
          </div>
          <div className="badge-tile glass-panel badge-left-lower badge-float-2">
            <img src="/RESOURCE/Nexora.jpg" alt="Nexora" />
          </div>
          <div className="badge-tile glass-panel badge-right-upper badge-float-3">
            <img src="/RESOURCE/google.jpg" alt="Google" />
          </div>
          <div className="badge-tile glass-panel badge-right-lower badge-float-4">
            <img src="/RESOURCE/Promptbase.jpg" alt="Promptbase" />
          </div>
        </div>

        <div className="home-bottom-container fade-slide-in">
          <div className="home-bottom-left">
            <p className="home-greeting">
              Hi <span className="glow-text-cream" style={{ fontWeight: 700 }}>{visitorName || 'Visitor'}</span> i'm
            </p>
            <h1 className="home-name">
              MUKESHWAR<br />RAUDRA
            </h1>
          </div>

          <div className="home-bottom-right">
            <p className="home-role-label">Status</p>
            <div className="home-role-title">
              <span className="home-role-quantum">QUANTUM</span>
              <span className="home-role-learner">LEARNER</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Section */}
      <section id="about" className="reveal">
        <div className="about-content">
          <div className="about-left">
            <h2 className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              About <span className="script-word">Mukesh</span>
            </h2>
            <p className="about-intro">
              Ex-Google Student Mentor • Founder of Nexora Community • Codesapiens Secondary Lead
            </p>
            <p className="about-body selectable">
              Passionate developer specializing in quantum computing technology and tech-driven education.
              Having served as an Ex-Google Student Mentor, I dedicated my time guiding aspiring student engineers.
              As the Founder of the Nexora Community and secondary lead at Codesapiens, I continuously build open-source collaborative hubs that focus on learning, mentorship, and making quantum software accessible.
            </p>

            {/* Skills progress bars */}
            <h3 className="skills-title">Core Skills</h3>
            <div className="skills-container" ref={skillsRef}>
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="skill-bar-wrapper">
                  <div className="skill-label-row">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: skillsVisible ? `${skill.percentage}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div className="about-portrait-frame">
              <img src="/RESOURCE/Mukesh.jpg" alt="Mukesh Framed Portrait" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Works Section */}
      <section id="works" className="reveal">
        <div className="works-header-container">
          <h2 className="section-header">
            My <span className="script-word">Works</span>
          </h2>
          <div className="works-status-chip">
            <span className="status-dot"></span>
            <span>online</span>
          </div>
        </div>

        {/* Fan-deck carousel */}
        <div className="carousel-wrapper">
          <button onClick={handlePrevCard} className="carousel-btn carousel-btn-left" aria-label="Previous Project">
            <ArrowLeft />
          </button>

          <div className="carousel-deck">
            {PROJECTS.map((project, idx) => {
              const placementClass = getCardClass(idx);
              const isCenter = placementClass === "pos-center";
              return (
                <div
                  key={idx}
                  onClick={() => handleCardClick(idx, project)}
                  className={`carousel-card ${placementClass} ${project.underConstruction ? 'disabled' : ''}`}
                >
                  <span className="card-project-num font-mono">
                    PROJ. 0{idx + 1}
                  </span>
                  
                  <h3 className="card-project-title">
                    {project.name}
                  </h3>

                  <div className="card-footer">
                    <span className="card-tag font-mono">
                      {project.tag}
                    </span>
                    {!project.underConstruction && isCenter && (
                      <span className="card-action-icon" title="View Source on GitHub">
                        ↗
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={handleNextCard} className="carousel-btn carousel-btn-right" aria-label="Next Project">
            <ArrowRight />
          </button>
        </div>

        {/* GitHub circular curved badge */}
        <div className="github-badge-wrapper">
          <a
            href="https://github.com/P-r-o-f-e-s-s-o-r"
            target="_blank"
            rel="noopener noreferrer"
            className="github-circular-badge"
          >
            <svg className="curved-text" viewBox="0 0 190 190">
              <path
                id="textPathCurve"
                d="M 25, 95 A 70,70 0 1,1 165,95 A 70,70 0 1,1 25,95"
                fill="transparent"
              />
              <text>
                <textPath href="#textPathCurve" startOffset="25%" textAnchor="middle">
                  My Projects • Follow me on •
                </textPath>
                <textPath href="#textPathCurve" startOffset="75%" textAnchor="middle">
                  My Projects • Follow me on •
                </textPath>
              </text>
            </svg>
            <div className="github-badge-icon">
              <GithubIcon />
            </div>
          </a>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="reveal">
        <div className="contact-card glass-panel glass-panel-crimson-glow">
          <h2 className="contact-title font-playfair-italic">
            Let's Connect
          </h2>
          <p className="contact-subtitle">
            Looking to collaborate, discuss quantum tech, education projects, or just say hello? Find me on these platforms.
          </p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/mukeshwar-raudra/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://github.com/P-r-o-f-e-s-s-o-r"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.instagram.com/mukeshwar_raudra/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
