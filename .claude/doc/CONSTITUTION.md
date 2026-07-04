# Collab Workspace — Constitution

## Single Source of Truth (SSOT)

Version: 1.0  
Status: Active  
Project: Collab Workspace

---

# Purpose

This document defines what Collab Workspace is, what it is not, and how decisions must be made across the project.

All agents, contributors, and documentation must treat this file as the primary source of truth.

If any task, proposal, feature, design, or technical decision conflicts with this document, **this document takes precedence**.

---

# Document Hierarchy

| Document                          | Role                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| **`CONSTITUTION.md`** (this file) | Product identity, philosophy, decision framework, and non-negotiable boundaries               |
| **`PRODUCT_REQUIREMENTS.md`**     | Features, scope, modules, flows, and functional requirements                                  |
| **`PRODUCT_WORKFLOW.md`**         | Idea-to-feature lifecycle, evaluation criteria, scope control, and approval rules             |
| **`TECH_ARCHITECTURE.md`**        | Stack, frontend architecture, real-time layer, state sync, security, and performance          |
| **`DEVELOPMENT_WORKFLOW.md`**     | Development lifecycle, coding standards, testing philosophy, PR standards, definition of done |
| **`GIT_STRATEGY.md`**             | Git workflow overview and professional version control discipline                               |
| **`GIT_BRANCHING.md`**            | Branch naming, lifecycle, and merge rules                                                       |
| **`GIT_COMMITS.md`**              | Conventional Commits standards and commit hygiene                                               |
| **`PROJECT_STRUCTURE.md`**        | Repository layout, feature organization, naming conventions, and import rules                 |
| **`DATA_MODEL.md`**               | Domain entities, types, DTOs, relationships, and mock-data conventions                        |
| **`DESIGN_SYSTEM.md`**            | Visual and UX principles, layout, typography, color, components, and anti-patterns            |
| **`DESIGN_WORKFLOW.md`**          | Design process, UX validation, decision rules, and design lifecycle                           |
| **`BRAND_GUIDELINES.md`**         | Product voice, messaging, UX writing, and communication principles                            |
| **`AGENT_OPERATING_SYSTEM.md`**   | How AI agents contribute — rules, responsibilities, and behavior standards                    |

Use all documents together. For **what the product is** and **how to decide**, follow this constitution. For **what to build**, follow `PRODUCT_REQUIREMENTS.md`. For **how to build it**, follow `TECH_ARCHITECTURE.md`, `DEVELOPMENT_WORKFLOW.md`, and `PROJECT_STRUCTURE.md`.

---

# Mission

Build a professional-grade **collaborative workspace** web application that demonstrates advanced frontend engineering — real-time collaboration, state synchronization, clean architecture, modern UX, accessibility, performance, and maintainability.

---

# Vision

Become a portfolio reference project: a SaaS-quality collaborative platform with its **own identity** — inspired by FigJam, Miro, Excalidraw, Linear, and Notion, but never a copy. It should feel as polished as tools teams use daily, not a demo.

---

# Core Belief

Great collaborative software feels **instant and calm**: multiple people can work together without friction, conflicts resolve predictably, and the interface stays responsive under load.

Complexity belongs in architecture, sync layers, and abstractions — never in the user's mental model.

---

# What Collab Workspace Is

Collab Workspace is a **modern real-time collaborative web platform** where teams work simultaneously on shared workspaces.

It is:

- A **React + TypeScript** SPA built with professional engineering practices
- A **portfolio showcase** for frontend expertise (real-time, architecture, UX, testing, performance)
- A **collaborative canvas + workspace** evolving toward blocks, diagrams, sticky notes, tasks, code, chat, presence, and activity
- An app designed to integrate **AI-assisted workflows** (agents, MCP, copilots) as augmentation — not replacement for clear UI

The primary value proposition is **fluid multi-user collaboration** with engineering quality as a first-class goal.

---

# What Collab Workspace Is Not

Collab Workspace is not:

- A clone of FigJam, Miro, Excalidraw, Linear, or Notion
- A backend-first or full-stack demo (backend is mock/WebSocket-ready initially)
- A rush MVP with shortcuts that compromise code quality
- A visual-only prototype without tests, types, sync discipline, or architecture
- A single-player whiteboard with "multiplayer" bolted on later
- A "pretty UI" without accessibility, responsive design, or performance discipline

---

# Target User

**Primary:** Product, design, and engineering teams who need a shared space to think, plan, and build together in real time.

