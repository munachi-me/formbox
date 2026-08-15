"use client";

import {
  FileText,
  Send,
  FilePenLine,
  MessageSquare,
} from "lucide-react";

interface FormsStatsProps {
  total: number;
  published: number;
  drafts: number;
  responses: number;
}

export function FormsStats({
  total,
  published,
  drafts,
  responses,
}: FormsStatsProps) {
  const stats = [
    {
      label: "Total forms",
      value: total,
      icon: FileText,
      className: "text-purple-light bg-purple/10",
    },
    {
      label: "Published",
      value: published,
      icon: Send,
      className: "text-green-light bg-green/10",
    },
    {
      label: "Drafts",
      value: drafts,
      icon: FilePenLine,
      className: "text-gray-400 bg-white/[0.05]",
    },
    {
      label: "Responses",
      value: responses,
      icon: MessageSquare,
      className: "text-purple-light bg-purple/10",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:bg-white/[0.025]"
          >
            <div className="flex items-center justify-between gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.className}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <span className="text-xl font-semibold tracking-tight text-white">
                {stat.value}
              </span>
            </div>

            <p className="mt-3 text-[11px] font-medium text-gray-600">
              {stat.label}
            </p>
          </div>
        );
      })}
    </section>
  );
}