"use client";

import {
  Check,
  CircleHelp,
} from "lucide-react";

import type { Question } from "@/types";

interface FormQuestionsPreviewProps {
  questions: Question[];
}

const typeLabels: Record<
  Question["type"],
  string
> = {
  short_text: "Short text",
  email: "Email",
  long_text: "Long text",
  number: "Number",
  multiple_choice: "Multiple choice",
  checkbox: "Checkboxes",
  dropdown: "Dropdown",
  rating: "Rating",
};

export function FormQuestionsPreview({
  questions,
}: FormQuestionsPreviewProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Questions
        </h2>

        <p className="mt-1 text-xs text-gray-600">
          Questions included in this form.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/[0.07]">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`
              p-4
              ${
                index !== questions.length - 1
                  ? "border-b border-white/[0.06]"
                  : ""
              }
            `}
          >
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-[10px] font-semibold text-purple-light">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-200">
                    {question.label}
                  </h3>

                  {question.required && (
                    <span
                      title="Required"
                      className="text-red-400"
                    >
                      *
                    </span>
                  )}
                </div>

                {question.description && (
                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    {question.description}
                  </p>
                )}

                <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-gray-700">
                  <CircleHelp className="h-3 w-3" />
                  {typeLabels[question.type]}
                </div>

                {question.options &&
                  question.options.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {question.options.map(
                        (option) => (
                          <div
                            key={option.value}
                            className="flex items-center gap-2 text-xs text-gray-600"
                          >
                            <Check className="h-3 w-3 text-gray-700" />
                            {option.label}
                          </div>
                        ),
                      )}
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}