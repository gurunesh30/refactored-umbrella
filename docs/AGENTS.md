# Agent Preferences & Changes

## UI Components
- **Preference:** Manual component creation in `src/components/ui/` to bypass PowerShell execution policy restrictions.
- **Style:** Radix-Nova (Slate/Zinc) with Dark Mode support.
- **Utils:** Added `src/lib/utils.ts` for class name merging.
- **New Components:** Added `Badge`, `Avatar`, and expanded `Card` usage for data-dense layouts.

## Dashboard Implementation
- **Layout:** Vertical Sidebar (Desktop) + Horizontal Header (Mobile/Desktop) with breadcrumbs and global actions.
- **Aesthetics:** "Broke-Ass Professional" style with high-end typography, subtle borders, and smooth transitions.
- **Content:** Data-dense overview with KPI cards, activity sparklines, and quick-action shortcuts.

## Architecture
- **Infrastructure Layer:** Supabase client logic is isolated in `src/infrastructure/auth.ts` using `useAuth` hook.
- **Middleware:** Edge-compatible Supabase middleware implemented at root level.
- **Navigation:** Logical grouping in `(dashboard)` route group for layout isolation.

## Auth Flow
- Unauthenticated users redirected from `/dashboard` to `/login`.
- Authenticated users redirected from `/login` to `/dashboard`.
- Logout functionality integrated into the dashboard sidebar.

## Organization & Team Management
- **Onboarding**: Users without an organization are forced into a `/onboarding` flow to create their first "Umbrella".
- **Switcher**: Custom `OrganizationSwitcher` implemented in the sidebar for multi-tenant navigation (supports switching and creation).
- **Invitations**: Complete invitation lifecycle implemented with pending states, role assignment, and revocation capabilities.
- **Services**: Logic centralized in `application/services/organization-service.ts` using Server Actions.
