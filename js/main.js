// Portfolio Website JavaScript
// Enhanced with smooth animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initProjectCardAnimations();
    initScrollAnimations();
    initActiveNavigation();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add hover animations to project cards
 */
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease-in';
        });
    });
}

/**
 * Animate elements on scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for project cards
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('.project-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

/**
 * Add parallax effect to hero section (optional enhancement)
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

/**
 * Lazy load images when they come into viewport
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Add typing effect to hero title (optional)
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

/**
 * Handle form submissions (if contact form is added)
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        form.appendChild(successMessage);
        
        // Reset form
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

/**
 * Add CSS class for active navigation items
 */
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        position: relative;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .success-message {
        background-color: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/**
 * Add loading state for external links
 */
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.6';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
}

// Initialize external links if present
initExternalLinks();
