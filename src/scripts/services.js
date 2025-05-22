// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get modal elements
    const modal = document.getElementById('bookingModal');
    const bookButton = document.getElementById('bookButton');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Book button click event
    bookButton.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modal when clicking the X
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Add click effect to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add clicked class for animation
            this.classList.add('clicked');
            
            // Remove the class after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
            
            // Optional: You can add functionality here to show more details
            // or navigate to a specific service page
            const serviceName = this.querySelector('.service-title').textContent;
            console.log(`Clicked on service: ${serviceName}`);
        });
        
        // Add mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '5px solid #e74c3c';
        });
        
        // Add mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
    
    // Smooth scroll animation observer for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
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
    
    // Header animation on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.page-header'); // Updated selector
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.transform = 'translateY(-10px)';
            header.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading animation
    function addLoadingAnimation() {
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
    }
    
    // Initialize loading animation
    addLoadingAnimation();
    
    // Add floating animation to icons
    function addFloatingAnimation() {
        const icons = document.querySelectorAll('.service-icon');
        icons.forEach((icon, index) => {
            icon.style.animation = `float 3s ease-in-out infinite ${index * 0.2}s`;
        });
    }
    
    // CSS for floating animation (added dynamically)
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
    
    // Initialize floating animation
    addFloatingAnimation();
    
    // Simple parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        document.body.style.backgroundPosition = `center ${rate}px`;
    });
    
    // Contact form validation (if you add a contact form later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Utility function to show notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
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
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
    
    // Add navigation link active state functionality
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
    
    // Add smooth navigation transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
});