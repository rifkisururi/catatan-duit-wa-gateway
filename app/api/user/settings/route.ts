import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify, JwtPayload } from "jsonwebtoken";

export const dynamic = 'force-dynamic';

// Helper function to get user from JWT token
async function getUserFromRequest(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  if (!sessionToken) {
    return null;
  }

  try {
    const jwtSecret = process.env.NEXTAUTH_SECRET || "default-secret";
    const decoded = verify(sessionToken, jwtSecret) as JwtPayload & { id: string };
    if (!decoded || !decoded.id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        email: true,
        callbackUrl: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

// GET /api/user/settings - Fetch user settings
export async function GET(request: NextRequest) {
  console.log("📋 [USER-SETTINGS] Fetching settings");
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      console.log("❌ [USER-SETTINGS] Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`✅ [USER-SETTINGS] Settings fetched for user: ${user.id}`);
    return NextResponse.json({
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        email: user.email,
        callbackUrl: user.callbackUrl,
      },
    });
  } catch (error) {
    console.error("❌ [USER-SETTINGS] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PATCH /api/user/settings - Update user settings
export async function PATCH(request: NextRequest) {
  console.log("📝 [USER-SETTINGS] Updating settings");
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      console.log("❌ [USER-SETTINGS] Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { callbackUrl } = await request.json();

    // Validate callback URL if provided
    if (callbackUrl !== undefined && callbackUrl !== null && callbackUrl !== "") {
      try {
        const url = new URL(callbackUrl);
        // Ensure it's a valid HTTP/HTTPS URL
        if (!["http:", "https:"].includes(url.protocol)) {
          return NextResponse.json(
            { error: "Invalid URL protocol. Only HTTP and HTTPS are allowed." },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }
    }

    // Update user settings
    console.log(`💾 [USER-SETTINGS] Updating settings for user: ${user.id}`);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        callbackUrl: callbackUrl || null,
      },
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        email: true,
        callbackUrl: true,
      },
    });

    console.log(`✅ [USER-SETTINGS] Settings updated for user: ${user.id}`);
    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ [USER-SETTINGS] Error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
