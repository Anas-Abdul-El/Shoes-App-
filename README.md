# Shoes App

A full-stack e-commerce demo built with Next.js (App Router), TypeScript, Prisma and PostgreSQL. This repository contains the frontend app, server actions, and Prisma schema/migrations for managing products, users, addresses, carts and orders.

The link: <a href="shoes-app-amber.vercel.app">shoes-app<a/>

**Features**
- Product collections and item pages
- Cart management and checkout flow
- User authentication and account settings
- Admin/management pages for items and activity logs
- Server-side actions in the `server/` directory for data mutations

**Tech Stack**
- Frontend: Next.js (App Router), React, TypeScript
- Database: PostgreSQL with Prisma ORM
- Package manager: pnpm

**Quick Links**
- Prisma schema: [prisma/schema.prisma](prisma/schema.prisma#L1)
- App entry: [src/app/page.tsx](src/app/page.tsx#L1)
- Server actions: [server/add-to-cart.ts](server/add-to-cart.ts#L1)
- Components: [src/components](src/components)

**Prerequisites**
- Node.js (v18+ recommended)
- pnpm
- PostgreSQL (or a connection-compatible database)

**Environment**
Create a `.env` file in the project root with at least the following values:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-random-secret
```

Adjust or add third-party API keys or SMTP credentials as needed.

**Install**

```bash
pnpm install
```

**Database - Prisma**

- Generate the client:

```bash
pnpm prisma generate
```

- Run migrations locally (development):

```bash
pnpm prisma migrate dev --name init
```

- Inspect the current schema or open Prisma Studio:

```bash
pnpm prisma studio
```

Migrations are stored under the `prisma/migrations` directory.

**Run (development)**

```bash
pnpm dev
```

This runs the Next.js development server (default port 3000). Open http://localhost:3000.

**Build & Start (production)**

```bash
pnpm build
pnpm start
```

**Project Structure (high level)**
- `src/app` — Next.js App Router pages and layouts
- `src/components` — UI components grouped by feature
- `server` — server actions / API handlers used across the app
- `prisma` — schema and migrations
- `public` — static assets
- `utils` / `lib` — helpers and prisma client wrapper

**Testing & Linting**
See `package.json` scripts for available linters and test commands. If none exist, add preferred tooling (e.g., ESLint, Vitest, Jest) as needed.

**Contributing**
- Fork and create a feature branch
- Follow the existing code style and TypeScript types
- Add migrations under `prisma/migrations` when schema changes are required
- Run `pnpm prisma generate` after pulling schema updates

**Troubleshooting**
- If the dev server fails to start, check `DATABASE_URL` and run Prisma migrations.
- Inspect server logs printed to the terminal for runtime errors.


