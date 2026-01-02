import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  color: z.string().optional(),
});

export const projectSchema = z.object({
  clientId: z.string().min(1, 'El cliente es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const timeRecordSchema = z.object({
  clientId: z.string().min(1, 'El cliente es requerido'),
  projectId: z.string().optional(),
  startTime: z.date(),
  endTime: z.date(),
  description: z.string().optional(),
}).refine((data) => data.endTime > data.startTime, {
  message: 'La hora de fin debe ser posterior a la de inicio',
  path: ['endTime'],
});

