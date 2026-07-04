# Collab Workspace

A **real-time collaborative platform** for teams — built as a professional portfolio project demonstrating advanced frontend engineering.

Inspired by (not copying) FigJam, Miro, Excalidraw, Linear, and Notion. **Collab Workspace** has its own identity: a modern space where multiple users work simultaneously on shared workspaces, canvas, blocks, presence, and more.

---

## Status

**Phase 0 — Foundation** — Application scaffold, design system, app shell, and CI are in place. Real-time collaboration arrives in Phases 3–5.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Stack

| Area         | Technologies                                              |
| ------------ | --------------------------------------------------------- |
| UI           | React 19, TypeScript, Vite, React Router, Tailwind CSS v4 |
| State        | Zustand, TanStack Query                                   |
| Real-time    | WebSockets, Socket.IO (Phase 3+)                          |
| Interactions | dnd-kit, Framer Motion                                    |
| Forms        | React Hook Form, Zod                                      |
| Testing      | Vitest, React Testing Library                             |
| Quality      | ESLint, Prettier, Husky, lint-staged                      |
| Deploy       | Vercel (planned)                                          |

---

## Project Structure

```
src/
├── app/          # Router, providers, layouts
├── features/     # Domain modules (workspace, canvas, …)
├── realtime/     # WebSocket infrastructure
├── sync/         # Optimistic sync layer
├── shared/       # Design system, hooks, lib
└── styles/       # Global CSS and tokens
```

See [ARCHITECTURE.md](ARCHITECTURE.md) and [`.claude/doc/PROJECT_STRUCTURE.md`](.claude/doc/PROJECT_STRUCTURE.md).

---

## Documentation

| Document                                | Description              |
| --------------------------------------- | ------------------------ |
| [ARCHITECTURE.md](ARCHITECTURE.md)      | Technical architecture   |
| [ROADMAP.md](ROADMAP.md)                | Development phases       |
| [CHANGELOG.md](CHANGELOG.md)            | Release history          |
| [CONTRIBUTING.md](CONTRIBUTING.md)      | Contribution guide       |
| [`.claude/doc/`](.claude/doc/README.md) | SSOT product & tech docs |

---

## Scripts

| Command             | Description        |
| ------------------- | ------------------ |
| `npm run dev`       | Development server |
| `npm run build`     | Production build   |
| `npm run test`      | Run tests          |
| `npm run lint`      | ESLint             |
| `npm run typecheck` | TypeScript check   |

---

## Git Workflow

- **Never develop on `main`**
- Branch prefixes: `feature/`, `fix/`, `refactor/`, `perf/`, `docs/`, `test/`, `ci/`, `chore/`
- **Conventional Commits** required

See [`.claude/doc/GIT_STRATEGY.md`](.claude/doc/GIT_STRATEGY.md).

---

## Agent Network

Development is orchestrated by an autonomous AI agent team:

- [`CLAUDE.md`](CLAUDE.md) — Project Manager
- [`.claude/design-team/DESIGN-TEAM.md`](.claude/design-team/DESIGN-TEAM.md)
- [`.claude/engineering-team/ENGINEERING-TEAM.md`](.claude/engineering-team/ENGINEERING-TEAM.md)

---

## License

TBD — portfolio project.
