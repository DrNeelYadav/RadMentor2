# RadMentor Layout System

This layout system provides consistent header, footer, and styling across all pages in the RadMentor website.

## Features

- **Consistent Header & Footer**: Automatically injected on every page
- **Responsive Design**: Works perfectly on all devices
- **Authentication State Management**: Header changes based on login status
- **Automatic Path Detection**: Logo and navigation links work correctly regardless of page depth
- **Modular Components**: Use individual components as needed
- **Easy Integration**: Just include one script file

## Quick Start

### Basic Page Setup

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <title>Your Page Title - RadMentor</title>
    <!-- Common layout elements will be injected here by layout.js -->
</head>
<body class="text-gray-800">
    <!-- Header will be injected here by layout.js -->

    <!-- Your page content goes here -->
    <main class="content-area">
        <div class="container mx-auto px-6 py-8">
            <h1>Your Page Content</h1>
            <!-- Add your content here -->
        </div>
    </main>

    <!-- Footer will be injected here by layout.js -->

    <!-- Include the layout system -->
    <script src="path/to/js/layout.js"></script>
</body>
</html>
```

### Page Types

The layout system supports different page types:

- `'default'` - Regular pages with full navigation
- `'admin'` - Admin pages with simplified header

```javascript
// Initialize for admin page
window.RadMentorLayout.initializePage('admin');
```

## Available Components

### Breadcrumb Navigation

```javascript
const breadcrumb = window.RadMentorLayout.getBreadcrumb([
    { name: 'Section', url: '../index.html' },
    { name: 'Current Page', url: '#' }
]);
document.getElementById('breadcrumb-container').innerHTML = breadcrumb;
```

### Back Button

```javascript
const backButton = window.RadMentorLayout.getBackButton('../index.html', 'Back to Dashboard');
document.getElementById('back-button-container').innerHTML = backButton;
```

### Authentication State

```javascript
// Update header based on login status
window.RadMentorLayout.setAuthState(true, userData);  // Logged in
window.RadMentorLayout.setAuthState(false);           // Logged out
```

## File Structure

```
js/
├── layout.js          # Main layout system
├── template.html      # Template for new pages
└── README.md         # This documentation
```

## CSS Classes

The layout system provides these utility classes:

- `.content-area` - Adds proper padding for fixed header
- `.nav-button` - Styled navigation buttons with hover effects
- `.rad-gradient` - RadMentor brand gradient background
- `.rad-gradient-text` - RadMentor brand gradient text

## Path Resolution

The system automatically detects page depth and adjusts asset paths:

- Root level: `./logo.png`
- One level deep: `../logo.png`
- Two levels deep: `../../logo.png`

## Examples

See these files for implementation examples:

- `index.html` - Main page with full functionality
- `anatomy/index.html` - Subdirectory page with back button
- `admin.html` - Admin page with simplified header
- `test-page.html` - Demo page showing all features

## Integration with Existing Pages

1. Remove existing header and footer HTML
2. Remove duplicate CSS and script includes
3. Add layout.js script
4. Wrap content in `<main class="content-area">`
5. Initialize the layout system

## Customization

The layout system can be customized by modifying the `RadMentorLayout` class in `layout.js`. Key methods:

- `getHeader()` - Customize header content
- `getFooter()` - Customize footer content
- `getCommonStyles()` - Add or modify CSS
- `initializePage()` - Change initialization behavior

## Browser Support

Works in all modern browsers that support:
- ES6 Classes
- Template literals
- DOM manipulation APIs
- CSS Flexbox/Grid