// Typing animation texts
const typingTexts = [
    "Full Stack Developer",
    "AI Enthusiast", 
    "Problem Solver",
    "Tech Innovator",
    "Code Artist"
];

// Global configuration flags to control scroll effects / parallax
const SCROLL_BEHAVIOR = {
    disableParallax: true,          // disables hero parallax that caused overlap
    disableSectionFade: true        // keeps sections at full opacity (prevents visual lifting)
};

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// Typing animation function
function typeText() {
    const typedElement = document.getElementById('typed-text');
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
            return;
        }
    } else {
        typedElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
    }
    
    setTimeout(typeText, isDeleting ? 100 : 150);
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate counters when stats section comes into view
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            // Enhanced skill section animations
            if (entry.target.classList.contains('skills-grid')) {
                animateSkillsSection(entry.target);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced skills section animation function
function animateSkillsSection(skillsGrid) {
    const skillCategories = skillsGrid.querySelectorAll('.skill-category');
    const skillItems = skillsGrid.querySelectorAll('.skill-item');
    const skillBars = skillsGrid.querySelectorAll('.skill-progress');
    
    // Animate skill categories with stagger
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.classList.add('animate-in');
        }, index * 200);
    });
    
    // Animate skill items with stagger
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, 300 + (index * 100));
    });
    
    // Animate skill bars with enhanced timing
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.style.animation = 'skillGlow 2s ease-in-out infinite';
            
            // Add completion celebration effect
            setTimeout(() => {
                bar.style.animation = 'none';
            }, 3000);
        }, 600 + (index * 150));
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links (refined for dynamic layout & accessibility)
function initSmoothScrolling() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let navbarHeight = navbar.offsetHeight;
    let resizeTimer;

    // Recalculate navbar height on resize (debounced)
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            navbarHeight = navbar.offsetHeight;
        }, 150);
    });

    // Utility: compute target Y accounting for navbar and optional data offsets (ignore scroll-margin-top to avoid double subtraction)
    function computeScrollY(targetEl, triggerEl) {
        const rect = targetEl.getBoundingClientRect();
        const pageY = rect.top + window.pageYOffset;
        const linkOffset = parseInt(triggerEl.getAttribute('data-scroll-offset')) || 0;
        const sectionOffsetAttr = parseInt(targetEl.getAttribute('data-offset')) || 0;
        // Small breathing space below navbar for non-hero sections
        const baseExtra = targetEl.id === 'home' ? 0 : 10;
        return Math.max(0, pageY - navbarHeight - baseExtra - linkOffset - sectionOffsetAttr);
    }

    // Animate scroll with custom easing fallback for browsers without native smooth behavior
    function animatedScrollTo(to) {
        // If native smooth scroll supported, use it
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: to, behavior: 'smooth' });
            return;
        }
        const start = window.pageYOffset;
        const distance = to - start;
        const duration = 600;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / duration);
            const eased = easeInOutCubic(progress);
            window.scrollTo(0, start + distance * eased);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (!hash || hash === '#') return; // Ignore empty
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();

            const destinationY = computeScrollY(target, this);
            animatedScrollTo(destinationY);

            // If About, trigger content animation (now accompanies smooth scroll)
            if (hash === '#about') {
                target.classList.remove('about-animate-in');
                target.classList.add('about-animating');
                requestAnimationFrame(() => target.classList.add('about-animate-in'));
                setTimeout(() => target.classList.remove('about-animating', 'about-animate-in'), 1200);
            }

            if (history.pushState) {
                history.pushState(null, '', hash);
            } else {
                window.location.hash = hash;
            }

            setTimeout(() => {
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }, 650);
        });
    });

    // Adjust initial hash positioning after load (e.g., direct link)
    if (window.location.hash) {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
            setTimeout(() => {
                const destinationY = computeScrollY(initialTarget, initialTarget);
                window.scrollTo(0, destinationY);
            }, 60);
        }
    }
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    highlightActiveSection();
}

