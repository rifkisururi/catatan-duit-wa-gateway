"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TransactionBadgeProps {
  transactionId: string;
  type?: string;
  amount?: number;
  category?: string;
}

export default function TransactionBadge({
  transactionId,
  type,
  amount,
  category,
}: TransactionBadgeProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/transactions?highlight=${transactionId}`);
  };

  return (
    <Badge
      variant={type === "income" ? "default" : "destructive"}
      className="cursor-pointer text-xs mt-1 flex items-center gap-1 w-fit"
      onClick={handleClick}
    >
      {type === "income" ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {amount
        ? `Rp${new Intl.NumberFormat("id-ID").format(amount)}`
        : transactionId.slice(0, 8)}
      {category && ` · ${category}`}
    </Badge>
  );
}
