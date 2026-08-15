"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useForm } from "@/hooks/useForm";
import { FormBuilder } from "@/components/forms/form-builder";

export default function EditFormPage() {
  const params = useParams();
  const router = useRouter();

  const formId = params.id as string;

  const {
    form,
    questions,
    loading,
    error,
  } = useForm(formId);

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-5 w-5 animate-spin text-purple-light" />

            <p className="text-sm text-gray-500">
              Loading form...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !form) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-4">
          <div className="w-full rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-400/10 text-red-400">
              <AlertCircle className="h-5 w-5" />
            </div>

            <h1 className="mt-4 text-sm font-semibold text-white">
              Unable to load form
            </h1>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              {error ?? "This form could not be found."}
            </p>

            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-xs font-medium text-gray-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Go back
              </button>

              <Link
                href="/forms"
                className="inline-flex h-9 items-center rounded-lg bg-purple px-3 text-xs font-medium text-white transition hover:bg-purple-light"
              >
                View forms
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <FormBuilder
          form={form}
          questions={questions}
        />
      </div>
    </main>
  );
}