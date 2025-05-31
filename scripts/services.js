// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Performance monitoring
    const startTime = performance.now();
    
    // Constants
    const ANIMATION_DURATION = 150;
    const SCROLL_THROTTLE = 100;
    const MAX_NOTIFICATIONS = 3;
    
    // Get modal elements
    const modal = document.getElementById('bookingModal');
    const bookButton = document.getElementById('bookButton');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Track active notifications
    let activeNotifications = 0;
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Book button click event with error handling
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            try {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } catch (error) {
                console.error('Error opening modal:', error);
                showNotification('Unable to open booking form. Please try again.', 'error');
            }
        });
    }
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            try {
                closeModal();
            } catch (error) {
                console.error('Error closing modal:', error);
                // Force close modal
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        try {
            if (event.target === modal) {
                closeModal();
            }
        } catch (error) {
            console.error('Error handling modal click:', error);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        try {
            if (event.key === 'Escape' && modal && modal.style.display === 'block') {
                closeModal();
            }
        } catch (error) {
            console.error('Error handling keydown:', error);
        }
    });
    
    // Function to close modal
    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Add click effect to service cards with error handling
    serviceCards.forEach(card => {
        try {
            // Add click effect
            card.addEventListener('click', function(event) {
                try {
                    // Prevent click spam
                    if (this.classList.contains('clicked')) return;
                    
                    // Add clicked class for animation
                    this.classList.add('clicked');
                    
                    // Remove the class after animation
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, ANIMATION_DURATION);
                    
                    // Get service name safely
                    const titleElement = this.querySelector('.service-title');
                    const serviceName = titleElement ? titleElement.textContent : 'Unknown Service';
                    console.log(`Clicked on service: ${serviceName}`);
                } catch (error) {
                    console.error('Error handling service card click:', error);
                }
            });
            
            // Add mouse effects
            card.addEventListener('mouseenter', function() {
                try {
                    this.style.borderLeft = '5px solid #9CAF88';
                } catch (error) {
                    console.error('Error handling mouseenter:', error);
                }
            });
            
            card.addEventListener('mouseleave', function() {
                try {
                    this.style.borderLeft = 'none';
                } catch (error) {
                    console.error('Error handling mouseleave:', error);
                }
            });
        } catch (error) {
            console.error('Error setting up service card:', error);
        }
    });
    
    // Smooth scroll animation observer for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    let observer;
    try {
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all service cards
        serviceCards.forEach(card => {
            observer.observe(card);
        });
    } catch (error) {
        console.error('Error setting up intersection observer:', error);
    }
    
    // Add loading animation with error handling
    function addLoadingAnimation() {
        try {
            const cards = document.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } catch (error) {
            console.error('Error adding loading animation:', error);
            // Fallback: Show cards immediately
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '1';
            });
        }
    }
    
    // Initialize loading animation
    addLoadingAnimation();
    
    // Add floating animation to icons with error handling
    function addFloatingAnimation() {
        try {
            const icons = document.querySelectorAll('.service-icon');
            icons.forEach((icon, index) => {
                icon.style.animation = `float 3s ease-in-out infinite ${index * 0.2}s`;
            });
        } catch (error) {
            console.error('Error adding floating animation:', error);
        }
    }
    
    // CSS for animations (added dynamically)
    try {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .animate-in {
                animation: slideInFromLeft 0.6s ease-out;
            }
            
            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error('Error adding animation styles:', error);
    }
    
    // Initialize floating animation
    addFloatingAnimation();
    
    // Simple parallax effect for background with throttling
    const handleScroll = throttle(function() {
        try {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            document.body.style.backgroundPosition = `center ${rate}px`;
        } catch (error) {
            console.error('Error updating parallax:', error);
        }
    }, SCROLL_THROTTLE);
    
    window.addEventListener('scroll', handleScroll);
    
    // Email validation utility
    function validateEmail(email) {
        try {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        } catch (error) {
            console.error('Error validating email:', error);
            return false;
        }
    }
    
    // Utility function to show notifications with rate limiting
    function showNotification(message, type = 'info') {
        try {
            // Rate limit notifications
            if (activeNotifications >= MAX_NOTIFICATIONS) return;
            
            activeNotifications++;
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            // Sanitize message for XSS prevention
            message = message.replace(/[<>]/g, '');
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
                color: white;
                border-radius: 5px;
                z-index: 1001;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Force reflow
            void notification.offsetHeight;
            
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                    activeNotifications--;
                }, 300);
            }, 3000);
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }
    
    // Add navigation link active state functionality
    try {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'Services.html' && linkPage === 'Services.html')) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error setting active navigation:', error);
    }
    
    // Performance logging
    const endTime = performance.now();
    console.log(`Services page initialization took ${endTime - startTime}ms`);
    
    // Cleanup on page unload
    window.addEventListener('unload', () => {
        try {
            // Remove scroll listener
            window.removeEventListener('scroll', handleScroll);
            
            // Disconnect observer
            if (observer) {
                observer.disconnect();
            }
            
            // Remove any remaining notifications
            document.querySelectorAll('.notification').forEach(notification => {
                document.body.removeChild(notification);
            });
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    });
});