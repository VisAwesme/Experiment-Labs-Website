// Experiment Labs Corporation - ARG Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // ARG Elements - Hidden messages that appear randomly
    const argElements = document.querySelector('.arg-elements');
    const hiddenMessages = document.querySelectorAll('.hidden-message');
    
    // Show random ARG messages occasionally
    setInterval(() => {
        if (Math.random() < 0.01) { // 1% chance every interval
            showRandomARGMessage();
        }
    }, 30000); // Check every 30 seconds

    function showRandomARGMessage() {
        const randomMessage = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
        const message = randomMessage.getAttribute('data-message');
        
        // Create temporary notification
        showARGNotification(message);
    }

    function showARGNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'arg-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-red);
            color: white;
            padding: 1rem;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        // Create glitch effect
        document.body.style.animation = 'glitch 0.1s infinite';
        
        // Show secret message
        showARGNotification('ELRB-ECHO-STATUS-ACTIVE-SUBJECT-230-1-LOCATED');
        
        // Reset after 3 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        
        // Reset konami code
        konamiCode = [];
    }

    // Utility function for notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = 'var(--accent-green)';
                break;
            case 'error':
                notification.style.background = 'var(--accent-red)';
                break;
            default:
                notification.style.background = 'var(--accent-blue)';
        }
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .arg-notification {
            box-shadow: 0 10px 25px rgba(255, 51, 51, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.about-card, .research-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Reactor visual interaction
    const reactorCore = document.querySelector('.reactor-core');
    if (reactorCore) {
        reactorCore.addEventListener('mouseenter', () => {
            reactorCore.style.animationDuration = '1s';
        });
        
        reactorCore.addEventListener('mouseleave', () => {
            reactorCore.style.animationDuration = '3s';
        });
    }

    // Add some subtle particle effects to the hero section
    createParticles();

    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--accent-cyan);
                border-radius: 50%;
                opacity: 0.3;
                pointer-events: none;
                animation: float ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            hero.appendChild(particle);
        }

        // Add particle animation CSS
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100px) translateX(50px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    // Add some subtle glitch effects to the logo
    const logoSymbol = document.querySelector('.logo-symbol');
    if (logoSymbol) {
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every interval
                logoSymbol.style.textShadow = '2px 0 var(--accent-red), -2px 0 var(--accent-cyan)';
                setTimeout(() => {
                    logoSymbol.style.textShadow = '';
                }, 100);
            }
        }, 2000);
    }

    // Console easter egg
    console.log('%c🚨 WARNING 🚨', 'color: #ff3333; font-size: 20px; font-weight: bold;');
    console.log('%cThis is a restricted area. Unauthorized access attempts will be logged.', 'color: #cccccc; font-size: 14px;');
    console.log('%cELRB Security Protocol Active', 'color: #00ccff; font-size: 12px; font-family: monospace;');
    
    // Add some hidden text that can be found by inspecting
    const hiddenText = document.createElement('div');
    hiddenText.style.cssText = 'position: absolute; left: -9999px; top: -9999px; color: transparent;';
    hiddenText.textContent = 'SUBJECT-230-1-ECHO-STATUS-UNKNOWN-CONTAINMENT-BREACH-SUBLEVEL-5-DETECTED-PROJECT-DAWN-ACTIVATION-REQUIRED-ARCSTAR-POWER-LEVELS-ANOMALOUS';
    document.body.appendChild(hiddenText);
});

// Additional ARG functionality that can be triggered by specific actions
window.addEventListener('load', function() {
    // Check if user has been on the site before
    if (!localStorage.getItem('elrb_visitor')) {
        localStorage.setItem('elrb_visitor', 'true');
        localStorage.setItem('elrb_visit_count', '1');
    } else {
        const visitCount = parseInt(localStorage.getItem('elrb_visit_count')) + 1;
        localStorage.setItem('elrb_visit_count', visitCount);
        
        // Show different messages based on visit count
        if (visitCount === 3) {
            setTimeout(() => {
                showARGNotification('MULTIPLE-VISITS-DETECTED-SUBJECT-ANALYSIS-INITIATED');
            }, 5000);
        } else if (visitCount === 7) {
            setTimeout(() => {
                showARGNotification('ELRB-ECHO-PROTOCOL-ACTIVATED-SUBJECT-230-1-RESPONSE-REQUIRED');
            }, 8000);
        }
    }
    
    // Check for specific user agents that might trigger ARG elements
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('robots') || userAgent.includes('bot')) {
        showARGNotification('BOT-DETECTED-SECURITY-PROTOCOLS-ENGAGED');
    }
});

// Function to show ARG notifications (defined globally for external use)
function showARGNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'arg-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-red);
        color: white;
        padding: 1rem;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 10px 25px rgba(255, 51, 51, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}
