# Collab Workspace — Product Workflow

Version: 1.0  
Status: Active

---

# Purpose

Defines how ideas become features: lifecycle, evaluation, scope control, and approval gates.

---

# Idea-to-Feature Lifecycle

```
Client Request
    → Business Analyst (analysis)
    → PM clarification (if needed)
    → Technical Product Owner + Software Architect (plan)
    → Client approval of plan
    → Design Pipeline (11 steps)
    → Engineering Pipeline (18 steps)
    → QA validation
    → PM delivery
```

No feature enters implementation without **approved plan** in `.claude/plans/<feature-name>.md`.

---

# Evaluation Criteria

Before prioritizing a feature, score against:

| Criterion              | Question                                              |
| ---------------------- | ----------------------------------------------------- |
| User value             | Does it improve collaborative work?                   |
| Real-time impact       | Does it need presence/sync design?                    |
| Portfolio signal       | Does it demonstrate senior frontend skills?           |
| Dependency risk        | Does it block or depend on other modules?             |
| Complexity             | Can it be delivered incrementally?                    |
| Duplication            | Does another module already cover this?               |

---

# Scope Control

## In scope when approved

Features listed in `PRODUCT_REQUIREMENTS.md` with an approved plan.

## Out of scope by default

- Backend/database without client approval
- Competitor clones
- Features without real-time/sync consideration when collaborative
- Work on `main` branch

---

# Approval Rules

| Gate                    | Authority                          |
| ----------------------- | ---------------------------------- |
| Plan                    | Client + PM                        |
| Design                  | Design Guardian                    |
| Real-time architecture  | Real-Time Engineer + Architect     |
| Sync architecture       | State Sync Engineer + Architect    |
| Engineering             | Engineering Guardian               |
| Scope change            | Client explicit approval           |

---

# Feature Planning Template

Plans saved to `.claude/plans/<feature>.md` must include:

1. Summary and user value
2. User stories + acceptance criteria
3. Real-time/sync implications
4. Design dependencies
5. Technical approach (high level)
6. Git branch name (`feature/<name>`)
7. Rollout phases (if incremental)
8. Risks and open questions

---

# Incremental Delivery

Prefer vertical slices:

1. Workspace shell + routing
2. Canvas foundation + viewport
3. Real-time connection + presence
4. First block type + sync
5. Comments, activity, search — in planned order

Each slice must pass design and engineering gates independently.
