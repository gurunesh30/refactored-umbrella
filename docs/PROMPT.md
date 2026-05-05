# Prompt: Refactored Auth & Middleware Implementation

## Context
We are building **refactored-umbrella**, a Micro-SaaS boilerplate using Next.js 14+ (App Router), Tailwind CSS, Shadcn UI, and Supabase. We have already initialized the project and configured the Supabase keys in `.env.local`.

## Goal
Implement a professional authentication flow including a Login Page and an Edge Middleware for protected routes.

## Task 1: The Middleware (`/middleware.ts`)
Edit the file `middleware.ts` file in the root directory that:
1.  Uses `createMiddlewareClient` from `@supabase/auth-helpers-nextjs` (or the latest `@supabase/ssr` package).
2.  Refreshes the user's session on every request.
3.  **Protection Logic:** Redirects unauthenticated users to `/login` if they try to access any route starting with `/dashboard`.
4.  Redirects authenticated users to `/dashboard` if they try to access `/login`.

## Task 2: The Login Page (`/src/app/login/page.tsx`)
Create a clean, centered login page using Shadcn UI components:
1.  **Layout:** Use a `Card` component to house the form.
2.  **Fields:** Include an Email `Input` and a Password `Input` with proper `Label` components.
3.  **Functionality:**
    *   Use a React `useState` to handle loading states.
    *   Implement a `handleLogin` function using `supabase.auth.signInWithPassword`.
    *   On success, redirect the user to `/dashboard` using `next/navigation`.
4.  **Styling:** Ensure it matches the "Nova" theme (Slate/Zinc colors) and supports Dark Mode.

## Task 3: The Profile Hook (Optional but Recommended)
Ensure the login process respects our "Refactored" architecture by keeping the Supabase client logic isolated in the infrastructure layer.

## Constraints
- Use TypeScript for all files.
- Ensure the code stays within the Vercel Free Tier limits (keep dependencies light).
- Do not use external CSS; use Tailwind utility classes only.