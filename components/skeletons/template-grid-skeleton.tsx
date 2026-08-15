export function TemplateGridSkeleton() {
  return (
    <div className="mt-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-52 animate-pulse rounded-xl border border-white/[0.05] bg-white/[0.02] p-5"
          >
            <div className="h-10 w-10 rounded-lg bg-white/[0.05]" />

            <div className="mt-5 h-3 w-16 rounded bg-white/[0.04]" />

            <div className="mt-3 h-4 w-32 rounded bg-white/[0.05]" />

            <div className="mt-2 h-3 w-full rounded bg-white/[0.03]" />

            <div className="mt-2 h-3 w-3/4 rounded bg-white/[0.03]" />
          </div>
        ))}
      </div>
    </div>
  );
}