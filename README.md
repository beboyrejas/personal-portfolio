# Portfolio Admin Starter

Full-stack portfolio website built with Next.js App Router, Tailwind CSS, Prisma 6, PostgreSQL, and NextAuth.

## Included

- Public pages: Home, About, Projects, Blog, Contact
- Admin pages: Dashboard, Projects, Blog, Messages, Login
- Prisma models for projects, posts, messages, and admin users
- Credentials-based NextAuth login for the admin area
- Contact form storing inbound messages in PostgreSQL through Prisma

## Architecture

```text
src/
  app/                Next.js routes, pages, and API handlers
  components/         Shared presentational UI and forms
  features/           Feature-specific UI modules
  lib/
    actions/          Server actions
    auth/             Auth helpers and config
    db/               Prisma client
    validators/       Zod schemas
```

## Setup

1. Copy `.env.example` to `.env`.
2. Update `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_SECRET`, `AUTH_URL`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
3. Install dependencies with `npm install`.
4. Generate the Prisma client with `npm run prisma:generate`.
5. Run migrations with `npm run prisma:migrate`.
6. Seed the admin account and starter content with `npm run prisma:seed`.
7. Start the app with `npm run dev`.

## Notes

- This project now targets PostgreSQL for deployment and production auth/data workflows.
- This project was scaffolded offline in the current workspace, so dependencies have not been installed yet.
- To place the finished project in `D:\portfolio-project`, copy or sync this folder there after installation, or let Codex do the sync with approval.
