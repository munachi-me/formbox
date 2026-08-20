"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onClick={(event) => event.stopPropagation()}
    >
      <div
        onClick={() => setOpen((current) => !current)}
      >
        {trigger}
      </div>

      {open && (
        <div
          role="menu"
          className={`
            absolute top-10 z-50 min-w-48
            overflow-hidden rounded-xl
            border border-white/[0.08]
            bg-ink-light
            p-1.5
            shadow-2xl shadow-black/30
            ${align === "right" ? "right-0" : "left-0"}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  destructive?: boolean;
  disabled?: boolean;
}

export function DropdownMenuItem({
  children,
  onClick,
  href,
  destructive = false,
  disabled = false,
}: DropdownMenuItemProps) {
  const className = `
    flex w-full items-center gap-2.5
    rounded-lg px-3 py-2
    text-left text-xs font-medium
    transition-colors
    ${
      destructive
        ? "text-red-400 hover:bg-red-400/[0.08]"
        : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
    }
    ${disabled ? "pointer-events-none opacity-40" : ""}
  `;

  if (href) {
    return (
      <a
        href={href}
        role="menuitem"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return (
    <div className="my-1.5 h-px bg-white/[0.06]" />
  );
}