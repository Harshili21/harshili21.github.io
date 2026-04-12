/* ============================================
   HARSHILI PATNI - PORTFOLIO JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Particle Background ----------
    createParticles();

    // ---------- Typing Effect ----------
    initTypingEffect();

    // ---------- Navigation ----------
    initNavigation();

    // ---------- Scroll Animations ----------
    initScrollAnimations();

    // ---------- Stats Counter ----------
    initStatsCounter();

    // ---------- Back to Top ----------
    initBackToTop();

    // ---------- Image Fallbacks ----------
    initImageFallbacks();

    // ---------- Theme Toggle ----------
    initThemeToggle();
});

/* ---- Particles ---- */
function createParticles() {
    const container = document.getElementById('particles-bg');
    if (!container) return;
    const count = 40;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = 0.15 + Math.random() * 0.35;
        container.appendChild(particle);
    }
}

/* ---- Typing Effect ---- */
function initTypingEffect() {
    const titles = [
        'Software Developer',
        'Machine Learning Engineer',
        'Full-Stack Developer',
        'Problem Solver'
    ];
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ---- Navigation ---- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        updateActiveLink();
    });

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ---- Scroll Animations (custom AOS) ---- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ---- Stats Counter Animation ---- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;

        if (isFloat) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isFloat ? target.toFixed(2) : target;
        }
    }

    requestAnimationFrame(update);
}

/* ---- Back to Top ---- */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

/* ---- Image Fallbacks ---- */
function initImageFallbacks() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function () {
            // Create a fallback placeholder
            const parent = this.parentElement;
            const alt = this.alt || 'Image';
            const isProfile = this.id === 'profileImage';

            if (isProfile) {
                // Profile placeholder
                parent.innerHTML = `
                    <div style="
                        width: 100%; height: 100%;
                        display: flex; align-items: center; justify-content: center;
                        background: linear-gradient(135deg, #1a1a2e, #2d1b69);
                        color: #8b5cf6; font-size: 5rem; font-weight: 800;
                        font-family: 'Space Grotesk', sans-serif;
                    ">HP</div>
                `;
            } else {
                // Project image placeholder
                const icons = {
                    'exoplanetImg': '🚀',
                    'autovestImg': '💰',
                    'airlineImg': '✈️',
                    'foodImg': '🍕',
                    'visaImg': '🌐',
                    'hotelImg': '🏨'
                };
                const icon = icons[this.id] || '📁';

                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.background = 'linear-gradient(135deg, #1a1a2e, #2d1b69)';
                parent.style.flexDirection = 'column';
                parent.style.gap = '12px';

                this.remove();
                parent.innerHTML = `
                    <span style="font-size: 3rem;">${icon}</span>
                    <span style="
                        color: #a0a0b8; font-size: 0.85rem;
                        padding: 6px 16px; border-radius: 8px;
                        background: rgba(139,92,246,0.1);
                        border: 1px dashed rgba(139,92,246,0.3);
                    ">Drop image in assets/ folder</span>
                ` + (parent.querySelector('.project-image-overlay')?.outerHTML || '');
            }
        });
    });
}

/* ---- Theme Toggle ---- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    if (!toggleBtn || !themeIcon) return;

    // Dark is the default — clear any stale 'theme' key from automated testing.
    localStorage.removeItem('theme');

    // Only switch to light if user explicitly chose it via the toggle.
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        themeIcon.className = 'fas fa-moon';
    } else {
        document.body.classList.remove('light');
        themeIcon.className = 'fas fa-sun';
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light');
        if (isLight) {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('user-theme', 'light');
        } else {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('user-theme', 'dark');
        }
    });
}
