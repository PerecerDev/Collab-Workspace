# Collab Workspace — Design Workflow

Version: 1.0  
Status: Active

---

# Purpose

Design process, UX validation, handoff rules, and design lifecycle for collaborative product.

---

# Design Pipeline (11 Steps)

```
UX Researcher → Product Designer → UX Designer → Friction Hunter
  → Cognitive Psychology Expert → UI Designer → Motion Designer
  → Accessibility Specialist → Mobile First Designer
  → Design System Architect → Design Guardian
```

Output format per agent: **Análisis, Problemas, Recomendaciones, Riesgos, Veredicto**.

---

# Collaborative Design Requirements

Every design must address:

1. **Multi-user context** — what others see when user acts
2. **Presence** — cursors, selection, avatars
3. **Sync feedback** — saving, conflict, offline
4. **Tool modes** — select, create, pan, comment
5. **Keyboard paths** — shortcuts and command palette
6. **Motion** — purposeful, reduced-motion alternative
7. **Mobile/tablet** — touch targets, simplified toolbar (Mobile First gate)

---

# Handoffs

| From | To | Deliverable |
| ---- | -- | ----------- |
| UX Researcher | Product Designer | Personas, journeys, problem statement |
| Product Designer | UX Designer | Scope, prioritized flows |
| UX Designer | Friction Hunter | Wireframes + all states |
| UI Designer | Motion Designer | Visual specs |
| Motion Designer | Accessibility Specialist | Motion spec + reduced-motion variant |
| Design System Architect | Design Guardian | Component breakdown |
| Design Guardian | Senior Frontend Developer | Approved package |

---

# Approval Gates

Engineering may start when:

- Mobile First Designer **approves**
- Accessibility Specialist **approves**
- Friction Hunter: no **bloqueos graves**
- Design Guardian: **APROBADO**

---

# Design Artifacts

Store in plan or linked docs — not duplicated in SSOT:

- Wireframes (ASCII or structured description)
- State matrix (solo, multi-user, offline, conflict)
- Token overrides if any
- Motion timing sheet
- Component list for Design System Architect

---

# Rejection Flow

Design Guardian **RECHAZADO** → restart from indicated step with feedback documented.
