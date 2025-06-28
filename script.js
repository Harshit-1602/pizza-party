// Pizza Pie Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initInteractiveElements();
    initLoadingAnimations();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.classList.remove('btn-outline-warning');
            themeToggle.classList.add('btn-warning');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.classList.remove('btn-warning');
            themeToggle.classList.add('btn-outline-warning');
        }
        
        // Update navbar background for dark theme
        const navbar = document.querySelector('.custom-navbar');
        if (theme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('feature-card')) {
                    animateCounter(entry.target);
                }
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumbers(entry.target);
                }
                if (entry.target.classList.contains('menu-card')) {
                    animateMenuCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .menu-card, .service-card, .about-content, .contact-content, .stat-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter animation for stats
function animateStatNumbers(element) {
    const numberElement = element.querySelector('h3');
    if (!numberElement) return;
    
    const finalNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
    const suffix = numberElement.textContent.replace(/[0-9]/g, '');
    let currentNumber = 0;
    const increment = finalNumber / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, 30);
}

// Menu card animation
function animateMenuCard(card) {
    const image = card.querySelector('.menu-image img');
    const content = card.querySelector('.menu-content');
    
    setTimeout(() => {
        if (image) image.style.transform = 'scale(1)';
        if (content) content.style.opacity = '1';
    }, 200);
}

// Feature card animation
function animateCounter(card) {
    card.style.transform = 'translateY(0)';
    card.style.opacity = '1';
}

// Form handling
function initFormHandling() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
}

function handleContactForm(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalIcon = submitBtn.innerHTML;
    
    if (!emailInput.value) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        emailInput.value = '';
        
        // Reset button
        submitBtn.innerHTML = originalIcon;
        submitBtn.disabled = false;
    }, 1500);
}

// Interactive elements
function initInteractiveElements() {
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.menu-card .btn-outline-warning');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            handleAddToCart(this);
        });
    });
    
    // Menu overlay buttons
    const menuOverlayBtns = document.querySelectorAll('.menu-overlay .btn');
    menuOverlayBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showQuickView(this);
        });
    });
    
    // Floating card hover effect
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

function handleAddToCart(button) {
    const menuCard = button.closest('.menu-card');
    const pizzaName = menuCard.querySelector('h5').textContent;
    const originalText = button.innerHTML;
    
    // Animation
    button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
    button.classList.remove('btn-outline-warning');
    button.classList.add('btn-success');
    
    // Show notification
    showNotification(`${pizzaName} added to cart!`, 'success');
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-warning');
    }, 2000);
}

function showQuickView(button) {
    const menuCard = button.closest('.menu-card');
    const pizzaName = menuCard.querySelector('h5').textContent;
    
    // Create modal-like notification
    showNotification(`Quick view for ${pizzaName} - Feature coming soon!`, 'info');
}

// Loading animations
function initLoadingAnimations() {
    // Stagger animation for cards
    const cards = document.querySelectorAll('.feature-card, .menu-card, .service-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Hero image animation
    const heroImage = document.querySelector('.hero-image-container');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'all 0.8s ease-out';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${getBootstrapAlertClass(type)} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        border: none;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getBootstrapAlertClass(type) {
    const classes = {
        'success': 'success',
        'error': 'danger',
        'warning': 'warning',
        'info': 'info'
    };
    return classes[type] || 'info';
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

// Utility functions
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

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any open modals or notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.custom-notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Add focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('button, a, input, textarea, select')) {
        e.target.style.outline = '2px solid var(--primary-color)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('button, a, input, textarea, select')) {
        e.target.style.outline = 'none';
    }
});

// Console welcome message
console.log(`
🍕 Welcome to Pizza Pie Website!
🚀 Built with HTML, CSS, JavaScript & Bootstrap
✨ Features: Responsive design, Dark/Light theme, Smooth animations
📱 Mobile-friendly and accessible
`);

// Export functions for potential external use
window.PizzaPieWebsite = {
    showNotification,
    setTheme: function(theme) {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    },
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

