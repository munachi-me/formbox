"use client";

import Link from "next/link";
import {
  ArrowRight,
  Ellipsis,
  FileText,
} from "lucide-react";

interface FormItem {
  id: string;
  name: string;
  description?: string;
  responses: number;
  status: "published" | "draft";
  updatedAt: string;
}

const forms: FormItem[] = [
  {
    id: "1",
    name: "Customer Feedback",
    description: "Collect feedback from customers.",
    responses: 24,
    status: "published",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Contact Form",
    description: "General contact and enquiry form.",
    responses: 8,
    status: "published",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    name: "Job Application",
    description: "Application form for new candidates.",
    responses: 42,
    status: "draft",
    updatedAt: "2 days ago",
  },
];

export function RecentForms() {
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

      <div className="overflow-hidden rounded-xl border border-white/[0.07]">
        {forms.map((form, index) => (
          <Link
            href={`/forms/${form.id}`}
            key={form.id}
            className={`
              group flex flex-col gap-4 p-4 transition
              hover:bg-white/[0.025]
              sm:flex-row sm:items-center
              ${
                index !== forms.length - 1
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
                  {form.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-gray-600">
                  {form.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 pl-12 sm:pl-0">
              <div>
                <p className="text-sm font-medium text-gray-300">
                  {form.responses}
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
                      : "bg-white/[0.06] text-gray-500"
                  }
                `}
              >
                {form.status}
              </span>

              <span className="hidden text-xs text-gray-700 md:block">
                {form.updatedAt}
              </span>

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                className="hidden h-8 w-8 items-center justify-center rounded-md text-gray-700 transition hover:bg-white/[0.05] hover:text-gray-400 sm:flex"
                aria-label={`More options for ${form.name}`}
              >
                <Ellipsis className="h-4 w-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}