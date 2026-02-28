"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, TrendingUp } from "lucide-react";

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string | Date;
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
  const router = useRouter();
  const pathname = usePathname();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber.includes(search)
  );

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}/chat`);
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
