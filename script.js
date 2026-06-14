/* -------------------------------------------------------------
   script.js - Portfolio Interactive Logic
   Author: Creative Developer
   ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. NAME CAPTURE FLOW (GATE OVERLAY)
    // ==========================================
    const nameGate = document.getElementById("name-gate");
    const nameForm = document.getElementById("name-form");
    const visitorInput = document.getElementById("visitor-name");
    const visitorNameDisplays = document.querySelectorAll("#visitor-name-display");
    
    // Check if name is already stored in localStorage
    const savedName = localStorage.getItem("visitorName");
    if (savedName) {
        visitorInput.value = savedName;
    }
    
    nameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let name = visitorInput.value.trim();
        if (!name) {
            name = "Traveler";
        }
        
        // Save to localStorage for return visits
        localStorage.setItem("visitorName", name);
        
        // Update all placeholders
        visitorNameDisplays.forEach(display => {
            display.textContent = name;
        });
        
        // Exit animation for gate
        nameGate.classList.add("gate-exit");
        
        // Trigger reveal of home animations
        document.body.classList.add("site-revealed");
        
        // Make body scrollable once gate is gone
        document.body.style.overflowY = "auto";
        
        // Clean up DOM after transition completes
        setTimeout(() => {
            nameGate.style.display = "none";
            // Fire home entry stagger animations
            triggerSectionEntrance(document.getElementById("home"));
        }, 800);
    });

    // Disable scrolling while name gate is active
    if (nameGate.style.display !== "none") {
        document.body.style.overflowY = "hidden";
    }

    // ==========================================
    // 2. FLOATING NAVIGATION CONTROLLER
    // ==========================================
    const navToggle = document.getElementById("nav-toggle");
    const navPill = document.getElementById("nav-pill");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    // Toggle nav pill visibility
    navToggle.addEventListener("click", () => {
        openNav();
    });

    function openNav() {
        navPill.classList.add("nav-open");
        document.body.classList.add("nav-open-state");
    }

    function closeNav() {
        navPill.classList.remove("nav-open");
        document.body.classList.remove("nav-open-state");
    }

    // Close nav when clicking outside of it, clicking a link, or clicking the logo
    document.addEventListener("click", (e) => {
        const isClickInsideNav = navPill.contains(e.target);
        const isClickNavToggle = navToggle.contains(e.target);
        
        if (!isClickInsideNav && !isClickNavToggle && navPill.classList.contains("nav-open")) {
            closeNav();
        }
    });

    // Collapse nav on link clicks
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeNav();
        });
    });

    // Active link highlighting on scroll
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: "-40% 0px -40% 0px" // Triggers when section occupies center of viewport
    });

    sections.forEach(section => {
        activeSectionObserver.observe(section);
    });

    // ==========================================
    // 3. ENTRANCE STAGGER REVEALS (INTERSECTION OBSERVER)
    // ==========================================
    const entranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerSectionEntrance(entry.target);
                entranceObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -15% 0px" // Trigger slightly before scrolling into view
    });

    sections.forEach(section => {
        entranceObserver.observe(section);
    });

    function triggerSectionEntrance(section) {
        const fadeUpElements = section.querySelectorAll(".fade-up");
        fadeUpElements.forEach(el => {
            el.classList.add("visible");
        });
    }

    // ==========================================
    // 4. SKILLS LIQUID CAPSULES ANIMATION
    // ==========================================
    const skillsContainer = document.getElementById("skills-container");
    const skillCapsules = document.querySelectorAll(".skill-capsule");
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkills();
                skillsAnimated = true;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -10% 0px"
    });

    if (skillsContainer) {
        skillsObserver.observe(skillsContainer);
    }

    function animateSkills() {
        skillCapsules.forEach(capsule => {
            const percent = parseInt(capsule.getAttribute("data-percent"), 10);
            const fill = capsule.querySelector(".capsule-fill");
            const percentLabel = capsule.querySelector(".skill-percent");
            
            // Set capsule fill width
            fill.style.width = `${percent}%`;
            
            // Text count up animation
            let startVal = 0;
            const duration = 1500; // 1.5s
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
                const easedProgress = progress * (2 - progress);
                const currentVal = Math.floor(startVal + (percent - startVal) * easedProgress);
                
                percentLabel.textContent = `${currentVal}%`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    percentLabel.textContent = `${percent}%`;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    // ==========================================
    // 5. PROJECTS ARC DECK CAROUSEL CONTROLLER
    // ==========================================
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

    let currentProjectIndex = 0;
    const projectCardWrappers = document.querySelectorAll(".project-card-wrapper");
    const prevBtn = document.querySelector(".prev-arrow");
    const nextBtn = document.querySelector(".next-arrow");

    function renderDeck() {
        const totalProjects = projects.length;
        
        projectCardWrappers.forEach((wrapper, i) => {
            // Position index ranges from -2 (wrapper index 0) to 2 (wrapper index 4)
            const position = i - 2; 
            
            // Calculate corresponding project index
            let projectIndex = (currentProjectIndex + position) % totalProjects;
            if (projectIndex < 0) {
                projectIndex += totalProjects;
            }
            
            const project = projects[projectIndex];
            
            // Clear current content
            wrapper.innerHTML = "";
            
            // Create card HTML content
            const cardLink = document.createElement("a");
            cardLink.className = `project-card ${project.comingSoon ? 'coming-soon-card' : ''}`;
            cardLink.href = project.url || "#";
            
            if (project.comingSoon) {
                cardLink.addEventListener("click", (e) => e.preventDefault());
                const ribbon = document.createElement("div");
                ribbon.className = "coming-soon-ribbon";
                ribbon.textContent = "SOON";
                cardLink.appendChild(ribbon);
            } else {
                cardLink.target = "_blank";
                cardLink.rel = "noopener noreferrer";
            }
            
            const cardInner = document.createElement("div");
            cardInner.className = "card-inner";
            
            const pNum = document.createElement("span");
            pNum.className = "project-num mono-label";
            pNum.textContent = String(projectIndex + 1).padStart(2, "0");
            
            const pName = document.createElement("h3");
            pName.className = "project-name";
            pName.textContent = project.name;
            
            const pAction = document.createElement("span");
            pAction.className = "project-action mono-label";
            pAction.innerHTML = project.comingSoon ? "UNDER CONSTRUCTION" : "VIEW REPO ↗";
            
            cardInner.appendChild(pNum);
            cardInner.appendChild(pName);
            cardInner.appendChild(pAction);
            cardLink.appendChild(cardInner);
            wrapper.appendChild(cardLink);
            
            // Update wrapper data-position to trigger CSS animations
            wrapper.setAttribute("data-position", String(position));
        });
    }

    if (projectCardWrappers.length > 0) {
        renderDeck();
        
        prevBtn.addEventListener("click", () => {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            renderDeck();
        });
        
        nextBtn.addEventListener("click", () => {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            renderDeck();
        });
    }

    // ==========================================
    // 6. PORTRAIT PARALLAX SCROLL (ABOUT SECTION)
    // ==========================================
    const aboutSection = document.getElementById("about");
    const parallaxBox = document.querySelector(".portrait-parallax-box");
    
    if (aboutSection && parallaxBox) {
        window.addEventListener("scroll", () => {
            window.requestAnimationFrame(() => {
                const rect = aboutSection.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                
                // If section is currently visible inside the screen view
                if (rect.top < viewHeight && rect.bottom > 0) {
                    const scrolledDelta = viewHeight - rect.top;
                    // Move portrait box slightly along Y axis (factor of 0.08)
                    parallaxBox.style.transform = `rotate(3deg) translateY(${scrolledDelta * 0.06}px)`;
                }
            });
        });
    }
});
