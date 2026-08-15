export type Profile = {
  id: string;
  fullname: string;
  email: string;
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
  name: string;
  description: string | null;
  category: TemplateCategory;
  thumbnail_url: string | null;
  is_featured: boolean;
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
  options: string[] | null;
  created_at: string;
}

/* =========================================================
   UTILITY TYPES
========================================================= */

export type FormWithQuestions = Form & {
  questions: Question[];
};

export type ResponseWithAnswers = Response & {
  answers: Answer[];
};

export type TemplateWithQuestions = Template & {
  questions: TemplateQuestion[];
};