import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const skip = (page - 1) * limit;

    const [chatLogs, total] = await Promise.all([
      prisma.chatLog.findMany({
        where: { userId },
        orderBy: { sentAt: "asc" },
        skip,
        take: limit,
        include: {
          transaction: {
            select: {
              id: true,
              type: true,
              amount: true,
              category: true,
            },
          },
        },
      }),
      prisma.chatLog.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      chatLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Chat logs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat logs" },
      { status: 500 }
    );
  }
}
