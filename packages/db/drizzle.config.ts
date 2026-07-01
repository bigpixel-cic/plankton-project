// packages/db/drizzle.config.ts

import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

export default defineConfig({
  schema: "./schema.ts",
  out: "../../netlify/database/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
});
