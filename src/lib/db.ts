import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const { DATABASE_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const databaseUrl =
  // DATABASE_URL ??
  // `mysql://${DB_USER ?? "root"}:${DB_PASSWORD ?? "123456"}@${DB_HOST ?? "localhost"}:${DB_PORT ?? "3306"}/${DB_NAME ?? "my_app"}`;
  'mysql://root:lorEIeDwoFWtLSLKwepdateboaaTiaHS@mysql.railway.internal:3306/railway'

const adapter = new PrismaMariaDb(databaseUrl);

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
