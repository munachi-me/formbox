"use client";

import {
  FileText,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

interface FormStatsProps {
  responses: number;
  questions: number;
  createdAt: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function FormStats({
  responses,
  questions,
  createdAt,
}: FormStatsProps) {
  const stats = [
    {
      label: "Responses",
      value: responses,
      icon: MessageSquare,
    },
    {
      label: "Questions",
      value: questions,
      icon: FileText,
    },
    {
      label: "Created",
      value: formatDate(createdAt),
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              rounded-xl
              border border-white/[0.07]
              bg-white/[0.02]
              p-4
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {stat.label}
              </span>

              <Icon className="h-4 w-4 text-gray-700" />
            </div>

            <p className="mt-3 text-xl font-semibold text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}