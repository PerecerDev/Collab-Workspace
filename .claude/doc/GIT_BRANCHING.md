# Collab Workspace — Git Branching Strategy

Version: 1.0  
Status: Active

---

# Purpose

Branch naming, lifecycle, and responsibility rules.

Parent: `GIT_STRATEGY.md`.

---

# Branch Types

| Prefix | Use when | Example |
| ------ | -------- | ------- |
| `feature/` | New functionality | `feature/workspace-presence` |
| `fix/` | Bug fix | `fix/cursor-throttle-leak` |
| `refactor/` | Behavior-preserving restructure | `refactor/sync-event-layer` |
| `perf/` | Performance improvement | `perf/canvas-virtualization` |
| `docs/` | Documentation only | `docs/git-strategy` |
| `test/` | Test-only additions | `test/optimistic-rollback` |
| `ci/` | CI/CD pipeline | `ci/vitest-coverage-gate` |
| `chore/` | Tooling, deps, housekeeping | `chore/eslint-flat-config` |

---

# Naming Rules

- Lowercase, hyphen-separated
- Descriptive scope — reader understands purpose from name
- One logical change per branch
- Match branch name in plan: `.claude/plans/<feature>.md` → `feature/<feature>`

## Good

- `feature/canvas-sticky-notes`
- `fix/reconnect-event-replay`
- `refactor/extract-presence-hook`

## Bad

- `feature/stuff`
- `alex-wip`
- `feature/canvas-and-auth-and-dark-mode`

---

# Branch Lifecycle

1. **Create** from latest `main`
2. **Develop** with focused commits
3. **Sync** regularly: `git fetch && git rebase origin/main` (or merge `main` into branch if team prefers)
4. **Push** and open PR early for visibility (draft OK)
5. **Review** — design/engineering gates per feature
6. **Merge** to `main` when approved + CI green
7. **Delete** remote and local branch after merge

---

# Long-Running Features

If a feature spans multiple PRs:

- Use epic branch `feature/<epic>` only when necessary
- Prefer **stacked PRs** or incremental merges to `main`
- Each merged slice must be independently shippable

---

# Hotfixes

Critical production fixes:

- `fix/<issue>-<short-description>` from `main`
- Fast-track review; still no direct commit to `main`

---

# Documentation Branches

Doc-only changes use `docs/` prefix — no mixed code commits.

Agent network or SSOT updates: `docs/agent-network-collab-workspace`.

---

# Merge Strategy

Default: **merge commit** or **squash** per PR — choose one and stay consistent.

Portfolio goal: history should read as professional incremental work over months — avoid noisy WIP commits on `main`.
