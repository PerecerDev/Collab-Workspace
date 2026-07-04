# Collab Workspace — Technical Architecture

Version: 1.0  
Status: Active

---

# Purpose

Technical source of truth for stack, boundaries, real-time architecture, sync patterns, and engineering principles.

Precedence: `CONSTITUTION.md` > this document > implementation details.

---

# Architecture Principles

## Feature-Based Architecture

Organize by **domain feature** (workspace, canvas, presence, blocks, auth), not by technical type at the root level.

Each feature owns: components, hooks, services, types, utils, and tests — colocated where practical.

## Separation of Concerns

| Layer                         | Responsibility                                              |
| ----------------------------- | ----------------------------------------------------------- |
| **UI components**             | Presentation, composition, local UI state                   |
| **Features**                  | Domain UI flows and feature-specific logic                  |
| **Hooks**                     | Reusable stateful logic                                     |
| **Services / API**            | HTTP calls, mock adapters, DTO mapping                      |
| **Real-Time Layer**           | WebSocket connection, rooms, event dispatch, reconnect      |
| **Event Layer**               | Normalized domain events (create, update, delete, presence) |
| **Sync Layer**                | Optimistic updates, conflict resolution, rollback           |
| **Stores (Zustand)**          | Session UI, canvas viewport, tool selection, local drafts   |
| **Query (TanStack Query)**    | Server/async data, cache, mutations                         |
| **Types / DTOs**              | Domain and API contracts                                    |
| **Utils**                     | Pure helpers                                                |

## Global State Only When Necessary

- **TanStack Query:** workspaces, users, persisted metadata (async data)
- **Zustand:** theme, layout chrome, active tool, viewport, ephemeral UI, connection status
- **Sync store / feature stores:** collaborative document state with clear ownership boundaries
- **React Context:** providers (theme, auth mock, query client, socket provider) — not for high-churn canvas data without virtualization
- **Local state:** form inputs, hover, transient selection

## Real-Time First

Every collaborative feature must define:

1. **Event contract** — payload shape, versioning, idempotency
2. **Optimistic path** — what the UI shows before server acknowledgment
3. **Conflict path** — merge, last-write-wins, or user-prompt strategy
4. **Reconnect path** — replay, snapshot, or diff recovery
5. **Presence path** — cursors, selection, active users

## Composition Over Inheritance

Prefer small composable components and hooks over class hierarchies or mega-components.

## API-Ready Mock Layer

Initial data comes from mock services and mock WebSocket handlers with the **same interface** planned for real backends. Swapping mock → real must not require UI rewrites.

---

# Technology Stack

## Core

| Category     | Technology            |
| ------------ | --------------------- |
| Framework    | React 18+             |
| Language     | TypeScript (strict)   |
| Build        | Vite                  |
| Routing      | React Router          |
| Server state | TanStack Query        |
| Client state | Zustand               |
| Styling      | Tailwind CSS          |
| Forms        | React Hook Form + Zod |

## Real-Time & Sync

| Category        | Technology                              |
| --------------- | --------------------------------------- |
| Transport       | WebSockets                              |
| Client library  | Socket.IO client (or equivalent)        |
| Optimistic UI   | TanStack Query mutations + sync layer   |
| Event model     | Normalized domain events                |
| Presence        | Room-based presence + cursor broadcasts |

## Interactions & Motion

| Category      | Technology                    |
| ------------- | ----------------------------- |
| Drag & drop   | dnd-kit (preferred)           |
| Animation     | Framer Motion                 |
| Canvas        | Feature-owned canvas renderer |

## Quality

| Tool                  | Purpose                |
| --------------------- | ---------------------- |
| ESLint                | Linting                |
| Prettier              | Formatting             |
| Husky + lint-staged   | Pre-commit checks      |
| Vitest                | Unit/integration tests |
| React Testing Library | Component tests        |

## Deployment & Tooling

