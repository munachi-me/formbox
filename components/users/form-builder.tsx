"use client";

import {
  ClipboardList,
  FileText,
  Plus,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type {
  QuestionOption,
  QuestionType,
} from "@/types";

import type {
  FormBuilderQuestion,
} from "@/types/form-builder";

import { BuilderSidebar } from "./builder-sidebar";
import { BuilderQuestion } from "./builder-question";

interface FormBuilderProps {
  title: string;
  description: string;
  questions: FormBuilderQuestion[];

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;

  onAddQuestion: (type?: QuestionType) => void;

  onUpdateQuestion: (
    id: string,
    updates: Partial<FormBuilderQuestion>,
  ) => void;

  onDeleteQuestion: (id: string) => void;

  onDuplicateQuestion: (id: string) => void;

  onMoveQuestion: (
    id: string,
    direction: "up" | "down",
  ) => void;
}

export function FormBuilder({
  title,
  description,
  questions,
  onTitleChange,
  onDescriptionChange,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onMoveQuestion,
}: FormBuilderProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-6">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <BuilderSidebar
        title={title}
        questions={questions}
        onAddQuestion={onAddQuestion}
      />

      {/* =====================================================
          MAIN CANVAS
      ====================================================== */}

      <div className="min-w-0 flex-1">

        {/* Form details */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">

          <div className="border-b border-white/[0.06] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple/10 text-purple-light">
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Form details
                </h2>

                <p className="mt-0.5 text-xs text-gray-600">
                  Give your form a title and description.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6">

            <Input
              id="form-title"
              label="Title"
              value={title}
              onChange={(event) =>
                onTitleChange(event.target.value)
              }
              placeholder="e.g. Customer Feedback"
              required
            />

            <Input
              id="form-description"
              label="Description"
              value={description}
              onChange={(event) =>
                onDescriptionChange(event.target.value)
              }
              placeholder="Tell people what this form is about..."
            />

          </div>
        </section>

        {/* Questions */}
        <section className="mt-8">

          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-purple-light" />

                <h2 className="text-sm font-semibold text-white">
                  Questions
                </h2>

                <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-gray-500">
                  {questions.length}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-600">
                Add and arrange the questions people will answer.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {questions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/[0.1] px-6 py-14 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 text-purple-light">
                  <ClipboardList className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-medium text-gray-200">
                  No questions yet
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-600">
                  Start building your form by adding your first question.
                </p>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  onClick={() =>
                    onAddQuestion()
                  }
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add question
                </Button>
              </div>
            ) : (
              questions.map((question, index) => (
                <BuilderQuestion
                  key={question.id}
                  question={question}
                  index={index}
                  total={questions.length}
                  onUpdate={onUpdateQuestion}
                  onDelete={onDeleteQuestion}
                  onDuplicate={onDuplicateQuestion}
                  onMove={onMoveQuestion}
                />
              ))
            )}
          </div>

          {questions.length > 0 && (
            <button
              type="button"
              onClick={() => onAddQuestion()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.1] py-4 text-xs font-medium text-gray-600 transition hover:border-purple/30 hover:bg-purple/[0.03] hover:text-purple-light"
            >
              <Plus className="h-4 w-4" />
              Add question
            </button>
          )}

        </section>
      </div>
    </div>
  );
}