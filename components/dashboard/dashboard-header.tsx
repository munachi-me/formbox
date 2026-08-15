"use client";

import { FilePlus2, LayoutTemplate } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  name?: string;
}


export function DashboardHeader({
  name = "there",
}: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Hey, {name.toUpperCase()}.
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
          Create, manage, and collect responses from your
          forms in one place.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href="/templates"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 text-sm font-medium text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
        >
          <LayoutTemplate className="h-4 w-4" />
          Browse templates
        </Link>

        <Link
          href="/forms/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-purple px-4 text-sm font-medium text-white shadow-lg shadow-purple/10 transition hover:bg-purple-light hover:shadow-purple/20"
        >
          <FilePlus2 className="h-4 w-4" />
          Create form
        </Link>
      </div>
    </section>
  );
}