document.addEventListener('DOMContentLoaded', function() {
    // Only proceed if screen width is less than 1024px
    if (window.innerWidth >= 1024) return; // Exit if screen is 1024px or wider
    
    // Add loaded class to body
    document.body.classList.add('menu-loading');
    
    // Get references to elements
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert the menu toggle button before the nav
    header.insertBefore(menuToggle, nav);
    
    // Mark menu as loaded after a small delay to ensure styles are applied
    setTimeout(() => {
        document.body.classList.remove('menu-loading');
        document.body.classList.add('menu-loaded');
    }, 50);
    
    // Function to handle menu toggle
    function toggleMenu() {
        const isOpening = !nav.classList.contains('active');
        
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a regular nav link (not dropdown toggle)
    const navLinks = document.querySelectorAll('nav > ul > li:not(.dropdown) > a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Handle dropdown toggle for mobile
    const dropdownToggle = document.querySelector('.dropdown > a');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) { // Only for mobile/tablet
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.parentElement;
                const isActive = dropdown.classList.contains('active');
                
                if (isActive) {
                    dropdown.classList.remove('active');
                } else {
                    // Close any other open dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                    dropdown.classList.add('active');
                }
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(e.target) && !menuToggle.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Close dropdown when clicking on a dropdown item
    const dropdownItems = document.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 1024) { // Only for mobile/tablet
                const dropdown = this.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
                // Close the mobile menu after clicking a link
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
});
