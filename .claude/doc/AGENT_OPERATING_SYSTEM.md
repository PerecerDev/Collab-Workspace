# Collab Workspace — Agent Operating System

Version: 1.0  
Status: Active

---

# Purpose

Defines how AI agents contribute: rules, responsibilities, decision framework, and behavior standards.

Applies to all agents in `.claude/agents/` orchestrated via `CLAUDE.md`.

---

# Source of Truth Hierarchy

1. `CONSTITUTION.md`
2. `PRODUCT_REQUIREMENTS.md`
3. `PRODUCT_WORKFLOW.md`
4. `TECH_ARCHITECTURE.md`
5. `DEVELOPMENT_WORKFLOW.md`
6. `GIT_STRATEGY.md` / `GIT_BRANCHING.md` / `GIT_COMMITS.md`
7. `PROJECT_STRUCTURE.md`
8. `DATA_MODEL.md`
9. `DESIGN_SYSTEM.md`
10. `DESIGN_WORKFLOW.md`
11. `BRAND_GUIDELINES.md`
12. `AGENT_OPERATING_SYSTEM.md` (this file)
13. Task-specific instructions from PM

Higher document wins on conflict.

---

# Primary Responsibility

Agents **execute within the established framework** for Collab Workspace.

They do not reinvent product vision, stack, or scope without PM and client approval.

---

# Core Agent Principles

## Follow Existing Decisions

Do not reopen settled architecture or design without explicit PM request.

## Respect Product Boundaries

Frontend-first; mock API/WebSocket; no backend unless approved. Never develop on `main`.

## Collaboration-First Thinking

Every feature proposal must consider real-time, sync, and multi-user UX.

## Simplicity First

Simplest solution that meets requirements and quality bar.

## Quality Over Speed

Portfolio-grade code: types, tests, a11y, performance, Git discipline — not shortcuts.

## Consistency Over Novelty

Match existing patterns in codebase and docs.

## Type Safety

TypeScript strict; no silent `any`; Zod at boundaries.

---

# Decision Framework

Before proposing a solution:

1. Aligns with Constitution?
2. Handles multi-user / sync scenarios?
3. Increases user or maintainer complexity unnecessarily?
4. Reusable in other features?
5. Testable and accessible?
6. Consistent with TECH_ARCHITECTURE and PROJECT_STRUCTURE?
7. Appropriate agent owns this work?
8. Branch and commit strategy clear?

If any answer fails, revise or escalate to PM.

---

# Agent Behavior Standards

## All Agents

- Read relevant SSOT docs before acting
- Report to PM only (not client directly)
- Write task report to `.claude/reports/<agent>-task-report.json` on completion
- Never store secrets or PII in reports
- Emit structured output per role template
- Assume Git: feature branch + Conventional Commits

## Product Agents

- Tech-agnostic requirements (BA)
- User stories with testable acceptance criteria (TPO)

## Design Agents

- Format: Análisis, Problemas, Recomendaciones, Riesgos, Veredicto
- No implementation code

## Engineering Agents

- Format: Análisis, Riesgos, Recomendaciones, Impacto, Prioridad, Veredicto
- Follow DEVELOPMENT_WORKFLOW definition of done

## Real-Time Agents

- Must define event contracts, reconnect, and optimistic paths
- Cross-review with State Sync Engineer and Performance Engineer

---

# Escalation Rules

| Situation                   | Escalate to                   |
| --------------------------- | ----------------------------- |
| Scope ambiguity             | PM → client                   |
| Design conflict             | Design Guardian               |
| Architecture conflict       | Software Architect → PM       |
| Real-time/sync conflict     | Real-Time + State Sync → PM   |
| Security concern            | Security Engineer → PM        |
| Critical bug before release | QA → PM                       |
| Veto                        | Design / Engineering Guardian |
| Git/process violation       | PM + DevOps Engineer          |

---

# Anti-Patterns

- Skipping upstream pipeline steps
- Implementing without approved plan
- Developing on `main`
- Duplicating SSOT content in agent outputs
- Backend/database work without approval
- Real-time UI without sync strategy
- Approving own work without paired reviewer (Senior ↔ Developer)
- Feature code in `shared/` without generalization need
- Mixed commits or mega-branches

---

# Task Reports

Schema: `.claude/reports/README.md` (create on first use)

Senior owns pair reports for Senior ↔ Developer duos.

PM carries `persisted_data` forward between delegations.

---

# Definition of Success (Agents)

An agent succeeds when:

- Deliverable matches role charter
- SSOT alignment verified
- Real-time/sync implications addressed when relevant
- Next agent can continue without guessing
- Git branch strategy noted in handoff
- Task report persisted
- Quality gates respected
