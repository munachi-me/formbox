export function Loading() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div>
            <div className="h-7 w-48 rounded bg-white/[0.05]" />
            <div className="mt-3 h-4 w-80 rounded bg-white/[0.03]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-32 rounded-xl bg-white/[0.03]" />
            <div className="h-32 rounded-xl bg-white/[0.03]" />
          </div>

          <div className="h-64 rounded-xl bg-white/[0.03]" />
        </div>
      </div>
    </main>
  );
}