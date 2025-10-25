import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})