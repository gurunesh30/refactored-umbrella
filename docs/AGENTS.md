# Agent Preferences & Changes

## UI Components
- **Preference:** Manual component creation in `src/components/ui/` to bypass PowerShell execution policy restrictions.
- **Style:** Radix-Nova (Slate/Zinc) with Dark Mode support.
- **Utils:** Added `src/lib/utils.ts` for class name merging.

## Architecture
- **Infrastructure Layer:** Supabase client logic is isolated in `src/infrastructure/auth.ts` using `useAuth` hook.
- **Middleware:** Edge-compatible Supabase middleware implemented at root level.

## Auth Flow
- Unauthenticated users redirected from `/dashboard` to `/login`.
- Authenticated users redirected from `/login` to `/dashboard`.
