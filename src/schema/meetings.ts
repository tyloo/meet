import { endOfDay, startOfDay } from "date-fns";
import { z } from "zod";

export const meetingFormSchema = z.object({
  startTime: z.date().min(new Date()),
  guestEmail: z.string().email().min(1, "Required"),
  guestName: z.string().min(1, "Required"),
  guestNotes: z.string().optional(),
  timezone: z.string().min(1, "Required"),
  date: z.date().min(startOfDay(new Date()), "Must be in the future"),
});
