# Walkthrough: CLI Scaffolder & Dual-Port Diagnostics System

[![npm version](https://img.shields.io/npm/v/create-saas.svg)](https://www.npmjs.com/package/create-saas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Instantly scaffold a Next.js solo SaaS stack and debug your API connections using an isolated concurrent admin dashboard.

This document provides a complete overview of the architectural changes made to transform the codebase into a twin-package workspace, implement the `create-saas` wizard, and build the real-time API connectivity diagnostic system.

---

## 🏗️ Architecture Migration
The repository structure has been safely refactored into a native `npm workspaces` monorepo configuration to support concurrent environments.

- **`/apps/web`**: Contains the full, original Next.js application (Supabase, Stripe, UI). It boots on `http://localhost:3000`.
- **`/apps/admin-diagnostic`**: Contains a newly scaffolded, lightweight, blazing-fast React/Vite application that boots on `http://localhost:4000`.
- **`/create-saas`**: Contains the interactive Node.js CLI scripting engine.
- **Root `package.json`**: Coordinates dependencies and exposes the unified `"dev"` script which runs `concurrently` across both apps simultaneously.

## 🚀 The `create-saas` CLI Tool

We built a custom CLI node installer that automatically builds new SaaS setups based on user inputs.

- **Interactive Setup (`@inquirer/prompts`)**: It uses a sleek terminal checkbox survey asking you which cloud platforms you need (Supabase, Stripe, Vercel).
- **Template Extraction (`degit`)**: Automatically copies or `degit` clones the base layout without any bloated git histories. 
- **Dynamic `.env.local` Generation**: Based on the selected checkboxes, it creates a tailored `.env.local` file containing the precise keys needed for those platforms (e.g., omitting Stripe keys if Stripe wasn't selected), placing it directly into `apps/web`.
- **Package Auto-Renaming**: Overrides the root directory `package.json` with the exact project folder name provided in the CLI argument.

> [!TIP]
> **Try it locally:** From the root folder, run:
> ```bash
> node ./create-saas/bin/index.js my-new-project --template ./
> ```

## 🩺 Integration Health Check Engine

### 1. The Next.js Diagnostic API
A structural health-check endpoint was added to the web application at **[`apps/web/app/api/health-check/route.ts`](file:///d:/refactored-umbrella/apps/web/app/api/health-check/route.ts)**. 
- **Supabase**: If `NEXT_PUBLIC_SUPABASE_URL` is detected, it runs a lightweight validation query to confirm database endpoint accessibility.
- **Stripe**: If `STRIPE_SECRET_KEY` is detected, it attempts to securely fetch a product metadata object using the Stripe Node SDK to verify the token's active permissions.
- **Vercel**: Confirms the configuration status of Vercel project ID variables.

### 2. The Admin Diagnostic GUI
A stunning dark-mode glassmorphic interface was created at **[`apps/admin-diagnostic/src/App.tsx`](file:///d:/refactored-umbrella/apps/admin-diagnostic/src/App.tsx)**.
- **Live Sync**: Automatically polls the web app's `localhost:3000` API on load.
- **Status Badges**: Visually reflects the pass/fail success state (`Active`, `Failed`, or `Unconfigured`) of each API dependency.
- **Setup Wizards**: Provides in-line, contextual hints on which `.env.local` properties to define when a service is unconfigured.
- **Raw Diagnostic Feed**: Features a raw JSON payload viewer combined with a one-click clipboard "Copy Payload" button.

---

## 🎯 Verification Blueprint

To test this entire dual-port flow on your local machine:

1. **Install Dependencies:**
   Run `npm install` at the root folder so the monorepo linking sets up `concurrently` and your new CLI packages.
2. **Start the Concurrent Matrix:**
   Run `npm run dev` at the root. You will see both `[web]` and `[admin-diagnostic]` boot up simultaneously.
3. **Verify the Admin Control Panel:**
   Open your browser to [http://localhost:4000](http://localhost:4000). The Diagnostics UI will parse your `.env.local` keys via the Next.js API port and visualize your integration health!
