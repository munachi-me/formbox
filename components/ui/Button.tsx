import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-purple text-white shadow-lg shadow-purple/10 hover:bg-purple-light",

  secondary:
    "border border-white/[0.08] bg-white/[0.03] text-gray-200 hover:bg-white/[0.06] hover:text-white",

  ghost:
    "bg-transparent text-gray-400 hover:bg-white/[0.04] hover:text-white",

  danger:
    "border border-red-500/10 bg-red-500/10 text-red-400 hover:bg-red-500/15",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center
    gap-2 rounded-lg
    font-medium
    transition-all duration-200
    disabled:pointer-events-none
    disabled:opacity-50
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}