import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local" });
loadEnv();

const { DATABASE_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const databaseUrl =
  DATABASE_URL ??
  `mysql://${DB_USER ?? "root"}:${DB_PASSWORD ?? "123456"}@${DB_HOST ?? "localhost"}:${DB_PORT ?? "3306"}/${DB_NAME ?? "my_app"}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});
