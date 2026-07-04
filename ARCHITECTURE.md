# Collab Workspace — Architecture

High-level technical architecture for the Collab Workspace platform.

For SSOT details see [`.claude/doc/TECH_ARCHITECTURE.md`](.claude/doc/TECH_ARCHITECTURE.md).

---

## Overview

Collab Workspace is a **feature-based React SPA** with dedicated layers for real-time transport and state synchronization. The frontend is mock-first: services and WebSocket handlers mirror future API contracts.

```
┌─────────────────────────────────────────────────────────┐
│                      App Shell                          │
│  Router · Providers · Layout · Theme                  │
├─────────────────────────────────────────────────────────┤
│                    Feature Modules                      │
│  auth · workspace · canvas · blocks · settings · …    │
├──────────────┬──────────────────────┬───────────────────┤
│   shared/    │     realtime/        │      sync/        │
│  UI · hooks  │  socket · rooms ·    │  optimistic ·     │
│  lib · types │  presence · events   │  conflicts        │
└──────────────┴──────────────────────┴───────────────────┘
```

---

## Layers

| Layer     | Path            | Responsibility                      |
| --------- | --------------- | ----------------------------------- |
| App       | `src/app/`      | Router, providers, root layout      |
| Features  | `src/features/` | Domain UI, hooks, services, stores  |
| Real-time | `src/realtime/` | WebSocket client, event dispatch    |
| Sync      | `src/sync/`     | Optimistic updates, rollback        |
| Shared    | `src/shared/`   | Design system, utilities, constants |

---

## State Strategy

- **TanStack Query** — async data (workspaces, users, metadata)
- **Zustand** — theme, viewport, tools, connection status
- **Feature stores** — collaborative document state with clear ownership
- **Local state** — forms, hover, transient UI

---

## Real-Time First

Every collaborative feature defines:

1. Event contract (Zod-validated payload)
2. Optimistic path
3. Conflict path
4. Reconnect path
5. Presence path

---

## Development Phases

See [`.claude/plans/collab-workspace-master-plan.md`](.claude/plans/collab-workspace-master-plan.md).

---

## Key Decisions

| Decision                 | Rationale                                        |
| ------------------------ | ------------------------------------------------ |
| Feature-based folders    | Domain ownership, scalable teams                 |
| Mock API layer           | Frontend-first; swap backend without UI rewrites |
| Tailwind semantic tokens | Light/dark theming, design system consistency    |
| Socket.IO client         | Room-based presence, reconnect, broadcast        |
| dnd-kit                  | Accessible drag-and-drop on canvas               |

ADRs live in [`.claude/decisions/`](.claude/decisions/).
