"use client";

import type { Template } from "@/types";
import { TemplateCard } from "./template-card";

interface TemplateGridProps {
  templates: Template[];
}

export function TemplateGrid({
  templates,
}: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] px-6 py-16 text-center">
        <p className="text-sm font-medium text-gray-300">
          No templates found
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template, i) => (
        <TemplateCard
          key={i}
          template={template}
        />
      ))}
    </div>
  );
}