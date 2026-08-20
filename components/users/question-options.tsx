"use client";

import {
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import type {
  QuestionOption,
  RatingOptions,
} from "@/types";

interface QuestionOptionsProps {
  questionId: string;
  type: "choice" | "rating";

  options: QuestionOption[] | RatingOptions;

  onChange: (
    options: QuestionOption[] | RatingOptions,
  ) => void;
}

function isRatingOptions(
  options: QuestionOption[] | RatingOptions,
): options is RatingOptions {
  return (
    !Array.isArray(options) &&
    typeof options === "object" &&
    options !== null
  );
}

export function QuestionOptions({
  questionId,
  type,
  options,
  onChange,
}: QuestionOptionsProps) {
  if (type === "rating") {
    const ratingOptions = isRatingOptions(options)
      ? options
      : {
          min: 1,
          max: 5,
        };

    return (
      <RatingOptionsEditor
        questionId={questionId}
        options={ratingOptions}
        onChange={onChange}
      />
    );
  }

  const choiceOptions = Array.isArray(options)
    ? options
    : [];

  return (
    <ChoiceOptionsEditor
      questionId={questionId}
      options={choiceOptions}
      onChange={onChange}
    />
  );
}

/* =========================================================
   CHOICE OPTIONS
========================================================= */

interface ChoiceOptionsEditorProps {
  questionId: string;
  options: QuestionOption[];
  onChange: (
    options: QuestionOption[],
  ) => void;
}

function ChoiceOptionsEditor({
  questionId,
  options,
  onChange,
}: ChoiceOptionsEditorProps) {
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
          .replace(/\s+/g, "-") ||
        `option-${index + 1}`,
    };

    onChange(next);
  }

  function addOption() {
    const index = options.length + 1;

    onChange([
      ...options,
      {
        label: `Option ${index}`,
        value: `option-${index}`,
      },
    ]);
  }

  function removeOption(index: number) {
    if (options.length <= 2) {
      return;
    }

    onChange(
      options.filter(
        (_, optionIndex) =>
          optionIndex !== index,
      ),
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-300">
            Options
          </p>

          <p className="mt-0.5 text-[10px] text-gray-700">
            Add the choices users can select.
          </p>
        </div>

        <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-gray-600">
          {options.length}
        </span>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <GripVertical className="h-4 w-4 shrink-0 text-gray-800" />

            <label
              htmlFor={`option-${questionId}-${index + 1}`}
              className="flex h-10 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.035] text-[10px] text-gray-600"
            >
              {index + 1}
            </label>

            <input
              id={`option-${questionId}-${index + 1}`}
              value={option.label}
              onChange={(event) =>
                updateOption(
                  index,
                  event.target.value,
                )
              }
              placeholder={`Option ${index + 1}`}
              className="
                h-10 min-w-0 flex-1
                rounded-lg
                border border-white/[0.07]
                bg-white/[0.02]
                px-3
                text-xs text-gray-200
                outline-none
                placeholder:text-gray-700
                focus:border-purple/40
              "
            />

            <button
              type="button"
              onClick={() =>
                removeOption(index)
              }
              disabled={options.length <= 2}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-700 transition hover:bg-red-400/[0.06] hover:text-red-400 disabled:pointer-events-none disabled:opacity-20"
              aria-label={`Remove option ${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 transition hover:text-purple-light"
      >
        <Plus className="h-3.5 w-3.5" />
        Add option
      </button>
    </div>
  );
}

/* =========================================================
   RATING OPTIONS
========================================================= */

interface RatingOptionsEditorProps {
  questionId: string;
  options: RatingOptions;
  onChange: (options: RatingOptions) => void;
}

function RatingOptionsEditor({
  questionId,
  options,
  onChange,
}: RatingOptionsEditorProps) {
  const minId = `rating-min-${questionId}`;
  const maxId = `rating-max-${questionId}`;

  const min = options.min ?? 1;
  const max = options.max ?? 5;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-300">
            Rating range
          </p>

          <p className="mt-0.5 text-[10px] text-gray-700">
            Set the minimum and maximum rating values.
          </p>
        </div>

        <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-gray-600">
          {min}–{max}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          id={minId}
          label="Minimum"
          type="number"
          value={min}
          onChange={(event) => {
            const value = Number(event.target.value);

            onChange({
              min: value,
              max: Math.max(value, max),
            });
          }}
        />

        <Input
          id={maxId}
          label="Maximum"
          type="number"
          value={max}
          onChange={(event) => {
            const value = Number(event.target.value);

            onChange({
              min: Math.min(min, value),
              max: value,
            });
          }}
        />
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-medium text-gray-700">
          Preview
        </p>

        <div className="flex flex-wrap gap-2">
          {Array.from(
            {
              length: Math.max(0, max - min + 1),
            },
            (_, index) => min + index,
          ).map((value) => (
            <div
              key={value}
              className="
                flex h-9 min-w-9
                items-center justify-center
                rounded-lg
                border border-white/[0.07]
                bg-white/[0.025]
                px-2
                text-xs
                text-gray-400
              "
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}