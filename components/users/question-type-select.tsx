"use client";

import {
  AlignLeft,
  AtSign,
  CheckSquare,
  ChevronDown,
  Hash,
  List,
  MessageSquare,
  Star,
} from "lucide-react";

import type { QuestionType } from "@/types";

const questionTypes: {
  value: QuestionType;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    value: "short_text",
    label: "Short text",
    icon: AlignLeft,
  },
  {
    value: "email",
    label: "Email",
    icon: AtSign,
  },
  {
    value: "long_text",
    label: "Long text",
    icon: MessageSquare,
  },
  {
    value: "number",
    label: "Number",
    icon: Hash,
  },
  {
    value: "multiple_choice",
    label: "Multiple choice",
    icon: List,
  },
  {
    value: "checkbox",
    label: "Checkboxes",
    icon: CheckSquare,
  },
  {
    value: "dropdown",
    label: "Dropdown",
    icon: ChevronDown,
  },
  {
    value: "rating",
    label: "Rating",
    icon: Star,
  },
];

interface QuestionTypeSelectProps {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
}

export function QuestionTypeSelect({
  value,
  onChange,
}: QuestionTypeSelectProps) {
  const selected =
    questionTypes.find(
      (type) => type.value === value,
    ) ?? questionTypes[0];

  const Icon = selected.icon;

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        Question type
      </label>

      <div className="relative">

        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-light" />

        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value as QuestionType,
            )
          }
          className="
            h-11 w-full appearance-none
            rounded-xl
            border border-white/[0.08]
            bg-white/[0.025]
            pl-10 pr-10
            text-sm text-gray-200
            outline-none
            transition
            focus:border-purple/40
            focus:ring-2
            focus:ring-purple/10
          "
        >
          {questionTypes.map((type) => (
            <option
              key={type.value}
              value={type.value}
              className="bg-ink-light"
            >
              {type.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

      </div>
    </div>
  );
}