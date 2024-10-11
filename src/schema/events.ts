import { z } from "zod";

const MAX_DURATION_IN_MINUTES = 4 * 60;

export const eventFormSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  durationInMinutes: z.coerce
    .number()
    .int()
    .positive("Duration must be greater than 0.")
    .max(
      MAX_DURATION_IN_MINUTES,
      `Duration must be less than ${MAX_DURATION_IN_MINUTES} minutes.`,
    ),
});
