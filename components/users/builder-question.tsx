"use client";

import {
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Trash2,
} from "lucide-react";

import type {
  QuestionOption,
  QuestionType,
  RatingOptions,
} from "@/types";

import type {
  FormBuilderQuestion,
} from "@/types/form-builder";

import { Input } from "@/components/ui/input";
import { QuestionTypeSelect } from "./question-type-select";
import { QuestionOptions } from "./question-options";

interface BuilderQuestionProps {
  question: FormBuilderQuestion;
  index: number;
  total: number;

  onUpdate: (
    id: string,
    updates: Partial<FormBuilderQuestion>,
  ) => void;

  onDelete: (id: string) => void;

  onDuplicate: (id: string) => void;

  onMove: (
    id: string,
    direction: "up" | "down",
  ) => void;
}

const choiceTypes: QuestionType[] = [
  "multiple_choice",
  "checkbox",
  "dropdown",
];

export function BuilderQuestion({
  question,
  index,
  total,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove,
}: BuilderQuestionProps) {

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition-colors hover:border-white/[0.11]">
      {/* =====================================================
          QUESTION HEADER
      ====================================================== */}

      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="cursor-grab text-gray-700 transition group-hover:text-gray-500">
            <GripVertical className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md bg-purple/10 px-2 py-1 text-[10px] font-semibold text-purple-light">
              Q{index + 1}
            </span>

            {question.required && (
              <span className="rounded-md bg-red-400/[0.08] px-2 py-1 text-[10px] font-medium text-red-400">
                Required
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() =>
              onMove(question.id, "up")
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition hover:bg-white/[0.05] hover:text-gray-300 disabled:pointer-events-none disabled:opacity-20"
            aria-label="Move question up"
          >
            <ChevronUp className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled={index === total - 1}
            onClick={() =>
              onMove(question.id, "down")
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition hover:bg-white/[0.05] hover:text-gray-300 disabled:pointer-events-none disabled:opacity-20"
            aria-label="Move question down"
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDuplicate(question.id)
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition hover:bg-white/[0.05] hover:text-gray-300"
            aria-label="Duplicate question"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(question.id)
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition hover:bg-red-400/[0.06] hover:text-red-400"
            aria-label="Delete question"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* =====================================================
          QUESTION CONTENT
      ====================================================== */}

      <div className="space-y-5 p-5">
        <Input
          id={`question-${question.id}`}
          label="Question"
          value={question.label}
          onChange={(event) =>
            onUpdate(question.id, {
              label: event.target.value,
            })
          }
          placeholder="What would you like to ask?"
          required
        />

        <Input
          id={`description-${question.id}`}
          label="Description"
          value={question.description}
          onChange={(event) =>
            onUpdate(question.id, {
              description: event.target.value,
            })
          }
          placeholder="Add a helpful description (optional)"
        />

        <QuestionTypeSelect
          value={question.type}
          onChange={(type) => {
            let nextOptions:
              | QuestionOption[]
              | RatingOptions;

            if (choiceTypes.includes(type)) {
              nextOptions =
                question.options.length >= 2
                  ? question.options
                  : [
                      {
                        label: "Option 1",
                        value: "option-1",
                      },
                      {
                        label: "Option 2",
                        value: "option-2",
                      },
                    ];
            } else if (type === "rating") {
              nextOptions = {
                min: 1,
                max: 5,
              };
            } else {
              nextOptions = [];
            }

            onUpdate(question.id, {
              type,
              options: nextOptions,
            });
          }}
        />

        {choiceTypes.includes(question.type) && (
          <QuestionOptions
            questionId={question.id}
            type="choice"
            options={
              Array.isArray(question.options)
                ? question.options
                : [
                    {
                      label: "Option 1",
                      value: "option-1",
                    },
                    {
                      label: "Option 2",
                      value: "option-2",
                    },
                  ]
            }
            onChange={(next) =>
              onUpdate(question.id, {
                options: next,
              })
            }
          />
        )}

        {question.type === "rating" && (
          <QuestionOptions
            questionId={question.id}
            type="rating"
            options={
              question.options &&
              !Array.isArray(question.options) &&
              typeof question.options === "object" &&
              "min" in question.options &&
              "max" in question.options
                ? question.options
                : {
                    min: 1,
                    max: 5,
                  }
            }
            onChange={(next) =>
              onUpdate(question.id, {
                options: next,
              })
            }
          />
        )}

        {/* =====================================================
            REQUIRED
        ====================================================== */}

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <label className="flex cursor-pointer items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={question.required}
              onClick={() =>
                onUpdate(question.id, {
                  required: !question.required,
                })
              }
              className={`
                relative h-5 w-9 rounded-full transition
                ${
                  question.required
                    ? "bg-purple"
                    : "bg-white/[0.08]"
                }
              `}
            >
              <span
                className={`
                  absolute top-0.5 h-4 w-4 rounded-full bg-white transition
                  ${
                    question.required
                      ? "left-[18px]"
                      : "left-0.5"
                  }
                `}
              />
            </button>

            <span className="text-xs text-gray-400">
              Required
            </span>
          </label>

          <span className="text-[10px] text-gray-700">
            Question {index + 1}
          </span>
        </div>
      </div>
    </article>
  );
}