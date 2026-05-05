**Refactored-Umbrella** is an all-encompassing, modular starter kit for developers who are tired of building the same Auth, Billing, and Team Management boilerplate from scratch. Built with **Hexagonal Architecture**, it keeps your core business logic cleanly separated from external providers — so if you ever outgrow Supabase or Stripe, swapping them out won't break your entire app.

The name says it all:
- **Refactored** → Clean, maintainable Hexagonal Architecture with zero coupling between business logic and infrastructure.
- **Umbrella** → One kit that covers everything: Auth, Payments, Teams, Email, and a CLI tool to tie it all together.

---

## ✨ Features

- 🔐 **Authentication** — Supabase Auth with social logins (Google, GitHub) and session management
- 🏢 **Multi-Tenancy** — Organizations & Teams with Row-Level Security (RLS) built-in
- 💳 **Stripe Billing** — Checkout, Customer Portal, and idempotent webhook handling
- 🌙 **Dark Mode** — CSS variable-based theming, zero extra cost
- 📧 **Transactional Email** — Resend integration for password resets and invites
- 🧰 **CLI Scaffolding** — `npx refactored-umbrella-init` to prune features you don't need
- 🏗️ **Hexagonal Architecture** — Domain logic is infrastructure-agnostic
- 💀 **$0 to Launch** — Every service runs on a free tier until you're profitable

---

## 🛠️ Tech Stack (The $0 Powerhouse)

| Layer | Technology | Monthly Cost |
|---|---|---|
| **Frontend** | Next.js 14+ (App Router) | $0 |
| **Language** | TypeScript | $0 |
| **Styling** | Tailwind CSS + Shadcn UI | $0 |
| **Database & Auth** | Supabase (PostgreSQL + RLS) | $0 |
| **Payments** | Stripe (Sandbox → Live) | $0 until revenue |
| **Email** | Resend (3,000/mo free) | $0 |
| **State Management** | TanStack Query (React Query) | $0 |
| **Hosting** | Vercel | $0 |

---

## 🏗️ Architecture

Organized with **Hexagonal Architecture** (Ports & Adapters) so your business logic never depends on a third-party SDK.

```
src/
├── domain/           # Core business logic, entities, and Port interfaces
│   ├── user.ts       # User entity & validation rules
│   ├── organization.ts
│   └── ports/        # IBillingProvider, IAuthProvider (interfaces)
│
├── application/      # Use cases — the "what" of your app
│   ├── inviteTeamMember.ts
│   ├── processSubscription.ts
│   └── switchOrganization.ts
│
├── infrastructure/   # Adapters — the "how" (external services)
│   ├── supabase/     # SupabaseAuthAdapter, SupabaseRepo
│   └── stripe/       # StripeBillingAdapter, webhookHandler.ts
│
├── components/       # Shadcn UI + SaaS-ready composites
│   ├── ui/           # Base Shadcn components
│   └── shared/       # <PricingTable />, <UserAccountNav />, <EmptyState />
│
└── app/              # Next.js App Router (routes, layouts, API endpoints)
    ├── (auth)/       # Login, Register, Reset Password
    ├── (dashboard)/  # Protected dashboard routes
    └── api/
        └── webhooks/
            └── stripe/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Supabase](https://supabase.com) account
- A free [Stripe](https://stripe.com) account (test mode)
- A free [Resend](https://resend.com) account

### Option A — CLI (Recommended)

```bash
npx refactored-umbrella-init my-new-saas
```

The interactive CLI will ask which features you need and automatically prune the rest.

### Option B — Manual Clone

**1. Clone the repo**
```bash
git clone https://github.com/your-username/refactored-umbrella.git
cd refactored-umbrella
npm install
```

**2. Set up environment variables**
```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your free API keys:
```env
# Supabase — Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe — Developers → API Keys (use test keys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Resend — API Keys
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**3. Apply the database schema**
```bash
npx supabase db push
```

**4. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live.

---

## 🗄️ Database Schema

```sql
-- Organizations (the billing unit)
organizations (id, name, stripe_customer_id, subscription_status, plan)

-- Memberships (links users to orgs with roles)
memberships (id, user_id, organization_id, role)  -- role: owner | admin | member

-- Profiles (extends Supabase auth.users)
profiles (id, display_name, avatar_url, created_at)
```

Row-Level Security is pre-configured so users can only access data belonging to their organization.

---

## 📦 Included Components

| Component | Description |
|---|---|
| `<PricingTable />` | Monthly/Yearly toggle, links to Stripe Checkout |
| `<UserAccountNav />` | Avatar, team switcher, "Manage Subscription" |
| `<OrgSwitcher />` | Switch between multiple organizations |
| `<EmptyState />` | For new accounts with zero data |
| `<ProtectedRoute />` | Redirect to login if unauthenticated |

---

## 🧪 Testing Payments

Use Stripe's test cards in Sandbox mode:

| Card | Behavior |
|---|---|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Card declined |
| `4000 0025 0000 3155` | 3D Secure required |

Use any future expiry date and any 3-digit CVC.

---

## 📋 Implementation Roadmap

- [x] Project initialization (Next.js + Tailwind + Shadcn)
- [x] Hexagonal folder structure
- [ ] Supabase Auth (login, register, reset password)
- [ ] Multi-tenant DB schema + RLS policies
- [ ] Dashboard layout with Shadcn components
- [ ] Stripe Checkout + Customer Portal
- [ ] Stripe webhook handler (idempotent)
- [ ] Team invitation flow
- [ ] Email via Resend
- [ ] CLI tool (`npx refactored-umbrella-init`)
- [ ] Vercel deployment guide

---

## 🤝 Contributing

Contributions are what make the open-source community great. Any contributions are welcome.

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">Built by a broke-ass developer, for broke-ass developers. 💀<br/>Stay refactored.</p>