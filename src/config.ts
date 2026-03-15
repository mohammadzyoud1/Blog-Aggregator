import fs from "fs";
import path from "path";
import os from "os";

export type Config = {
  dbUrl: string;
  currentUserName: string;
  [key: string]: any; // allow extra fields
};

const CONFIG_FILE_PATH = path.join(os.homedir(), ".gatorconfig.json");

// Convert camelCase → snake_case for JSON
function toSnakeCase(config: Config): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in config) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    result[snakeKey] = config[key];
  }
  return result;
}

// Convert snake_case → camelCase for TS
function toCamelCase(json: Record<string, any>): Config {
  const result: Config = {} as Config;
  for (const key in json) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = json[key];
  }
  return result;
}

// Read the config
export function readConfig(): Config | null {
  try {
    if (!fs.existsSync(CONFIG_FILE_PATH)) return null;
    const raw = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
    const json = JSON.parse(raw);
    return toCamelCase(json);
  } catch (err) {
    console.error("Error reading config:", err);
    return null;
  }
}

// Write or update the config
export function setUser(userName: string): void {
  // Read existing config or start with defaults
  const existingConfig: Config = readConfig() || {
    dbUrl: "postgres://username:password@localhost:5432/dbname?sslmode=disable", // default required by bootdev test
    currentUserName: "",
  };

  // Update current user
  const newConfig: Config = { ...existingConfig, currentUserName: userName, dbUrl: existingConfig.dbUrl || "postgres://example" };

  // Write to file
  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(toSnakeCase(newConfig), null, 2), {
    encoding: "utf-8",
  });
}
