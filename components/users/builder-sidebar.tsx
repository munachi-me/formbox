"use client";

import {
  ClipboardList,
  FileText,
  Plus,
} from "lucide-react";

import type { QuestionType } from "@/types";
import type { FormBuilderQuestion } from "@/types/form-builder";

interface BuilderSidebarProps {
  title: string;
  questions: FormBuilderQuestion[];
  onAddQuestion: (type?: QuestionType) => void;
}

export function BuilderSidebar({
  title,
  questions,
  onAddQuestion,
}: BuilderSidebarProps) {
  return (
    <aside className="sticky top-8 hidden h-fit w-56 shrink-0 lg:block">

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">

        <div className="flex items-center gap-2 px-2 py-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple/10 text-purple-light">
            <FileText className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-200">
              {title || "Untitled form"}
            </p>

            <p className="text-[10px] text-gray-700">
              {questions.length}{" "}
              {questions.length === 1
                ? "question"
                : "questions"}
            </p>
          </div>

        </div>

        <div className="my-3 h-px bg-white/[0.06]" />

        <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
          Questions
        </p>

        <div className="mt-2 space-y-1">

          {questions.map((question, index) => (
            <div
              key={question.id}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-gray-500 transition hover:bg-white/[0.04] hover:text-gray-300"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-[9px] text-gray-600">
                {index + 1}
              </span>

              <span className="truncate">
                {question.label ||
                  "Untitled question"}
              </span>
            </div>
          ))}

          {questions.length === 0 && (
            <div className="px-2 py-3 text-[11px] text-gray-700">
              No questions yet.
            </div>
          )}

        </div>

        <button
          type="button"
          onClick={() => onAddQuestion()}
          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] text-xs font-medium text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-200"
        >
          <Plus className="h-3.5 w-3.5" />
          Add question
        </button>

      </div>

    </aside>
  );
}