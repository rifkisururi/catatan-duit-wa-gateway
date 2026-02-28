import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify, JwtPayload } from "jsonwebtoken";
import crypto from "crypto";

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

// POST /api/user/test-webhook - Send test webhook to user's callback URL
export async function POST(request: NextRequest) {
  try {
    console.log("🧪 [TEST-WEBHOOK] Starting test webhook");

    // Get user from session
    const user = await getUserFromRequest(request);

    if (!user) {
      console.log("❌ [TEST-WEBHOOK] Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`✅ [TEST-WEBHOOK] User found: ${user.id}`);

    // Check if user has callback URL
    if (!user.callbackUrl) {
      console.log("❌ [TEST-WEBHOOK] No callback URL configured");
      return NextResponse.json(
        { error: "Callback URL belum dikonfigurasi" },
        { status: 400 }
      );
    }

    console.log(`🎯 [TEST-WEBHOOK] Sending test webhook to: ${user.callbackUrl}`);

    // Create test payload
    const testPayload = {
      transactionId: crypto.randomUUID(),
      type: "income",
      amount: 100000,
      category: "Makanan",
      note: "Test webhook - Nasi padang",
      transactionDate: new Date().toISOString().split('T')[0],
      userId: user.id,
      phoneNumber: user.phoneNumber,
      test: true,
    };

    console.log(`📦 [TEST-WEBHOOK] Test payload:`, JSON.stringify(testPayload, null, 2));

    // Send test webhook
    const response = await fetch(user.callbackUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    console.log(`📡 [TEST-WEBHOOK] Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [TEST-WEBHOOK] Webhook failed: ${response.status} - ${errorText}`);
      return NextResponse.json(
        {
          error: `Webhook test gagal. Server merespon dengan status ${response.status}`,
          details: errorText,
        },
        { status: 200 }
      );
    }

    const responseData = await response.json().catch(() => ({}));
    console.log(`✅ [TEST-WEBHOOK] Test webhook sent successfully`, responseData);

    return NextResponse.json({
      success: true,
      message: "Test webhook berhasil dikirim!",
      payload: testPayload,
      response: responseData,
    });
  } catch (error) {
    console.error("❌ [TEST-WEBHOOK] Error:", error);
    return NextResponse.json(
      {
        error: "Terjadi kesalahan saat mengirim test webhook",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
