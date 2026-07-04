# Roadmap

Collab Workspace development roadmap. See the [master plan](.claude/plans/collab-workspace-master-plan.md) for full detail.

---

## Phase 0 — Foundation ✅

- [x] Project scaffold (Vite, React, TS)
- [x] Tailwind design tokens + dark mode
- [x] App shell + routing
- [x] Design system primitives
- [x] Quality toolchain (ESLint, Prettier, Husky, Vitest)
- [x] CI pipeline

---

## Phase 1 — Auth & Domain Types ✅

- [x] Domain types (User, Workspace, CanvasObject)
- [x] Mock auth session
- [x] Protected routes
- [x] Zod validation

---

## Phase 2 — Workspaces ✅ (in progress)

- [x] Workspace CRUD with mock persistence
- [x] Workspace list with search
- [x] Create and edit workspace forms
- [x] Workspace settings and members (mock)
- [x] Sidebar navigation and breadcrumbs

---

## Phase 3 — Real-Time Infrastructure

- [ ] WebSocket client + reconnect
- [ ] Event layer with Zod payloads
- [ ] Mock WebSocket server
- [ ] Presence store

---

## Phase 4 — Canvas Core

- [ ] Infinite canvas (pan/zoom)
- [ ] Toolbar + tool selection
- [ ] Selection system
- [ ] dnd-kit integration

---

## Phase 5 — Collaborative Sync

- [ ] Optimistic updates
- [ ] Conflict handling
- [ ] Live cursors
- [ ] Selection sync

---

## Phase 6+ — Blocks, Tasks, Comments, Palette, Polish

See master plan for Phases 6–10.

---

## Long-Term

- Real backend integration (requires approval)
- OAuth authentication
- AI-assisted workflows
- Deploy to Vercel
