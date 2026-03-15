import { pgTable, timestamp, uuid, text, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});
export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lastFetchedAt: timestamp("last_fetched_at", { withTimezone: true })
},
  (table) => ({
    uniqueUserFeed: uniqueIndex([table.user_id, table.id]),
  })
)
export const feed_follows = pgTable("feed_follows", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  feed_id: uuid("feed_id").notNull().references(() => feeds.id, { onDelete: "cascade" })


},
  (table) => ({
    uniqueUserFeed: uniqueIndex([table.user_id, table.feed_id]),
  })

)

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  url: text("url").unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  published_at: timestamp("published_at", { withTimezone: true }).notNull(),
  feed_id: uuid("feed_id").notNull().references(() => feeds.id, { onDelete: "cascade" }),
})