**Secondary (portfolio audience):** Hiring managers and senior frontend engineers evaluating craft — real-time architecture, component design, state sync, testing, and polish.

Design and engineering decisions should serve **real collaborative use**, not gimmicks.

---

# Product Philosophy

## 1. Quality over speed of delivery

Prefer fewer features done well over many features done poorly.

## 2. Collaboration-first architecture

Every feature must consider: presence, concurrent edits, conflict handling, optimistic UI, and recovery.

## 3. Simplicity in the interface

Reduce steps, cognitive load, and visual noise. Inspired by Linear and Raycast — not enterprise clutter.

## 4. Architecture that scales

Feature-based structure, clear boundaries, event layer, API layer, reusable primitives. The codebase must remain pleasant to extend after dozens of features.

## 5. Type safety and testability

TypeScript strict mode, explicit contracts, tests for behavior that matters — especially sync and optimistic paths.

## 6. Accessibility by default

WCAG 2.1 AA is not optional. Keyboard navigation, focus management, screen reader support, and reduced-motion respect are part of "done."

## 7. Performance as UX

Perceived speed (skeleton states, optimistic updates, virtualization, canvas throttling) is part of the product experience.

## 8. AI as augmentation

AI features assist creation, organization, and contextual help — they do not replace clear UI or add opaque magic.

---

# Decision Framework

Before approving any feature, design, or implementation, answer:

1. Does it align with the mission and vision?
2. Does it improve collaborative work clarity or speed?
3. Does it handle multi-user scenarios (presence, conflicts, offline/reconnect)?
4. Does it increase unnecessary complexity for users or maintainers?
5. Is it consistent with the tech stack and architecture?
6. Can it be built with reusable patterns already in the codebase?
7. Does it meet accessibility and responsive requirements?
8. Is it testable and type-safe?
9. Would this impress a senior frontend reviewer — for the right reasons?

**Reject** proposals that add scope without user value, duplicate existing patterns, ignore real-time implications, or sacrifice quality for speed.

---

# Allowed vs Forbidden

## Allowed

- Feature-based folders and colocated code
- Mock auth and mock API/WebSocket layer until real backend is introduced
- Zustand for client/session UI state; TanStack Query for server/async data
- WebSockets / Socket.IO (or equivalent) for real-time events
- Optimistic updates with rollback on conflict
- dnd-kit or React DnD for spatial interactions
- Framer Motion for purposeful motion (respect `prefers-reduced-motion`)
- Command palette, keyboard shortcuts, dark mode
- Incremental delivery of modules (workspace shell → canvas → blocks → presence → …)
- AI integrations that respect user control and transparency

## Forbidden

- Implementing features outside approved plans
- Developing directly on `main` branch
- Global state for data that belongs in TanStack Query or the sync layer
- Inline styles or one-off components when design-system primitives exist
- `any` in TypeScript without documented exception
- Shipping UI without loading, empty, error, and reconnect states
- Skipping accessibility or mobile layout "for later"
- Real-time features without conflict/reconnect strategy
- Backend/database work unless explicitly scoped and approved
- Mixing unrelated changes in a single commit

---

# Non-Negotiable Engineering Standards

- React 18+ with TypeScript (strict)
- Vite, React Router, TanStack Query, Zustand, Tailwind CSS
- WebSockets / Socket.IO (or equivalent architecture)
- React Hook Form + Zod for forms
- dnd-kit (preferred) or React DnD for drag-and-drop
- Framer Motion for motion
- Vitest + React Testing Library for tests
- ESLint, Prettier, Husky, lint-staged
- Conventional Commits on feature branches
- Deployment target: Vercel
- Clean Code, SOLID (where applicable), DRY, KISS, composition over inheritance

---

# Authority

| Domain                              | Authority                                |
| ----------------------------------- | ---------------------------------------- |
| Product scope                       | Technical Product Owner + human client   |
| Design approval                     | Design Guardian (final gate)             |
| Engineering approval                | Engineering Guardian (final gate)        |
| Architecture                        | Software Architect (within constitution) |
| Real-time / sync architecture       | Real-Time Engineer + State Sync Engineer |
| Critical scope/architecture changes | Human client explicit approval           |

---

# Success Criteria

The project succeeds when:

- The app feels like a real collaborative SaaS product (UX, polish, consistency)
- Real-time collaboration is reliable, predictable, and performant
- The codebase demonstrates scalable frontend architecture
- Tests, types, and documentation support confident change
- A senior engineer reviewing the repo recognizes professional discipline
- Git history reflects months of professional incremental work
- Features deliver value without architectural debt that blocks future work
