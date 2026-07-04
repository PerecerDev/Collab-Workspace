# Changelog

All notable changes to Collab Workspace are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added

- Vite + React 19 + TypeScript strict project scaffold
- Tailwind CSS v4 with semantic design tokens (light/dark)
- Feature-based folder structure per `PROJECT_STRUCTURE.md`
- App shell with routing (home, workspaces, canvas preview, settings)
- Design system primitives: Button, Input, Textarea, Avatar, Badge, Spinner
- Theme store with light/dark/system modes and persistence
- TanStack Query provider setup
- ESLint, Prettier, Husky, lint-staged toolchain
- Vitest + React Testing Library with initial component tests
- GitHub Actions CI workflow
- Master development plan (`.claude/plans/collab-workspace-master-plan.md`)
- Architecture, contributing, and roadmap documentation

### Added

- Domain types aligned with `DATA_MODEL.md` (User, Workspace, CanvasObject, etc.)
- Zod schemas for auth and workspace validation
- Mock auth service with localStorage session persistence
- Login page with React Hook Form + Zod
- Auth and guest route guards
- Workspace service with TanStack Query integration
- Auth service unit tests

---

### Added

- SSOT documentation and agent network
- Project constitution and product requirements
