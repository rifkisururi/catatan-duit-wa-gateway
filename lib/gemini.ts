import { GoogleGenerativeAI } from "@google/generative-ai";
import { format } from "date-fns";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are a financial recording assistant. Your job is to extract financial transaction data from user messages written in Indonesian or English informal language.

Extract the following fields from the message:
- type: "income" or "expense"
- amount: number (integer, no decimals, in IDR). Convert shorthand like "25rb" → 25000, "1jt" → 1000000, "1.5jt" → 1500000
- category: one of [food, transport, shopping, entertainment, health, education, salary, freelance, investment, other]
- transaction_date: ISO format YYYY-MM-DD. If not mentioned, use today's date provided
- note: short description in Indonesian (max 50 chars)
- confidence: number 0.0 to 1.0
- is_transaction: true if clearly a financial transaction, false if greeting/question/unrelated

Return ONLY valid JSON, no explanation, no markdown code block.

If is_transaction true:
{"is_transaction":true,"type":"expense","amount":25000,"category":"food","transaction_date":"2026-02-28","note":"Makan siang","confidence":0.95}

If is_transaction false:
{"is_transaction":false,"reply":"Pesan balasan sopan dalam bahasa yang sama dengan user"}`;

export interface TransactionExtraction {
  is_transaction: true;
  type: "income" | "expense";
  amount: number;
  category: string;
  transaction_date: string;
  note: string;
  confidence: number;
}

export interface NonTransactionReply {
  is_transaction: false;
  reply: string;
}

export type GeminiResult = TransactionExtraction | NonTransactionReply;

export async function extractTransaction(
  message: string
): Promise<GeminiResult> {
  console.log(`🤖 [GEMINI] Extracting transaction from message: "${message}"`);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: SYSTEM_PROMPT,
  });

  const todayDate = format(new Date(), "yyyy-MM-dd");
  const userPrompt = `User message: "${message}"\nToday's date: ${todayDate}`;

  console.log(`📝 [GEMINI] Sending prompt to AI...`);
  const result = await model.generateContent(userPrompt);
  const responseText = result.response.text();
  console.log(`📥 [GEMINI] Raw response: ${responseText}`);

  // Clean markdown fences if present
  const cleaned = responseText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim();

  const parsed = JSON.parse(cleaned) as GeminiResult;
  console.log(`✅ [GEMINI] Parsed result:`, JSON.stringify(parsed, null, 2));
  return parsed;
}
