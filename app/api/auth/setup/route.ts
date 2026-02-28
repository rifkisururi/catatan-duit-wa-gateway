import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log("🔧 [SETUP] Admin setup request");
  try {
    // Check if any admin already exists
    console.log("🔍 [SETUP] Checking for existing admin...");
    const existingAdmin = await prisma.admin.findFirst();

    if (existingAdmin) {
      console.log("⚠️  [SETUP] Admin already exists, setup disabled");
      return NextResponse.json(
        { error: "Admin already exists. Setup is disabled." },
        { status: 403 }
      );
    }

    const { email, password, name } = await request.json();
    console.log(`📝 [SETUP] Creating admin: ${email} / ${name}`);

    if (!email || !password || !name) {
      console.log("⚠️  [SETUP] Missing required fields");
      return NextResponse.json(
        { error: "email, password, and name are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      console.log("⚠️  [SETUP] Password too short");
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    console.log("🔐 [SETUP] Hashing password...");
    const passwordHash = await bcryptjs.hash(password, 12);

    console.log("💾 [SETUP] Saving admin to database...");
    const admin = await prisma.admin.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });

    console.log(`✅ [SETUP] Admin created: ${admin.id}`);
    return NextResponse.json(
      {
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ [SETUP] Error:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
