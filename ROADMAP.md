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

## Phase 2 — Workspaces ✅

- [x] Workspace CRUD with mock persistence
- [x] Workspace list with search
- [x] Create and edit workspace forms
- [x] Workspace settings and members (mock)
- [x] Sidebar navigation and breadcrumbs

---

## Phase 3 — Real-Time Infrastructure ✅

- [x] WebSocket-ready client with mock BroadcastChannel transport
- [x] Event layer with Zod-validated payloads
- [x] Connection status store and UI
- [x] Presence store with room sync
- [x] Live cursors and avatar stack on canvas

---

## Phase 4 — Canvas Core ✅

- [x] Infinite canvas (pan, zoom, viewport store)
- [x] Toolbar and tool selection
- [x] Selection with multi-select and handles
- [x] dnd-kit object drag on canvas
- [x] Viewport controls and keyboard shortcuts

---

## Phase 5 — Collaborative Sync ✅

- [x] Optimistic canvas object sync via realtime events
- [x] Last-write-wins conflict resolver with user feedback
- [x] Cross-tab object create/move/edit sync
- [x] Remote selection indicators on canvas objects
- [x] Conflict banner and sync status UI

---

## Phase 6 — Blocks (Sticky Notes, Text, Shapes) (in progress)

- [ ] Extensible block type registry
- [ ] Sticky notes with color picker and resize
- [ ] Text blocks with basic editing
- [ ] Rectangle and ellipse shapes
- [ ] Block format bar and delete shortcut

---

## Phase 7+ — Tasks, Comments, Palette, Polish

See master plan for Phases 7–10.

---

## Long-Term

- Real backend integration (requires approval)
- OAuth authentication
- AI-assisted workflows
- Deploy to Vercel
