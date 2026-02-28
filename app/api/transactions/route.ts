import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  try {
    const where: Record<string, unknown> = {};

    if (userId) where.userId = userId;
    if (type) where.type = type;
    if (category) where.category = category;

    if (startDate || endDate) {
      where.transactionDate = {};
      if (startDate) {
        (where.transactionDate as Record<string, unknown>).gte = new Date(startDate);
      }
      if (endDate) {
        (where.transactionDate as Record<string, unknown>).lte = new Date(endDate);
      }
    }

    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { transactionDate: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
            },
          },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    // Calculate summary
    const summary = await prisma.transaction.groupBy({
      by: ["type"],
      where,
      _sum: {
        amount: true,
      },
    });

    const totalIncome =
      summary.find((s) => s.type === "income")?._sum.amount || 0;
    const totalExpense =
      summary.find((s) => s.type === "expense")?._sum.amount || 0;

    return NextResponse.json({
      transactions,
      summary: {
        totalIncome,
        totalExpense,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
