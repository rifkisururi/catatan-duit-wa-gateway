import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { extractTransaction } from "@/lib/gemini";
import { sendWhatsAppMessage, formatTransactionReply } from "@/lib/whatsapp";

export const dynamic = 'force-dynamic';

// GET /api/webhook - WhatsApp webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WA_VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// POST /api/webhook - Receive WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    console.log("📨 [WEBHOOK] Received webhook request");
    const body = await request.json();
    console.log("📦 [WEBHOOK] Body:", JSON.stringify(body, null, 2));

    // Validate webhook structure
    if (body.object !== "whatsapp_business_account") {
      console.log("⚠️  [WEBHOOK] Ignored: Not a WhatsApp Business Account webhook");
      return NextResponse.json({ status: "ignored" }, { status: 200 });
    }

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (!value?.messages || value.messages.length === 0) {
      console.log("⚠️  [WEBHOOK] No messages in webhook");
      return NextResponse.json({ status: "no_messages" }, { status: 200 });
    }

    const message = value.messages[0];
    console.log("💬 [WEBHOOK] Message received:", JSON.stringify(message, null, 2));

    // Only process text messages
    if (message.type !== "text") {
      console.log("⚠️  [WEBHOOK] Ignored: Non-text message type:", message.type);
      return NextResponse.json({ status: "non_text_ignored" }, { status: 200 });
    }

    const phoneNumber = message.from;
    const rawMessage = message.text.body;
    const contactName = value.contacts?.[0]?.profile?.name;
    const userName = contactName || `User ${phoneNumber}`;

    console.log(`👤 [WEBHOOK] From: ${phoneNumber} (${userName})`);
    console.log(`📝 [WEBHOOK] Message: "${rawMessage}"`);

    // Auto-register user if not exists
    console.log(`🔍 [WEBHOOK] Checking if user exists: ${phoneNumber}`);
    let user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      console.log(`✨ [WEBHOOK] Creating new user: ${userName}`);
      user = await prisma.user.create({
        data: {
          phoneNumber,
          name: userName,
        },
      });
      console.log(`✅ [WEBHOOK] User created: ${user.id}`);
    } else {
      console.log(`✅ [WEBHOOK] User found: ${user.id}`);
    }

    // Save inbound chat log
    console.log(`💾 [WEBHOOK] Saving inbound chat log...`);
    const inboundLog = await prisma.chatLog.create({
      data: {
        userId: user.id,
        phoneNumber,
        direction: "inbound",
        message: rawMessage,
        aiProcessed: false,
      },
    });
    console.log(`✅ [WEBHOOK] Inbound chat log saved: ${inboundLog.id}`);

    // Process with Gemini AI
    console.log(`🤖 [WEBHOOK] Processing with Gemini AI...`);
    let replyMessage: string;
    let transactionId: string | null = null;

    try {
      const geminiResult = await extractTransaction(rawMessage);
      console.log(`🧠 [WEBHOOK] AI Result:`, JSON.stringify(geminiResult, null, 2));

      if (geminiResult.is_transaction) {
        console.log(`💰 [WEBHOOK] Transaction detected!`);
        // Save transaction to database
        const transaction = await prisma.transaction.create({
          data: {
            userId: user.id,
            type: geminiResult.type,
            amount: geminiResult.amount,
            category: geminiResult.category,
            transactionDate: new Date(geminiResult.transaction_date),
            note: geminiResult.note,
            rawMessage,
          },
        });

        transactionId = transaction.id;
        console.log(`✅ [WEBHOOK] Transaction saved: ${transaction.id}`);

        // Format reply message
        replyMessage = formatTransactionReply(
          geminiResult.type,
          geminiResult.amount,
          geminiResult.category,
          geminiResult.note,
          geminiResult.transaction_date
        );
      } else {
        console.log(`💬 [WEBHOOK] Non-transaction message`);
        replyMessage = geminiResult.reply;
      }
      console.log(`📤 [WEBHOOK] Reply message: "${replyMessage}"`);
    } catch (aiError) {
      console.error("❌ [WEBHOOK] Gemini AI error:", aiError);
      replyMessage =
        "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.";
    }

    // Send reply via WhatsApp
    console.log(`📱 [WEBHOOK] Sending reply to ${phoneNumber}...`);
    try {
      await sendWhatsAppMessage(phoneNumber, replyMessage);
      console.log(`✅ [WEBHOOK] Reply sent successfully`);
    } catch (waError) {
      console.error("❌ [WEBHOOK] WhatsApp send error:", waError);
    }

    // Save outbound chat log
    console.log(`💾 [WEBHOOK] Saving outbound chat log...`);
    await prisma.chatLog.create({
      data: {
        userId: user.id,
        phoneNumber,
        direction: "outbound",
        message: replyMessage,
        transactionId,
      },
    });
    console.log(`✅ [WEBHOOK] Outbound chat log saved`);

    // Update inbound log with AI processed status
    console.log(`💾 [WEBHOOK] Updating inbound log status...`);
    await prisma.chatLog.update({
      where: { id: inboundLog.id },
      data: {
        aiProcessed: true,
        transactionId,
      },
    });
    console.log(`✅ [WEBHOOK] Inbound log updated`);

    console.log(`✅ [WEBHOOK] Webhook processing completed successfully`);
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("❌ [WEBHOOK] Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
