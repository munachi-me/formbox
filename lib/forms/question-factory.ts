import type {
  QuestionOption,
  QuestionType,
  TemplateQuestion,
} from "@/types";

import type {
  FormBuilderQuestion,
} from "@/types/form-builder";

function createId() {
  return crypto.randomUUID();
}

export function createEmptyQuestion(
  type: QuestionType = "short_text",
): FormBuilderQuestion {
  return {
    id: createId(),
    type,
    label: "",
    description: "",
    required: false,
    options:
      type === "multiple_choice" ||
      type === "checkbox" ||
      type === "dropdown"
        ? [
            {
              label: "Option 1",
              value: "option-1",
            },
            {
              label: "Option 2",
              value: "option-2",
            },
          ]
        : [],
  };
}

export function templateQuestionToBuilderQuestion(
  question: TemplateQuestion,
): FormBuilderQuestion {
  return {
    id: createId(),
    type: question.type,
    label: question.label,
    description:
      question.description ?? "",
    required: question.required,
    options:
      question.options?.map(
        (option) => ({
          ...option,
        }),
      ) ?? [],
  };
}