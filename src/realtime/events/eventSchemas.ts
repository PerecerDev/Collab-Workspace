import { z } from 'zod';

import { REALTIME_EVENT_TYPES } from '@/realtime/types/presence.types';

const cursorSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const domainEventSchema = z.object({
  id: z.string().uuid(),
  version: z.literal(1),
  type: z.string().min(1),
  workspaceId: z.string().min(1),
  actorId: z.string().min(1),
  sessionId: z.string().uuid(),
  timestamp: z.string().datetime(),
  payload: z.unknown(),
});

export const presenceJoinPayloadSchema = z.object({
  userName: z.string().min(1),
  colorIndex: z.number().int().min(0).max(4),
});

export const presenceUpdatePayloadSchema = z.object({
  status: z.enum(['active', 'idle', 'away']).optional(),
  cursor: cursorSchema.optional(),
});

export const presenceCursorPayloadSchema = cursorSchema;

export const presenceLeavePayloadSchema = z.object({
  sessionId: z.string().uuid(),
});

export const roomSyncPayloadSchema = z.object({
  sessions: z.array(
    z.object({
      sessionId: z.string().uuid(),
      userId: z.string().min(1),
      userName: z.string().min(1),
      workspaceId: z.string().min(1),
      status: z.enum(['active', 'idle', 'away']),
      lastSeenAt: z.string().datetime(),
      cursor: cursorSchema.optional(),
      colorIndex: z.number().int().min(0).max(4),
    }),
  ),
});

export const eventPayloadSchemas: Record<string, z.ZodType> = {
  [REALTIME_EVENT_TYPES.presenceJoin]: presenceJoinPayloadSchema,
  [REALTIME_EVENT_TYPES.presenceLeave]: presenceLeavePayloadSchema,
  [REALTIME_EVENT_TYPES.presenceUpdate]: presenceUpdatePayloadSchema,
  [REALTIME_EVENT_TYPES.presenceCursor]: presenceCursorPayloadSchema,
  [REALTIME_EVENT_TYPES.roomSync]: roomSyncPayloadSchema,
  [REALTIME_EVENT_TYPES.systemPing]: z.object({}),
};

export type DomainEventInput = z.infer<typeof domainEventSchema>;

export function parseDomainEvent(raw: unknown): DomainEventInput {
  return domainEventSchema.parse(raw);
}

export function parseEventPayload<T>(type: string, payload: unknown): T {
  const schema = eventPayloadSchemas[type];
  if (!schema) return payload as T;
  return schema.parse(payload) as T;
}
