import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import UserList from "@/components/admin/UserList";
import { Users, TrendingUp, MessageSquare, Calendar } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalUsers, todayTransactions, totalTransactions, users] =
    await Promise.all([
      prisma.user.count(),
      prisma.transaction.count({
        where: {
          createdAt: { gte: today },
        },
      }),
      prisma.transaction.count(),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              transactions: true,
              chatLogs: true,
            },
          },
          chatLogs: {
            orderBy: { sentAt: "desc" },
            take: 1,
          },
        },
      }),
    ]);

  // Add lastMessageAt from the most recent chat log
  const usersWithLastMessage = users.map((user) => ({
    ...user,
    lastMessageAt: user.chatLogs[0]?.sentAt || null,
  }));

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Transaksi Hari Ini",
      value: todayTransactions,
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Transaksi",
      value: totalTransactions,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">
                {format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Halo, <span className="font-medium text-gray-900">{session.user?.name}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Stats + User list */}
          <div className="flex flex-col w-80 border-r bg-white overflow-hidden">
            {/* Stats */}
            <div className="p-4 border-b space-y-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.title}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{stat.title}</p>
                      <p className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* User list */}
            <div className="flex-1 overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-medium text-gray-900 text-sm">
                  Semua Users ({totalUsers})
                </h2>
              </div>
              <UserList users={usersWithLastMessage} />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-400">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Pilih user untuk melihat chat</p>
              <p className="text-sm mt-1">
                Klik nama user di panel kiri untuk membuka percakapan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
