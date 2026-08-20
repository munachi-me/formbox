"use client";

import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Edit3,
  MoreHorizontal,
  Play,
  Send,
  Square,
  FilePlus2,
  Trash2,
} from "lucide-react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { useForm } from "@/hooks/useForm";
import { supabase } from "@/lib/supabase/client";

import { FormStatusBadge } from "@/components/users/form-status-badge";
import { FormStats } from "@/components/users/forms-stats";
import { FormQuestionsPreview } from "@/components/users/form-questions-preview";
import { FormResponsesPreview } from "@/components/users/form-responses-preview";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {copyLink} from "@/lib/utils"

import {
  type crumb,
  Crumbs,
} from "@/components/ui/crumbs";


export default function Form() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const {
    form,
    responses,
    stats,
    loading,
    error,
    updateStatus,
    deleteForm,
    refetch,
  } = useForm(id);

  const { toast } = useToast();

  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  async function handleUpdateStatus(
    status: "published" | "closed",
  ) {
    if (!form) return;
    setUpdating(true);

    const result = await updateStatus(status)    

    if (result.error) {
      toast.error({
        title: "Couldn't update form",
        message: error.message,
      });
    } else {
      toast.success({
        title:
          status === "published"
            ? "Form published"
            : "Form closed",
        message:
          status === "published"
            ? "Your form is now accepting responses."
            : "Your form is no longer accepting responses.",
      });

      await refetch();
    }

    setUpdating(false);
  }

  async function handleDelete() {
    setDeleting(true)

   const {error} = await deleteForm()

    if(error){
      toast.error({
        title: "Couldn't delete form",
        message: error,
      });
    }

    toast.success({
      title: "Form deleted",
      message: "Your form has been deleted with its responses.",
    });

    router.push("/forms")
  }


  async function copyShareLink() {
    if (!form) return;
    const result = await copyLink(`${window.location.origin}/f/${form.share_id}`)
    result.success ? toast.success(result.toast) : toast.error(result.toast);
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-20 rounded bg-white/[0.05]" />

            <div className="h-28 rounded-xl bg-white/[0.03]" />

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              <div className="h-24 rounded-xl bg-white/[0.03]" />
              <div className="h-24 rounded-xl bg-white/[0.03]" />
              <div className="h-24 rounded-xl bg-white/[0.03]" />
              <div className="h-24 rounded-xl bg-white/[0.03]" />
            </div>

            <div className="grid gap-10 gap-10 lg:grid-cols-[380px_1fr]">
              <div className="h-64 rounded-xl bg-white/[0.03]" />
              <div className="h-64 rounded-xl bg-white/[0.03]" />
            </div>
            
          </div>
        </div>
      </main>
    );
  }

  if (error || !form) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <h1 className="text-lg font-semibold text-white">
            Form not found
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {error ??
              "This form doesn't exist or you don't have access to it."}
          </p>

          <Button
            className="mt-6"
            variant="secondary"
            href="/forms"
          >
            <ArrowLeft className="h-4 w-4" />
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
        name: form.title ?? '',
        href: `/forms/${id}` ?? '',
      },
    ];

  const publicUrl = `${window.location.origin}/f/${form.share_id}`;

  return (
    <main className="min-h-screen">
      <Crumbs crumbs={crumbs} />
      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <div className="flex items-center gap-2 mb-6 w-full">
          <Button
            variant="secondary"
            size="sm"
            href="/forms/new"
            className="mr-auto"
          >
            <FilePlus2 className="h-4 w-4" />
            New form
          </Button>

          {form.status != "published" && (
            <Button
              variant="secondary"
              size="sm"
              href={`/forms/${form.id}/edit`}
              className="ml-auto"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit
            </Button>
          )}

          {form.status === "draft" && (
            <Button
              variant="primary"
              size="sm"
              disabled={updating}
              onClick={() =>
                handleUpdateStatus("published")
              }
            >
              <Send className="h-3.5 w-3.5" />
              {updating
                ? "Publishing..."
                : "Publish"}
            </Button>
          )}

          {form.status === "published" && (
            <Button
              variant="danger"
              size="sm"
              disabled={updating}
              onClick={() =>
                handleUpdateStatus("closed")
              }
            >
              <Square className="h-3.5 w-3.5" />
              {updating
                ? "Closing..."
                : "Close"}
            </Button>
          )}

          {form.status === "closed" && (
            <Button
              variant="primary"
              size="sm"
              disabled={updating}
              onClick={() =>
                handleUpdateStatus("published")
              }
            >
              <Play className="h-3.5 w-3.5" />
              {updating
                ? "Reopening..."
                : "Reopen"}
            </Button>
          )}           
        </div>

        <section className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <Button
              variant="danger"
              size="sm"
              className="absolute top-2 right-2 z-index-2 px-2 py-2"
              disabled={deleting}
              onClick={() => handleDelete() }
            >
              <Trash2 className="h-4 w-4" />
            </Button> 

            <div className="min-w-0">
              <FormStatusBadge
                status={form.status}
              />

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {form.title}
              </h1>               

              {form.description && (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  {form.description}
                </p>
              )}

              {form.status === "published" && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="max-w-md truncate rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-gray-600">
                    {publicUrl}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={copyShareLink}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats */}

        <div className="mt-6">
          <FormStats
            responses={stats.responses}
            questions={stats.questions}
            createdAt={form.created_at}
            status={form.status}
          />
        </div>

        {/* Content */}

        <div className="mt-10 grid gap-10 lg:grid-cols-[380px_1fr]">
          <div>
            <FormQuestionsPreview
              questions={form.questions}
            />
          </div>

          <div>
            <FormResponsesPreview
              responses={responses}
              formId={form.id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}