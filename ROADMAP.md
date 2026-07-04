# Roadmap

Collab Workspace development roadmap. See the [master plan](.claude/plans/collab-workspace-master-plan.md) for full detail.

---

## Phase 0 — Foundation ✅ (in progress)

- [x] Project scaffold (Vite, React, TS)
- [x] Tailwind design tokens + dark mode
- [x] App shell + routing
- [x] Design system primitives
- [x] Quality toolchain (ESLint, Prettier, Husky, Vitest)
- [x] CI pipeline
- [ ] Merge to main

---

## Phase 1 — Auth & Domain Types

- [ ] Domain types (User, Workspace, CanvasObject)
- [ ] Mock auth session
- [ ] Protected routes
- [ ] Zod validation

---

## Phase 2 — Workspaces

- [ ] Workspace CRUD
- [ ] Workspace list with search
- [ ] Settings and members (mock)

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
