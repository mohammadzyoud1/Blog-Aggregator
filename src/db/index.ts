import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../config";

const config = readConfig();
console.log("DB URL:", config?.dbUrl); // add this line
if (!config || !config.dbUrl) {
  throw new Error("Missing database URL in config");
}
const conn = postgres(config.dbUrl, {
  ssl: false,            // ← THIS FIXES THE FREEZE
  max: 1,                // optional, safer for CLI apps
  idle_timeout: 20,
});
export const db = drizzle(conn, { schema });