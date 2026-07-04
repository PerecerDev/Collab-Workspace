# Collab Workspace — Data Model

Version: 1.0  
Status: Active — **Architecture scope only**

---

# Purpose

Defines domain entities, TypeScript types, DTOs, relationships, event payloads, and mock-data conventions.

The app is **frontend-first** with mock persistence and mock WebSocket events until a real backend is approved.

Precedence: `CONSTITUTION.md` > `PRODUCT_REQUIREMENTS.md` > this document.

---

# Conventions

- All IDs: `string` (UUID format in mocks)
- Timestamps: ISO 8601 strings (`createdAt`, `updatedAt`)
- Enums: string unions in TypeScript, not numeric enums
- API DTOs mirror domain types unless mapping is required
- WebSocket events: versioned payloads validated with Zod
- Single source of types per entity in feature or `shared/types/domain/`

---

# Core Entities

## User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}
```

## Workspace

```typescript
interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}
```

## WorkspaceMember

```typescript
interface WorkspaceMember {
  workspaceId: string;
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
}
```

## CanvasObject (base)

```typescript
interface CanvasObject {
  id: string;
  workspaceId: string;
  type: CanvasObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

type CanvasObjectType =
  | 'sticky_note'
  | 'shape'
  | 'text'
  | 'task'
  | 'code'
  | 'connector';
```

## StickyNote (extends block content)

```typescript
interface StickyNoteContent {
  text: string;
  color: string;
}
```

## TaskBlock

```typescript
type TaskBlockStatus = 'todo' | 'in_progress' | 'done';

interface TaskBlockContent {
  title: string;
  status: TaskBlockStatus;
  assigneeId?: string;
}
```

## Comment

```typescript
interface Comment {
  id: string;
  workspaceId: string;
  targetType: 'workspace' | 'object';
  targetId: string;
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
```

## ActivityEvent

```typescript
interface ActivityEvent {
  id: string;
  workspaceId: string;
  actorId: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}
```

---

# Real-Time / Presence Types

## PresenceUser

```typescript
interface PresenceUser {
  userId: string;
  workspaceId: string;
  status: 'active' | 'idle' | 'away';
  lastSeenAt: string;
  cursor?: { x: number; y: number };
  selectedObjectIds?: string[];
}
```

## DomainEvent (WebSocket)

```typescript
interface DomainEvent<T = unknown> {
  id: string;
  version: 1;
  type: string;
  workspaceId: string;
  actorId: string;
  timestamp: string;
  payload: T;
}
```

Example event types:

- `workspace.updated`
- `object.created` | `object.updated` | `object.deleted`
- `presence.cursor` | `presence.selection`
- `comment.created`

---

# Optimistic Operation

```typescript
interface OptimisticOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  entityType: string;
  entityId: string;
  snapshot: unknown;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}
```

---

# Relationships

```
User 1──* WorkspaceMember *──1 Workspace
Workspace 1──* CanvasObject
CanvasObject 1──* Comment (via targetId)
Workspace 1──* ActivityEvent
Workspace 1──* PresenceUser (ephemeral)
```

---

# Mock Data Conventions

- Seed 2–3 users, 2 workspaces, sample canvas objects for dev
- Mock socket emits events with realistic latency (optional)
- IDs stable across mocks for test fixtures

---

# Future Extensions

When approved via plan + ADR:

- Version history snapshots
- CRDT document state
- Full-text search index shapes

No database schema until backend phase is approved.
