// db/schema/columns.helpers.ts

import { text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const timestamps = {
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
};

export const timestampsWithDeletedAt = {
  ...timestamps,
  deletedAt: text("deleted_at"),
};