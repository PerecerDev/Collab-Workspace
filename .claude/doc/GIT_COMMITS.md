# Collab Workspace — Git Commit Strategy

Version: 1.0  
Status: Active

---

# Purpose

Conventional Commits standards for readable, professional history.

Parent: `GIT_STRATEGY.md`.

---

# Format

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

## Rules

- **Imperative mood** in subject: "add" not "added"
- **Lowercase** subject (after type)
- **No period** at end of subject
- **Max ~72 chars** for subject line
- **Body** explains why, not what (when needed)
- **One logical change** per commit

---

# Types

| Type | When |
| ---- | ---- |
| `feat` | New user-facing capability |
| `fix` | Bug fix |
| `refactor` | Code change without behavior change |
| `perf` | Performance improvement |
| `test` | Tests only |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `build` | Build system, dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance, tooling |
| `revert` | Revert previous commit |

---

# Scopes (Examples)

Use feature or layer name:

- `feat(canvas): add sticky note block`
- `fix(sync): rollback optimistic update on conflict`
- `feat(presence): throttle cursor broadcasts`
- `docs(git): add branching strategy`
- `test(realtime): mock socket reconnect flow`

---

# Good Commits

```
feat(workspace): add workspace list route and empty state

fix(presence): clean up cursor listener on unmount

refactor(sync): extract optimistic mutation helper

docs(architecture): document event layer contracts

test(canvas): cover viewport pan bounds
```

---

# Bad Commits (Forbidden)

```
update
fix bug
WIP
changes
feat: stuff
feat(canvas): add sticky notes and fix auth and update docs
```

---

# Commit Granularity

| Do | Don't |
| -- | ----- |
| Commit after each logical unit | One giant commit at end |
| Separate refactor from feature | Hide refactor inside feat commit |
| Docs commit before or with related code | Leave docs stale |
| Revert in dedicated `revert:` commit | Force-push shared branches without agreement |

---

# Breaking Changes

```
feat(api)!: rename workspace event payload fields

BREAKING CHANGE: event `blockId` renamed to `objectId`
```

---

# Relation to PR

- PR title should follow Conventional Commits (often matches squash commit)
- PR description links plan and summarizes acceptance criteria
- Squash merge: ensure final message represents full change accurately

---

# Agent Enforcement

Engineering agents must:

- Reject mixed-purpose commits in review
- Request split when feature + refactor combined
- Verify commit messages before Engineering Guardian sign-off
