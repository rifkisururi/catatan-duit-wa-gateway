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
    const body = await request.json();

    // Validate webhook structure
    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json({ status: "ignored" }, { status: 200 });
    }

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (!value?.messages || value.messages.length === 0) {
      return NextResponse.json({ status: "no_messages" }, { status: 200 });
    }

    const message = value.messages[0];

    // Only process text messages
    if (message.type !== "text") {
      return NextResponse.json({ status: "non_text_ignored" }, { status: 200 });
    }

    const phoneNumber = message.from;
    const rawMessage = message.text.body;
    const contactName = value.contacts?.[0]?.profile?.name;
    const userName = contactName || `User ${phoneNumber}`;

    // Auto-register user if not exists
    let user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phoneNumber,
          name: userName,
        },
      });
    }

    // Save inbound chat log
    const inboundLog = await prisma.chatLog.create({
      data: {
        userId: user.id,
        phoneNumber,
        direction: "inbound",
        message: rawMessage,
        aiProcessed: false,
      },
    });

    // Process with Gemini AI
    let replyMessage: string;
    let transactionId: string | null = null;

    try {
      const geminiResult = await extractTransaction(rawMessage);

      if (geminiResult.is_transaction) {
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

        // Format reply message
        replyMessage = formatTransactionReply(
          geminiResult.type,
          geminiResult.amount,
          geminiResult.category,
          geminiResult.note,
          geminiResult.transaction_date
        );
      } else {
        replyMessage = geminiResult.reply;
      }
    } catch (aiError) {
      console.error("Gemini AI error:", aiError);
      replyMessage =
        "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.";
    }

    // Send reply via WhatsApp
    try {
      await sendWhatsAppMessage(phoneNumber, replyMessage);
    } catch (waError) {
      console.error("WhatsApp send error:", waError);
    }

    // Save outbound chat log
    await prisma.chatLog.create({
      data: {
        userId: user.id,
        phoneNumber,
        direction: "outbound",
        message: replyMessage,
        transactionId,
      },
    });

    // Update inbound log with AI processed status
    await prisma.chatLog.update({
      where: { id: inboundLog.id },
      data: {
        aiProcessed: true,
        transactionId,
      },
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
