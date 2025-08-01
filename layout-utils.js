// Layout Utilities for RadMentor
// This script provides functions to maintain consistent layout across all pages

class LayoutManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
        this.setupNavigationHandling();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        // Handle hash-based routing
        if (hash) {
            if (hash.includes('dashboard')) return 'dashboard';
            if (hash.includes('admin')) return 'admin';
            if (hash.includes('anatomy')) return 'anatomy';
            if (hash.includes('frcr')) return 'frcr';
            if (hash.includes('courses')) return 'courses';
            if (hash.includes('features')) return 'features';
            if (hash.includes('about')) return 'about';
        }
        
        // Handle path-based routing
        if (path === '/' || path.endsWith('index.html')) return 'home';
        if (path.includes('admin')) return 'admin';
        if (path.includes('anatomy')) return 'anatomy';
        if (path.includes('frcr')) return 'frcr';
        return 'home';
    }

    init() {
        this.setPageTitle();
        this.setupNavigation();
        this.setupAuthState();
        this.setupConsistentLayout();
    }

    setupConsistentLayout() {
        // Ensure the main content area has consistent padding and structure
        const mainContent = document.querySelector('main') || document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.add('pt-20', 'min-h-screen'); // Account for fixed header
        }
        
        // Set consistent container width and padding
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.classList.add('mx-auto', 'px-6', 'max-w-7xl');
        });
    }

    setPageTitle() {
        const titles = {
            'home': 'RadMentor - Comprehensive Radiology Learning Source',
            'dashboard': 'RadMentor - Dashboard',
            'admin': 'RadMentor - Admin Dashboard',
            'anatomy': 'RadMentor - Anatomy Modules',
            'frcr': 'RadMentor - FRCR Exam Preparation',
            'courses': 'RadMentor - Courses',
            'features': 'RadMentor - Features',
            'about': 'RadMentor - About Us',
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
            // Remove any existing active states
            link.classList.remove('text-blue-600', 'font-semibold');
            
            // Check if this link corresponds to current page
            const href = link.getAttribute('href');
            if (href) {
                if (href.includes(this.currentPage) || 
                    (this.currentPage === 'home' && (href === 'index.html' || href === '/' || href === '#home'))) {
                    link.classList.add('text-blue-600', 'font-semibold');
                }
            }
        });
    }

    setupNavigationHandling() {
        // Handle navigation clicks to prevent page reloads
        const navLinks = document.querySelectorAll('#main-nav a, #mobile-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
                    e.preventDefault();
                    this.navigateToPage(href);
                }
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRouteChange();
        });
    }

    navigateToPage(href) {
        // Update URL without page reload
        if (href.startsWith('#')) {
            window.location.hash = href;
        } else {
            // Extract the path and hash
            const url = new URL(href, window.location.origin);
            const path = url.pathname;
            const hash = url.hash;
            
            if (path === '/' || path.endsWith('index.html')) {
                window.location.hash = hash || '#home';
            } else {
                // For external pages, allow normal navigation
                window.location.href = href;
            }
        }
        
        this.handleRouteChange();
    }

    handleRouteChange() {
        this.currentPage = this.getCurrentPage();
        this.setPageTitle();
        this.setupNavigation();
        this.loadPageContent();
    }

    loadPageContent() {
        // Load content based on current page
        const contentContainer = document.getElementById('page-content') || document.querySelector('main');
        if (!contentContainer) return;

        switch (this.currentPage) {
            case 'home':
                this.loadHomeContent(contentContainer);
                break;
            case 'dashboard':
                this.loadDashboardContent(contentContainer);
                break;
            case 'admin':
                this.loadAdminContent(contentContainer);
                break;
            case 'anatomy':
                this.loadAnatomyContent(contentContainer);
                break;
            case 'frcr':
                this.loadFrcrContent(contentContainer);
                break;
            case 'courses':
                this.loadCoursesContent(contentContainer);
                break;
            case 'features':
                this.loadFeaturesContent(contentContainer);
                break;
            case 'about':
                this.loadAboutContent(contentContainer);
                break;
            default:
                this.loadHomeContent(contentContainer);
        }
    }

    loadHomeContent(container) {
        // Load the main landing page content
        if (window.loadLandingPageContent) {
            window.loadLandingPageContent(container);
        }
    }

    loadDashboardContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Progress Overview</h3>
                        <p class="text-gray-600">Track your learning progress here.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Recent Activity</h3>
                        <p class="text-gray-600">View your recent learning activities.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Quick Actions</h3>
                        <p class="text-gray-600">Access frequently used features.</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadAdminContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold mb-4">User Management</h3>
                    <p class="text-gray-600">Manage user accounts and permissions.</p>
                </div>
            </div>
        `;
    }

    loadAnatomyContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">Anatomy Modules</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Cardiovascular</h3>
                        <p class="text-gray-600">Learn about cardiovascular anatomy.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Respiratory</h3>
                        <p class="text-gray-600">Explore respiratory system anatomy.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Neurological</h3>
                        <p class="text-gray-600">Study neurological anatomy.</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadFrcrContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">FRCR Exam Preparation</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Practice Tests</h3>
                        <p class="text-gray-600">Take practice FRCR exams.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Study Materials</h3>
                        <p class="text-gray-600">Access comprehensive study resources.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Progress Tracking</h3>
                        <p class="text-gray-600">Monitor your exam preparation progress.</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadCoursesContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">Our Courses</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Radiology Fundamentals</h3>
                        <p class="text-gray-600">Learn the basics of radiology.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Advanced Imaging</h3>
                        <p class="text-gray-600">Master advanced imaging techniques.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Clinical Cases</h3>
                        <p class="text-gray-600">Practice with real clinical cases.</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadFeaturesContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">Platform Features</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Interactive Learning</h3>
                        <p class="text-gray-600">Engage with interactive content.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Progress Tracking</h3>
                        <p class="text-gray-600">Monitor your learning progress.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-semibold mb-4">Expert Support</h3>
                        <p class="text-gray-600">Get help from radiology experts.</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadAboutContent(container) {
        container.innerHTML = `
            <div class="container mx-auto px-6 py-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">About RadMentor</h1>
                <div class="bg-white rounded-lg shadow-md p-6">
                    <p class="text-gray-600 mb-4">
                        RadMentor is a comprehensive radiology learning platform designed to help medical professionals 
                        master the art and science of radiology through interactive courses, practice tests, and expert guidance.
                    </p>
                    <p class="text-gray-600">
                        Our mission is to provide high-quality, accessible radiology education that empowers healthcare 
                        professionals to deliver better patient care through improved diagnostic skills.
                    </p>
                </div>
            </div>
        `;
    }

    setupAuthState() {
        // This will be handled by the main app.js
        // We just ensure the auth state is properly managed
        if (typeof setupAuthState === 'function') {
            setupAuthState();
        }
    }

    // Method to inject content into the layout
    injectContent(content) {
        const contentContainer = document.getElementById('page-content');
        if (contentContainer) {
            contentContainer.innerHTML = content;
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
}

// Initialize layout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.layoutManager = new LayoutManager();
    
    // Handle initial route
    if (window.location.hash) {
        window.layoutManager.handleRouteChange();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayoutManager;
}