# Collab Workspace — Engineering Team

## Propósito

Equipo oficial de ingeniería para **Collab Workspace**.

Objetivo: codebase frontend de calidad portfolio — colaboración en tiempo real, sync, mantenible, tipada, testeada, performante — con arquitectura feature-based.

**Fuente de verdad:** Lee los documentos en `.claude/doc/` (ver `doc/README.md`). `CONSTITUTION.md` prevalece.

---

# Filosofía Técnica

1. La solución más simple que cumple el quality bar
2. Colaboración y sync como ciudadanos de primera clase
3. No construir backend hasta aprobación explícita
4. Mantenibilidad > sofisticación
5. Type safety y tests son parte del producto
6. Reutilizar design system y shared hooks
7. Performance (canvas + real-time) y accesibilidad son requisitos
8. Git profesional: nunca en `main`, Conventional Commits
9. Cada PR debe impresionar a un senior frontend reviewer

Ver `doc/TECH_ARCHITECTURE.md`, `doc/DEVELOPMENT_WORKFLOW.md`, `doc/GIT_STRATEGY.md`.

---

# Stack Oficial

| Área         | Tecnología                           |
| ------------ | ------------------------------------ |
| UI           | React, TypeScript, Vite              |
| Routing      | React Router                         |
| Server state | TanStack Query                       |
| Client state | Zustand                              |
| Real-time    | WebSockets, Socket.IO (o equivalente)|
| Sync         | Optimistic UI, event layer           |
| Styling      | Tailwind CSS                         |
| DnD          | dnd-kit (preferido)                  |
| Motion       | Framer Motion                        |
| Forms        | React Hook Form + Zod                |
| Tests        | Vitest, React Testing Library        |
| Quality      | ESLint, Prettier, Husky, lint-staged |
| Deploy       | Vercel                               |
| CI           | GitHub Actions                       |
| AI dev       | Cursor agents, MCP, Copilot          |

**No en scope:** Next.js, PostgreSQL, SSR (salvo enmienda a constitución).

---

# Reglas Globales

Antes de aprobar, aplicar Decision Framework y responder:

1. ¿Resuelve el requisito con el patrón existente?
2. ¿Contempla multi-usuario, sync y reconnect?
3. ¿Hay alternativa más simple?
4. ¿Es testeable y tipada?
5. ¿Respeta PROJECT_STRUCTURE y feature boundaries?
6. ¿Afecta performance de canvas o bundle?
7. ¿Otro dev lo entenderá en 6 meses?
8. ¿Branch y commits cumplen Git SSOT?

---

# Formato de Respuesta Obligatorio

## Análisis

## Riesgos

## Recomendaciones

## Impacto

## Prioridad (Baja | Media | Alta | Crítica)

## Veredicto (APROBADO | APROBADO CON CAMBIOS | RECHAZADO)

---

# Equipo de Ingeniería

| #   | Rol                         | Agent File                          | Notas                              |
| --- | --------------------------- | ----------------------------------- | ---------------------------------- |
| 01  | Technical Product Owner     | `technical-product-owner.md`        | User stories, priorización         |
| 02  | Software Architect          | `software-architect.md`             | Plan técnico, ADRs                 |
| 03  | Context Guardian            | `context-guardian.md`               | Coherencia, duplicados             |
| 04  | Data Model Architect        | `data-model-architect.md`           | Types, events, Zod, mocks          |
| 05  | Real-Time Engineer          | `real-time-engineer.md`             | WebSockets, presence, events       |
| 06  | State Sync Engineer         | `state-sync-engineer.md`            | Optimistic UI, conflictos          |
| 07  | Product Engineer            | `product-engineer.md`               | Integración end-to-end             |
| 08  | Canvas Interaction Engineer | `canvas-interaction-engineer.md`    | Canvas, dnd-kit, spatial UI        |
| 09  | Senior Frontend Developer   | `senior-frontend-developer.md`      | Brief + review (par)               |
| 10  | Frontend Developer          | `frontend-developer.md`             | Implementación UI                  |
| 11  | TypeScript Specialist       | `typescript-specialist.md`          | Types, generics, strictness        |
| 12  | Testing Engineer            | `testing-engineer.md`               | Vitest, RTL, sync tests            |
| 13  | AI Systems Engineer         | `ai-systems-engineer.md`            | Features IA (si aplica)            |
| 14  | AI Code Reviewer            | `ai-code-reviewer.md`               | Review automatizado                |
| 15  | Security Engineer           | `security-engineer.md`              | OWASP frontend                     |
| 16  | Performance Engineer        | `performance-engineer.md`           | Canvas, bundle, CWV                |
| 17  | QA Engineer                 | `qa-engineer.md`                    | Acceptance, regresión              |
| 18  | Staff Engineer              | `staff-engineer.md`                 | Deuda técnica                      |
| 19  | Refactoring Specialist      | `refactoring-specialist.md`         | On-demand, no gate                 |
| 20  | DevOps Engineer             | `devops-engineer.md`                | CI/CD, Vercel, branch rules        |
| 21  | Engineering Guardian        | `engineering-guardian.md`           | Aprobación final (veto)            |

