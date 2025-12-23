// ========== GLOBAL VARIABLES ==========
let currentTheme = localStorage.getItem('theme') || 'light';
let isMenuOpen = false;
let typedTextElement;
let observerOptions = {
    root: null,
    rootMargin: '-30px', // Reduced margin for better iOS compatibility
    threshold: 0.15 // Increased threshold for iOS
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initTheme();
    initNavigation();
    initTypedText();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();
    initParallax();
    
    // Remove loader after everything is loaded
    setTimeout(() => {
        hideLoader();
    }, 1500);
});

// ========== LOADER ==========
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Add some random loading messages
    const loadingMessages = [
        'Cargando Portfolio...',
        'Preparando experiencia...',
        'Casi listo...',
        'Últimos detalles...'
    ];
    
    const loaderText = loader.querySelector('p');
    let messageIndex = 0;
    
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
            messageIndex++;
            loaderText.textContent = loadingMessages[messageIndex];
        } else {
            clearInterval(messageInterval);
        }
    }, 400);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    
    // Remove loader from DOM after animation
    setTimeout(() => {
        loader.style.display = 'none';
    }, 300);
}

// ========== THEME TOGGLE ==========
function initTheme() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Initialize navbar theme immediately
    setTimeout(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            updateNavbarTheme(navbar);
        }
    }, 100);
    
    // Theme toggle event
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Aplicar inmediatamente el tema al navbar
    const navbar = document.getElementById('navbar');
    updateNavbarTheme(navbar);
    
    // Add animation effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateNavbarTheme(navbar) {
    if (currentTheme === 'dark') {
        navbar.style.backgroundColor = 'var(--bg-dark)';
        navbar.style.opacity = '0.95';
        navbar.style.borderBottomColor = 'var(--border-medium)';
    } else {
        navbar.style.backgroundColor = 'var(--bg-primary)';
        navbar.style.opacity = '0.95';
        navbar.style.borderBottomColor = 'var(--border-light)';
    }
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ========== NAVIGATION ==========
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });
    
    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            isMenuOpen = false;
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        updateNavbarOnScroll(navbar);
    });
    
    // Initialize navbar theme
    updateNavbarTheme(navbar);
    
    // Update active navigation link
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateNavbarOnScroll(navbar) {
    const scrolled = window.scrollY > 100;
    const baseColor = currentTheme === 'light' 
        ? 'rgba(255, 255, 255, ' 
        : 'rgba(17, 24, 39, ';
    
    navbar.style.backgroundColor = baseColor + (scrolled ? '0.98)' : '0.95)');
    navbar.style.backdropFilter = scrolled ? 'blur(15px)' : 'blur(10px)';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// ========== TYPED TEXT EFFECT ==========
function initTypedText() {
    typedTextElement = document.querySelector('.typed-text');
    const roles = [
        'Desarrollador Web y Mobile',
        'Tech Lead',
        'Analista Funcional',
        'Especialista en Angular',
        'Experto en Laravel'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next role
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    // Add cursor effect
    typedTextElement.style.borderRight = '3px solid';
    typedTextElement.style.paddingRight = '5px';
    
    // Start typing animation
    setTimeout(typeRole, 1000);
    
    // Blinking cursor
    setInterval(() => {
        typedTextElement.style.borderColor = 
            typedTextElement.style.borderColor === 'transparent' ? '' : 'transparent';
    }, 500);
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.section-header, .about-content > *, .skill-category, .timeline-item, .project-card, .education-card, .contact-card'
    );
    
    // Add animation classes
    animateElements.forEach((element, index) => {
        if (index % 3 === 0) {
            element.classList.add('animate-fade-up');
        } else if (index % 3 === 1) {
            element.classList.add('animate-fade-left');
        } else {
            element.classList.add('animate-fade-right');
        }
    });
    
    // Intersection Observer for animations with iOS fallback
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skill bars animation if it's a skills section
                    if (entry.target.closest('#skills')) {
                        animateSkillBars();
                    }
                    
                    // Trigger counter animation if it's about section
                    if (entry.target.closest('#about')) {
                        // Add delay for iOS
                        setTimeout(animateCounters, 300);
                    }
                }
            });
        }, observerOptions);
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        animateElements.forEach(element => {
            element.classList.add('visible');
        });
        // Trigger animations immediately
        setTimeout(animateSkillBars, 1000);
        setTimeout(animateCounters, 1500);
    }
}

