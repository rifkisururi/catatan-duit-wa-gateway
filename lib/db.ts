import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Configure WebSocket for Neon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
neonConfig.webSocketConstructor = ws as any;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;
  console.log("🔌 [DB] DATABASE_URL:", databaseUrl);
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  console.log("🔌 [DB] Initializing Prisma client with Neon adapter...");
  const adapter = new PrismaNeon({ connectionString: databaseUrl });
  const prismaClient = new PrismaClient({ adapter });
  console.log("✅ [DB] Prisma client initialized");
  return prismaClient;
}

// Lazy initialization - only create prisma when first accessed
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      console.log("🔌 [DB] Creating new Prisma client instance...");
      globalForPrisma.prisma = createPrismaClient();
    }
    return globalForPrisma.prisma[prop as keyof PrismaClient];
  },
});
