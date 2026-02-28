import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log("📤 [SEND-MESSAGE] Manual message send request");
  const session = await auth();

  if (!session) {
    console.log("❌ [SEND-MESSAGE] Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`✅ [SEND-MESSAGE] Authenticated as: ${session.user?.email}`);

  try {
    const { userId, message } = await request.json();
    console.log(`📝 [SEND-MESSAGE] Sending to user: ${userId}`);
    console.log(`💬 [SEND-MESSAGE] Message: "${message}"`);

    if (!userId || !message) {
      console.log("⚠️  [SEND-MESSAGE] Missing userId or message");
      return NextResponse.json(
        { error: "userId and message are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log(`❌ [SEND-MESSAGE] User not found: ${userId}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`✅ [SEND-MESSAGE] User found: ${user.name} (${user.phoneNumber})`);

    // Send via WhatsApp
    await sendWhatsAppMessage(user.phoneNumber, message);

    // Save outbound chat log
    const chatLog = await prisma.chatLog.create({
      data: {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        direction: "outbound",
        message,
      },
    });
    console.log(`✅ [SEND-MESSAGE] Chat log saved: ${chatLog.id}`);

    return NextResponse.json({ success: true, chatLog }, { status: 200 });
  } catch (error) {
    console.error("❌ [SEND-MESSAGE] Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
