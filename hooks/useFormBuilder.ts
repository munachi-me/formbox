"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

import type {
  TemplateWithQuestions,
} from "@/types";

import type {
  FormBuilderData,
  FormBuilderQuestion,
} from "@/types/form-builder";

import {
  createEmptyQuestion,
  templateQuestionToBuilderQuestion,
} from "@/lib/forms/question-factory";

interface UseFormBuilderOptions {
  template: TemplateWithQuestions | null;
}

export function useFormBuilder({
  template,
}: UseFormBuilderOptions) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [questions, setQuestions] = useState<
    FormBuilderQuestion[]
  >([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  /*
   * Initialize from template.
   */
  useEffect(() => {
    if (!template) {
      setTitle("");
      setDescription("");
      setQuestions([
        createEmptyQuestion(),
      ]);

      return;
    }

    setTitle(template.name);
    setDescription(
      template.description ?? "",
    );

    setQuestions(
      template.questions
        .sort(
          (a, b) =>
            a.position - b.position,
        )
        .map(
          templateQuestionToBuilderQuestion,
        ),
    );
  }, [template]);

  /*
   * Add question.
   */
  const addQuestion = useCallback(
    (type = "short_text") => {
      setQuestions((current) => [
        ...current,
        createEmptyQuestion(type),
      ]);
    },
    [],
  );

  /*
   * Update question.
   */
  const updateQuestion = useCallback(
    (
      id: string,
      updates: Partial<FormBuilderQuestion>,
    ) => {
      setQuestions((current) =>
        current.map((question) =>
          question.id === id
            ? {
                ...question,
                ...updates,
              }
            : question,
        ),
      );
    },
    [],
  );

  /*
   * Delete question.
   */
  const deleteQuestion = useCallback(
    (id: string) => {
      setQuestions((current) =>
        current.filter(
          (question) =>
            question.id !== id,
        ),
      );
    },
    [],
  );

  /*
   * Reorder questions.
   */
  const moveQuestion = useCallback(
    (
      id: string,
      direction: "up" | "down",
    ) => {
      setQuestions((current) => {
        const index = current.findIndex(
          (question) =>
            question.id === id,
        );

        if (index === -1) {
          return current;
        }

        const newIndex =
          direction === "up"
            ? index - 1
            : index + 1;

        if (
          newIndex < 0 ||
          newIndex >= current.length
        ) {
          return current;
        }

        const next = [...current];

        [
          next[index],
          next[newIndex],
        ] = [
          next[newIndex],
          next[index],
        ];

        return next;
      });
    },
    [],
  );

  /*
   * Save form.
   */
  const saveForm = useCallback(
    async (
      status: "draft" | "published" = "draft",
    ) => {
      setSaving(true);
      setError(null);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          throw new Error(
            "You must be signed in to create a form.",
          );
        }

        if (!title.trim()) {
          throw new Error(
            "Please give your form a title.",
          );
        }

        if (questions.length === 0) {
          throw new Error(
            "Add at least one question.",
          );
        }

        /*
         * Create share ID.
         */
        const shareId =
          crypto.randomUUID();

        /*
         * Create form.
         */
        const { data: form, error: formError } =
          await supabase
            .from("forms")
            .insert({
              user_id: user.id,
              title: title.trim(),
              description:
                description.trim() ||
                null,
              share_id: shareId,
              status,
              published_at:
                status === "published"
                  ? new Date().toISOString()
                  : null,
            })
            .select()
            .single();

        if (formError) {
          throw formError;
        }

        /*
         * Create questions.
         */
        const questionRows =
          questions.map(
            (question, index) => ({
              form_id: form.id,
              type: question.type,
              label: question.label.trim(),
              description:
                question.description.trim() ||
                null,
              required:
                question.required,
              position: index,
              options:
                question.options.length > 0
                  ? question.options
                  : null,
            }),
          );

        const {
          error: questionsError,
        } = await supabase
          .from("questions")
          .insert(questionRows);

        if (questionsError) {
          /*
           * If questions fail, remove
           * the form we just created.
           */
          await supabase
            .from("forms")
            .delete()
            .eq("id", form.id);

          throw questionsError;
        }

        return {
          form,
          error: null,
        };
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong while saving the form.";

        console.error(
          "Failed to save form:",
          err,
        );

        setError(message);

        return {
          form: null,
          error: message,
        };
      } finally {
        setSaving(false);
      }
    },
    [title, description, questions],
  );

  return {
    title,
    setTitle,

    description,
    setDescription,

    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    moveQuestion,

    saving,
    error,

    saveForm,
  };
}