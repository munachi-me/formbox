"use client";

import type { FormStatus } from "@/types";

import {
  FileText,
  Send,
  FilePenLine,
  Square,
  MessageSquare,
  ListChecks,
  CircleDot,
  CalendarDays,
} from "lucide-react";
import {formatDate} from "@/lib/utils"

interface FormStatsProps {
  responses: number;
  questions: number;
  createdAt: string;
  status: FormStatus;
}

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
  closed,
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
      label: "Closed",
      value: closed,
      icon: Square,
      className: "text-red-400 bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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

              {/*<Icon className="h-4 w-4 text-gray-700" />*/}
              <div
               className={`
                 flex h-8 w-8 items-center
                 justify-center rounded-lg
                 ${stat.className}
               `}
              >
               <Icon className="h-4 w-4" />
              </div>
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


export function FormStats({
  responses,
  questions,
  createdAt,
  status,
}: FormStatsProps) {
  const stats = [
    {
      label: "Questions",
      value: questions,
      icon: ListChecks,
      className: "text-purple-light bg-purple/10",
    },
    {
      label: "Responses",
      value: responses,
      icon: MessageSquare,
      className: "text-green-light bg-green/10",
    },
    {
      label: "Created",
      value: formatDate(createdAt),
      icon: CalendarDays,
      className: "text-purple-light bg-purple/10",
    },
    {
      label: "Status",
      value:
        status.charAt(0).toUpperCase() +
        status.slice(1),
      icon: CircleDot,
      className:
        status === "published"
          ? "text-green-light bg-green/10"
          : status === "draft"
            ? "text-gray-400 bg-white/[0.05]"
            : "text-red-400 bg-red-400/10",
    },
  ];

  // return (
  //   <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
  //     {stats.map((stat) => {
  //       const Icon = stat.icon;

  //       return (
  //         <div
  //           key={stat.label}
  //           className="
  //             rounded-xl
  //             border border-white/[0.07]
  //             bg-white/[0.015]
  //             p-4
  //             transition-colors
  //             hover:bg-white/[0.025]
  //           "
  //         >
  //           <div className="flex items-center justify-between gap-3">
  //             <div
  //               className={`
  //                 flex h-8 w-8 items-center
  //                 justify-center rounded-lg
  //                 ${stat.className}
  //               `}
  //             >
  //               <Icon className="h-4 w-4" />
  //             </div>

  //             <span
  //               className={`
  //                 max-w-[120px] truncate
  //                 text-xl font-semibold
  //                 tracking-tight text-white
  //                 ${
  //                   typeof stat.value === "string" &&
  //                   stat.value.length > 8
  //                     ? "text-sm"
  //                     : ""
  //                 }
  //               `}
  //             >
  //               {stat.value}
  //             </span>
  //           </div>

  //           <p className="mt-3 text-[11px] font-medium text-gray-600">
  //             {stat.label}
  //           </p>
  //         </div>
  //       );
  //     })}
  //   </section>
  // );

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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

              {/*<Icon className="h-4 w-4 text-gray-700" />*/}
              <div
               className={`
                 flex h-8 w-8 items-center
                 justify-center rounded-lg
                 ${stat.className}
               `}
              >
               <Icon className="h-4 w-4" />
              </div>
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