// Parallax effect for hero section
function initParallax() {
    // Parallax intentionally disabled to avoid hero/about overlap
    if (SCROLL_BEHAVIOR.disableParallax) {
        // Ensure any previous transform is cleared
        const heroContent = document.querySelector('.hero-container');
        if (heroContent) heroContent.style.transform = 'none';
        const geo = document.querySelectorAll('.geometric-elements > *');
        geo.forEach(el => el.style.transform = 'none');
        return;
    }
    // (If re-enabled in future, restore previous implementation here.)
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Interactive hero letters
function initHeroLetters() {
    const heroLetters = document.querySelectorAll('.hero-letter');
    
    heroLetters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            letter.appendChild(ripple);
            
            // Random color change
            const colors = ['#4CAF50', '#03DAC6', '#6200EA', '#BB86FC'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            letter.style.color = randomColor;
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        letter.addEventListener('mouseleave', () => {
            // Reset to gradient
            letter.style.color = '';
        });
    });
}

// Form handling
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            form.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        color: 'white',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #4CAF50, #03DAC6)',
        pointerEvents: 'none',
        zIndex: '9999',
        transform: 'translate(-50%, -50%)',
        opacity: '0.7',
        transition: 'opacity 0.3s ease'
    });
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor when not moving
    let mouseTimer;
    document.addEventListener('mousemove', () => {
        cursor.style.opacity = '0.7';
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => {
            cursor.style.opacity = '0';
        }, 3000);
    });
}

