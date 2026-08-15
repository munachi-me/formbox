import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export function Input({
  label,
  description,
  error,
  required,
  id,
  className = "",
  containerClassName = "",
  leftElement,
  rightElement,
  ...props
}: InputProps) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {label}

          {required && (
            <span className="ml-1 text-purple-light">
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <p className="mb-2 text-xs text-gray-600">
          {description}
        </p>
      )}

      <div className="relative">
        {leftElement && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center">
            {leftElement}
          </div>
        )}

        <input
          id={id}
          required={required}
          className={`
            h-11 w-full
            rounded-xl
            border
            bg-white/[0.025]
            px-3
            text-sm
            text-white
            outline-none
            placeholder:text-gray-700
            transition-all duration-200

            ${leftElement ? "pl-10" : ""}

            ${rightElement ? "pr-11" : ""}

            ${
              error
                ? "border-red-400/40 focus:border-red-400 focus:ring-2 focus:ring-red-400/10"
                : "border-white/[0.08] focus:border-purple/50 focus:ring-2 focus:ring-purple/10"
            }

            disabled:cursor-not-allowed
            disabled:opacity-50

            ${className}
          `}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}