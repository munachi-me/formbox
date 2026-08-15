"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  Contact,
  FileText,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";

import type { Template } from "@/types";

interface TemplateCardProps {
  template: Template;
}

const iconMap = {
  contact: Contact,
  feedback: MessageSquare,
  event: CalendarDays,
  application: BriefcaseBusiness,
  survey: ClipboardList,
  order: ShoppingBag,
  other: FileText,
} as const;

export function TemplateCard({
  template,
}: TemplateCardProps) {
  const Icon =
    iconMap[template.category] ?? FileText;

  const accentClasses =
    template.accent === "green"
      ? {
          icon: "bg-green/10 text-green-light",
          hover: "group-hover:text-green-light",
        }
      : {
          icon: "bg-purple/10 text-purple-light",
          hover: "group-hover:text-purple-light",
        };

  return (
    <Link
      href={`/forms/new?template=${template.slug}`}
      className="
        group relative flex h-full flex-col
        overflow-hidden rounded-xl
        border border-white/[0.07]
        bg-white/[0.02]
        p-5
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-white/[0.12]
        hover:bg-white/[0.035]
      "
    >
      {/* Icon */}
      <div className="flex items-start justify-between">
        <div
          className={`
            flex h-10 w-10 items-center
            justify-center rounded-lg
            ${accentClasses.icon}
          `}
        >
          <Icon className="h-5 w-5" />
        </div>

        <ArrowRight
          className="
            h-4 w-4
            text-gray-700
            transition-all duration-200
            group-hover:translate-x-1
            group-hover:text-gray-400
          "
        />
      </div>

      {/* Content */}
      <div className="mt-5 flex-1">
        <h3
          className={`
            text-sm font-medium text-gray-200
            transition-colors
            group-hover:text-white
          `}
        >
          {template.name}
        </h3>

        {template.description && (
          <p className="mt-1.5 text-xs leading-5 text-gray-600">
            {template.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span
          className={`
            text-[10px] font-medium capitalize
            text-gray-700
            transition-colors
            ${accentClasses.hover}
          `}
        >
          {template.category}
        </span>

        <span
          className="
            text-[10px] text-gray-700
            transition-colors
            group-hover:text-gray-400
          "
        >
          Use template
        </span>
      </div>
    </Link>
  );
}