"use client";

import { useMemo, useState } from "react";

import { Crumbs, type crumb } from "@/components/ui/crumbs";
import { TemplatesHeader } from "@/components/users/headers";
import { TemplateFilters } from "@/components/users/template-filters";
import { TemplateGrid } from "@/components/users/template-grid";
import { TemplateGridSkeleton } from "@/components/skeletons/template-grid-skeleton";

import { useTemplates } from "@/hooks/useTemplates";


const crumbs: crumb[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Templates",
    href: "/templates",
  },
];

export default function Templates() {
  const {
    templates,
    categories,
    loading,
    error,
  } = useTemplates();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredTemplates = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return templates.filter((template) => {
      const matchesSearch =
        !normalizedSearch ||
        template.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        template.description
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        template.category
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        !category ||
        template.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [templates, search, category]);


  return (
    <main className="min-h-screen">
      <Crumbs crumbs={crumbs} />
      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <TemplatesHeader />

        <div className="mt-10">
          <TemplateFilters
            search={search}
            category={category}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />
        </div>

        {loading ? (
          <div className="mt-6">
            <TemplateGridSkeleton />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-red-400/10 bg-red-400/[0.03] p-6">
            <p className="text-sm font-medium text-red-400">
              Unable to load templates
            </p>

            <p className="mt-1 text-xs text-gray-600">
              {error}
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <TemplateGrid
              templates={filteredTemplates}
            />
          </div>
        )}
      </div>
    </main>
  );
}