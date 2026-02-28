import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sign } from "jsonwebtoken";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log("🔐 [USER-VERIFY] Verify login request");
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      console.log("⚠️  [USER-VERIFY] Missing token");
      return NextResponse.redirect(new URL("/user/login?error=missing_token", request.url));
    }

    // Find user with matching token
    console.log(`🔍 [USER-VERIFY] Looking up user with token: ${token}`);
    const user = await prisma.user.findFirst({
      where: {
        loginToken: token,
        loginTokenExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      console.log("⚠️  [USER-VERIFY] Invalid or expired token");
      return NextResponse.redirect(new URL("/user/login?error=invalid_token", request.url));
    }

    // Clear the token (single use)
    console.log(`🧹 [USER-VERIFY] Clearing login token for user: ${user.id}`);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginToken: null,
        loginTokenExpires: null,
      },
    });

    // Create JWT token for session
    const jwtSecret = process.env.NEXTAUTH_SECRET || "default-secret";
    const sessionToken = sign(
      {
        id: user.id,
        phoneNumber: user.phoneNumber,
        role: "user",
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    console.log(`🎫 [USER-VERIFY] Session token created for user: ${user.id}`);

    // Set session cookie
    const response = NextResponse.redirect(new URL("/user/settings", request.url));
    response.cookies.set("next-auth.session-token", sessionToken, {
      httpOnly: false, // Changed to false for development
      secure: false, // Changed to false for development
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log(`✅ [USER-VERIFY] Login successful, redirecting to settings`);
    console.log(`🍪 [USER-VERIFY] Cookie set: next-auth.session-token`);
    return response;
  } catch (error) {
    console.error("❌ [USER-VERIFY] Error:", error);
    return NextResponse.redirect(new URL("/user/login?error=server_error", request.url));
  }
}
