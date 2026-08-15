"use client";

import { useForms } from "@/hooks/useForms";

import { FormsHeader } from "@/components/users/headers";
import { FormsToolbar } from "@/components/users/forms-toolbar";
import { FormCard } from "@/components/users/form-card";
import { FormsEmptyState } from "@/components/users/forms-empty-state";
import { FormsStats } from "@/components/users/forms-stats";


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
];

export default function Forms() {
  const {
    forms,
    allForms,
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
    loading,
    error,
    deleteForm,
  } = useForms();

  const publishedCount = allForms.filter(
    (form) => form.status === "published",
  ).length;

  const draftCount = allForms.filter(
    (form) => form.status === "draft",
  ).length;

  const responseCount = allForms.reduce(
    (total, form) => total + form.response_count,
    0,
  );

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="animate-pulse space-y-8">
            <div>
              <div className="h-7 w-32 rounded bg-white/[0.05]" />
              <div className="mt-3 h-4 w-72 rounded bg-white/[0.03]" />
            </div>

            <div className="h-10 rounded-lg bg-white/[0.03]" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="h-48 rounded-xl bg-white/[0.03]"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Crumbs crumbs={crumbs} />

          <div className="mt-8 rounded-xl border border-red-400/10 bg-red-400/[0.03] p-6">
            <h2 className="text-sm font-medium text-red-400">
              Could not load your forms
            </h2>

            <p className="mt-2 text-xs text-gray-600">
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const searching =
    search.trim().length > 0 ||
    status !== "all";

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <Crumbs crumbs={crumbs} />

        <div className="">
          <FormsHeader count={allForms.length} />
        </div>

        <div className="mt-8">
          <FormsStats
            total={allForms.length}
            published={publishedCount}
            drafts={draftCount}
            responses={responseCount}
          />
        </div>

        <div className="mt-8">
          <FormsToolbar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        <div className="mt-6">
          {forms.length === 0 ? (
            <FormsEmptyState
              searching={searching}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {forms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  onDelete={deleteForm}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}