**Eliminados:** Backend Developer, Senior Backend Developer, Database Administrator, Cardilan Engineering Guardian.

---

# Flujo Oficial (18 pasos + DevOps paralelo)

```
TPO → Software Architect → Context Guardian → Data Model Architect
  → Real-Time Engineer → State Sync Engineer
  → Product Engineer → Canvas Interaction Engineer
  → Senior FE (+ Frontend Dev) → TypeScript Specialist
  → Testing Engineer → AI Systems Engineer (si aplica) → AI Code Reviewer
  → Security Engineer → Performance Engineer
  → QA Engineer → Staff Engineer → Engineering Guardian
```

**DevOps Engineer:** CI/CD, Vercel, branch protection — en paralelo al inicio o cuando el plan lo requiera.

**Refactoring Specialist:** invocado por PM bajo recomendación de Staff o Senior FE; no bloquea pipeline estándar.

---

# Handoffs Clave

| De                        | A                         | Entrega                                      |
| ------------------------- | ------------------------- | -------------------------------------------- |
| Software Architect        | Context Guardian          | Plan por rol, contratos, branch sugerida     |
| Data Model Architect      | Real-Time Engineer        | Types, event payloads, Zod schemas           |
| Real-Time Engineer        | State Sync Engineer       | Event contracts, rooms, presence spec        |
| State Sync Engineer       | Product Engineer          | Sync strategy, optimistic/rollback rules     |
| Product Engineer          | Canvas Interaction Engineer | Integración feature + canvas boundaries    |
| Canvas Interaction Engineer | Senior Frontend Developer | Spatial interaction spec, DnD patterns   |
| Design Guardian (design)  | Senior Frontend Developer | Specs UI aprobados                           |
| Senior Frontend Developer | Frontend Developer        | Brief paso a paso                            |
| Frontend Developer        | Senior Frontend Developer | PR/code para review                          |
| Real-Time + State Sync    | Performance Engineer      | Cross-review: throttle, batching             |
| TypeScript Specialist     | Testing Engineer          | Types aprobados                              |
| Engineering Guardian      | PM                        | Veredicto final                              |

---

# Revisiones Cruzadas

| Área | Revisores |
| ---- | --------- |
| Event payloads | Real-Time ↔ Data Model ↔ TypeScript |
| Optimistic paths | State Sync ↔ Product Engineer ↔ Testing |
| Canvas perf | Canvas Interaction ↔ Performance |
| Presence UX | Real-Time ↔ UX (design) ↔ Accessibility |
| Security inbound events | Real-Time ↔ Security |

---

# Criterios de Entrega

Feature entregable cuando:

- Plan aprobado ejecutado en branch dedicada
- Real-time/sync revisados si aplica
- Definition of done (`DEVELOPMENT_WORKFLOW.md`) cumplida
- Commits Conventional; PR merged vía proceso
- Security, Performance, QA sin bloqueos críticos
- Staff Engineer aprueba sostenibilidad
- **Engineering Guardian APROBADO**

---

# Objetivo Final

Demostrar ingeniería frontend avanzada: colaboración en tiempo real, arquitectura escalable, UX pulida, Git discipline — listo para portfolio profesional.
