# Collab Workspace — Master Development Plan

Version: 1.0  
Status: Active  
Branch strategy: one branch per responsibility, never on `main`

---

# Overview

Phased delivery of a production-grade real-time collaborative platform. Each phase completes design alignment (where required), implementation, tests, review, merge, and documentation update before the next phase begins.

---

# Phase 0 — Foundation (Current)

**Branch:** `feature/chore/project-foundation`

| Deliverable | Description |
| ----------- | ----------- |
| Vite + React + TS | Strict TypeScript, path aliases |
| Tailwind + tokens | Semantic design tokens, dark mode |
| App shell | Router, providers, root layout |
| Design system primitives | Button, Input, Avatar, Tooltip, Dialog, etc. |
| Quality toolchain | ESLint, Prettier, Husky, lint-staged, Vitest |
| CI | GitHub Actions: lint, typecheck, test, build |
| Docs | README, CHANGELOG, ARCHITECTURE, CONTRIBUTING, ROADMAP |

**Exit criteria:** App builds, tests pass, CI green, professional shell with theme toggle.

---

# Phase 1 — Auth & Domain Types

**Branch:** `feature/auth-mock-session`

| Deliverable | Description |
| ----------- | ----------- |
| Domain types | User, Workspace, CanvasObject per DATA_MODEL |
| Mock auth | Session persistence, login/logout UI |
| Zod validation | Auth and workspace DTOs |
| TanStack Query | Query client, mock API layer |

**Exit criteria:** User can sign in (mock), session persists, protected routes work.

---

# Phase 2 — Workspaces

**Branch:** `feature/workspace-list-and-crud`

| Deliverable | Description |
| ----------- | ----------- |
| Workspace list | Grid/list with search |
| Create/edit workspace | Forms with RHF + Zod |
| Workspace settings | Name, description, members (mock) |
| Navigation | Sidebar, breadcrumbs |

**Exit criteria:** Full workspace CRUD with mock persistence.

---

# Phase 3 — Real-Time Infrastructure

**Branch:** `feature/realtime-core`

| Deliverable | Description |
| ----------- | ----------- |
| Socket client | Connection, reconnect, room join |
| Event layer | Normalized domain events, Zod payloads |
| Mock WebSocket server | Dev-time mock handler |
| Connection status UI | Reconnect overlay, offline banner |
| Presence store | Online users per room |

**Exit criteria:** Two browser tabs show shared connection and presence.

---

# Phase 4 — Canvas Core

**Branch:** `feature/canvas-viewport-and-tools`

| Deliverable | Description |
| ----------- | ----------- |
| Infinite canvas | Pan, zoom, viewport store |
| Toolbar | Tool selection, zoom controls |
| Selection | Click, multi-select, handles |
| dnd-kit integration | Drag objects on canvas |

**Exit criteria:** Smooth pan/zoom canvas with tool switching.

---

# Phase 5 — Collaborative Sync

**Branch:** `feature/sync-optimistic-updates`

| Deliverable | Description |
| ----------- | ----------- |
| Sync layer | Optimistic create/update/delete |
| Conflict handling | Last-write-wins + user feedback |
| Live cursors | Broadcast cursor position |
| Selection sync | Show others' selections |

**Exit criteria:** Two tabs edit canvas with optimistic sync and live cursors.

---

# Phase 6 — Blocks (Sticky Notes, Text, Shapes)

**Branches:** `feature/blocks-sticky-notes`, `feature/blocks-shapes-text`

| Deliverable | Description |
| ----------- | ----------- |
| Block registry | Extensible block type system |
| Sticky notes | Create, edit, color, resize |
| Text blocks | Rich text (basic) |
| Shapes | Rectangle, ellipse, connectors (basic) |

---

# Phase 7 — Tasks, Comments, Activity

**Branches:** per module

| Module | Key features |
| ------ | ------------ |
| Tasks | Status, assignee, embedded on canvas |
| Comments | Threads on objects |
| Activity | Event feed |

---

# Phase 8 — Command Palette & Search

**Branch:** `feature/command-palette-search`

| Deliverable | Description |
| ----------- | ----------- |
| Command palette | Raycast-style, keyboard nav |
| Global search | Workspaces, blocks |
| Keyboard shortcuts | Shortcut registry + hints |

---

# Phase 9 — Notifications & History

**Branch:** `feature/notifications-history`

---

# Phase 10 — Polish & Performance

**Branches:** `perf/*`, `refactor/*`

| Focus | Items |
| ----- | ----- |
| Performance | Virtualization, memoization, code splitting |
| Accessibility | WCAG 2.1 AA audit |
| Testing | Critical path coverage |
| Deploy | Vercel configuration |

---

# Git Discipline

- Initial commit on `main`: docs + agent network only
- All implementation on feature branches
- Conventional Commits per logical change
- PR review checklist before merge

---

# Human Approval Required

- Real backend/database integration
- Auth provider integration (OAuth, etc.)
- Production infrastructure changes
- Scope changes to P0 modules
