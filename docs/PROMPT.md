# Prompt: Team Management & Organization Infrastructure

## Context
We are implementing the "Multi-tenant" core of **refactored-umbrella**. Every user must belong to an **Organization** (the "Umbrella"). We are using Next.js 14 Server Actions, Shadcn UI, and Supabase RLS.

## Task 1: The "Create Organization" Onboarding UI
Create a dedicated onboarding page at `/onboarding` for new users:
1. **Goal:** Force users who don't have an `organization_id` to create one before accessing the dashboard.
2. **UI:** A centered Shadcn `Card` with:
    - An input for `Organization Name`.
    - An input for `Organization Slug` (auto-generated from the name).
3. **Logic:** A Server Action that:
    - Inserts a new row into `organizations`.
    - Updates the current user's `profile` row with the new `organization_id` and sets their role to 'owner'.
    - Redirects to `/dashboard`.

## Task 2: Enhanced Sidebar & Organization Switcher
Update the existing Sidebar component to include:
1. **Organization Switcher:** A Shadcn `Popover` or `Select` at the top of the sidebar.
    - Displays the current Organization Name and Logo (placeholder).
    - Lists other organizations the user belongs to.
    - Includes a "Create New Team" button at the bottom of the list.
2. **Dynamic Links:** Navigation links that include the organization slug (e.g., `/org/[slug]/settings`).

## Task 3: The Invitation System UI (`/settings/team`)
Build a team management view:
1. **Invite Modal:** A Shadcn `Dialog` triggered by an "Invite Member" button.
    - Input for `Email Address`.
    - Select for `Role` (Admin, Member).
2. **Pending Invites Table:** A `Table` component showing active invitations from the `invitations` table.
    - Columns: Email, Role, Status (Pending), and an "uninvite" (Delete) button.
3. **Team Members List:** A list showing existing members of the current organization fetched from the `profiles` table.

## Implementation Details
- **Architecture:** Keep logic in `application/services` and UI in `components`.
- **Security:** Ensure all data fetching is wrapped in Supabase RLS checks.
- **UX:** Use `sonner` or Shadcn `use-toast` to provide feedback for successful invites or organization creation.