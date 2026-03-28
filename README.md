# EduCore ERP

All-in-one coaching & school management platform for institutes in India. Manage students, teachers, fees, live classes, mock tests, and doubts from a single platform.

---

## Project Structure

This is a **pnpm monorepo** with the following packages:

```
edtech/
├── artifacts/
│   ├── educore-next/     # Next.js 15 marketing/landing site
│   ├── erp-coaching/     # React + Vite ERP web app
│   └── api-server/       # Express 5 REST API server
├── lib/
│   ├── api-client-react/ # Auto-generated API client (React)
│   ├── api-spec/         # OpenAPI spec + Orval config
│   ├── api-zod/          # Zod schemas (generated from OpenAPI)
│   └── db/               # Drizzle ORM schema & DB client
└── scripts/              # Utility scripts
```

---

## Apps

### `educore-next` — Landing Site
- **Framework:** Next.js 15, React 19
- **Styling:** Tailwind CSS, Framer Motion
- **Routes:** `/` (landing), `/login`, `/student/*`, `/teacher/*`, `/management/*`

### `erp-coaching` — ERP Web App
- **Framework:** React + Vite, Wouter (routing)
- **UI:** Radix UI, shadcn/ui, Tailwind CSS
- **Features:** Student dashboard, Teacher dashboard, Management dashboard, Video player, Doubts, Lead capture modal
- **Roles:** `student`, `teacher`, `management`

### `api-server` — Backend API
- **Framework:** Express 5, TypeScript
- **Logging:** Pino
- **Validation:** Zod (via `@workspace/api-zod`)
- **Database:** Drizzle ORM (via `@workspace/db`)

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 15, React 19, Vite          |
| Styling    | Tailwind CSS, Framer Motion, Radix UI |
| Backend    | Express 5, TypeScript               |
| Database   | Drizzle ORM                         |
| Validation | Zod                                 |
| API Spec   | OpenAPI + Orval (code generation)   |
| Package Mgr| pnpm workspaces                     |

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm

### Install dependencies
```bash
pnpm install
```

### Run apps
```bash
# Landing site
cd artifacts/educore-next && pnpm dev

# ERP app
cd artifacts/erp-coaching && pnpm dev

# API server
cd artifacts/api-server && pnpm dev
```

### Build all
```bash
pnpm build
```

### Typecheck all
```bash
pnpm typecheck
```

---

## User Roles

| Role         | Access                                              |
|--------------|-----------------------------------------------------|
| `student`    | Dashboard, Videos, Doubts, Tests, Analytics         |
| `teacher`    | Dashboard, Classes, Assignments, Doubts, Analytics  |
| `management` | Dashboard, Students, Fees, Attendance, Reports      |
