"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Save,
  Send,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

import type {
  Form,
  Question,
} from "@/types";

import type {
  FormBuilderQuestion,
} from "@/types/form-builder";

import {
  FormBuilder,
} from "@/components/users/form-builder";

import {
  FormBuilderSkeleton,
} from "@/components/skeletons/form-builder-skeleton";

import {
  Button,
} from "@/components/ui/button";

import {
  useToast,
} from "@/components/ui/toast";

import {
  Crumbs,
  type crumb,
} from "@/components/ui/crumbs";

import {
  useFormBuilder,
} from "@/hooks/useFormBuilder";

interface EditForm {
  id: string;
  title: string;
  description: string | null;
  published_at: string | null;
  questions: FormBuilderQuestion[];
}

export default function EditForm() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const formId = params.id as string;

  const [initialData, setInitialData] =
    useState<EditFormData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [fetchError, setFetchError] =
    useState<string | null>(null);

  const [self, setSelf] =
    useState<
      "draft" | "publish" | null
    >(null);

  /*
   * Fetch existing form.
   */
  useEffect(() => {
    async function loadForm() {
      try {
        setLoading(true);
        setFetchError(null);

        const {
          data: {
            user,
          },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        /*
         * Get form.
         */
        const {
          data: form,
          error: formError,
        } = await supabase
          .from("forms")
          .select("*")
          .eq("id", formId)
          .eq("user_id", user.id)
          .single();

        if (formError) {
          throw formError;
        }

        /*
         * Get questions.
         */
        const {
          data: questions,
          error: questionsError,
        } = await supabase
          .from("questions")
          .select("*")
          .eq("form_id", formId)
          .order("position", {
            ascending: true,
          });

        if (questionsError) {
          throw questionsError;
        }

        /*
         * Convert database questions
         * into builder questions.
         */
        const builderQuestions: FormBuilderQuestion[] =
		  (questions as Question[]).map(
		    (question) => ({
		      id: question.id,
		      type: question.type,
		      label: question.label,
		      description:
		        question.description ?? "",
		      required: question.required,
		      options:
		        question.options ??
		        (
		          question.type === "rating"
		            ? { min: 1, max: 5 }
		            : []
		        ),
		    }),
		  );

        setInitialData({
          id: form.id,
          title: form.title,
          description:
            form.description,
          published_at:
            form.published_at,
          questions:
            builderQuestions,
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load form.";

        console.error(
          "Failed to load form:",
          err,
        );

        setFetchError(message);
      } finally {
        setLoading(false);
      }
    }

    if (formId) {
      loadForm();
    }
  }, [formId, router]);

  /*
   * Builder.
   */
  const {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    moveQuestion,
    saving,
    error,
    saveForm,
  } = useFormBuilder({
    initialData,
  });

  /*
   * Display save errors.
   */
  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error({
      title: "Couldn't save form",
      message: error,
    });
  }, [error, toast]);

  /*
   * Save.
   */
  async function handleSave(
    status: "draft" | "published",
  ) {
    setSelf(
      status === "draft"
        ? "draft"
        : "publish",
    );

    const result =
      await saveForm(status);

    if (!result.form) {
      return;
    }

    toast.success({
      title:
        status === "published"
          ? "Form published"
          : "Form saved",
      message:
        status === "published"
          ? "Your form is now accepting responses."
          : "Your form has been saved as a draft.",
    });

    router.push(
      `/forms/${result.form.id}`,
    );
  }

  /*
   * Loading.
   */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-7 w-48 rounded bg-white/[0.05]" />
            <div className="mt-3 h-4 w-80 rounded bg-white/[0.03]" />
          </div>

          <FormBuilderSkeleton />
        </div>
      </main>
    );
  }

  /*
   * Fetch error.
   */
  if (fetchError || !initialData) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-lg font-semibold text-white">
            Unable to load form
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {fetchError ??
              "The form could not be found."}
          </p>

          <Button
            variant="secondary"
            size="sm"
            className="mt-6"
            onClick={() =>
              router.push("/forms")
            }
          >
            Back to forms
          </Button>
        </div>
      </main>
    );
  }

  const crumbs: crumb[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Forms",
      href: "/forms",
    },
    {
      name: initialData.title,
      href: `/forms/${formId}`,
    },
    {
      name: "Edit",
      href: `/forms/${formId}/edit`,
    },
  ];

  return (
    <main className="min-h-screen">
      <Crumbs crumbs={crumbs} />

      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <section className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="mr-auto">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-3xl">
              Edit Form
            </h1>

            <p className="text-sm leading-6 text-gray-500">
              Update your form and manage its questions.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            disabled={saving}
            onClick={() =>
              handleSave("draft")
            }
          >
            <Save className="h-3.5 w-3.5" />

            <span className="hidden sm:inline">
              {saving &&
              self === "draft"
                ? "Saving..."
                : "Save changes"}
            </span>

            <span className="sm:hidden">
              {saving &&
              self === "draft"
                ? "Saving..."
                : "Save"}
            </span>
          </Button>

          <Button
            size="sm"
            disabled={saving}
            onClick={() =>
              handleSave("published")
            }
          >
            <Send className="h-3.5 w-3.5" />

            {saving &&
            self === "publish"
              ? "Publishing..."
              : "Publish"}
          </Button>
        </section>

        <FormBuilder
          title={title}
          description={description}
          questions={questions}
          onTitleChange={setTitle}
          onDescriptionChange={
            setDescription
          }
          onAddQuestion={addQuestion}
          onUpdateQuestion={
            updateQuestion
          }
          onDeleteQuestion={
            deleteQuestion
          }
          onDuplicateQuestion={
            duplicateQuestion
          }
          onMoveQuestion={
            moveQuestion
          }
        />

        <div className="mt-6 flex w-full items-center justify-end gap-2">
          <Button
            variant="secondary"
            disabled={saving}
            onClick={() =>
              handleSave("draft")
            }
          >
            <Save className="h-3.5 w-3.5" />

            <span className="hidden sm:inline">
              {saving &&
              self === "draft"
                ? "Saving..."
                : "Save changes"}
            </span>

            <span className="sm:hidden">
              {saving &&
              self === "draft"
                ? "Saving..."
                : "Save"}
            </span>
          </Button>

          <Button
            disabled={saving}
            onClick={() =>
              handleSave("published")
            }
          >
            <Send className="h-3.5 w-3.5" />

            {saving
              ? "Publishing..."
              : "Publish"}
          </Button>
        </div>
      </div>
    </main>
  );
}