import { z } from 'zod';

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(80),
  description: z.string().max(280).optional(),
  ownerId: z.string(),
  memberIds: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be 80 characters or fewer'),
  description: z
    .string()
    .max(280, 'Description must be 280 characters or fewer')
    .optional(),
});

export const updateWorkspaceSchema = createWorkspaceSchema;

export const addMemberSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
});

export type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceFormValues = z.infer<typeof updateWorkspaceSchema>;
export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
