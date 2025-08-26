document.addEventListener('DOMContentLoaded', function() {
    // Search overlay functionality
    const searchInput = document.getElementById('searchInput');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchContainer = document.querySelector('.search-container');
    const quickLinksDropdown = document.querySelector('.quick-links-dropdown');
    
    if (searchInput && searchOverlay && searchContainer && quickLinksDropdown) {
        function adjustSearchPosition() {
            if (searchInput.matches(':focus')) {
                const viewportHeight = window.innerHeight;
                const dropdownHeight = quickLinksDropdown.offsetHeight;
                const searchRect = searchContainer.getBoundingClientRect();
                const spaceNeeded = searchRect.bottom + dropdownHeight + 20; // 20px buffer
                
                // Only move up if the dropdown would be cut off
                if (spaceNeeded > viewportHeight) {
                    const moveUp = spaceNeeded - viewportHeight;
                    searchContainer.style.transform = `translateY(-${moveUp}px)`;
                    searchContainer.style.marginBottom = `-${moveUp}px`;
                    return;
                }
            }
            // Reset if not needed
            searchContainer.style.transform = '';
            searchContainer.style.marginBottom = '';
        }

        // Show overlay when search input is focused
        searchInput.addEventListener('focus', function() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Small delay to ensure dropdown is rendered
            setTimeout(adjustSearchPosition, 10);
        });
        
        // Hide overlay when clicking outside search area
        searchOverlay.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            searchInput.blur();
            document.body.style.overflow = '';
            searchContainer.style.transform = '';
            searchContainer.style.marginBottom = '';
        });
        
        // Handle window resize
        window.addEventListener('resize', adjustSearchPosition);
        
        // Close when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                searchInput.blur();
                document.body.style.overflow = '';
                searchContainer.style.transform = '';
                searchContainer.style.marginBottom = '';
            }
        });
    }
    
    // Dropdown functionality
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Toggle dropdown on click
    if (dropdown) {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }
    
    // Scroll to top/bottom button
    const scrollBtn = document.getElementById('scrollBtn');
    const scrollArrow = document.getElementById('scrollArrow');
    const scrollThreshold = 300; // Pixels to scroll before showing the button
    let isAtBottom = false;

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
        
        // Check if we're at the bottom of the page
        isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
        
        // Toggle button visibility
        if (scrollPosition > scrollThreshold || isAtBottom) {
            scrollBtn.classList.add('visible');
            
            // Flip arrow based on scroll position
            if (isAtBottom) {
                scrollBtn.classList.add('flip');
                scrollArrow.alt = 'Scroll to top';
            } else {
                scrollBtn.classList.remove('flip');
                scrollArrow.alt = 'Scroll to bottom';
            }
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top or bottom when button is clicked
    scrollBtn.addEventListener('click', function() {
        if (isAtBottom) {
            // If at bottom, scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // If not at bottom, scroll to bottom
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
});
