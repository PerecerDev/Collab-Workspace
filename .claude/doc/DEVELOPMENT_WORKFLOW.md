# Collab Workspace — Development Workflow

Version: 1.0  
Status: Active

---

# Purpose

Defines how software is developed: lifecycle, standards, testing, PRs, Git discipline, and definition of done.

Related: `GIT_STRATEGY.md`, `GIT_BRANCHING.md`, `GIT_COMMITS.md`.

---

# Development Lifecycle

```
Request → BA Analysis → Plan Approval → Design Pipeline → Engineering Pipeline → QA → Delivery
```

No implementation without an approved plan in `.claude/plans/`.

**Never develop on `main`.** See Git documents.

---

# Git Discipline (Mandatory)

| Rule | Detail |
| ---- | ------ |
| Base branch | `main` is protected; integration only via PR |
| Work branches | One responsibility per branch — see `GIT_BRANCHING.md` |
| Commits | Conventional Commits — see `GIT_COMMITS.md` |
| PRs | Required; CI must pass; link to plan |
| Docs first | Update docs before commit when patterns change |

---

# Implementation Order (Within a Feature)

1. Create branch from latest `main` (`feature/<scope>`)
2. Types and data model alignment (`DATA_MODEL.md`)
3. Event contracts and sync strategy (Real-Time + State Sync review)
4. Service/mock API and mock WebSocket handlers
5. TanStack Query hooks + sync hooks
6. Shared UI primitives (if new)
7. Feature components (all states including reconnect/conflict)
8. Route integration
9. Tests (unit + component + sync integration)
10. Accessibility, motion (`prefers-reduced-motion`), responsive pass
11. Performance check (canvas, presence throttling)
12. Documentation updates
13. Small, focused commits throughout
14. PR → review → merge

---

# Coding Standards

## TypeScript

- `strict: true`
- Prefer `interface` for object shapes; `type` for unions/intersections
- No `any`; use `unknown` + narrowing
- Explicit return types on public APIs
- Zod schemas at system boundaries (API, WebSocket events)

## React

- Function components only
- One primary component per file
- Extract hooks when logic exceeds ~15 lines or is reused
- Keys on lists; no index keys for dynamic reorderable lists
- Cleanup socket/subscription listeners in `useEffect`

## Real-Time & Sync

- All WebSocket events typed and validated
- Optimistic updates with explicit rollback path
- No business logic in socket callback handlers — dispatch to event layer
- Throttle high-frequency events (cursors, pointer move)

## Styling

- Tailwind utility classes; extract patterns to components when repeated 3+ times
- Design tokens via Tailwind config
- Dark mode: `class` strategy on `html` or root

## Forms

- React Hook Form + Zod resolver
- Accessible labels, errors linked with `aria-describedby`
- Disable submit during pending mutation

## Motion

- Framer Motion for purposeful transitions
- Always respect `prefers-reduced-motion`
- No motion that blocks interaction on canvas tools

---

# PR Standards

Every PR includes:

- Summary of change and link to plan
- Branch type matches change (`feature/`, `fix/`, etc.)
- Screenshots/video for UI changes (light + dark if applicable)
- Real-time behavior notes if applicable
- Test coverage for new behavior
- No eslint/prettier violations
- Self-review checklist (a11y, responsive, states, reconnect)

---

# Testing Philosophy

- Test behavior, not implementation details
- Prioritize: sync flows, optimistic rollback, user flows, edge cases
- Mock services and mock socket in tests
- Coverage target: meaningful coverage on features, not 100% vanity

---

# Pre-Commit (Husky + lint-staged)

- ESLint on staged TS/TSX
- Prettier format
- Typecheck on CI

---

# AI-Assisted Development

- PM orchestrates via agent network (see `CLAUDE.md`)
- Agents read SSOT docs before acting
- Task reports in `.claude/reports/` for session memory
- Human approval for architecture, scope, and schema changes

---

# Definition of Done

A feature is done when:

- [ ] Acceptance criteria from plan met
- [ ] All UI states implemented (loading, empty, error, success, reconnect, conflict where applicable)
- [ ] Real-time/sync behavior documented and tested
- [ ] Responsive on mobile, tablet, desktop (where applicable)
- [ ] WCAG 2.1 AA checks passed (Design + a11y review)
- [ ] Tests written and passing
- [ ] No new lint/type errors
- [ ] Commits follow Conventional Commits; branch is focused
- [ ] Design Guardian + Engineering Guardian approved
- [ ] QA sign-off

---

# Local Development (When Code Exists)

```bash
npm install
npm run dev      # Vite dev server
npm run test     # Vitest
npm run lint
npm run build
```

Deploy preview via Vercel on PR.
