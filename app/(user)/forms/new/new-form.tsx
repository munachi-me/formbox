"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useTemplate } from "@/hooks/useTemplates";
import { useFormBuilder } from "@/hooks/useFormBuilder";

import { FormBuilder } from "@/components/users/form-builder";
import { FormBuilderSkeleton } from "@/components/skeletons/form-builder-skeleton";
import { NewFormHeader } from "@/components/users/headers";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

import {
  type crumb,
  Crumbs,
} from "@/components/ui/crumbs";

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
    name: "New",
    href: "/forms/new",
  },

];

export default function NewForm() {
  const searchParams = useSearchParams();

  const templateSlug = searchParams.get("template");
  const [self, setSelf] = useState<"draft" | "publish" | null>(null);

  const router = useRouter()

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
    duplicateQuestion,
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
  }, [error]);

  /*
   * Save form.
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
   * Template loading state.
   */
  if (templateLoading) {
    return (
      <main className="min-h-screen">
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

  return (
    <main className="min-h-screen">
      <Crumbs crumbs={crumbs} />
      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <section className="flex flex-col gap-2 sm:flex-row sm:items-end mb-6">
          <div className="mr-auto">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-3xl">
              New Form
            </h1>

            <p className="text-sm leading-6 text-gray-500">
              Create, manage, and monitor your forms.
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
                : "Save draft"}
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
          onDescriptionChange={setDescription}
          onAddQuestion={addQuestion}
          onUpdateQuestion={updateQuestion}
          onDeleteQuestion={deleteQuestion}
          onDuplicateQuestion={duplicateQuestion}
          onMoveQuestion={moveQuestion}
        />
        <div className="flex items-center justify-end gap-2 mt-6 w-full">
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
                : "Save draft"}
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

            {saving &&
            self === "publish"
              ? "Publishing..."
              : "Publish"}
          </Button>
        </div>
      </div>
    </main>
  );
}