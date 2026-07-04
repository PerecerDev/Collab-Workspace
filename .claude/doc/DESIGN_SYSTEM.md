# Collab Workspace — Design System

Version: 1.0  
Status: Active

---

# Purpose

Visual and UX source of truth: layout, typography, color, components, motion, and anti-patterns.

Design references: **Linear**, **FigJam**, **Notion**, **Raycast** — modern, calm, team-tool aesthetic. **Do not copy** any interface.

---

# Design Principles

1. **Clarity over decoration** — canvas content is hero; chrome stays quiet
2. **Collaboration visible but not noisy** — presence subtle, cursors readable
3. **Density with breathing room** — toolbars compact; canvas spacious
4. **Consistency** — same patterns for panels, modals, empty states
5. **Keyboard-first power** — tools, palette, shortcuts for power users
6. **Accessible by default** — contrast, focus, reduced motion
7. **Motion with purpose** — Framer Motion for feedback, not spectacle

---

# Layout

- **App shell:** Top bar + optional left sidebar + main canvas + optional right panel (comments/properties)
- **Canvas:** Full-bleed primary surface; floating toolbars
- **Max panel width:** ~360px side panels; forms max ~640px in modals
- **Spacing scale:** 4px base (Tailwind default)
- **Grid:** Flexible; canvas uses world coordinates, not page grid

---

# Typography

| Role           | Style                               |
| -------------- | ----------------------------------- |
| Font family    | Inter, system-ui, sans-serif        |
| App title      | text-lg / font-semibold             |
| Panel title    | text-sm / font-medium               |
| Body           | text-sm / text-base                 |
| Meta / caption | text-xs, muted color                |
| Monospace      | Code blocks, shortcuts — ui-monospace |

---

# Color System

Semantic tokens (light / dark):

| Token          | Usage                         |
| -------------- | ----------------------------- |
| `background`   | App background                |
| `surface`      | Panels, toolbars, cards       |
| `canvas`       | Canvas background             |
| `border`       | Dividers, tool borders        |
| `text-primary` | Headings, body                |
| `text-muted`   | Secondary text                |
| `accent`       | Primary actions, active tool  |
| `presence`     | Collaborator cursor colors    |
| `destructive`  | Delete, errors                |
| `success`      | Confirmations                 |

Collaborator cursors: distinct hue per user; never rely on color alone (add name label).

---

# Components (Target)

## Primitives

Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Badge, Avatar, Tooltip, Dropdown, Dialog, Sheet, Tabs, Toast, Skeleton, Spinner

## Collaborative

PresenceAvatarStack, LiveCursor, CollaboratorBadge, ConnectionStatus, ConflictBanner, ReconnectOverlay

## Canvas

Toolbar, ToolButton, ZoomControls, MiniMap (future), SelectionHandles, ResizeHandles

## Navigation

Sidebar, CommandPalette, KeyboardShortcutHint

---

# Motion (Framer Motion)

- Panel enter/exit: subtle slide + fade (150–200ms)
- Tool selection: quick scale or border transition
- Canvas objects: minimal — avoid layout thrashing
- **Always** honor `prefers-reduced-motion`: instant transitions

---

# States (Mandatory)

Every interactive surface:

- Default, hover, focus-visible, active, disabled
- Loading, empty, error
- **Collaborative:** syncing, conflict, offline, reconnecting

---

# Anti-Patterns

- Competitor pixel clones
- Cursors that obscure content
- Flashing presence indicators
- Motion on every hover
- Low-contrast cursor colors
- Toolbars that cover canvas center on mobile
- Custom scrollbars that break accessibility

---

# Dark Mode

- Class-based toggle on root
- Canvas background slightly distinct from app shell in both themes
- Presence colors tested in both themes
