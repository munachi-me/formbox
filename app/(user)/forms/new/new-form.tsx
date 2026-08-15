"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { useTemplate } from "@/hooks/useTemplates";
import { useFormBuilder } from "@/hooks/useFormBuilder";

import { FormBuilder } from "@/components/users/form-builder";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function NewForm() {
  const searchParams =
    useSearchParams();

  const templateSlug =
    searchParams.get("template");

  const {
    template,
    loading: templateLoading,
  } = useTemplate(templateSlug);

  const {
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
  } = useFormBuilder({
    template,
  });

  const { toast } = useToast();

  /*
   * Display save errors.
   */
  useEffect(() => {
    if (!error) return;

    toast.error({
      title: "Couldn't save form",
      message: error,
    });
  }, [error, toast]);

  async function handleSave(
    status: "draft" | "published",
  ) {
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

    /*
     * We'll navigate to the form
     * management page after saving.
     */
    window.location.href = `/forms/${result.form.id}`;
  }

  if (templateLoading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-12">
          <div className="animate-pulse space-y-5">
            <div className="h-6 w-32 rounded bg-white/[0.05]" />

            <div className="h-32 rounded-xl bg-white/[0.03]" />

            <div className="h-64 rounded-xl bg-white/[0.03]" />

            <div className="h-64 rounded-xl bg-white/[0.03]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/forms"
            className="inline-flex items-center gap-2 text-xs text-gray-600 transition hover:text-gray-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Forms
          </Link>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={saving}
              onClick={() =>
                handleSave("draft")
              }
            >
              <Save className="h-3.5 w-3.5" />
              Save draft
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={saving}
              onClick={() =>
                handleSave("published")
              }
            >
              {saving
                ? "Saving..."
                : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      {/* =====================================================
          BUILDER
      ====================================================== */}

      <div className="p-4 lg:p-8">
        <FormBuilder
          title={title}
          description={description}
          questions={questions}
          onTitleChange={setTitle}
          onDescriptionChange={
            setDescription
          }
          onAddQuestion={
            addQuestion
          }
          onUpdateQuestion={
            updateQuestion
          }
          onDeleteQuestion={
            deleteQuestion
          }
          onMoveQuestion={
            moveQuestion
          }
        />
      </div>
    </main>
  );
}