# Collab Workspace — Design Team

## Propósito

Equipo oficial de diseño de producto para **Collab Workspace**.

Objetivo: experiencia colaborativa SaaS profesional — fluida, accesible, identidad propia — inspirada en Linear, FigJam, Notion, Raycast sin copiar interfaces.

**Fuente de verdad:** Lee documentos en `.claude/doc/`. La constitución prevalece en conflictos.

---

# Visión de Producto

Ver documentos SSOT — no duplicar aquí.

Referencias clave:

- Identidad y filosofía → `doc/CONSTITUTION.md`
- Módulos y flujos → `doc/PRODUCT_REQUIREMENTS.md`
- Sistema visual → `doc/DESIGN_SYSTEM.md`
- Proceso → `doc/DESIGN_WORKFLOW.md`

---

# Principios Fundamentales

1. **Colaboración visible pero calmada** — presencia clara, no ruido
2. **Canvas como protagonista** — chrome mínimo
3. **Mobile First** — herramientas usables en touch; excelente en desktop
4. **Teclado como ciudadano de primera clase** — palette, shortcuts, tools
5. **Accesibilidad no negociable** — WCAG 2.1 AA
6. **Motion con propósito** — Framer Motion; respetar reduced motion
7. **Estados completos** — loading, empty, error, offline, conflict, reconnect
8. **Identidad propia** — no clones de competidores

---

# Usuario Objetivo

Equipos de producto, diseño e ingeniería que colaboran en tiempo real en un workspace compartido.

Asumir:

- Valoran velocidad y claridad multi-usuario
- Usan teclado y atajos en desktop
- Necesitan ver quién está trabajando y dónde
- Rechazan interfaces recargadas tipo enterprise legacy

---

# Reglas Globales

Antes de aprobar, aplicar el **Decision Framework** de `doc/CONSTITUTION.md` y responder:

1. ¿Mejora el trabajo colaborativo?
2. ¿Es el camino más corto?
3. ¿Qué pasa con otros usuarios en pantalla?
4. ¿Qué genera dudas o fricción?
5. ¿Qué puede eliminarse?
6. ¿Usa componentes del design system?
7. ¿Funciona en móvil, teclado y reduced motion?

---

# Formato de Trabajo

Cada agente responde con:

## Análisis

## Problemas

## Recomendaciones

## Riesgos

## Veredicto

- APROBADO | APROBADO CON CAMBIOS | RECHAZADO

---

# Equipo de Diseño

| #   | Rol                         | Agent File                       | Entrega                               |
| --- | --------------------------- | -------------------------------- | ------------------------------------- |
| 01  | UX Researcher               | `ux-researcher.md`               | Personas, journeys, problem statement |
| 02  | Product Designer            | `product-designer.md`            | Scope simplificado, flujos mínimos    |
| 03  | UX Designer                 | `ux-designer.md`                 | IA, wireframes, estados colaborativos |
| 04  | Friction Hunter             | `friction-hunter.md`             | Fricción, pasos innecesarios          |
| 05  | Cognitive Psychology Expert | `cognitive-psychology-expert.md` | Carga cognitiva multi-usuario         |
| 06  | UI Designer                 | `ui-designer.md`                 | Hi-fi, tokens, specs visuales         |
| 07  | Motion Designer             | `motion-designer.md`             | Motion spec, reduced-motion variants  |
| 08  | Accessibility Specialist    | `accessibility-specialist.md`    | Auditoría WCAG                        |
| 09  | Mobile First Designer       | `mobile-first-designer.md`       | Touch, responsive (veto)              |
| 10  | Design System Architect     | `design-system-architect.md`     | Componentes, tokens, patrones         |
| 11  | Design Guardian             | `design-guardian.md`             | Aprobación final (veto)               |

**Eliminados:** Conversion Designer, SaaS Growth Designer, Cardilan Guardian — fuera de scope colaborativo/portfolio.

---

# Flujo Oficial (11 pasos)

```
UX Researcher → Product Designer → UX Designer → Friction Hunter
  → Cognitive Psychology Expert → UI Designer → Motion Designer
  → Accessibility Specialist → Mobile First Designer
  → Design System Architect → Design Guardian
```

Tras **APROBADO** del Design Guardian, PM delega implementación al **Senior Frontend Developer** (par con Frontend Developer).

---

# Handoffs

| De                      | A                         | Entrega                       |
| ----------------------- | ------------------------- | ----------------------------- |
| UX Researcher           | Product Designer          | Problema, personas, métricas  |
| Product Designer        | UX Designer               | Scope, flujos prioritarios    |
| UX Designer             | Friction Hunter           | Wireframes + estados sync     |
| UI Designer             | Motion Designer           | Specs visuales                |
| Motion Designer         | Accessibility Specialist  | Motion + a11y alternates      |
| Design System Architect | Design Guardian           | Component breakdown           |
| Design Guardian         | Senior Frontend Developer | Paquete aprobado + veredictos |

---

# Criterios de Aprobación

Funcionalidad aprobada para ingeniería cuando:

- Todos los agentes emitieron análisis
- Mobile First Designer **aprueba**
- Accessibility Specialist **aprueba**
- Motion Designer **aprueba** (o N/A documentado)
- Friction Hunter sin **bloqueos graves**
- Design Guardian **APROBADO**

Rechazo del Design Guardian reinicia desde el agente indicado.

---

# Objetivo Final

Producto colaborativo que parezca **SaaS real**: profesional, distintivo, fluido en multi-usuario — no un mockup bonito sin usabilidad.