| Tool           | Purpose         |
| -------------- | --------------- |
| Vercel         | Hosting (SPA)   |
| GitHub Actions | CI              |
| Git / GitHub   | Version control |

## AI Development

| Tool                   | Purpose                   |
| ---------------------- | ------------------------- |
| Cursor / Claude agents | Orchestrated development  |
| MCP                    | External tool integration |
| GitHub Copilot         | In-IDE assistance         |

---

# Application Structure (Target)

```
src/
├── app/                    # App bootstrap, providers, router
├── features/               # Feature modules
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── stores/         # Feature-scoped Zustand (when needed)
│       ├── types/
│       ├── utils/
│       └── __tests__/
├── realtime/               # WebSocket client, event bus, reconnect
│   ├── socket/
│   ├── events/
│   ├── presence/
│   └── hooks/
├── sync/                   # Optimistic updates, conflict handlers
│   ├── optimistic/
│   ├── conflicts/
│   └── hooks/
├── shared/                 # Cross-feature UI, hooks, utils
│   ├── components/         # Design system primitives
│   ├── hooks/
│   ├── lib/                # queryClient, fetch wrapper
│   ├── types/
│   └── utils/
├── assets/
└── styles/                 # Global CSS, Tailwind entry
```

See `PROJECT_STRUCTURE.md` for detailed rules.

---

# Real-Time Data Flow

```
User action → optimistic UI update → local store/query cache
                    ↓
            emit domain event → WebSocket → (mock/server)
                    ↓
            inbound event → event layer → sync handler → UI reconcile
                    ↓
            on conflict → rollback or merge → user feedback
```

## Connection Lifecycle

1. Authenticate (mock initially)
2. Connect socket with workspace room
3. Subscribe to workspace events + presence
4. On disconnect: show status, queue outbound events
5. On reconnect: resync snapshot or replay missed events

---

# Routing

- React Router with lazy-loaded route modules
- Protected routes for authenticated areas
- Workspace routes: `/workspace/:id`, `/workspace/:id/canvas`, etc.
- Route-level code splitting

---

# Security (Frontend)

- No secrets in client bundle
- Sanitize user-generated rich text if rendered as HTML
- Validate inbound WebSocket payloads with Zod
- Rate-limit or debounce high-frequency events (cursors)
- CSRF-aware when real API is added
- Secure cookie/session strategy documented before real auth
- Dependency audit in CI

---

# Performance

- Route-based code splitting
- Canvas: throttle pointer events, virtualize off-screen elements
- Memoization only when measured necessary
- Virtualize long lists (activity, comments)
- Optimistic updates for collaborative edits
- Image optimization for avatars/assets
- Respect `prefers-reduced-motion` — disable non-essential Framer Motion
- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 on reference hardware
- Real-time: cursor updates ≤ 30fps throttled; batch low-priority events

---

# Testing Strategy

- **Unit:** utils, hooks, sync logic, event reducers
- **Component:** RTL for UI behavior and accessibility
- **Integration:** feature flows with mocked services and mock socket
- **Real-time:** optimistic + rollback paths, reconnect resync
- Critical paths: auth gate, workspace join, block CRUD, presence, theme toggle

---

# Prohibited Patterns

- Business logic inside presentational components
- Fetch or socket calls directly in components (use services + hooks)
- Duplicated types across features (align with `DATA_MODEL.md`)
- Prop drilling > 3 levels without context or composition
- `any` without ADR exception
- CSS-in-JS libraries (use Tailwind + design tokens)
- Next.js or server components (SPA + Vite only unless constitution amended)
- Unbounded global listeners without cleanup
- Sync logic scattered across unrelated components

---

# Future Backend Integration

When approved, introduce:

- REST or WebSocket server behind existing service interfaces
- Real auth (e.g. JWT + httpOnly cookies)
- Environment-based API and WebSocket URLs
- Optional CRDT/OT library if complexity warrants ADR

No database or server implementation without explicit human approval.
