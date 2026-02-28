"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import TransactionBadge from "./TransactionBadge";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  direction: "inbound" | "outbound";
  message: string;
  sentAt: string;
  aiProcessed?: boolean;
  transactionId?: string | null;
  transaction?: {
    id: string;
    type: string;
    amount: number;
    category: string;
  } | null;
}

export default function ChatBubble({
  direction,
  message,
  sentAt,
  aiProcessed,
  transactionId,
  transaction,
}: ChatBubbleProps) {
  const isInbound = direction === "inbound";
  const formattedTime = format(new Date(sentAt), "HH:mm", { locale: id });

  return (
    <div
      className={`flex ${isInbound ? "justify-start" : "justify-end"} mb-3`}
    >
      <div
        className={`max-w-[70%] ${
          isInbound ? "items-start" : "items-end"
        } flex flex-col`}
      >
        {/* Sender label */}
        <div
          className={`flex items-center gap-1 mb-1 ${
            isInbound ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {isInbound ? (
            <User className="h-3 w-3 text-gray-400" />
          ) : (
            <Bot className="h-3 w-3 text-green-500" />
          )}
          <span className="text-xs text-gray-400">
            {isInbound ? "User" : aiProcessed ? "AI" : "Admin"}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isInbound
              ? "bg-gray-100 text-gray-800 rounded-tl-sm"
              : "bg-green-500 text-white rounded-tr-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
        </div>

        {/* Transaction badge */}
        {transactionId && transaction && (
          <TransactionBadge
            transactionId={transactionId}
            type={transaction.type}
            amount={Number(transaction.amount)}
            category={transaction.category}
          />
        )}

        {/* Timestamp */}
        <span className="text-xs text-gray-400 mt-1">{formattedTime}</span>
      </div>
    </div>
  );
}
