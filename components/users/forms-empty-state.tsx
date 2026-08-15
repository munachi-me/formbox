"use client";

import { FilePlus2, Search } from "lucide-react";
import Link from "next/link";

interface FormsEmptyStateProps {
  searching?: boolean;
}

export function FormsEmptyState({
  searching = false,
}: FormsEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 text-purple-light">
        {searching ? (
          <Search className="h-5 w-5" />
        ) : (
          <FilePlus2 className="h-5 w-5" />
        )}
      </div>

      <h2 className="mt-4 text-sm font-medium text-white">
        {searching
          ? "No forms found"
          : "Create your first form"}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-600">
        {searching
          ? "Try changing your search or filters."
          : "Create a form to start collecting responses from your audience."}
      </p>

      {!searching && (
        <Link
          href="/forms/new"
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-purple px-4 text-xs font-medium text-white transition hover:bg-purple-light"
        >
          <FilePlus2 className="h-3.5 w-3.5" />
          Create form
        </Link>
      )}
    </div>
  );
}