import { DAYS_OF_WEEK_IN_ORDER } from '@/data/constants'
import { relations } from 'drizzle-orm'
import { boolean, index, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const primaryKey = uuid('id').primaryKey().defaultRandom()
const createdAt = timestamp('created_at').notNull().defaultNow()
const updatedAt = timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date())

export const EventTable = pgTable('event', {
  id: primaryKey,
  clerkUserId: uuid('clerk_user_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  durationInMinutes: integer('duration_in_minutes').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt,
  updatedAt,
}, table => ({
  clerkUserIdIndex: index('clerk_user_id_index').on(table.clerkUserId),
}))

export const ScheduleTable = pgTable('schedule', {
  id: primaryKey,
  clerkUserId: text('clerk_user_id').notNull().unique(),
  timezone: text('timezone').notNull(),
  createdAt,
  updatedAt,
})

export const scheduleDayOfWeekEnum = pgEnum('day', DAYS_OF_WEEK_IN_ORDER)

export const ScheduleAvailabilityTable = pgTable('schedule_availability', {
  id: primaryKey,
  scheduleId: uuid('schedule_id').notNull().references(() => ScheduleTable.id, { onDelete: 'cascade' }),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  dayOfWeek: scheduleDayOfWeekEnum('day_of_week').notNull(),
}, table => ({
  scheduleIdIndex: index('schedule_id_index').on(table.scheduleId),
}))

export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable),
}))

export const scheduleAvailabilityRelations = relations(ScheduleAvailabilityTable, ({ one }) => ({
  schedule: one(ScheduleTable, { fields: [ScheduleAvailabilityTable.id], references: [ScheduleTable.id] }),
}))
