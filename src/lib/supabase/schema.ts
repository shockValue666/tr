import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersForDashboard = pgTable("users_for_dashboard",{
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt:timestamp("created_at",{
        withTimezone:true,
        mode:"string"        
    }),
    name:text("name").notNull(),
});
export {};
