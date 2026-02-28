import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log("👥 [USERS] Fetching users list");
  const session = await auth();

  if (!session) {
    console.log("❌ [USERS] Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`✅ [USERS] Authenticated as: ${session.user?.email}`);
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");

  try {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { phoneNumber: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    console.log(`🔍 [USERS] Fetching users with search: "${search || "all"}"`);
    const users = await prisma.user.findMany({
      where,
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
    });

    // Add lastMessageAt from the most recent chat log
    const usersWithLastMessage = users.map((user) => ({
      ...user,
      lastMessageAt: user.chatLogs[0]?.sentAt || null,
    }));

    console.log(`✅ [USERS] Found ${users.length} users`);
    return NextResponse.json({ users: usersWithLastMessage });
  } catch (error) {
    console.error("❌ [USERS] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