// Floating particles effect
function initFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.querySelector('.hero').appendChild(particlesContainer);
    
    Object.assign(particlesContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '1'
    });
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            borderRadius: '50%',
            background: ['#4CAF50', '#03DAC6', '#BB86FC'][Math.floor(Math.random() * 3)],
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.2,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`
        });
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            from {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize 3D tilt effect for cards
function init3DTilt() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointerCoarse = window.matchMedia('(pointer: coarse)').matches; // touch-heavy devices

    // Collect target cards
    const cards = document.querySelectorAll('.project-card, .about-card, .skill-category, .contact-item');
    if (!cards.length) return;

    // Adaptive parameters
    const MAX_ROTATE = prefersReduced ? 4 : 10;            // limit motion if reduced preference
    const HOVER_ELEVATION = prefersReduced ? 6 : 14;       // smaller lift for reduced motion
    const REST_ELEVATION = 0;
    const LERP_FACTOR = prefersReduced ? 0.2 : 0.12;       // slightly snappier if reduced
    const SCALE = prefersReduced ? 1.005 : 1.02;           // subtle scale
    const PERSPECTIVE = 1100;
    const ENABLE_DEBUG = false; // set true for console diagnostics

    // Track per-card animation state
    const state = new WeakMap();
    let rafId = null;

    function animate() {
        let needsContinue = false;
        cards.forEach(card => {
            const s = state.get(card);
            if (!s) return;
            // Lerp toward target
            s.rx += (s.trx - s.rx) * LERP_FACTOR;
            s.ry += (s.try - s.ry) * LERP_FACTOR;
            s.elev += (s.telev - s.elev) * LERP_FACTOR;
            s.scale += (s.tscale - s.scale) * LERP_FACTOR;

            // If deltas still significant keep animating
            if (Math.abs(s.rx - s.trx) > 0.01 || Math.abs(s.ry - s.try) > 0.01 || Math.abs(s.elev - s.telev) > 0.1 || Math.abs(s.scale - s.tscale) > 0.001) {
                needsContinue = true;
            }

            const shadowDepth = (Math.abs(s.rx) + Math.abs(s.ry)) / (MAX_ROTATE * 2); // 0..1
            const shadowY = 20 + shadowDepth * 25;
            const shadowBlur = 40 + shadowDepth * 40;
            const shadowOpacity = 0.25 + shadowDepth * 0.25;
            const glowOpacity = 0.15 + shadowDepth * 0.25;

            card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) translateY(${-s.elev.toFixed(2)}px) scale(${s.scale.toFixed(3)})`;
            card.style.boxShadow = `0 ${shadowY.toFixed(0)}px ${shadowBlur.toFixed(0)}px rgba(0,0,0,${shadowOpacity.toFixed(2)}), 0 0 ${30 + shadowDepth * 40}px rgba(76,175,80,${glowOpacity.toFixed(2)})`;
        });
        if (needsContinue) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null; // stop loop until next interaction
        }
    }

    function ensureAnimating() {
        if (rafId == null) rafId = requestAnimationFrame(animate);
    }

    function engageCard(card) {
        if (!state.has(card)) {
            state.set(card, { rx: 0, ry: 0, trx: 0, try: 0, elev: REST_ELEVATION, telev: REST_ELEVATION, scale: 1, tscale: 1 });
        }
        const s = state.get(card);
        s.tscale = SCALE;
        s.telev = HOVER_ELEVATION;
        card.classList.add('tilt-active');
        card.style.willChange = 'transform';
        ensureAnimating();
    }

    function updateCard(card, e) {
        const rect = card.getBoundingClientRect();
        // Support both mouse event and touch point object
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width/2);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height/2);
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const nx = (x / rect.width) * 2 - 1;  // -1 .. 1
        const ny = (y / rect.height) * 2 - 1; // -1 .. 1
        // Invert Y for natural tilt (top should tilt back)
        const targetRotateX = ny * MAX_ROTATE * -1;
        const targetRotateY = nx * MAX_ROTATE;
        const s = state.get(card);
        if (!s) return;
        s.trx = targetRotateX;
        s.try = targetRotateY;
        ensureAnimating();
        if (ENABLE_DEBUG && !card.dataset._tiltDebugged) {
            card.dataset._tiltDebugged = '1';
            console.log('[Tilt] Active on', card.className);
        }
    }

    function releaseCard(card) {
        const s = state.get(card);
        if (!s) return;
        s.trx = 0; s.try = 0; s.telev = REST_ELEVATION; s.tscale = 1;
        ensureAnimating();
        // After settle remove will-change
        setTimeout(() => {
            if (Math.abs(s.rx) < 0.2 && Math.abs(s.ry) < 0.2) {
                card.style.willChange = '';
                card.classList.remove('tilt-active');
            }
        }, 600);
    }

    cards.forEach(card => {
        // Avoid stacking with existing CSS hover transforms: neutralize them by removing transform on hover rule if needed
        card.addEventListener('mouseenter', () => {
            engageCard(card);
        });
        card.addEventListener('mousemove', (e) => updateCard(card, e));
        card.addEventListener('mouseleave', () => releaseCard(card));

        // Touch / coarse pointer: only engage on tap, minimal effect
        if (pointerCoarse) {
            card.addEventListener('touchstart', (e) => {
                engageCard(card);
                updateCard(card, e);
            }, { passive: true });
            card.addEventListener('touchmove', (e) => updateCard(card, e), { passive: true });
            card.addEventListener('touchend', () => releaseCard(card));
        }
    });

    if (ENABLE_DEBUG) {
        console.log(`[Tilt] Initialized: cards=${cards.length}, prefersReduced=${prefersReduced}, pointerCoarse=${pointerCoarse}`);
    }
}

// Performance optimized scroll handler with smooth enhancements
function initOptimizedScroll() {
    // Keep only essential smooth behavior; disable parallax + fade effects per config
    document.documentElement.style.scrollBehavior = 'smooth';
    if (SCROLL_BEHAVIOR.disableParallax && SCROLL_BEHAVIOR.disableSectionFade) return; // nothing to do

    let ticking = false;

    function updateScrollEffects() {
        const scrollY = window.pageYOffset;

        if (!SCROLL_BEHAVIOR.disableParallax) {
            const parallaxElements = document.querySelectorAll('.geometric-elements > *');
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }

        if (!SCROLL_BEHAVIOR.disableSectionFade) {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
                    section.style.opacity = Math.max(0.85, progress);
                } else if (SCROLL_BEHAVIOR.disableSectionFade) {
                    section.style.opacity = 1;
                }
            });
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced momentum scrolling for better feel
function initMomentumScrolling() {
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            document.body.style.scrollBehavior = 'smooth';
            isScrolling = true;
        }
        
        clearTimeout(window.scrollEndTimer);
        window.scrollEndTimer = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }, { passive: true });
}

