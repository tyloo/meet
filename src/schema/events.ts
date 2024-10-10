import { z } from 'zod'

export const eventFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  durationInMinutes: z.coerce.number().int().positive('Duration must be greater than 0').max(120, 'Duration must be less than 2 hours'),
})
