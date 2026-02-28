const WA_API_URL = `https://graph.facebook.com/v19.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;

export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<void> {
  console.log(`📱 [WHATSAPP] Sending message to ${to}`);
  console.log(`📝 [WHATSAPP] Message: "${message}"`);

  const response = await fetch(WA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body: message,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ [WHATSAPP] API error:", errorData);
    throw new Error(`WhatsApp API error: ${response.status}`);
  }

  console.log(`✅ [WHATSAPP] Message sent successfully to ${to}`);
}

export function formatTransactionReply(
  type: "income" | "expense",
  amount: number,
  category: string,
  note: string,
  transactionDate: string
): string {
  const typeLabel = type === "income" ? "Pemasukan" : "Pengeluaran";
  const formattedAmount = new Intl.NumberFormat("id-ID").format(amount);
  const formattedDate = transactionDate;

  return `✅ *${typeLabel} tercatat!*\n💰 Rp${formattedAmount}\n🏷️ ${category}\n📝 ${note}\n📅 ${formattedDate}`;
}
