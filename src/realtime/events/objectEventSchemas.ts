import { z } from 'zod';

export const canvasObjectNodeSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  type: z.enum(['sticky_note', 'shape', 'text']),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  rotation: z.number(),
  zIndex: z.number().int(),
  content: z.string(),
  color: z.string(),
  createdBy: z.string().min(1),
  updatedBy: z.string().min(1),
  updatedAt: z.string().datetime(),
});

export const objectCreatedPayloadSchema = z.object({
  object: canvasObjectNodeSchema,
});

export const objectUpdatedPayloadSchema = z.object({
  objectId: z.string().min(1),
  patch: canvasObjectNodeSchema.partial().extend({
    updatedAt: z.string().datetime(),
    updatedBy: z.string().min(1),
  }),
});

export const objectDeletedPayloadSchema = z.object({
  objectId: z.string().min(1),
  updatedAt: z.string().datetime(),
  updatedBy: z.string().min(1),
});

export const objectsSyncPayloadSchema = z.object({
  objects: z.array(canvasObjectNodeSchema),
});

export const presenceSelectionPayloadSchema = z.object({
  selectedObjectIds: z.array(z.string()),
});

export const OBJECT_EVENT_TYPES = {
  created: 'object.created',
  updated: 'object.updated',
  deleted: 'object.deleted',
  sync: 'objects.sync',
  selection: 'presence.selection',
} as const;

export type ObjectEventType =
  (typeof OBJECT_EVENT_TYPES)[keyof typeof OBJECT_EVENT_TYPES];
