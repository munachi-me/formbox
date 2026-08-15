"use client";

import Link from "next/link";
import {
  ArrowRight,
  Ellipsis,
  FileText,
} from "lucide-react";

import type { DashboardForm } from "@/hooks/useDashboard";

interface RecentFormsProps {
  forms: DashboardForm[];
}

function formatRelativeDate(date: string) {
  const value = new Date(date);
  const now = new Date();

  const diff =
    now.getTime() - value.getTime();

  const minutes = Math.floor(
    diff / (1000 * 60),
  );

  if (minutes < 1) return "Just now";

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24,
  );

  if (days < 7) {
    return `${days}d ago`;
  }

  return value.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    },
  );
}

export function RecentForms({
  forms,
}: RecentFormsProps) {
  const recentForms = forms.slice(0, 5);

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Recent forms
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Your recently created and updated forms.
          </p>
        </div>

        <Link
          href="/forms"
          className="flex items-center gap-1 text-xs text-gray-600 transition hover:text-gray-300"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {recentForms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] p-8 text-center">
          <FileText className="mx-auto h-6 w-6 text-gray-700" />

          <p className="mt-3 text-sm text-gray-400">
            You haven't created any forms yet.
          </p>

          <Link
            href="/forms/new"
            className="mt-3 inline-flex text-xs text-purple-light hover:text-purple-lighter"
          >
            Create your first form
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/[0.07]">
          {recentForms.map((form, index) => (
            <Link
              href={`/forms/${form.id}`}
              key={form.id}
              className={`
                group flex flex-col gap-4 p-4 transition
                hover:bg-white/[0.025]
                sm:flex-row sm:items-center
                ${
                  index !== recentForms.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }
              `}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple-light">
                  <FileText className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-gray-200">
                    {form.title}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-gray-600">
                    {form.description ||
                      "No description"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 pl-12 sm:pl-0">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {form.response_count}
                  </p>

                  <p className="text-[10px] text-gray-700">
                    responses
                  </p>
                </div>

                <span
                  className={`
                    rounded-full px-2 py-1 text-[10px] font-medium
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

                <span className="hidden text-xs text-gray-700 md:block">
                  {formatRelativeDate(
                    form.updated_at,
                  )}
                </span>

                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  className="hidden h-8 w-8 items-center justify-center rounded-md text-gray-700 transition hover:bg-white/[0.05] hover:text-gray-400 sm:flex"
                  aria-label={`More options for ${form.title}`}
                >
                  <Ellipsis className="h-4 w-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}