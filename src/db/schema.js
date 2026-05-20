import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const deviceStatus = pgEnum('device_status_enum', ['online', 'offline', 'deleted']);

export const deviceTable = pgTable('devices', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    status: deviceStatus('status').default('online'),
    installed_at: timestamp('installed_at').defaultNow(),
    updated_at: timestamp('updated_at')
});

export const userTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: varchar('username', { length: 100 }).notNull()
});