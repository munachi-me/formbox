"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface TemplateFiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function TemplateFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: TemplateFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search templates..."
          className="h-10 w-full rounded-lg border border-white/[0.07] bg-white/[0.02] pl-9 pr-3 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 focus:border-purple/40 focus:ring-2 focus:ring-purple/10"
        />
      </div>

      {/* Category */}
      <div className="relative sm:w-52">
        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
          className="h-10 w-full appearance-none rounded-lg border border-white/[0.07] bg-white/[0.02] pl-9 pr-3 text-sm text-gray-300 outline-none transition focus:border-purple/40 focus:ring-2 focus:ring-purple/10"
        >
          <option value="" className="bg-ink">All categories</option>

          {categories.map((item) => (
            <option key={item} value={item} className="bg-ink">
              {item[0].toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}