"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  Contact,
  MessageSquare,
  ShoppingBag,
  FileText,
} from "lucide-react";

import type { Template } from "@/types";
import { TemplateGrid } from "@/components/users/template-grid";


interface TemplateSectionProps {
  templates: Template[];
}

const templateIcons = {
  contact: Contact,
  feedback: MessageSquare,
  event: CalendarDays,
  application: BriefcaseBusiness,
  survey: ClipboardList,
  order: ShoppingBag,
  other: FileText,
};

export function TemplateSection({
  templates,
}: TemplateSectionProps) {

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Start with a template
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Build faster with a ready-made starting point.
          </p>
        </div>

        <Link
          href="/templates"
          className="flex items-center gap-1 text-xs text-gray-600 transition hover:text-gray-300"
        >
          Browse all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-gray-500">
            No templates available yet.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <TemplateGrid
            templates={templates}
          />
        </div>
      )}
    </section>
  );
}