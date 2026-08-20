"use client";

import { FilePlus2, LayoutTemplate } from "lucide-react";
import {Button} from "@/components/ui/button";

interface DashboardHeaderProps {
  name?: string;
}


export function DashboardHeader({
  name = "there",
}: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-3xl">
          Hey, {name}.
        </h1>

        <p className="max-w-xl text-sm leading-6 text-gray-500">
          Create, manage, and collect responses from your
          forms in one place.
        </p>
      </div>

      {/*<div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          href="/templates"
        >
          <LayoutTemplate className="h-4 w-4" />
          Browse templates
        </Button>

        <Button
          href="/forms/new"
        >
          <FilePlus2 className="h-4 w-4" />
          Create form
        </Button>
      </div>*/}
    </section>
  );
}



export function TemplatesHeader() {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-3xl">
          Templates
        </h1>

        <p className="max-w-xl text-sm leading-6 text-gray-500">
          Start faster with a professionally designed form template.
          Customize it to fit exactly what you need.
        </p>
      </div>

      <Button
        href="/forms/new"
      >
        <FilePlus2 className="h-4 w-4" />
        Start from scratch
      </Button>
    </section>
  );
}


export function FormsHeader() {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-3xl">
          Forms
        </h1>

        <p className="text-sm leading-6 text-gray-500">
          Create, manage, and monitor your forms.
        </p>
      </div>

      <Button
        href="/forms/new"
      >
        <FilePlus2 className="h-4 w-4" />
        Create form
      </Button>
    </section>
  );
}