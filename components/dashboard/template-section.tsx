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
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const templates: Template[] = [
  {
    id: "contact",
    name: "Contact Form",
    description: "Let people get in touch with you.",
    icon: Contact,
    color: "purple",
  },
  {
    id: "feedback",
    name: "Feedback Form",
    description: "Collect valuable customer feedback.",
    icon: MessageSquare,
    color: "green",
  },
  {
    id: "event",
    name: "Event Registration",
    description: "Register attendees for your event.",
    icon: CalendarDays,
    color: "purple",
  },
  {
    id: "application",
    name: "Job Application",
    description: "Collect applications from candidates.",
    icon: BriefcaseBusiness,
    color: "green",
  },
  {
    id: "survey",
    name: "Survey",
    description: "Create a simple online survey.",
    icon: ClipboardList,
    color: "purple",
  },
  {
    id: "order",
    name: "Order Form",
    description: "Collect product or service orders.",
    icon: ShoppingBag,
    color: "green",
  },
];

export function TemplateSection() {
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

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {templates.map((template) => {
          const Icon = template.icon;

          return (
            <Link
              key={template.id}
              href={`/forms/new?template=${template.id}`}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.035]"
            >
              <div
                className={`
                  flex h-9 w-9 items-center justify-center rounded-lg
                  ${
                    template.color === "purple"
                      ? "bg-purple/10 text-purple-light"
                      : "bg-green/10 text-green-light"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
              </div>

              <h3 className="mt-4 text-xs font-medium text-gray-200 transition group-hover:text-white">
                {template.name}
              </h3>

              <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-gray-600">
                {template.description}
              </p>

              <span className="mt-3 inline-flex items-center gap-1 text-[10px] text-gray-700 transition group-hover:text-purple-light">
                Use template
                <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}