"use client";

import Link from "next/link";
import {
  ArrowRight,
  FilePlus2,
  LayoutTemplate,
} from "lucide-react";

const actions = [
  {
    title: "Create a form",
    description: "Start from scratch and build your own form.",
    href: "/forms/new",
    icon: FilePlus2,
    accent: "purple",
  },
  {
    title: "Use a template",
    description: "Start faster with a professionally designed template.",
    href: "/templates",
    icon: LayoutTemplate,
    accent: "green",
  },
];

export function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Get started
        </h2>

        <p className="mt-1 text-xs text-gray-600">
          Choose how you want to build your next form.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.035]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-lg
                    ${
                      action.accent === "purple"
                        ? "bg-purple/10 text-purple-light"
                        : "bg-green/10 text-green-light"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowRight className="h-4 w-4 text-gray-700 transition-all duration-200 group-hover:translate-x-1 group-hover:text-gray-400" />
              </div>

              <h3 className="mt-4 text-sm font-medium text-gray-200">
                {action.title}
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-gray-600">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}