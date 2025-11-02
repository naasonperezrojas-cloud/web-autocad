// ===========================
// VARIABLES GLOBALES
// ===========================
const courseStartDate = new Date('2025-11-29T09:00:00');
let totalSeats = 25;
let availableSeats = 15;

// ===========================
// NAVBAR FUNCTIONALITY
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// COUNTDOWN TIMER
// ===========================
function updateCountdown() {
    const now = new Date().getTime();
    const distance = courseStartDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p style="color: var(--light-blue); font-size: 1.5rem; font-weight: 600;">¡El curso ha comenzado!</p>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ===========================
// TABS FUNCTIONALITY
// ===========================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===========================
// ACCORDION FUNCTIONALITY
// ===========================
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-content');
        
        // Toggle active class
        header.classList.toggle('active');
        accordionContent.classList.toggle('active');
        
        // Close other accordions in the same module (optional)
        const allAccordions = header.closest('.accordion').querySelectorAll('.accordion-item');
        allAccordions.forEach(item => {
            if (item !== accordionItem) {
                item.querySelector('.accordion-header').classList.remove('active');
                item.querySelector('.accordion-content').classList.remove('active');
            }
        });
    });
});

// ===========================
// FAQ FUNCTIONALITY
// ===========================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        
        // Toggle active class
        question.classList.toggle('active');
        faqAnswer.classList.toggle('active');
    });
});

// ===========================
// TESTIMONIALS SLIDER
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentSlide = 0;

// Show single testimonial on mobile
function showSingleTestimonial() {
    if (window.innerWidth <= 768 && testimonialCards.length > 0) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === currentSlide ? 'block' : 'none';
        });
    } else {
        testimonialCards.forEach(card => card.style.display = 'block');
    }
}

// Auto-rotate testimonials on mobile
function autoRotateTestimonials() {
    if (window.innerWidth <= 768 && testimonialCards.length > 0) {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSingleTestimonial();
    }
}

// Initialize
if (testimonialCards.length > 0) {
    showSingleTestimonial();
    setInterval(autoRotateTestimonials, 5000);
    
    window.addEventListener('resize', showSingleTestimonial);
}

// ===========================
// SEATS AVAILABILITY
// ===========================
function updateSeatsDisplay() {
    const seatsLeftElements = document.querySelectorAll('#seatsLeft, #seatsLeftFooter');
    const progressFill = document.getElementById('progressFill');
    
    seatsLeftElements.forEach(element => {
        element.textContent = availableSeats;
    });
    
    const percentage = ((totalSeats - availableSeats) / totalSeats) * 100;
    progressFill.style.width = percentage + '%';
}

// Simulate seats booking (decrease available seats over time)
function simulateBooking() {
    setInterval(() => {
        if (availableSeats > 5 && Math.random() > 0.7) {
            availableSeats--;
            updateSeatsDisplay();
        }
    }, 120000); // Every 2 minutes
}

updateSeatsDisplay();
simulateBooking();

// ===========================
// SCROLL TO TOP BUTTON
// ===========================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// PROMO MODAL
// ===========================
const promoModal = document.getElementById('promoModal');
const modalClose = document.getElementById('modalClose');

// Show modal after 30 seconds
setTimeout(() => {
    promoModal.classList.add('show');
}, 30000);

// Close modal when clicking X
modalClose.addEventListener('click', () => {
    promoModal.classList.remove('show');
});

// Close modal when clicking outside
promoModal.addEventListener('click', (e) => {
    if (e.target === promoModal) {
        promoModal.classList.remove('show');
    }
});

// Don't show modal again if user closes it
let modalShown = false;
modalClose.addEventListener('click', () => {
    modalShown = true;
});

// Show modal only once per session
if (sessionStorage.getItem('modalShown')) {
    promoModal.classList.remove('show');
} else {
    setTimeout(() => {
        if (!modalShown) {
            promoModal.classList.add('show');
            sessionStorage.setItem('modalShown', 'true');
        }
    }, 30000);
}

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hrefs
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// INTERSECTION OBSERVER (ANIMATIONS)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.benefit-card, .audience-card, .method-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    observer.observe(element);
});

// ===========================
// WHATSAPP BUTTON ANALYTICS
// ===========================
const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Track WhatsApp clicks (you can integrate with Google Analytics here)
        console.log('WhatsApp button clicked');
        
        // Optional: Add event to dataLayer for Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'whatsapp_click',
                'button_location': button.className
            });
        }
    });
});

// ===========================
// LAZY LOADING IMAGES
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// FORM VALIDATION (if you add a form later)
// ===========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(phone);
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listeners
const optimizedScrollHandler = debounce(() => {
    // Your scroll logic here
}, 100);

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c¡Bienvenido al Curso de Recursos Hídricos! 💧', 'color: #3282b8; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado por IntISMART', 'color: #0f4c75; font-size: 14px;');
console.log('%c¿Interesado en desarrollo web? Contáctanos: contacto@intismart.com', 'color: #1a1a2e; font-size: 12px;');

// ===========================
// PAGE LOAD COMPLETE
// ===========================
window.addEventListener('load', () => {
    console.log('✅ Página cargada completamente');
    
    // Hide loading spinner if you have one
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ===========================
// ERROR HANDLING
// ===========================
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
});

// ===========================
// BROWSER COMPATIBILITY CHECK
// ===========================
function checkBrowserCompatibility() {
    const isIE = /MSIE|Trident/.test(navigator.userAgent);
    
    if (isIE) {
        alert('Para una mejor experiencia, te recomendamos usar un navegador moderno como Chrome, Firefox, Safari o Edge.');
    }
}

checkBrowserCompatibility();

// ===========================
// COOKIE CONSENT (Optional)
// ===========================
function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        // Show cookie consent banner
        // You can implement this later if needed
    }
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function formatCurrency(amount) {
    return `S/ ${amount.toFixed(2)}`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// ===========================
// ANALYTICS TRACKING (Google Analytics)
// ===========================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important interactions
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button', 'Click', 'CTA Button');
    });
});

// ===========================
// SOCIAL SHARE FUNCTIONALITY
// ===========================
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Descubre este curso de Modelamiento de Recursos Hídricos!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

// ===========================
// PRINT PAGE FUNCTIONALITY
// ===========================
function printPage() {
    window.print();
}

// ===========================
// TOGGLE DARK MODE (Optional)
// ===========================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===========================
// PREVENT CONTEXT MENU (Optional - for protection)
// ===========================
// Uncomment if you want to prevent right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ===========================
// KEYBOARD SHORTCUTS
// ===========================
document.addEventListener('keydown', (e) => {
    // Press 'Esc' to close modal
    if (e.key === 'Escape') {
        promoModal.classList.remove('show');
    }
    
    // Press 'Ctrl + K' to open WhatsApp
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        window.open('https://wa.me/51972201556', '_blank');
    }
});

// ===========================
// UPDATE YEAR IN FOOTER
// ===========================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// ===========================
// PRELOAD CRITICAL IMAGES
// ===========================
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=1600&h=900&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// ===========================
// SERVICE WORKER (for PWA - optional)
// ===========================
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registrado', reg))
    //     .catch(err => console.log('Error al registrar Service Worker', err));
}

// ===========================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ===========================
window.landingPageFunctions = {
    updateSeatsDisplay,
    formatCurrency,
    formatDate,
    shareOnFacebook,
    shareOnTwitter,
    shareOnLinkedIn,
    copyToClipboard,
    toggleDarkMode
};

// ===========================
// INITIALIZATION COMPLETE
// ===========================
console.log('✅ Landing page inicializada correctamente');
