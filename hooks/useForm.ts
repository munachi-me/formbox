"use client";

import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import type {
  FormWithQuestions,
  Question,
  QuestionType,
} from "@/types";

export function useForm(id: string | undefined) {
  const [form, setForm] =
    useState<FormWithQuestions | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const fetchForm = useCallback(async () => {
    if (!id) {
      setForm(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("forms")
      .select(
        `
          *,
          questions (
            id,
            form_id,
            type,
            label,
            description,
            required,
            position,
            options,
            created_at
          )
        `,
      )
      .eq("id", id)
      .single();

    if (error) {
      setError(error.message);
      setForm(null);
    } else {
      const sortedQuestions = [
        ...(data.questions ?? []),
      ].sort(
        (a: Question, b: Question) =>
          a.position - b.position,
      );

      setForm({
        ...data,
        questions: sortedQuestions,
      });
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const updateForm = useCallback(
    async (
      updates: Partial<
        Pick<
          FormWithQuestions,
          "title" | "description" | "status"
        >
      >,
    ) => {
      if (!id) {
        return {
          data: null,
          error: new Error("Form ID is required"),
        };
      }

      const { data, error } = await supabase
        .from("forms")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        setForm((current) =>
          current
            ? {
                ...current,
                ...data,
              }
            : current,
        );
      }

      return {
        data,
        error,
      };
    },
    [id],
  );

  const addQuestion = useCallback(
    async (question: {
      type: QuestionType;
      label: string;
      description?: string | null;
      required?: boolean;
      options?: string[] | null;
    }) => {
      if (!id) {
        return {
          data: null,
          error: new Error("Form ID is required"),
        };
      }

      const position =
        (form?.questions.length ?? 0) + 1;

      const { data, error } = await supabase
        .from("questions")
        .insert({
          form_id: id,
          type: question.type,
          label: question.label,
          description:
            question.description ?? null,
          required: question.required ?? false,
          position,
          options: question.options ?? null,
        })
        .select()
        .single();

      if (!error && data) {
        setForm((current) =>
          current
            ? {
                ...current,
                questions: [
                  ...current.questions,
                  data,
                ],
              }
            : current,
        );
      }

      return {
        data,
        error,
      };
    },
    [id, form?.questions.length],
  );

  const deleteQuestion = useCallback(
    async (questionId: string) => {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("id", questionId);

      if (!error) {
        setForm((current) =>
          current
            ? {
                ...current,
                questions:
                  current.questions.filter(
                    (question) =>
                      question.id !== questionId,
                  ),
              }
            : current,
        );
      }

      return { error };
    },
    [],
  );

  return {
    form,
    loading,
    error,
    updateForm,
    addQuestion,
    deleteQuestion,
    refreshForm: fetchForm,
  };
}