"use client";

import type { FormStatus } from "@/types";

interface FormStatusBadgeProps {
  status: FormStatus;
}

export function FormStatusBadge({
  status,
}: FormStatusBadgeProps) {
  const styles = {
    draft:
      "bg-white/[0.06] text-gray-400",
    published:
      "bg-green/10 text-green-light",
    closed:
      "bg-red-400/10 text-red-400",
  };

  const labels = {
    draft: "Draft",
    published: "Published",
    closed: "Closed",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-2.5 py-1 text-[11px] font-medium
        ${styles[status]}
      `}
    >
      <span
        className={`
          mr-1.5 h-1.5 w-1.5 rounded-full
          ${
            status === "published"
              ? "bg-green-light"
              : status === "closed"
                ? "bg-red-400"
                : "bg-gray-500"
          }
        `}
      />

      {labels[status]}
    </span>
  );
}