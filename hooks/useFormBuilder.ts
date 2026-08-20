"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase/client";

import type {
  TemplateWithQuestions,
  QuestionType,
  FormStatus,
} from "@/types";

import type {
  FormBuilderQuestion,
} from "@/types/form-builder";

import {
  createEmptyQuestion,
  templateQuestionToBuilderQuestion,
} from "@/lib/forms/question-factory";

import { generateShareId } from "@/lib/utils";

interface ExistingFormData {
  id: string;
  title: string;
  description: string | null;
  questions: FormBuilderQuestion[];
  published_at: string | null;
}

interface UseFormBuilderOptions {
  template?: TemplateWithQuestions | null;
  initialData?: ExistingFormData | null;
}

export function useFormBuilder({
  template = null,
  initialData = null,
}: UseFormBuilderOptions) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState<
    FormBuilderQuestion[]
  >([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  /*
   * Initialize builder.
   *
   * Priority:
   * 1. Existing form (edit mode)
   * 2. Template (new form from template)
   * 3. Empty form
   */
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(
        initialData.description ?? "",
      );
      setQuestions(initialData.questions);

      return;
    }

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
      [...template.questions]
        .sort(
          (a, b) =>
            a.position - b.position,
        )
        .map(
          templateQuestionToBuilderQuestion,
        ),
    );
  }, [initialData, template]);

  /*
   * Add question.
   */
  const addQuestion = useCallback(
    (type: QuestionType = "short_text") => {
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
   * Duplicate question.
   */
  const duplicateQuestion = useCallback(
    (id: string) => {
      setQuestions((current) => {
        const index = current.findIndex(
          (question) =>
            question.id === id,
        );

        if (index === -1) {
          return current;
        }

        const original = current[index];

        const duplicate: FormBuilderQuestion = {
          ...original,
          id: crypto.randomUUID(),
          label: `${original.label} (copy)`,
          options: Array.isArray(
            original.options,
          )
            ? original.options.map(
                (option) => ({
                  ...option,
                }),
              )
            : {
                ...original.options,
              },
        };

        const next = [...current];

        next.splice(
          index + 1,
          0,
          duplicate,
        );

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
      status: FormStatus = "draft",
    ) => {
      setSaving(true);
      setError(null);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          throw new Error(
            "You must be signed in to save a form.",
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
         * Validate questions.
         */
        for (
          let index = 0;
          index < questions.length;
          index++
        ) {
          const question =
            questions[index];

          if (!question.label.trim()) {
            throw new Error(
              `Question ${index + 1} has no label.`,
            );
          }

          /*
           * Choice questions.
           */
          if (
            question.type ===
              "multiple_choice" ||
            question.type ===
              "checkbox" ||
            question.type === "dropdown"
          ) {
            if (
              !Array.isArray(
                question.options,
              ) ||
              question.options.length < 2
            ) {
              throw new Error(
                `Question "${question.label}" needs at least 2 options.`,
              );
            }
          }

          /*
           * Rating questions.
           */
          if (
            question.type === "rating"
          ) {
            if (
              Array.isArray(
                question.options,
              ) ||
              !question.options ||
              typeof question.options !==
                "object" ||
              !("min" in question.options) ||
              !("max" in question.options)
            ) {
              throw new Error(
                `Question "${question.label}" has invalid rating options.`,
              );
            }

            if (
              question.options.min >=
              question.options.max
            ) {
              throw new Error(
                `Question "${question.label}" must have a minimum lower than the maximum.`,
              );
            }
          }
        }

        /*
         * =====================================================
         * CREATE FORM
         * =====================================================
         */
        if (!initialData) {
          const shareId =
            generateShareId(21);

          const {
            data: form,
            error: formError,
          } = await supabase
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

          const questionRows =
            questions.map(
              (question, index) => {
                let options = null;

                if (
                  question.type ===
                    "multiple_choice" ||
                  question.type ===
                    "checkbox" ||
                  question.type ===
                    "dropdown"
                ) {
                  if (
                    Array.isArray(
                      question.options,
                    ) &&
                    question.options.length >
                      0
                  ) {
                    options =
                      question.options;
                  }
                }

                if (
                  question.type === "rating"
                ) {
                  if (
                    question.options &&
                    !Array.isArray(
                      question.options,
                    )
                  ) {
                    options = {
                      min:
                        question.options.min,
                      max:
                        question.options.max,
                    };
                  }
                }

                return {
                  form_id: form.id,
                  type: question.type,
                  label:
                    question.label.trim(),
                  description:
                    question.description?.trim() ||
                    null,
                  required:
                    question.required,
                  position: index,
                  options,
                };
              },
            );

          const {
            error: questionsError,
          } = await supabase
            .from("questions")
            .insert(questionRows);

          if (questionsError) {
            console.error(
              "Questions insert error:",
              questionsError,
            );

            await supabase
              .from("forms")
              .delete()
              .eq("id", form.id);

            throw new Error(
              `Failed to save questions: ${questionsError.message}`,
            );
          }

          return {
            form,
            error: null,
          };
        }

        /*
         * =====================================================
         * EDIT FORM
         * =====================================================
         */

        const {
          data: form,
          error: formError,
        } = await supabase
          .from("forms")
          .update({
            title: title.trim(),
            description:
              description.trim() ||
              null,
            status,
            published_at:
              status === "published"
                ? initialData.published_at ??
                  new Date().toISOString()
                : null,
          })
          .eq("id", initialData.id)
          .eq("user_id", user.id)
          .select()
          .single();

        if (formError) {
          throw formError;
        }

        /*
         * Remove the existing questions.
         */
        const {
          error: deleteError,
        } = await supabase
          .from("questions")
          .delete()
          .eq(
            "form_id",
            initialData.id,
          );

        if (deleteError) {
          throw new Error(
            `Failed to update questions: ${deleteError.message}`,
          );
        }

        /*
         * Create the new question rows.
         */
        const questionRows =
          questions.map(
            (question, index) => {
              let options = null;

              if (
                question.type ===
                  "multiple_choice" ||
                question.type ===
                  "checkbox" ||
                question.type ===
                  "dropdown"
              ) {
                if (
                  Array.isArray(
                    question.options,
                  ) &&
                  question.options.length >
                    0
                ) {
                  options =
                    question.options;
                }
              }

              if (
                question.type === "rating"
              ) {
                if (
                  question.options &&
                  !Array.isArray(
                    question.options,
                  )
                ) {
                  options = {
                    min:
                      question.options.min,
                    max:
                      question.options.max,
                  };
                }
              }

              return {
                form_id: form.id,
                type: question.type,
                label:
                  question.label.trim(),
                description:
                  question.description?.trim() ||
                  null,
                required:
                  question.required,
                position: index,
                options,
              };
            },
          );

        const {
          error: questionsError,
        } = await supabase
          .from("questions")
          .insert(questionRows);

        if (questionsError) {
          throw new Error(
            `Failed to save questions: ${questionsError.message}`,
          );
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
    [
      title,
      description,
      questions,
      initialData,
    ],
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
    duplicateQuestion,

    saving,
    error,

    saveForm,
  };
}