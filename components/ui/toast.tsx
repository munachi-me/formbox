"use client";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";

/* =========================================================
   TYPES
========================================================= */

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (options: ToastOptions) => void;
    error: (options: ToastOptions) => void;
    warning: (options: ToastOptions) => void;
    info: (options: ToastOptions) => void;
  };
}

/* =========================================================
   CONTEXT
========================================================= */

const ToastContext = createContext<ToastContextType | null>(null);

/* =========================================================
   CONFIG
========================================================= */

const toastConfig: Record<
  ToastType,
  {
    icon: LucideIcon;
    iconClass: string;
    iconBackground: string;
    progressClass: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-green-light",
    iconBackground: "bg-green/10",
    progressClass: "bg-green",
  },

  error: {
    icon: CircleAlert,
    iconClass: "text-red-400",
    iconBackground: "bg-red-400/10",
    progressClass: "bg-red-400",
  },

  warning: {
    icon: TriangleAlert,
    iconClass: "text-yellow-400",
    iconBackground: "bg-yellow-400/10",
    progressClass: "bg-yellow-400",
  },

  info: {
    icon: Info,
    iconClass: "text-purple-light",
    iconBackground: "bg-purple/10",
    progressClass: "bg-purple",
  },
};

/* =========================================================
   PROVIDER
========================================================= */

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = {
    success: (options: ToastOptions) =>
      addToast("success", options),

    error: (options: ToastOptions) =>
      addToast("error", options),

    warning: (options: ToastOptions) =>
      addToast("warning", options),

    info: (options: ToastOptions) =>
      addToast("info", options),
  };

  function addToast(
    type: ToastType,
    options: ToastOptions,
  ) {
    const id = crypto.randomUUID();

    const newToast: Toast = {
      id,
      type,
      title: options.title,
      message: options.message,
      duration: options.duration ?? 4000,
    };

    setToasts((current) => [...current, newToast]);
  }

  const removeToast = useCallback((id: string) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div
        className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((item) => (
          <ToastItem
            key={item.id}
            toast={item}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* =========================================================
   TOAST ITEM
========================================================= */

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const config = toastConfig[toast.type];
  const Icon = config.icon;

  useEffect(() => {
    const element = toastRef.current;
    const progress = progressRef.current;

    if (!element || !progress) return;

    const context = gsap.context(() => {
      /* Enter animation */
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );

      /* Progress bar */
      gsap.fromTo(
        progress,
        {
          scaleX: 1,
        },
        {
          scaleX: 0,
          duration: toast.duration / 1000,
          ease: "none",
          transformOrigin: "left center",
        },
      );
    }, element);

    const timer = window.setTimeout(() => {
      remove();
    }, toast.duration);

    return () => {
      window.clearTimeout(timer);
      context.revert();
    };
  }, [toast.duration]);

  function remove() {
    const element = toastRef.current;

    if (!element) {
      onRemove(toast.id);
      return;
    }

    gsap.to(element, {
      opacity: 0,
      x: 30,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        onRemove(toast.id);
      },
    });
  }

  return (
    <div
      ref={toastRef}
      role={
        toast.type === "error"
          ? "alert"
          : "status"
      }
      className="pointer-events-auto relative overflow-hidden rounded-xl border border-white/[0.08] bg-ink-light/95 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="flex gap-3 p-4">
        {/* Icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.iconBackground}`}
        >
          <Icon
            className={`h-4.5 w-4.5 ${config.iconClass}`}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pr-5">
          <p className="text-sm font-medium text-white">
            {toast.title}
          </p>

          {toast.message && (
            <p className="mt-1 text-xs leading-5 text-gray-500">
              {toast.message}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={remove}
          aria-label="Close notification"
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md text-gray-600 transition hover:bg-white/[0.05] hover:text-gray-300"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/[0.03]">
        <div
          ref={progressRef}
          className={`h-full origin-left ${config.progressClass}`}
        />
      </div>
    </div>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside a ToastProvider",
    );
  }

  return context;
}
