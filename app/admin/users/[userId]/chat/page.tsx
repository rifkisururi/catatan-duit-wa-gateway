import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import UserList from "@/components/admin/UserList";
import ChatWindow from "@/components/admin/ChatWindow";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ChatPageProps {
  params: {
    userId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) {
    notFound();
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          transactions: true,
          chatLogs: true,
        },
      },
    },
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex overflow-hidden">
        {/* User list sidebar */}
        <div className="w-80 border-r bg-white flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Dashboard
            </Link>
          </div>
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-900 text-sm">
              Semua Users ({users.length})
            </h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <UserList users={users} selectedUserId={params.userId} />
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow
            userId={user.id}
            userName={user.name}
            phoneNumber={user.phoneNumber}
          />
        </div>
      </div>
    </div>
  );
}
