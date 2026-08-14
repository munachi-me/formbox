import type { ReactNode } from "react";

type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "purple";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  success:
    "bg-green/10 text-green-light border-green/10",

  warning:
    "bg-yellow-400/10 text-yellow-400 border-yellow-400/10",

  danger:
    "bg-red-400/10 text-red-400 border-red-400/10",

  neutral:
    "bg-white/[0.05] text-gray-400 border-white/[0.06]",

  purple:
    "bg-purple/10 text-purple-lighter border-purple/10",
};

export function Badge({
  children,
  variant = "neutral",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        border
        px-2 py-0.5
        text-[10px]
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}