"use client";

import {
  BarChart3,
  CalendarDays,
  Ellipsis,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

import type { FormWithResponseCount } from "@/hooks/useForms";

interface FormCardProps {
  form: FormWithResponseCount;
  onDelete: (id: string) => void;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function FormCard({
  form,
  onDelete,
}: FormCardProps) {
  return (
    <article className="group rounded-xl border border-white/[0.07] bg-white/[0.015] transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.025]">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple-light">
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <Link
                href={`/forms/${form.id}`}
                className="block truncate text-sm font-medium text-gray-200 transition hover:text-white"
              >
                {form.title}
              </Link>

              {form.description && (
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-600">
                  {form.description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onDelete(form.id)}
            aria-label={`Delete ${form.title}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-700 transition hover:bg-red-400/[0.06] hover:text-red-400"
          >
            <Ellipsis className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.05] pt-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>
              {form.response_count}{" "}
              {form.response_count === 1
                ? "response"
                : "responses"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>
              Updated {formatDate(form.updated_at)}
            </span>
          </div>

          <span
            className={`
              ml-auto rounded-full px-2 py-1 text-[10px] font-medium
              ${
                form.status === "published"
                  ? "bg-green/10 text-green-light"
                  : form.status === "closed"
                    ? "bg-red-400/10 text-red-400"
                    : "bg-white/[0.06] text-gray-500"
              }
            `}
          >
            {form.status}
          </span>
        </div>
      </div>

      <div className="flex border-t border-white/[0.05]">
        <Link
          href={`/forms/${form.id}`}
          className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs text-gray-600 transition hover:bg-white/[0.025] hover:text-white"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          View form
        </Link>

        <Link
          href={`/forms/${form.id}/edit`}
          className="border-l border-white/[0.05] px-5 py-2.5 text-xs text-gray-600 transition hover:bg-white/[0.025] hover:text-white"
        >
          Edit
        </Link>
      </div>
    </article>
  );
}