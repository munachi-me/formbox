export type Profile = {
  id: string
  fullname: string
  email: string
  password: string | null
  created_at: string
  updated_at: string
}

export type FormStatus = 'draft' | 'published' | 'closed'

export type Form = {
  id: string
  user_id: string
  title: string
  description: string | null
  slug: string
  status: FormStatus
  created_at: string
  updated_at: string
  published_at: string | null
}

export type QuestionType = 
  | 'short_text'
  | 'long_text'
  | 'number'
  | 'multiple_choice'
  | 'checkbox'
  | 'dropdown'
  | 'rating'

export type Question = {
  id: string
  form_id: string
  type: QuestionType
  label: string
  description: string | null
  required: boolean
  position: number
  options: string[] | null
  created_at: string
}

export type Response = {
  id: string
  form_id: string
  submitted_at: string
}

export type Answer = {
  id: string
  response_id: string
  question_id: string
  value: any // JSONB
}

// Utility types
export type FormWithQuestions = Form & {
  questions: Question[]
}

export type ResponseWithAnswers = Response & {
  answers: Answer[]
}