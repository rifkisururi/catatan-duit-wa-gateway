"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatBubble from "./ChatBubble";
import { Send, RefreshCw, Clock } from "lucide-react";

interface ChatLog {
  id: string;
  direction: "inbound" | "outbound";
  message: string;
  sentAt: string;
  aiProcessed: boolean;
  transactionId: string | null;
  transaction: {
    id: string;
    type: string;
    amount: number;
    category: string;
  } | null;
}

interface ChatWindowProps {
  userId: string;
  userName: string;
  phoneNumber: string;
}

export default function ChatWindow({
  userId,
  userName,
  phoneNumber,
}: ChatWindowProps) {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChatLogs = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/chat-logs?userId=${userId}&limit=100`
      );
      if (response.ok) {
        const data = await response.json();
        setChatLogs(data.chatLogs);

        // Calculate time left based on last message sent time
        if (data.chatLogs && data.chatLogs.length > 0) {
          const lastMessage = data.chatLogs[0];
          const lastMessageTime = new Date(lastMessage.sentAt);
          const now = new Date();
          const diffInSeconds = Math.floor((now.getTime() - lastMessageTime.getTime()) / 1000);
          const timeLeft = Math.max(0, 86400 - diffInSeconds); // 24 hours - elapsed time
          setTimeLeft(timeLeft);
        }
      }
    } catch (error) {
      console.error("Failed to fetch chat logs:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchChatLogs();

    // Auto polling every 5 seconds
    const interval = setInterval(fetchChatLogs, 5000);
    return () => clearInterval(interval);
  }, [fetchChatLogs]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLogs]);

  // Countdown timer - counts down every second
  useEffect(() => {
    // Only start timer if there are chat logs
    if (chatLogs.length > 0 && timeLeft > 0) {
      const countdownTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatLogs.length]); // Only re-run when chat logs change, not on every timeLeft update

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: message.trim() }),
      });

      if (response.ok) {
        setMessage("");
        await fetchChatLogs();
      } else {
        alert("Gagal mengirim pesan");
      }
    } catch (error) {
      console.error("Send error:", error);
      alert("Gagal mengirim pesan");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format countdown time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // Get countdown color
  const getCountdownColor = (seconds: number) => {
    if (seconds <= 3600) return "text-red-500"; // Less than 1 hour - urgent
    if (seconds <= 28800) return "text-orange-500"; // Less than 8 hours - warning
    return "text-yellow-500"; // Less than 24 hours - normal
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-500">{phoneNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchChatLogs}
              className="text-gray-500"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            {/* Countdown timer */}
            <div className={`flex items-center gap-1 ${getCountdownColor(timeLeft)}`}>
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chatLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Belum ada pesan
          </div>
        ) : (
          chatLogs.map((log) => (
            <ChatBubble
              key={log.id}
              direction={log.direction}
              message={log.message}
              sentAt={log.sentAt}
              aiProcessed={log.aiProcessed}
              transactionId={log.transactionId}
              transaction={log.transaction}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Textarea
            placeholder="Ketik pesan manual..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            className="resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || sending}
            className="bg-green-500 hover:bg-green-600 text-white self-end"
          >
            {sending ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Enter untuk kirim, Shift+Enter untuk baris baru
        </p>
      </div>
    </div>
  );
}
