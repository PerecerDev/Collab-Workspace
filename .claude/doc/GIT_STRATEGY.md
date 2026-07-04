# Collab Workspace — Git Strategy

Version: 1.0  
Status: Active

---

# Purpose

Defines professional Git workflow for Collab Workspace. All agents and contributors must follow this strategy.

Related: `GIT_BRANCHING.md`, `GIT_COMMITS.md`, `DEVELOPMENT_WORKFLOW.md`.

---

# Core Principles

1. **`main` is sacred** — always deployable; never commit directly
2. **One branch, one responsibility** — no mixed features/fixes/docs
3. **Small, frequent commits** — easy review and bisect
4. **Conventional Commits** — readable history for portfolio reviewers
5. **PR before merge** — CI green, linked plan, peer/agent review
6. **Docs with code** — update SSOT when patterns change, before merge

---

# Workflow Overview

```
main (protected)
  ↑ PR (squash or merge per team preference — prefer merge commit for feature history)
feature/<scope>  ← all development starts here
fix/<scope>
refactor/<scope>
perf/<scope>
docs/<scope>
test/<scope>
ci/<scope>
chore/<scope>
```

## Daily flow

1. `git fetch origin`
2. `git checkout main && git pull`
3. `git checkout -b feature/<descriptive-name>`
4. Implement with small commits
5. Push branch, open PR
6. Address review, merge to `main`
7. Delete branch after merge

---

# Branch Protection (Target)

- Require PR to merge to `main`
- Require CI passing
- No force-push to `main`
- Prefer linear history on `main` via squash or rebase-at-merge (team choice documented in ADR if needed)

---

# What Belongs on `main`

- Merged, reviewed, tested work only
- Version bumps and release tags (when applicable)
- Never WIP, experiments, or multi-feature bundles

---

# Agent Responsibilities

| Role | Git responsibility |
| ---- | ------------------ |
| PM | Ensures branch naming in plans; blocks work on `main` |
| All engineering agents | Commit discipline, focused branches |
| DevOps Engineer | CI branch rules, protected branches |
| Technical Writer | `docs/*` branches for doc-only changes |
| QA | Validates PR checklist before sign-off |

---

# Release & Tags (Future)

When releases exist:

- Tag on `main`: `v1.0.0`
- Changelog from Conventional Commits

---

# Anti-Patterns

- Committing directly to `main`
- Long-lived branches without rebasing on `main`
- Mega-PRs spanning unrelated modules
- Generic commit messages (`fix stuff`, `updates`, `WIP`)
- Mixing refactor + feature in one branch
