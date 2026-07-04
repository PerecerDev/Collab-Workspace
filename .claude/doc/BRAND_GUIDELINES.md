# Collab Workspace — Brand Guidelines

Version: 1.0  
Status: Active

---

# Purpose

Product voice, messaging, UX writing, and communication principles.

---

# Brand Identity

**Name:** Collab Workspace  
**Positioning:** Modern real-time collaborative space for teams — with distinct identity, not a clone  
**Personality:** Clear, calm, capable, collaborative — professional without corporate bloat

---

# Voice Principles

| Do                         | Don't                                        |
| -------------------------- | -------------------------------------------- |
| Use plain, direct language | Jargon without need                          |
| Be concise                 | Wall of text in UI                           |
| Action-oriented labels     | Vague "Submit" when "Add note" is clearer    |
| Helpful error messages     | Blame the user                               |
| Explain sync state clearly | Hide conflicts or offline state              |
| Consistent terminology     | Synonyms for same concept                    |

---

# Terminology (Canonical)

| Term       | Usage                                      |
| ---------- | ------------------------------------------ |
| Workspace  | Shared collaborative space                 |
| Canvas     | Spatial surface for objects                |
| Block      | Generic canvas object (sticky, shape, …)   |
| Presence   | Who is online and where they are working   |
| Cursor     | Live pointer indicator of a collaborator   |
| Comment    | Thread attached to workspace or object     |
| Activity   | Feed of workspace events                   |
| Command palette | Keyboard command launcher               |

Avoid: "board" unless referring to diagram board specifically; prefer **workspace** and **canvas**.

---

# Messaging Hierarchy

1. **Primary:** Work together in real time, without friction
2. **Secondary:** Built with modern React and real-time architecture
3. **Tertiary:** Portfolio-grade engineering quality

---

# UX Writing — Collaborative States

| State | Example copy |
| ----- | ------------ |
| Connecting | Connecting to workspace… |
| Reconnecting | Connection lost. Reconnecting… |
| Conflict | Someone else updated this. Review changes. |
| Offline | You're offline. Changes will sync when reconnected. |
| Alone | You're the only one here. Invite teammates. |

---

# Error Tone

- Explain what happened and what to do next
- Never expose raw error codes to users
- Log technical details for developers separately

---

# Portfolio Context

README and about copy may mention technologies (React, TypeScript, WebSockets) for reviewers — in-app copy stays user-focused.
