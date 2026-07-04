# Collab Workspace — Project Structure

Version: 1.0  
Status: Active

---

# Purpose

Defines repository layout, feature organization, naming conventions, and where code belongs.

---

# Core Principles

## Feature-Based Organization

Code is organized by **business domain** (workspace, canvas, presence, blocks, auth), not by technical layer at the top level.

## Co-Locate Related Code

Keep components, hooks, services, stores, types, and tests close to the feature that owns them.

## Real-Time & Sync Layers

Cross-cutting real-time infrastructure lives in `src/realtime/` and `src/sync/` — features consume via hooks and event contracts, not raw socket calls.

## Shared vs Feature-Specific

| Location                 | Belongs here                                    |
| ------------------------ | ----------------------------------------------- |
| `src/features/<name>/`   | Domain-specific UI and logic                    |
| `src/realtime/`          | Socket client, rooms, presence infrastructure   |
| `src/sync/`              | Optimistic updates, conflict resolution         |
| `src/shared/components/` | Design system primitives (Button, Input, Modal) |
| `src/shared/hooks/`      | Generic hooks (useMediaQuery, useDebounce)      |
| `src/shared/lib/`        | Query client, API client, constants             |
| `src/app/`               | Router, providers, root layout                  |

## Clear Boundaries

Features must not import from sibling features' internals. Cross-feature needs go through `shared/`, `realtime/`, `sync/`, or public feature APIs (`features/workspace/index.ts`).

---

# Root Structure (Target)

```
collab-workspace/
├── .claude/                 # Agent network, plans, reports, decisions
│   ├── agents/
│   ├── doc/                 # SSOT documentation
│   ├── design-team/
│   ├── engineering-team/
│   ├── plans/
│   ├── reports/
│   └── decisions/
├── .github/workflows/       # CI
├── public/
├── src/
│   ├── app/
│   ├── features/
│   ├── realtime/
│   ├── sync/
│   ├── shared/
│   ├── assets/
│   └── styles/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
├── README.md
└── CLAUDE.md                # PM orchestration
```

---

# Feature Module Structure

```
src/features/canvas/
├── components/
│   ├── CanvasSurface.tsx
│   ├── CanvasToolbar.tsx
│   └── ViewportControls.tsx
├── hooks/
│   └── useCanvasViewport.ts
├── services/
│   └── canvasService.ts
├── stores/
│   └── canvasToolStore.ts
├── types/
│   └── canvas.types.ts
├── utils/
│   └── viewportMath.ts
├── index.ts                 # Public API
└── __tests__/
```

---

# Naming Conventions

| Item | Convention | Example |
| ---- | ---------- | ------- |
| Components | PascalCase | `WorkspaceCard.tsx` |
| Hooks | camelCase, `use` prefix | `usePresence.ts` |
| Services | camelCase + Service | `workspaceService.ts` |
| Types file | camelCase + `.types.ts` | `block.types.ts` |
| Tests | `*.test.ts(x)` colocated | `useSync.test.ts` |
| Events | dot or colon namespaced | `block.updated`, `presence:cursor` |

---

# Import Rules

- Use path aliases (`@/features/...`, `@/shared/...`, `@/realtime/...`)
- No deep imports into another feature's internals
- `shared/` must not import from `features/`
- `realtime/` and `sync/` must not import feature UI components

---

# Where Code Does NOT Belong

| Anti-pattern | Correct location |
| ------------ | ---------------- |
| Socket logic in canvas component | `realtime/` + hook |
| Sync rollback in button handler | `sync/` + mutation hook |
| Generic Button in feature folder | `shared/components/` |
| Business types duplicated | `DATA_MODEL.md` + single types file |

---

# Documentation Location

| Content | Location |
| ------- | -------- |
| SSOT product/tech docs | `.claude/doc/` |
| ADRs | `.claude/decisions/` |
| Feature plans | `.claude/plans/` |
| Agent definitions | `.claude/agents/` |

Do not duplicate SSOT in feature READMEs — link instead.
