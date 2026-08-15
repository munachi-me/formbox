"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Circle,
} from "lucide-react";

import type { GettingStartedData } from "@/hooks/useDashboard";

interface GettingStartedProps {
  data: GettingStartedData;
}

export function GettingStarted({
  data,
}: GettingStartedProps) {
  const steps = [
    {
      label: "Create your first form",
      completed: data.hasForm,
    },
    {
      label: "Customize your form",
      completed: data.hasForm,
    },
    {
      label: "Publish your form",
      completed: data.hasPublishedForm,
    },
    {
      label: "Collect your first response",
      completed: data.hasResponse,
    },
  ];

  const completed = steps.filter(
    (step) => step.completed,
  ).length;

  const progress = Math.round(
    (completed / steps.length) * 100,
  );

  return (
    <section className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Getting started
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            {progress === 100
              ? "You're all set."
              : "You're making great progress."}
          </p>
        </div>

        <span className="text-xs font-medium text-purple-light">
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple to-green transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-5 space-y-4">
        {steps.map((step) => (
          <div
            key={step.label}
            className="flex items-center gap-3"
          >
            {step.completed ? (
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-light">
                <Check className="h-3 w-3" />
              </div>
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-gray-700" />
            )}

            <span
              className={`
                text-xs
                ${
                  step.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-300"
                }
              `}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={
          !data.hasForm
            ? "/forms/new"
            : !data.hasPublishedForm
              ? "/forms"
              : "/forms"
        }
        className="mt-6 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs text-gray-500 transition hover:bg-white/[0.04] hover:text-white"
      >
        {progress === 100
          ? "View your forms"
          : "Continue building"}

        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}