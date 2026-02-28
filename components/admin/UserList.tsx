"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, TrendingUp, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string | Date;
  lastMessageAt?: string | Date | null;
  _count: {
    transactions: number;
    chatLogs: number;
  };
}

interface UserListProps {
  users: User[];
  selectedUserId?: string;
}

export default function UserList({ users, selectedUserId }: UserListProps) {
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(new Date());
  const router = useRouter();

  // Update current time every second for countdown timer
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber.includes(search)
  );

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}/chat`);
  };

  const getTimeSinceLastMessage = (lastMessageAt: string | Date | null | undefined) => {
    if (!lastMessageAt) return null;
    const time = formatDistanceToNow(new Date(lastMessageAt), {
      addSuffix: true,
      locale: id,
    });
    return time;
  };

  const getTimeColor = (lastMessageAt: string | Date | null | undefined) => {
    if (!lastMessageAt) return "text-gray-400";
    const hoursSince = (now.getTime() - new Date(lastMessageAt).getTime()) / (1000 * 60 * 60);
    if (hoursSince > 24) return "text-red-500"; // More than 24 hours
    if (hoursSince > 8) return "text-orange-500"; // More than 8 hours
    if (hoursSince > 2) return "text-yellow-500"; // More than 2 hours
    return "text-green-500"; // Less than 2 hours
  };

  // Calculate time left for free chat (24 hours from last message)
  const getTimeLeft = (lastMessageAt: string | Date | null | undefined) => {
    if (!lastMessageAt) return null;
    const diffInSeconds = Math.floor((now.getTime() - new Date(lastMessageAt).getTime()) / 1000);
    const timeLeft = Math.max(0, 86400 - diffInSeconds); // 24 hours - elapsed time
    return timeLeft;
  };

  // Format countdown time
  const formatTimeLeft = (seconds: number) => {
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

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari nama atau nomor WA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            Tidak ada user ditemukan
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedUserId === user.id ? "bg-green-50 border-l-4 border-l-green-500" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {user.phoneNumber}
                  </p>
                </div>
                {/* Countdown timer for all users */}
                {user.lastMessageAt && (() => {
                  const timeLeft = getTimeLeft(user.lastMessageAt);
                  return timeLeft !== null && timeLeft > 0 ? (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${getCountdownColor(timeLeft)} bg-opacity-10`}>
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeLeft(timeLeft)}</span>
                    </div>
                  ) : null;
                })()}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>{user._count.transactions} transaksi</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MessageCircle className="h-3 w-3" />
                  <span>{user._count.chatLogs} pesan</span>
                </div>
                {user.lastMessageAt && (
                  <>
                    <div className={`flex items-center gap-1 text-xs ${getTimeColor(user.lastMessageAt)}`}>
                      <Clock className="h-3 w-3" />
                      <span>{getTimeSinceLastMessage(user.lastMessageAt)}</span>
                    </div>
                    {(() => {
                      const timeLeft = getTimeLeft(user.lastMessageAt);
                      return timeLeft !== null && timeLeft > 0 ? (
                        <div className={`flex items-center gap-1 text-xs font-medium ${getCountdownColor(timeLeft)}`}>
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeLeft(timeLeft)}</span>
                        </div>
                      ) : null;
                    })()}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
