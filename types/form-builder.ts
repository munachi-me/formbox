import type {
  QuestionOption,
  QuestionType,
} from "@/types";

export interface FormBuilderQuestion {
  id: string;
  type: QuestionType;
  label: string;
  description: string;
  required: boolean;
  options: QuestionOption[];
}

export interface FormBuilderData {
  title: string;
  description: string;
  questions: FormBuilderQuestion[];
}