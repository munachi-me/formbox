"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FormStatus } from "@/types";

interface FormsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: FormStatus | "all";
  onStatusChange: (
    value: FormStatus | "all",
  ) => void;

  sort: string;
  onSortChange: (value: string) => void;
}

export function FormsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: FormsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-600" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search forms..."
          aria-label="Search forms"
          className="h-10 pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-10 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3">
          <SlidersHorizontal className="h-3.5 w-3.5 text-gray-600" />

          <select
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as FormStatus | "all",
              )
            }
            className="bg-transparent text-xs text-gray-400 outline-none"
          >
            <option className="bg-ink" value="all">All forms</option>
            <option className="bg-ink" value="published">Published</option>
            <option className="bg-ink" value="draft">Drafts</option>
            <option className="bg-ink" value="closed">Closed</option>
          </select>
        </div>

        <select
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
          className="h-10 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-gray-400 outline-none"
        >
          <option className="bg-ink" value="updated">Recently updated</option>
          <option className="bg-ink" value="created">Recently created</option>
          <option className="bg-ink" value="title">Name</option>
          <option className="bg-ink" value="responses">Most responses</option>
        </select>
      </div>
    </div>
  );
}