# Contributing to Collab Workspace

Thank you for contributing. This project follows professional open-source practices.

---

## Prerequisites

- Node.js 20+
- npm 10+

---

## Setup

```bash
git clone <repo-url>
cd collab-workspace
npm install
npm run dev
```

---

## Scripts

| Command             | Description      |
| ------------------- | ---------------- |
| `npm run dev`       | Start dev server |
| `npm run build`     | Production build |
| `npm run test`      | Run tests        |
| `npm run lint`      | ESLint           |
| `npm run format`    | Prettier write   |
| `npm run typecheck` | TypeScript check |

---

## Git Workflow

1. **Never commit directly to `main`**
2. Create a branch: `feature/`, `fix/`, `refactor/`, etc.
3. Use **Conventional Commits** — see [`.claude/doc/GIT_COMMITS.md`](.claude/doc/GIT_COMMITS.md)
4. One logical change per commit
5. Open a PR with test plan

---

## Code Standards

- TypeScript strict mode
- Feature-based architecture — see [`.claude/doc/PROJECT_STRUCTURE.md`](.claude/doc/PROJECT_STRUCTURE.md)
- Accessible UI (WCAG 2.1 AA target)
- Tests for critical logic and complex components
- No secrets in commits

---

## Documentation

Update relevant docs when changing architecture or behavior:

- `ARCHITECTURE.md`
- `CHANGELOG.md`
- `ROADMAP.md`
- `.claude/doc/` SSOT files (for product/tech decisions)

---

## Agent Network

Development is orchestrated by an AI agent team. See [`CLAUDE.md`](CLAUDE.md).