// Intersection Observer for fade-in animations
function initFadeInObserver() {
    const fadeElements = document.querySelectorAll('section, .project-card, .skill-category, .contact-item');
    
    fadeElements.forEach(element => {
        element.classList.add('observe');
        observer.observe(element);
    });
}

// Enhanced mobile experience
function initMobileEnhancements() {
    if (window.innerWidth <= 768) {
        // Disable parallax on mobile for better performance
        const parallaxElements = document.querySelectorAll('.geometric-elements > *');
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
        
        // Simplified animations for mobile
        const heroLetters = document.querySelectorAll('.hero-letter');
        heroLetters.forEach(letter => {
            letter.style.animation = 'none';
            letter.style.opacity = '1';
            letter.style.transform = 'none';
        });
    }
}

// Loading animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        // Hide loading screen if exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Start hero animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-letter');
            heroElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
    });
}

// Theme switcher with local storage
function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    const isLightTheme = savedTheme === 'light';
    
    // Apply saved theme
    if (isLightTheme) {
        document.documentElement.classList.add('light-theme');
    }
    
    // Set initial icon
    themeToggle.innerHTML = isLightTheme ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    themeToggle.addEventListener('click', () => {
        const isCurrentlyLight = document.documentElement.classList.contains('light-theme');
        
        if (isCurrentlyLight) {
            // Switch to dark theme
            document.documentElement.classList.remove('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('portfolio-theme', 'dark');
            showNotification('Switched to Dark Mode', 'success');
        } else {
            // Switch to light theme
            document.documentElement.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('portfolio-theme', 'light');
            showNotification('Switched to Light Mode', 'success');
        }
        
        // Add a subtle animation when switching
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Add keyboard support
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    typeText();
    toggleMobileMenu();
    initSmoothScrolling();
    initActiveNavigation();
    initNavbarScroll();
    initContactForm();
    
    // Visual enhancements
    initHeroLetters();
    init3DTilt();
    initFadeInObserver();
    
    // Performance optimizations
    initOptimizedScroll();
    initMomentumScrolling();
    initMobileEnhancements();
    initLoadingAnimation();
    
    // Optional enhancements (can be disabled for better performance)
    if (window.innerWidth > 768) {
        initParallax(); // will no-op if disabled
        initCursorTrail();
        initFloatingParticles();
    } else {
        // Ensure transforms are cleared on mobile too
        const heroContent = document.querySelector('.hero-container');
        if (heroContent) heroContent.style.transform = 'none';
    }
    
    // Theme switcher
    initThemeSwitcher();
    initColorPaletteSwitcher();
});

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Color palette theme switching (5 accent families)
function initColorPaletteSwitcher() {
    const paletteContainer = document.querySelector('.theme-palette');
    if (!paletteContainer) return;
    const toggleBtn = paletteContainer.querySelector('.palette-toggle');
    const swatches = paletteContainer.querySelectorAll('.palette-swatch');
    const STORAGE_KEY = 'portfolio-color-theme';

    function applyTheme(theme) {
        if (!theme) return;
        document.body.setAttribute('data-color-theme', theme);
        swatches.forEach(s => s.classList.toggle('active', s.dataset.theme === theme));
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Restore saved
    const saved = localStorage.getItem(STORAGE_KEY) || 'emerald';
    applyTheme(saved);

    toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', String(!expanded));
    });

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            applyTheme(swatch.dataset.theme);
        });
        swatch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                applyTheme(swatch.dataset.theme);
            }
        });
        swatch.setAttribute('tabindex','0');
        swatch.setAttribute('role','button');
    });
}