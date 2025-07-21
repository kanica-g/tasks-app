import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm"

export const tasksTable = pgTable("tasks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    done: boolean("done").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export type Task = InferSelectModel<typeof tasksTable>;
export type NewTask = InferInsertModel<typeof tasksTable>;
