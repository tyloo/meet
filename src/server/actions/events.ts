'use server'

import type { z } from 'zod'
import { db } from '@/drizzle/db'
import { EventTable } from '@/drizzle/schema'
import { eventFormSchema } from '@/schema/events'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import 'use-server'

export async function createEvent(unsafeData: z.infer<typeof eventFormSchema>): Promise<{ error: boolean } | undefined> {
  const { userId } = auth()
  const { success, data } = eventFormSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return { error: true }
  }

  await db.insert(EventTable).values({ ...data, clerkUserId: userId })

  redirect('/events')
}
