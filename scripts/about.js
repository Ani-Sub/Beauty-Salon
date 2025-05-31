document.addEventListener('DOMContentLoaded', function() {
    // Add navigation link active state functionality
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'About.html' && linkPage === 'About.html')) {
            link.classList.add('active');
        }
    });
});
