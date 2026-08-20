import type {
  QuestionOption,
  QuestionType,
  RatingOptions,
} from "@/types";


export interface FormBuilderQuestion {
  id: string;
  type: QuestionType;
  label: string;
  description: string;
  required: boolean;
  options: QuestionOption[] | RatingOptions;
}

export interface FormBuilderData {
  title: string;
  description: string;
  questions: FormBuilderQuestion[];
}