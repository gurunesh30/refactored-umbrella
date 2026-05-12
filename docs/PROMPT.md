# Prompt: Dashboard Design & Information Architecture

## Context
We are designing the core user experience for **refactored-umbrella**, a Micro-SaaS boilerplate. The goal is a "Broke-Ass Professional" aesthetic: high-end, clean, and data-dense, using the **Shadcn Nova** theme.

## Task 1: Dashboard Layout Structure (`layout.tsx`)
Describe the "Shell" of the application. It should include:
1. **Vertical Sidebar (Desktop):** - A fixed left-hand navigation bar.
    - Top section: Project Branding (Logo + Name).
    - Middle section: Primary navigation links (Dashboard, Team, Settings, Billing).
    - Bottom section: User Profile switcher/mini-profile.
2. **Horizontal Header (Mobile & Desktop):**
    - Mobile: Hamburger menu for sidebar access.
    - Desktop: Contextual breadcrumbs (e.g., Home > Dashboard).
    - Search bar or "Global Action" button (e.g., "New Project").
    - Dark/Light mode toggle.
3. **Main Content Area:** - A scrollable container with consistent padding and a subtle background tint (e.g., `slate-50` in light mode).

## Task 2: Dashboard Content Architecture (`page.tsx`)
Describe the "Overview" screen. It should contain:
1. **Header Section:** - A large H1 title ("Overview" or "Welcome back, {User}").
    - A date range picker or a "Refresh Data" button.
2. **The "Big Numbers" Row (KPIs):**
    - Four `Card` components showing key metrics:
        - **Total Users/Customers:** With a percentage trend indicator.
        - **Monthly Recurring Revenue (MRR):** With a subtle badge.
        - **Active Sessions:** Visualized with a small sparkline or simple text.
        - **System Status:** A "Healthy" indicator.
3. **Primary Data Visualization:**
    - A large central card for an "Activity" or "Revenue over time" chart (placeholder using SVG or skeleton).
4. **Secondary Information Grid:**
    - **Recent Transactions/Activity Table:** A list of the last 5 events in the system.
    - **Quick Actions Card:** Shortcuts to "Invite Member" or "Update Plan".

## Design Principles
- **Minimalist Palette:** Use the Slate/Gray tones selected during the Shadcn init.
- **Empty States:** Every component should have a "No data yet" state that looks intentional, not broken.
- **Responsive Design:** Describe how the 4-column KPI row stacks on mobile.
- **Accessibility:** Ensure all navigation elements have high contrast and clear focus states.