# Frontend Documentation for Sanithu Jayakody's Portfolio Site

## Overview

This documentation provides a concise overview of the frontend implementation for Sanithu Jayakody's portfolio website. The site is built with Next.js, TypeScript, and Tailwind CSS, featuring a responsive design with light/dark mode support and animated interactions.

## Technology Stack

- **Framework**: Next.js 14.2.24
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme configuration
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

The project follows a well-organized structure:

```
/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
│   ├── contact/            # Contact-related components
│   ├── home/               # Homepage section components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── magicui/            # Animation and UI effect components
│   ├── projects/           # Project display components
│   └── testimonial/        # Testimonial components
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## Key Features

### Theme System

The site implements a theme system with light and dark modes using React context. The theme preference is saved to localStorage and applied via CSS classes. The system also respects the user's system preferences for initial theme selection.

### Responsive Navigation

The navigation system adapts to different screen sizes:
- Desktop: Full horizontal menu with dropdown for resume options
- Mobile: Collapsible hamburger menu with animated transitions

### Animations and Visual Effects

The site uses various animation effects to enhance user experience:
- Page transitions between routes
- Scroll-triggered animations for content sections
- Hover effects on interactive elements
- Text typing animations
- Background dot patterns with subtle movements

### Component-Based Architecture

The site is built with a modular component approach:
- Each section of the homepage is a separate component
- Reusable UI elements like cards, buttons, and forms
- Type-safe interfaces for data structures

### Data Fetching

The site implements a consistent pattern for data fetching:
- Loading states with animated indicators
- Error handling with user-friendly messages
- Async/await pattern with try/catch blocks

### Project Showcase

Projects are displayed with rich information:
- Featured projects highlighted on the homepage
- Detailed project pages with comprehensive information
- Filtering by technology on the projects page
- Consistent card design with hover effects

### Contact System

The contact functionality includes:
- Form validation for user inputs
- Submission state management
- Alternative contact methods display

## Core Logic

### Theme Management

The theme logic uses React's Context API to provide theme state and toggling functionality throughout the application. It persists user preferences and syncs with the DOM via CSS classes.

### Data Flow

The site follows a unidirectional data flow:
1. Data is fetched from API endpoints
2. State is managed in parent components
3. Data is passed down to child components via props
4. UI updates reflect the current state

### Route Protection

Admin routes are protected using Next.js middleware that checks for authentication via cookies:
- Unauthenticated users are redirected to the login page
- Authenticated users trying to access the login page are redirected to the dashboard

### Responsive Design Strategy

The responsive design uses:
- Mobile-first approach with Tailwind breakpoints
- Conditional rendering for different screen sizes
- Flexible grid layouts that adapt to available space

### Animation Strategy

Animations are implemented with performance in mind:
- CSS transitions for simple effects
- Framer Motion for complex animations
- Intersection Observer API for scroll-triggered animations

## Key Components

### Layout Components
- **Navbar**: Main navigation with theme toggle and mobile menu
- **Footer**: Site information, navigation links, and social media

### Home Components
- **HeroSection**: Main introduction with animated elements
- **AboutSummary**: Brief overview of skills and background
- **ProjectsSummary**: Showcase of featured projects
- **TestimonialsSummary**: Client testimonials with horizontal scrolling
- **ContactSummary**: Contact information and call-to-action

### Project Components
- **ProjectCard**: Displays project summary with hover effects
- **ProjectDetail**: Comprehensive project information page

### UI Effect Components
- **DotPattern**: Creates decorative background patterns
- **Marquee**: Implements horizontal scrolling content
- **TypingAnimation**: Simulates typing text effect
- **BoxReveal**: Animated content reveal on scroll

## Styling Approach

The site uses a consistent styling approach with:
- Custom CSS variables for theming
- Utility-first classes with Tailwind
- Component-specific styles through composition
- Global styles for typography and common elements

## Conclusion

This frontend implementation delivers a modern, responsive portfolio website with strong visual appeal and smooth interactions. The modular architecture and consistent patterns make the codebase maintainable and extensible, while the user experience benefits from thoughtful animations and responsive design.