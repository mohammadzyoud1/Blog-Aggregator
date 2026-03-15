import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://username:password@localhost:5432/dbname?sslmode=disable",
  },
});