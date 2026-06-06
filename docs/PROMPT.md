Here is the formal, technical description prompt you can paste directly into your AI agent or code editor. It instructs the agent to implement the advanced CLI scaffolding tool, the automatic `.env` generator, the diagnostic health-check router, and the concurrent dual-port server environment exactly as you specified.

---

```markdown
# Specification Prompt: Multi-Feature CLI Scaffolder & Dual-Port Admin Environment

## 🎯 Goal
Implement an interactive CLI installer tool named `create-saas` (invoked via `npm create saas --template refactored-umbrella`) that allows developers to checkbox-select their preferred technical integrations, programmatically generates matching `.env.local` templates, embeds structural API connectivity test scripts, and orchestrates a split-process concurrent runtime environment.

---

## 🏗️ Requirements & Feature Breakdown

### 1. Command Execution & Interactive Wizard Layer
- The CLI script entry point must initialize with a Node shebang (`#!/usr/bin/env node`) and parse terminal path arguments using `commander`.
- Use an interactive prompt layout (e.g., `@inquirer/prompts` or `clack`) to stop execution and prompt the user with a multi-select checkbox survey:
  * Select integrations: `[ ] Supabase` | `[ ] Stripe` | `[ ] Vercel`
- Store chosen dependencies as internal conditional boolean configuration flags.

### 2. Scaffold Extraction & On-the-Fly Configuration
- Utilize a repository extractor (like `degit`) to safely clone the base template archive into the targeted workspace directory without pulling historic Git logs.
- Programmatically compile and output an `.env.local` configuration manifest file. Dynamically populate empty text key structures *only* for the specific cloud platforms selected by the developer during the wizard phase.
- Locate the cloned template's `package.json`, read its existing parameters, and dynamically replace its root name property with the exact target directory folder name provided by the user.

### 3. Integration Health Check Engine
- Implement a discrete API verification route (`/apps/web/src/app/api/health-check/route.ts`) inside the template stack.
- This route handler must contain structural diagnostic checks linked to environment presence validations:
  * **If Supabase Flag Active:** Try to issue a lightweight validation query to confirm endpoint accessibility.
  * **If Stripe Flag Active:** Attempt to instantiate the Stripe Client SDK with the local token variable and fetch a single metadata object to confirm key authorization status.
- Return a structured JSON response displaying specific verification pass/fail success logs for each selected dependency.

### 4. Dual-Port Concurrent Monorepo Architecture
- The layout structure must isolate the user's workspace into a twin-package Monorepo architecture using native `npm workspaces` or a root project orchestration runner:
  * `/apps/web` (The main Next.js developer application running on `http://localhost:3000`)
  * `/apps/admin-diagnostic` (The diagnostic dashboard GUI panel running on `http://localhost:4000`)
- Configure a unified root script inside the top-level `package.json`:
  ```json
  "scripts": {
    "dev": "concurrently \"npm run dev --workspace=apps/web\" \"npm run dev --workspace=apps/admin-diagnostic\""
  }

```

* When a user initiates `npm run dev`, both servers must run concurrently across their respective isolated network ports.
* The admin dashboard application at `localhost:4000` must fetch and visualize data from the web app's `localhost:3000/api/health-check` endpoint, displaying a clear, styled status UI with clipboard copy actions, connection state badges, and diagnostic setup assistance.

```
***

### 💡 Agent Execution Tips:
* Feed this exact markdown file to an AI agent inside a brand-new directory named `create-saas`. 
* Ensure the agent installs the key baseline scripting packages (`commander`, `degit`, `@inquirer/prompts`, and `concurrently`) to execute the orchestration files smoothly.

```