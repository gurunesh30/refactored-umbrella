# Prompt: Single-User Billing & Settings Infrastructure

## Context & Constraints
We are building the individual-focused Billing and Settings sub-systems for a single-user Next.js 14+ SaaS application utilizing Supabase and Stripe. 
- **NO multi-tenancy or organizations:** Everything maps directly to the individual user profile (`auth.uid()`).
- **Architecture:** Use Next.js Server Components for data fetching, Server Actions for mutations, and a standalone API Route for Stripe Webhooks.
- **UI System:** Implement clean components utilizing Shadcn UI structure tokens (Card, Progress, Button, Input, Tabs).

---

## Task 1: Database Setup & Stripe Webhook Integration
1. **Schema Migration:** Create a prompt script to alter the `public.profiles` table adding: `stripe_customer_id` (text, unique), `plan_type` (text, default 'free'), `subscription_status` (text, default 'active'), and `usage_count` (integer, default 0).
2. **Inbound API Webhook (`/api/webhooks/stripe`):** Build a Next.js Route Handler using `stripe.webhooks.constructEvent`. It must use the Supabase Service Role client to safely bypass standard RLS constraints and modify user metadata cache based on real-time execution events:
   - `checkout.session.completed`: Pull `userId` from the checkout metadata parameters, saving the verified `customer` ID, and updating `plan_type` to `'pro'`.
   - `customer.subscription.deleted`: Revert `plan_type` back to `'free'` when identified via the Stripe customer token.

---

## Task 2: Server-Side Billing Architecture (`/dashboard/billing`)
Create a Next.js Server Component page that queries the authenticated user session from Supabase on the server.
1. **Usage Calculations:** Compute dynamic progress metrics based on the user's tier. If `plan_type === 'pro'`, resource limit constraints scale to `100`, otherwise freeze boundaries at a `5` count capacity baseline.
2. **Interface Cards:** Render an analytical dashboard panel displaying current plan name tags, capitalization statuses, and resource consumption horizontal bar meters.
3. **Stripe Action Router:** Embed a single form operation utilizing a clean Next.js Server Action:
   - **Scenario A (Free Tier):** Generate an authorized `stripe.checkout.sessions.create` runtime pushing them to a secure checkout terminal. Pass `user.id` into the session metadata.
   - **Scenario B (Pro Tier):** Instantiate a self-service configuration payload using `stripe.billingPortal.sessions.create` pointing back to your `/dashboard/billing` origin link. Redirect the client context seamlessly.

---

## Task 3: Tabbed Account Configurations (`/dashboard/settings`)
Build a unified settings screen split logically via a Shadcn `Tabs` arrangement.
1. **Tab 1 (Identity Profile Details):** Provide input properties binding name data fields to user record updates. Keep email addresses displayed inside standard `disabled` read-only inputs for identity protection.
2. **Tab 2 (Developer Integrations & Security):** Include secure input fields structured to process custom third-party key integrations. Note explicitly within instructions that those objects must undergo symmetric cryptography processing routines prior to database state submission.