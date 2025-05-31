// Sanitize function to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.textContent;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add navigation link active state functionality
    const currentPage = window.location.pathname.split('/').pop();
    const navigationLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navigationLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'Contact.html' && linkPage === 'Contact.html')) {
            link.classList.add('active');
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for contact info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click-to-copy functionality for email and phone
    const contactElements = document.querySelectorAll('.info-content a');
    contactElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
                const textToCopy = this.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Create and show a temporary tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = 'Copied!';
                    tooltip.style.position = 'fixed';
                    tooltip.style.backgroundColor = '#333';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '5px 10px';
                    tooltip.style.borderRadius = '3px';
                    tooltip.style.fontSize = '14px';
                    tooltip.style.zIndex = '1000';

                    // Position the tooltip near the clicked element
                    const rect = this.getBoundingClientRect();
                    tooltip.style.top = `${rect.top - 30}px`;
                    tooltip.style.left = `${rect.left}px`;

                    document.body.appendChild(tooltip);

                    // Remove the tooltip after 2 seconds
                    setTimeout(() => {
                        document.body.removeChild(tooltip);
                    }, 2000);
                });
            }
        });
    });

    // Lazy load the map iframe when it comes into view
    const mapObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                // Only load the map if it hasn't been loaded yet
                if (!iframe.src) {
                    iframe.src = iframe.getAttribute('data-src');
                }
                observer.unobserve(iframe);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe the map iframe
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        // Store the src in data-src and remove the src attribute
        mapIframe.setAttribute('data-src', mapIframe.src);
        mapIframe.removeAttribute('src');
        mapObserver.observe(mapIframe);
    }

    // Add window resize handler for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Debounce the resize event
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Add any responsive adjustments here if needed
            const container = document.querySelector('.contact-container');
            if (window.innerWidth <= 768) {
                // Mobile adjustments
                container.style.padding = '15px';
            } else {
                // Desktop adjustments
                container.style.padding = '20px';
            }
        }, 250);
    });

    // Add mobile menu toggle functionality
    const navContainer = document.querySelector('.nav-container');
    const mobileNavLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';

    // Insert the button after the h1 in the nav container
    navContainer.insertBefore(mobileMenuBtn, mobileNavLinks);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('show');
        mobileMenuBtn.innerHTML = mobileNavLinks.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Handle mobile menu display on resize
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            mobileNavLinks.classList.remove('show');
        } else {
            mobileMenuBtn.style.display = 'none';
            mobileNavLinks.classList.remove('show');
        }
    }

    // Initial check and event listener for resize
    handleMobileMenu();
    window.addEventListener('resize', handleMobileMenu);
});
