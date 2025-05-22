/**
 * R&R Beauty Salon Gallery
 * JavaScript file for gallery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all category buttons
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  // Add click event listener to each button
  categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // Remove active class from all buttons
          categoryBtns.forEach(b => b.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get category to filter
          const category = this.getAttribute('data-category');
          
          // Get all gallery items
          const items = document.querySelectorAll('.gallery-item');
          
          // Filter gallery items
          items.forEach(item => {
              if (category === 'all' || item.classList.contains(category)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });
});