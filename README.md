# Collab Workspace

A **real-time collaborative platform** for teams — built as a professional portfolio project demonstrating advanced frontend engineering.

Inspired by (not copying) FigJam, Miro, Excalidraw, Linear, and Notion. **Collab Workspace** has its own identity: a modern space where multiple users work simultaneously on shared workspaces, canvas, blocks, presence, and more.

---

## Status

**Architecture & agent network phase** — documentation and agent specialization complete. Application implementation has not started.

---

## Portfolio Goals

This project demonstrates:

- React + TypeScript architecture at scale
- Real-time collaboration (WebSockets, presence, cursors)
- State synchronization and optimistic UI
- Feature-based modular frontend
- UX, accessibility, performance, and testing discipline
- Professional Git workflow (branches, Conventional Commits)

---

## Stack (Target)

| Area | Technologies |
| ---- | ------------ |
| UI | React, TypeScript, Vite, React Router, Tailwind CSS |
| State | Zustand, TanStack Query |
| Real-time | WebSockets, Socket.IO (or equivalent) |
| Interactions | dnd-kit, Framer Motion |
| Forms | React Hook Form, Zod |
| Testing | Vitest, React Testing Library |
| Quality | ESLint, Prettier, Husky, lint-staged |
| Deploy | Vercel |

---

## Documentation

All product and technical SSOT lives in [`.claude/doc/`](.claude/doc/README.md).

Start with [`.claude/doc/CONSTITUTION.md`](.claude/doc/CONSTITUTION.md).

---

## Agent Network

Development is orchestrated by an autonomous AI agent team defined in:

- [`CLAUDE.md`](CLAUDE.md) — Project Manager
- [`.claude/design-team/DESIGN-TEAM.md`](.claude/design-team/DESIGN-TEAM.md) — Design pipeline
- [`.claude/engineering-team/ENGINEERING-TEAM.md`](.claude/engineering-team/ENGINEERING-TEAM.md) — Engineering pipeline
- [`.claude/agents/`](.claude/agents/) — Role definitions

---

## Git Workflow

- **Never develop on `main`**
- Branch prefixes: `feature/`, `fix/`, `refactor/`, `perf/`, `docs/`, `test/`, `ci/`, `chore/`
- **Conventional Commits** required

See [`.claude/doc/GIT_STRATEGY.md`](.claude/doc/GIT_STRATEGY.md).

---

## License

TBD — portfolio project.
