// Layout Utilities for RadMentor
// This script provides functions to maintain consistent layout across all pages

class LayoutManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('index.html')) return 'home';
        if (path.includes('admin')) return 'admin';
        if (path.includes('anatomy')) return 'anatomy';
        if (path.includes('frcr')) return 'frcr';
        return 'other';
    }

    init() {
        this.ensureConsistentLayout();
        this.setPageTitle();
        this.setupNavigation();
        this.setupAuthState();
        this.preventLayoutShifts();
    }

    ensureConsistentLayout() {
        // Ensure body has consistent structure
        document.body.style.minHeight = '100vh';
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        
        // Ensure header has consistent height
        const header = document.querySelector('header');
        if (header) {
            header.style.height = '80px';
            header.style.minHeight = '80px';
        }
        
        // Ensure main content area takes remaining space
        const main = document.querySelector('main');
        if (main) {
            main.style.flex = '1';
            main.style.paddingTop = '80px';
            main.style.minHeight = 'calc(100vh - 80px - 200px)';
        }
        
        // Ensure footer has consistent height
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.minHeight = '200px';
            footer.style.marginTop = 'auto';
        }
    }

    preventLayoutShifts() {
        // Prevent content width shifts
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.maxWidth = '1200px';
            container.style.width = '100%';
            container.style.margin = '0 auto';
            container.style.paddingLeft = '1.5rem';
            container.style.paddingRight = '1.5rem';
        });

        // Ensure page content container has consistent dimensions
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
            pageContent.style.minHeight = 'calc(100vh - 280px)';
            pageContent.style.width = '100%';
        }
    }

    setPageTitle() {
        const titles = {
            'home': 'RadMentor - Comprehensive Radiology Learning Source',
            'admin': 'RadMentor - Admin Dashboard',
            'anatomy': 'RadMentor - Anatomy Modules',
            'frcr': 'RadMentor - FRCR Exam Preparation',
            'other': 'RadMentor - Radiology Learning Platform'
        };
        
        const title = titles[this.currentPage] || titles.other;
        document.title = title;
        
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    setupNavigation() {
        // Highlight current page in navigation
        const navLinks = document.querySelectorAll('#main-nav a, #mobile-menu a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').includes(this.currentPage)) {
                link.classList.add('text-blue-600', 'font-semibold');
            }
        });
    }

    setupAuthState() {
        // This will be handled by the main app.js
        // We just ensure the auth state is properly managed
        if (typeof setupAuthState === 'function') {
            setupAuthState();
        }
    }

    // Method to inject content into the layout while maintaining consistency
    injectContent(content) {
        const contentContainer = document.getElementById('page-content');
        if (contentContainer) {
            // Store current scroll position
            const scrollPosition = window.pageYOffset;
            
            // Inject new content
            contentContainer.innerHTML = content;
            
            // Maintain layout consistency
            this.ensureConsistentLayout();
            this.preventLayoutShifts();
            
            // Restore scroll position if needed
            if (scrollPosition > 0) {
                window.scrollTo(0, scrollPosition);
            }
        }
    }

    // Method to show/hide sections based on auth state
    updateAuthUI(isLoggedIn, user = null) {
        const loggedOutElements = document.querySelectorAll('#header-logged-out, #mobile-logged-out');
        const loggedInElements = document.querySelectorAll('#header-logged-in, #mobile-logged-in');
        const userGreeting = document.getElementById('user-greeting-header');

        if (isLoggedIn) {
            loggedOutElements.forEach(el => el.classList.add('hidden'));
            loggedInElements.forEach(el => el.classList.remove('hidden'));
            
            if (user && userGreeting) {
                const displayName = user.displayName || user.email.split('@')[0];
                userGreeting.textContent = displayName;
            }
        } else {
            loggedOutElements.forEach(el => el.classList.remove('hidden'));
            loggedInElements.forEach(el => el.classList.add('hidden'));
        }
    }

    // Method to handle smooth page transitions
    transitionToPage(pageContent, callback) {
        const contentContainer = document.getElementById('page-content');
        if (contentContainer) {
            // Add fade out effect
            contentContainer.style.opacity = '0';
            contentContainer.style.transition = 'opacity 0.2s ease-in-out';
            
            setTimeout(() => {
                // Inject new content
                this.injectContent(pageContent);
                
                // Execute callback if provided
                if (callback) callback();
                
                // Fade in new content
                contentContainer.style.opacity = '1';
            }, 200);
        }
    }
}

// Initialize layout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.layoutManager = new LayoutManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayoutManager;
}