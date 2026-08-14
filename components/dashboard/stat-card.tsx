import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: StatCardProps) {
  const isPositive = trend === "up";

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600">
            {title}
          </p>

          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple/10">
          <Icon className="h-4 w-4 text-purple-light" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`
            inline-flex items-center gap-1 text-xs font-medium
            ${
              isPositive
                ? "text-green-light"
                : "text-red-400"
            }
          `}
        >
          {isPositive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}

          {change}
        </span>

        <span className="text-xs text-gray-700">
          vs last month
        </span>
      </div>
    </Card>
  );
}