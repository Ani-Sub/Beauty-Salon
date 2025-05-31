/**
 * R&R Beauty Salon Gallery
 * JavaScript file for gallery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const items = document.querySelectorAll('.gallery-item');
    const navLinks = document.querySelectorAll('.nav-links a');
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    // Constants
    const STAGGER_DELAY = 100; // Reduced for quicker overall appearance
    const TRANSITION_DURATION = 500;
    const ANIMATION_TIMING = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
    const MAX_ANIMATION_DURATION = 2000; // Maximum animation duration
    
    // Error handling for images
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = '../pictures/placeholder.jpg'; // Fallback image
            console.warn('Failed to load image:', this.alt);
        };
        
        // Add loading attribute for better performance
        img.loading = 'lazy';
    });
    
    // Get current page for navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    /**
     * Sets active state for navigation links
     * @param {string} linkPage - The href value of the link
     * @returns {boolean} - Whether the link should be active
     */
    function shouldLinkBeActive(linkPage) {
        return linkPage === currentPage || 
               (currentPage === '' && linkPage === 'index.html') ||
               (currentPage === 'Gallery.html' && linkPage === 'Gallery.html');
    }
    
    // Handle navigation links
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (shouldLinkBeActive(linkPage)) {
            link.classList.add('active');
        }
    });

    // Handle footer links
    footerLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (shouldLinkBeActive(linkPage)) {
            const h4 = link.querySelector('h4');
            if (h4) h4.style.color = '#F5F6F0';
        }
    });
    
    // Animation frame tracking for performance
    let animationFrame = null;
    
    /**
     * Shows a gallery item with animation
     * @param {Element} item - The gallery item to show
     * @param {number} delay - Delay before showing
     */
    function showItem(item, delay) {
        // Cancel any existing animation frame
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        // Limit maximum delay
        delay = Math.min(delay, MAX_ANIMATION_DURATION);
        
        animationFrame = requestAnimationFrame(() => {
            try {
                // Reset any existing transitions
                item.style.transition = 'none';
                item.style.display = 'block';
                
                // Force reflow
                void item.offsetHeight;
                
                // Restore transitions and add visible class
                item.style.transition = '';
                
                setTimeout(() => {
                    item.classList.add('visible');
                    setupItemAnimations(item);
                }, delay);
            } catch (error) {
                console.error('Error showing gallery item:', error);
            }
        });
    }
    
    /**
     * Sets up animations for a gallery item
     * @param {Element} item - The gallery item to enhance
     */
    function setupItemAnimations(item) {
        try {
            const overlay = item.querySelector('.overlay');
            const content = item.querySelector('.overlay-content');
            
            if (!overlay || !content) return;
            
            // Remove any existing listeners by cloning
            const newOverlay = overlay.cloneNode(true);
            const newContent = newOverlay.querySelector('.overlay-content');
            overlay.parentNode.replaceChild(newOverlay, overlay);
            
            // Common transition setup
            function setupTransitions(title, description, isEntering) {
                if (title) {
                    title.style.transition = `transform 0.35s ${ANIMATION_TIMING}`;
                }
                if (description) {
                    description.style.transition = `all 0.35s ${ANIMATION_TIMING}`;
                    description.style.transitionDelay = isEntering ? '0.1s' : '0s';
                }
            }
            
            // Event handlers with error handling
            const mouseLeaveHandler = () => {
                try {
                    if (newContent) {
                        setupTransitions(
                            newContent.querySelector('h3'),
                            newContent.querySelector('p'),
                            false
                        );
                    }
                } catch (error) {
                    console.error('Error in mouse leave handler:', error);
                }
            };
            
            const mouseEnterHandler = () => {
                try {
                    if (newContent) {
                        setupTransitions(
                            newContent.querySelector('h3'),
                            newContent.querySelector('p'),
                            true
                        );
                    }
                } catch (error) {
                    console.error('Error in mouse enter handler:', error);
                }
            };
            
            // Add event listeners
            item.addEventListener('mouseleave', mouseLeaveHandler);
            item.addEventListener('mouseenter', mouseEnterHandler);
            
            // Cleanup function for removing event listeners
            item.cleanup = () => {
                item.removeEventListener('mouseleave', mouseLeaveHandler);
                item.removeEventListener('mouseenter', mouseEnterHandler);
            };
        } catch (error) {
            console.error('Error setting up item animations:', error);
        }
    }
    
    /**
     * Hides a gallery item with animation
     * @param {Element} item - The gallery item to hide
     */
    function hideItem(item) {
        try {
            item.classList.remove('visible');
            
            // Reset overlay and content states
            const overlay = item.querySelector('.overlay');
            const content = item.querySelector('.overlay-content');
            
            if (overlay && content) {
                overlay.style.transform = 'translateY(101%)';
                content.style.opacity = '0';
            }
            
            // Use requestAnimationFrame for smoother animation
            animationFrame = requestAnimationFrame(() => {
                setTimeout(() => {
                    if (!item.classList.contains('visible')) {
                        item.style.display = 'none';
                    }
                }, TRANSITION_DURATION);
            });
        } catch (error) {
            console.error('Error hiding gallery item:', error);
            // Fallback: hide item immediately
            item.style.display = 'none';
        }
    }
    
    /**
     * Filters gallery items based on selected category
     * @param {string} category - The category to filter by
     */
    function filterGallery(category) {
        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50);
            } else {
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400); // Match the CSS transition duration
            }
        });
    }
    
    // Category button click handler
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter gallery
            filterGallery(this.dataset.category);
        });
    });

    // Initialize with all items visible
    items.forEach(item => {
        item.style.display = 'block';
        item.classList.add('visible');
    });
    
    // Cleanup on page unload
    window.addEventListener('unload', () => {
        // Cancel any pending animations
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        // Remove event listeners
        items.forEach(item => {
            if (item.cleanup) {
                item.cleanup();
            }
        });
    });
});