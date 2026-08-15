export type Profile = {
  id: string;
  fullname: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type FormStatus =
  | "draft"
  | "published"
  | "closed";

export interface Form {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  share_id: string;
  status: FormStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface QuestionOption {
  label: string;
  value: string;
}

export type QuestionType =
  | "short_text"
  | "long_text"
  | "number"
  | "multiple_choice"
  | "checkbox"
  | "dropdown"
  | "rating";

export interface Question {
  id: string;
  form_id: string;
  type: QuestionType;
  label: string;
  description: string | null;
  required: boolean;
  position: number;
  options: QuestionOption[] | null;
  created_at: string;
}

export interface Response {
  id: string;
  form_id: string;
  submitted_at: string;
}

export interface Answer {
  id: string;
  response_id: string;
  question_id: string;
  value: unknown;
}

/* =========================================================
   TEMPLATES
========================================================= */

export type TemplateCategory =
  | "contact"
  | "feedback"
  | "event"
  | "application"
  | "survey"
  | "order"
  | "other";

export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: TemplateCategory;
  icon: string | null;
  accent: "purple" | "green";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateQuestion {
  id: string;
  template_id: string;
  type: QuestionType;
  label: string;
  description: string | null;
  required: boolean;
  position: number;
  options: QuestionOption[] | null;
}

/* =========================================================
   UTILITY TYPES
========================================================= */

export interface FormWithQuestions extends Form {
  questions: Question[];
};

export interface ResponseWithAnswers extends Response {
  answers: Answer[];
};

export interface TemplateWithQuestions extends Template {
  questions: TemplateQuestion[];
}