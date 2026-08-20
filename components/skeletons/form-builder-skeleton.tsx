"use client";

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.06] ${className}`}
    />
  );
}

export function FormBuilderSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-6">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl bg-white/[0.025]">
          {/* Sidebar header */}
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />

              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2.5 w-28" />
              </div>
            </div>
          </div>

          {/* Add question */}
          <div className="p-3">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>

          {/* Question list */}
          <div className="space-y-2 px-3 pb-4">
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN CANVAS
      ====================================================== */}
      <div className="min-w-0 flex-1">
        {/* Form details */}
        <section className="overflow-hidden rounded-2xl bg-white/[0.025]">
          {/* Header */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-2.5 w-56" />
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="mt-8">
          {/* Section heading */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>

            <Skeleton className="mt-2 h-2.5 w-64" />
          </div>

          {/* Question cards */}
          <div className="space-y-4">
            <QuestionSkeleton />
          </div>

          {/* Add question */}
          <Skeleton className="mt-4 h-12 w-full rounded-xl" />
        </section>
      </div>
    </div>
  );
}

function QuestionSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white/[0.025]">
      {/* Question header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-lg" />

          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-2 w-14" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Skeleton className="h-7 w-7 rounded-md" />
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      </div>

      {/* Question content */}
      <div className="space-y-5 p-5">
        {/* Question */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Required */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </div>
  );
}