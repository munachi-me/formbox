"use client";

import {
  ChevronDown,
  ChevronUp,
  // Copy,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type {
  QuestionOption,
  QuestionType,
} from "@/types";

import type {
  FormBuilderQuestion,
} from "@/types/form-builder";

interface FormBuilderProps {
  title: string;
  description: string;

  questions: FormBuilderQuestion[];

  onTitleChange: (
    value: string,
  ) => void;

  onDescriptionChange: (
    value: string,
  ) => void;

  onAddQuestion: (
    type?: QuestionType,
  ) => void;

  onUpdateQuestion: (
    id: string,
    updates: Partial<FormBuilderQuestion>,
  ) => void;

  onDeleteQuestion: (
    id: string,
  ) => void;

  onMoveQuestion: (
    id: string,
    direction: "up" | "down",
  ) => void;
}

const questionTypes: {
  value: QuestionType;
  label: string;
}[] = [
  {
    value: "short_text",
    label: "Short text",
  },
  {
    value: "long_text",
    label: "Long text",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "multiple_choice",
    label: "Multiple choice",
  },
  {
    value: "checkbox",
    label: "Checkboxes",
  },
  {
    value: "dropdown",
    label: "Dropdown",
  },
  {
    value: "rating",
    label: "Rating",
  },
];

export function FormBuilder({
  title,
  description,
  questions,
  onTitleChange,
  onDescriptionChange,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onMoveQuestion,
}: FormBuilderProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* =====================================================
          FORM DETAILS
      ====================================================== */}

      <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-6">
        <Input
          id="form-title"
          label="Form title"
          value={title}
          onChange={(event) =>
            onTitleChange(
              event.target.value,
            )
          }
          placeholder="Untitled form"
          required
        />

        <div className="mt-5">
          <Input
            id="form-description"
            label="Description"
            value={description}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value,
              )
            }
            placeholder="Tell people what this form is about..."
          />
        </div>
      </div>

      {/* =====================================================
          QUESTIONS
      ====================================================== */}

      <div className="mt-6 space-y-3">
        {questions.map(
          (question, index) => (
            <QuestionEditor
              key={question.id}
              question={question}
              index={index}
              total={questions.length}
              onUpdate={
                onUpdateQuestion
              }
              onDelete={
                onDeleteQuestion
              }
              onMove={
                onMoveQuestion
              }
            />
          ),
        )}
      </div>

      {/* =====================================================
          ADD QUESTION
      ====================================================== */}

      <div className="mt-4">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() =>
            onAddQuestion()
          }
          className="w-full"
        >
          <Plus className="h-4 w-4" />
          Add question
        </Button>
      </div>
    </div>
  );
}

/* =========================================================
   QUESTION EDITOR
========================================================= */

interface QuestionEditorProps {
  question: FormBuilderQuestion;
  index: number;
  total: number;

  onUpdate: (
    id: string,
    updates: Partial<FormBuilderQuestion>,
  ) => void;

  onDelete: (id: string) => void;

  onMove: (
    id: string,
    direction: "up" | "down",
  ) => void;
}

