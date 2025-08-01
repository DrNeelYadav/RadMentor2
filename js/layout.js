// RadMentor Layout System
// This module provides consistent layout components across all pages

class RadMentorLayout {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
    }

    // Common styles that should be included on every page
    getCommonStyles() {
        return `
            <style>
                /* Custom styles to complement Tailwind */
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f8fafc; /* Light gray background */
                }

                /* Custom gradient for buttons and highlights */
                .rad-gradient {
                    background: linear-gradient(90deg, #1e40af, #3b82f6);
                }
                .rad-gradient-text {
                    background: linear-gradient(90deg, #1e40af, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Styles for the dashboard part */
                .dashboard-grid-item {
                    transition: all 0.2s ease-in-out;
                    border: 1px solid #e5e7eb;
                }
                .dashboard-grid-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    border-color: #3b82f6;
                }
                .sidebar {
                    transition: transform 0.3s ease-in-out;
                }

                /* Navigation button styles */
                .nav-button {
                    transition: all 0.2s ease-in-out;
                    border: 1px solid #e5e7eb;
                }
                .nav-button:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    border-color: #3b82f6;
                }

                /* Content area to account for fixed header */
                .content-area {
                    padding-top: 80px;
                    min-height: calc(100vh - 80px);
                }
            </style>
        `;
    }

    // Common head elements (meta tags, fonts, scripts)
    getCommonHead() {
        return `
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <!-- Tailwind CSS -->
            <script src="https://cdn.tailwindcss.com"></script>

            <!-- Google Fonts: Inter -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

            <!-- Feather Icons -->
            <script src="https://unpkg.com/feather-icons"></script>

            ${this.getCommonStyles()}
        `;
    }

    // Header component
    getHeader(pageType = 'default') {
        const basePath = this.getBasePath();
        
        return `
            <header class="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">
                <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div class="flex items-center">
                        <img src="${basePath}logo.png" alt="RadMentor Logo" class="h-10 mr-3"/>
                        <span class="text-2xl font-bold text-gray-800">RadMentor</span>
                        ${pageType === 'admin' ? '<span class="text-blue-600 font-semibold ml-2">Admin</span>' : ''}
                    </div>
                    <nav id="main-nav" class="hidden md:flex items-center space-x-8">
                        ${pageType !== 'admin' ? `
                            <a href="${basePath}index.html#courses" class="text-gray-600 hover:text-blue-600">Courses</a>
                            <a href="${basePath}index.html#features" class="text-gray-600 hover:text-blue-600">Features</a>
                            <a href="${basePath}index.html#about" class="text-gray-600 hover:text-blue-600">About Us</a>
                        ` : `
                            <a href="${basePath}index.html" class="text-gray-600 hover:text-blue-600">User Portal</a>
                        `}
                    </nav>
                    <div class="flex items-center">
                        ${pageType !== 'admin' ? this.getAuthButtons() : this.getAdminButtons(basePath)}
                        <button id="mobile-menu-button" class="md:hidden ml-4 text-gray-700">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                </div>
                ${pageType !== 'admin' ? this.getMobileMenu() : ''}
            </header>
        `;
    }

    // Authentication buttons for regular pages
    getAuthButtons() {
        return `
            <!-- Logged Out Buttons -->
            <div id="header-logged-out" class="flex items-center">
                <button onclick="showAuthModal('signin')" class="hidden md:block text-gray-600 hover:text-blue-600 mr-6">Login</button>
                <button onclick="showAuthModal('signup')" class="rad-gradient text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    Sign Up
                </button>
            </div>
            <!-- Logged In Buttons -->
            <div id="header-logged-in" class="hidden items-center">
                 <span class="hidden sm:block text-gray-700 mr-4">Hi, <span id="user-greeting-header"></span>!</span>
                 <button onclick="showDashboard()" class="rad-gradient text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    Dashboard
                </button>
                <button onclick="logout()" class="ml-4 text-gray-600 hover:text-blue-600" title="Logout">
                    <i data-feather="log-out"></i>
                </button>
            </div>
        `;
    }

    // Admin buttons
    getAdminButtons(basePath) {
        return `
            <button onclick="adminLogout()" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">
                Logout
            </button>
        `;
    }

    // Mobile menu for regular pages
    getMobileMenu() {
        return `
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden px-6 pb-4">
                <a href="#courses" class="block py-2 text-gray-600 hover:text-blue-600">Courses</a>
                <a href="#features" class="block py-2 text-gray-600 hover:text-blue-600">Features</a>
                <a href="#about" class="block py-2 text-gray-600 hover:text-blue-600">About Us</a>
                <!-- Mobile Logged Out -->
                <div id="mobile-logged-out">
                    <button onclick="showAuthModal('signin')" class="block w-full text-left py-2 text-gray-600 hover:text-blue-600">Login</button>
                </div>
                 <!-- Mobile Logged In -->
                <div id="mobile-logged-in" class="hidden">
                    <button onclick="showDashboard()" class="block w-full text-left py-2 text-gray-600 hover:text-blue-600">Dashboard</button>
                    <button onclick="logout()" class="block w-full text-left py-2 text-gray-600 hover:text-blue-600">Logout</button>
                </div>
            </div>
        `;
    }

    // Footer component
    getFooter() {
        const basePath = this.getBasePath();
        
        return `
            <footer class="bg-gray-900 text-white">
                <div class="container mx-auto px-6 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 class="text-xl font-bold">RadMentor</h3>
                            <p class="mt-2 text-gray-400">The future of radiology education.</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold">Quick Links</h3>
                            <ul class="mt-2 space-y-2">
                                <li><a href="${basePath}index.html#courses" class="text-gray-400 hover:text-white">Courses</a></li>
                                <li><a href="${basePath}index.html#features" class="text-gray-400 hover:text-white">Features</a></li>
                                <li><a href="#" onclick="showAuthModal('signup')" class="text-gray-400 hover:text-white">Sign Up</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold">Contact</h3>
                             <p class="mt-2 text-gray-400">Email: <a href="mailto:support@radmentor.com" class="hover:text-white">support@radmentor.com</a></p>
                        </div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
                        &copy; 2024 RadMentor. All Rights Reserved.
                    </div>
                </div>
            </footer>
        `;
    }

    // Breadcrumb component for navigation
    getBreadcrumb(items) {
        const basePath = this.getBasePath();
        let breadcrumbHTML = `
            <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <a href="${basePath}index.html" class="hover:text-blue-600">Home</a>
        `;
        
        items.forEach((item, index) => {
            if (index === items.length - 1) {
                breadcrumbHTML += `<span class="mx-2">/</span><span class="text-gray-900 font-medium">${item.name}</span>`;
            } else {
                breadcrumbHTML += `<span class="mx-2">/</span><a href="${item.url}" class="hover:text-blue-600">${item.name}</a>`;
            }
        });
        
        breadcrumbHTML += `</nav>`;
        return breadcrumbHTML;
    }

    // Back button component
    getBackButton(url, text = "Back") {
        return `
            <button onclick="window.location.href='${url}'" class="flex items-center text-gray-600 hover:text-blue-600 mb-6">
                <i data-feather="arrow-left" class="mr-2"></i> ${text}
            </button>
        `;
    }

    // Get base path for assets based on current page location
    getBasePath() {
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length - 1;
        
        if (depth === 0) return './';
        return '../'.repeat(depth);
    }

    // Initialize layout for a page
    initializePage(pageType = 'default', options = {}) {
        // Add common head elements if not already present
        if (!document.querySelector('script[src*="tailwindcss"]')) {
            document.head.insertAdjacentHTML('beforeend', this.getCommonHead());
        }

        // Add header
        if (!document.querySelector('header')) {
            document.body.insertAdjacentHTML('afterbegin', this.getHeader(pageType));
        }

        // Add footer if not already present
        if (!document.querySelector('footer')) {
            document.body.insertAdjacentHTML('beforeend', this.getFooter());
        }

        // Initialize mobile menu functionality
        this.initializeMobileMenu();

        // Initialize Feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Add content-area class to main content if specified
        if (options.contentSelector) {
            const contentElement = document.querySelector(options.contentSelector);
            if (contentElement) {
                contentElement.classList.add('content-area');
            }
        }
    }

    // Initialize mobile menu functionality
    initializeMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    // Set authentication state
    setAuthState(isLoggedIn, userData = null) {
        this.isLoggedIn = isLoggedIn;
        this.currentUser = userData;

        const headerLoggedOut = document.getElementById('header-logged-out');
        const headerLoggedIn = document.getElementById('header-logged-in');
        const mobileLoggedOut = document.getElementById('mobile-logged-out');
        const mobileLoggedIn = document.getElementById('mobile-logged-in');
        const userGreetingHeader = document.getElementById('user-greeting-header');

        if (isLoggedIn && userData) {
            if (headerLoggedOut) headerLoggedOut.classList.add('hidden');
            if (headerLoggedIn) headerLoggedIn.classList.remove('hidden');
            if (mobileLoggedOut) mobileLoggedOut.classList.add('hidden');
            if (mobileLoggedIn) mobileLoggedIn.classList.remove('hidden');
            if (userGreetingHeader) userGreetingHeader.textContent = userData.name ? userData.name.split(' ')[0] : 'User';
        } else {
            if (headerLoggedOut) headerLoggedOut.classList.remove('hidden');
            if (headerLoggedIn) headerLoggedIn.classList.add('hidden');
            if (mobileLoggedOut) mobileLoggedOut.classList.remove('hidden');
            if (mobileLoggedIn) mobileLoggedIn.classList.add('hidden');
        }

        // Re-initialize Feather icons after DOM changes
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}

// Create global instance
window.RadMentorLayout = new RadMentorLayout();

// Auto-initialize for pages that include this script
document.addEventListener('DOMContentLoaded', function() {
    // Auto-detect page type based on filename or path
    let pageType = 'default';
    if (window.location.pathname.includes('admin')) {
        pageType = 'admin';
    }

    // Initialize layout
    window.RadMentorLayout.initializePage(pageType, {
        contentSelector: 'main, .content-area, .main-content'
    });
});