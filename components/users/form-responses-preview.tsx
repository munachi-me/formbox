"use client";

import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import {formatDate} from "@/lib/utils"

import type { Response } from "@/types";

interface FormResponsesPreviewProps {
  responses: Response[];
  formId: string;
}


export function FormResponsesPreview({
  responses,
  formId,
}: FormResponsesPreviewProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Recent responses
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            The latest submissions to this form.
          </p>
        </div>

        {responses.length > 0 && (
          <Link
            href={`/forms/${formId}/responses`}
            className="flex items-center gap-1 text-xs text-gray-600 transition hover:text-gray-300"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.07]">
        {responses.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple/10 text-purple-light">
              <MessageSquare className="h-4 w-4" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-gray-300">
              No responses yet
            </h3>

            <p className="mt-1 max-w-xs text-xs leading-5 text-gray-600">
              Once people submit this form,
              their responses will appear here.
            </p>
          </div>
        ) : (
          responses.map((response, index) => (
            <Link
              key={response.id}
              href={`/forms/${formId}/responses/${response.id}`}
              className={`
                flex items-center gap-3 p-4
                transition hover:bg-white/[0.025]
                ${
                  index !== responses.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }
              `}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-gray-500">
                <MessageSquare className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-300">
                  Response
                </p>

                <p className="mt-0.5 text-[10px] text-gray-700">
                  {formatDate(
                    response.submitted_at,
                  )}
                </p>
              </div>

              <ArrowRight className="h-3.5 w-3.5 text-gray-700" />
            </Link>
          ))
        )}
      </div>
    </section>
  );
}