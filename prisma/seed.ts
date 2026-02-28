import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import bcryptjs from "bcryptjs";
import ws from "ws";
import { execSync } from "child_process";

// Configure WebSocket for Neon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
neonConfig.webSocketConstructor = ws as any;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaNeon({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Run migrations first
  console.log("📦 Running migrations...");
  try {
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    console.log("✅ Migrations completed");
  } catch (error) {
    console.log("⚠️  Migration failed or already applied:", error);
  }

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findFirst();

  if (existingAdmin) {
    console.log("✅ Admin user already exists, skipping seed");
    return;
  }

  // Create default admin user
  const passwordHash = await bcryptjs.hash("admin123", 12);

  const admin = await prisma.admin.create({
    data: {
      email: "admin@financebot.com",
      passwordHash,
      name: "Admin",
    },
  });

  console.log("✅ Default admin user created:");
  console.log("   Email: admin@financebot.com");
  console.log("   Password: admin123");
  console.log("⚠️  Please change the password after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
