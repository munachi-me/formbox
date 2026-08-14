"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Circle,
} from "lucide-react";

const steps = [
  {
    label: "Create your first form",
    completed: true,
  },
  {
    label: "Customize your form",
    completed: true,
  },
  {
    label: "Publish your form",
    completed: false,
  },
  {
    label: "Collect your first response",
    completed: false,
  },
];

export function GettingStarted() {
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
            You're making great progress.
          </p>
        </div>

        <span className="text-xs font-medium text-purple-light">
          {progress}%
        </span>
      </div>

      {/* Progress */}
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple to-green transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Steps */}
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
        href="/forms/new"
        className="mt-6 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs text-gray-500 transition hover:bg-white/[0.04] hover:text-white"
      >
        Continue building
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}