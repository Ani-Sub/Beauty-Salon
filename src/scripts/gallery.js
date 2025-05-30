/**
 * R&R Beauty Salon Gallery
 * JavaScript file for gallery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all category buttons and gallery items
    const categoryBtns = document.querySelectorAll('.category-btn');
    const items = document.querySelectorAll('.gallery-item');
    
    // Add navigation link active state functionality
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    // Handle navigation links
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'Gallery.html' && linkPage === 'Gallery.html')) {
            link.classList.add('active');
        }
    });

    // Handle footer links separately
    footerLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'Gallery.html' && linkPage === 'Gallery.html')) {
            const h4 = link.querySelector('h4');
            if (h4) {
                h4.style.color = '#F5F6F0';
            }
        }
    });
    
    // Animation timing constants
    const STAGGER_DELAY = 100; // Reduced for quicker overall appearance
    const TRANSITION_DURATION = 500;
    
    /**
     * Shows a gallery item with animation
     * @param {Element} item - The gallery item to show
     * @param {number} delay - Delay before showing
     */
    function showItem(item, delay) {
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
    }
    
    /**
     * Sets up animations for a gallery item
     * @param {Element} item - The gallery item to enhance
     */
    function setupItemAnimations(item) {
        const overlay = item.querySelector('.overlay');
        const content = item.querySelector('.overlay-content');
        const title = content?.querySelector('h3');
        const description = content?.querySelector('p');
        
        if (!overlay || !content) return;
        
        // Remove any existing listeners
        const newOverlay = overlay.cloneNode(true);
        const newContent = newOverlay.querySelector('.overlay-content');
        overlay.parentNode.replaceChild(newOverlay, overlay);
        
        // Ensure smooth transitions when mouse leaves during animation
        item.addEventListener('mouseleave', () => {
            if (newContent) {
                const title = newContent.querySelector('h3');
                const description = newContent.querySelector('p');
                
                if (title) title.style.transition = 'transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)';
                if (description) {
                    description.style.transition = 'all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)';
                    description.style.transitionDelay = '0s';
                }
            }
        });
        
        // Reset animations on mouse enter
        item.addEventListener('mouseenter', () => {
            if (newContent) {
                const title = newContent.querySelector('h3');
                const description = newContent.querySelector('p');
                
                if (title) title.style.transition = 'transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)';
                if (description) {
                    description.style.transition = 'all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)';
                    description.style.transitionDelay = '0.1s';
                }
            }
        });
    }
    
    /**
     * Hides a gallery item with animation
     * @param {Element} item - The gallery item to hide
     */
    function hideItem(item) {
        item.classList.remove('visible');
        
        // Reset overlay and content states
        const overlay = item.querySelector('.overlay');
        const content = item.querySelector('.overlay-content');
        
        if (overlay && content) {
            overlay.style.transform = 'translateY(101%)';
            content.style.opacity = '0';
        }
        
        setTimeout(() => {
            if (!item.classList.contains('visible')) {
                item.style.display = 'none';
            }
        }, TRANSITION_DURATION);
    }
    
    /**
     * Filters gallery items based on selected category
     * @param {string} category - The category to filter by
     */
    function filterGallery(category) {
        let delay = 0;
        
        // Hide all items first
        items.forEach(item => {
            if (!(category === 'all' || item.classList.contains(category))) {
                hideItem(item);
            }
        });
        
        // Show matching items with delay
        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                showItem(item, delay);
                delay += STAGGER_DELAY;
            }
        });
    }
    
    // Add click event listener to each category button
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button state
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get and apply category filter
            const category = this.getAttribute('data-category');
            if (category) {
                filterGallery(category);
            }
        });
    });
    
    // Initialize gallery with 'all' category
    filterGallery('all');
});