// ========== SKILL BARS ==========
function initSkillBars() {
    // This will be triggered by intersection observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        
        // Animate with delay
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        // Just show the final value without animation
        counter.textContent = target + '+';
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission
        showFormFeedback('Enviando mensaje...', 'info');
        
        setTimeout(() => {
            showFormFeedback('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

function showFormFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    
    // Style feedback
    feedback.style.cssText = `
        padding: 15px;
        margin-top: 20px;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        animation: slideInUp 0.3s ease-out;
        ${type === 'success' ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' : ''}
        ${type === 'error' ? 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;' : ''}
        ${type === 'info' ? 'background-color: #dbeafe; color: #1e40af; border: 1px solid #93c5fd;' : ''}
    `;
    
    // Add to form
    document.getElementById('contact-form').appendChild(feedback);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.style.animation = 'slideOutDown 0.3s ease-out';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) {
        console.warn('Back to top button not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SMOOTH SCROLLING ==========
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator in hero section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero section parallax
        const heroSection = document.querySelector('.home-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Project images parallax removed to prevent unwanted movement
    });
}

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========== PROJECT INTERACTIONS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill category hover effects
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
        });
    });
});

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && isMenuOpen) {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Ctrl/Cmd + D for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// ========== PERFORMANCE OPTIMIZATIONS ==========

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

const optimizedNavbarScrollHandler = throttle(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(17, 24, 39, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.backgroundColor = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(17, 24, 39, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}, 50);

// Replace existing scroll handlers with optimized versions
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedNavbarScrollHandler);

// ========== LAZY LOADING FOR IMAGES ==========
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.transition = 'opacity 0.3s ease-in-out';
                img.style.opacity = '0';
                
                const newImg = new Image();
                newImg.onload = function() {
                    img.src = this.src;
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ========== ACCESSIBILITY IMPROVEMENTS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Add skip links for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.2s ease-in-out;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
        main.setAttribute('tabindex', '-1');
    }
    
    // Enhance form accessibility
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Add required indicator to labels
        if (input.hasAttribute('required')) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label && !label.querySelector('.required')) {
                const required = document.createElement('span');
                required.className = 'required';
                required.textContent = ' *';
                required.style.color = 'var(--accent-color)';
                label.appendChild(required);
            }
        }
    });
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error?.message || e.message);
    
    // Optional: Show user-friendly error message only for critical errors
    if (e.error?.message?.includes('Cannot read properties')) {
        console.warn('Non-critical element not found, continuing...');
    }
});

// ========== ANALYTICS INTEGRATION (Optional) ==========
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
    
    // Example for Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: category,
    //         event_label: label
    //     });
    // }
}

// Track portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Navigation', 'click', this.textContent);
        });
    });
    
    // Track project clicks
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Project', 'click', this.closest('.project-card').querySelector('.project-title').textContent);
        });
    });
    
    // Track CV download
    document.querySelectorAll('a[href*="cv"], a[href*="CV"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('CV', 'download', 'PDF');
        });
    });
    
    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Social', 'click', this.getAttribute('href'));
        });
    });
    
    // Track contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('Contact', 'form_submit', 'contact_form');
        });
    }
});

// ========== SERVICE WORKER REGISTRATION (Optional) ==========
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.warn('ServiceWorker registration failed:', err.message);
            });
    });
} else if (window.location.protocol === 'file:') {
    console.info('Service Worker disabled for file:// protocol');
}

console.log('🚀 Portfolio loaded successfully! Welcome to Miguel Ángel Carrera Cebrián\'s portfolio.');