function QuestionEditor({
  question,
  index,
  total,
  onUpdate,
  onDelete,
  onMove,
}: QuestionEditorProps) {
  const hasOptions =
    question.type ===
      "multiple_choice" ||
    question.type === "checkbox" ||
    question.type === "dropdown";

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-700" />

          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-700">
            Question {index + 1}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() =>
              onMove(
                question.id,
                "up",
              )
            }
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-600 transition hover:bg-white/[0.05] hover:text-gray-300 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Move question up"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            disabled={
              index === total - 1
            }
            onClick={() =>
              onMove(
                question.id,
                "down",
              )
            }
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-600 transition hover:bg-white/[0.05] hover:text-gray-300 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Move question down"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(question.id)
            }
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-700 transition hover:bg-red-400/[0.06] hover:text-red-400"
            aria-label="Delete question"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Question fields */}
      <div className="mt-4 grid gap-4">
        <Input
          id={`question-${question.id}`}
          label="Question"
          value={question.label}
          onChange={(event) =>
            onUpdate(question.id, {
              label:
                event.target.value,
            })
          }
          placeholder="Enter your question..."
          required
        />

        <Input
          id={`description-${question.id}`}
          label="Description"
          value={question.description}
          onChange={(event) =>
            onUpdate(question.id, {
              description:
                event.target.value,
            })
          }
          placeholder="Optional description"
        />

        {/* Type */}
        <div>
          <label
            htmlFor={`type-${question.id}`}
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Question type
          </label>

          <select
            id={`type-${question.id}`}
            value={question.type}
            onChange={(event) => {
              const type =
                event.target
                  .value as QuestionType;

              onUpdate(question.id, {
                type,
                options:
                  type ===
                    "multiple_choice" ||
                  type === "checkbox" ||
                  type === "dropdown"
                    ? question.options
                        .length > 0
                      ? question.options
                      : [
                          {
                            label:
                              "Option 1",
                            value:
                              "option-1",
                          },
                        ]
                    : [],
              });
            }}
            className="
              h-10 w-full
              rounded-lg
              border border-white/[0.08]
              bg-white/[0.025]
              px-3
              text-sm text-white
              outline-none
              transition
              focus:border-purple/50
              focus:ring-2
              focus:ring-purple/10
            "
          >
            {questionTypes.map(
              (type) => (
                <option
                  key={type.value}
                  value={type.value}
                  className="bg-ink-light"
                >
                  {type.label}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Options */}
        {hasOptions && (
          <OptionsEditor
            options={question.options}
            onChange={(options) =>
              onUpdate(
                question.id,
                { options },
              )
            }
          />
        )}

        {/* Required */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(event) =>
              onUpdate(question.id, {
                required:
                  event.target.checked,
              })
            }
            className="h-4 w-4 rounded border-white/[0.1] bg-white/[0.03] text-purple focus:ring-purple/20"
          />

          <span className="text-xs text-gray-400">
            Required question
          </span>
        </label>
      </div>
    </div>
  );
}

/* =========================================================
   OPTIONS
========================================================= */

function OptionsEditor({
  options,
  onChange,
}: {
  options: QuestionOption[];
  onChange: (
    options: QuestionOption[],
  ) => void;
}) {
  function updateOption(
    index: number,
    label: string,
  ) {
    const next = [...options];

    next[index] = {
      ...next[index],
      label,
      value:
        label
          .toLowerCase()
          .trim()
          .replace(
            /\s+/g,
            "-",
          ) || `option-${index + 1}`,
    };

    onChange(next);
  }

  function addOption() {
    onChange([
      ...options,
      {
        label: `Option ${
          options.length + 1
        }`,
        value: `option-${
          options.length + 1
        }`,
      },
    ]);
  }

  function removeOption(
    index: number,
  ) {
    onChange(
      options.filter(
        (_, i) => i !== index,
      ),
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-200">
          Options
        </label>

        <span className="text-[10px] text-gray-700">
          {options.length} options
        </span>
      </div>

      <div className="space-y-2">
        {options.map(
          (option, index) => (
            <div
              key={`${option.value}-${index}`}
              className="flex items-center gap-2"
            >
              <Input
                id={`option-${index}`}
                value={option.label}
                onChange={(event) =>
                  updateOption(
                    index,
                    event.target
                      .value,
                  )
                }
                placeholder={`Option ${
                  index + 1
                }`}
                containerClassName="flex-1"
              />

              <button
                type="button"
                onClick={() =>
                  removeOption(
                    index,
                  )
                }
                disabled={
                  options.length <= 1
                }
                className="mt-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] text-gray-700 transition hover:border-red-400/20 hover:text-red-400 disabled:pointer-events-none disabled:opacity-30"
                aria-label="Remove option"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-600 transition hover:text-purple-light"
      >
        <Plus className="h-3.5 w-3.5" />
        Add option
      </button>
    </div>
  );
}