"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Ellipsis,
  ExternalLink,
  FileText,
  MessageSquare,
  Pencil,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { FormStatusBadge } from "./form-status-badge";
import { copyLink } from "@/lib/utils";

import type { DashboardForm } from "@/hooks/useDashboard";


function formatRelativeDate(date: string) {
  const value = new Date(date);
  const now = new Date();

  const diff = now.getTime() - value.getTime();

  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return "Just now";

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function RecentForms({
  forms
}: DashboardForm[]) {
  const recentForms = forms.slice(0, 5);

  const { toast } = useToast();

  const [openMenu, setOpenMenu] = useState<string | null>(
    null,
  );

  const menuRef = useRef<HTMLDivElement>(null);

  /*
   * Close menu when clicking outside.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /*
   * Close menu with Escape.
   */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  async function handleCopyLink(
    form: DashboardForm,
  ) {
    const result = await copyLink(`${window.location.origin}/f/${form.share_id}`)
    if(result.success){
      toast.success(result.toast)
      setOpenMenu(null);
    } else {
      toast.error(result.toast);
    }
  }

  return (
    <section>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">
            Recent forms
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Your recently created and updated forms.
          </p>
        </div>

        <Link
          href="/forms"
          className="flex items-center gap-1 text-xs text-gray-600 transition hover:text-gray-300"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {recentForms.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-6 py-12 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-3xl" />

          <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-purple/10 bg-purple/10 text-purple-light">
            <FileText className="h-5 w-5" />
          </div>

          <h3 className="relative mt-4 text-sm font-medium text-gray-200">
            No forms yet
          </h3>

          <p className="relative mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-600">
            Create your first form and start collecting
            responses.
          </p>

          <Button
            href="/forms/new"
            size="sm"
            className="relative mt-5"
          >
            Create your first form
          </Button>
        </div>
      ) : (

        <div className="overflow-visible rounded-2xl border border-white/[0.07] bg-white/[0.012]">
          {recentForms.map((form, index) => {
            const isLast =
              index === recentForms.length - 1;

            const menuOpen = openMenu === form.id;

            return (
              <div
                key={form.id}
                className={`
                  group relative
                  ${!isLast ? "border-b border-white/[0.06]" : ""}
                `}
              >
                {/* Hover accent */}
                <div className="absolute inset-y-0 left-0 w-px bg-purple opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                <div className="flex flex-col gap-4 px-4 py-4 transition-colors duration-200 hover:bg-white/[0.025] sm:flex-row sm:items-center">
                  
                  <Link
                    href={`/forms/${form.id}`}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple/10 bg-purple/10 text-purple-light transition-colors group-hover:border-purple/20 group-hover:bg-purple/15">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-gray-200 transition-colors group-hover:text-white">
                        {form.title}
                      </h3>
                      <p className="mt-1 truncate text-xs text-gray-600">
                        {form.description ||
                          "No description added"}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-4 pl-[52px] sm:pl-0">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-gray-700" />

                      <span className="text-xs font-medium text-gray-400">
                        {form.response_count}
                      </span>

                      <span className="hidden text-xs text-gray-700 sm:inline">
                        responses
                      </span>
                    </div>

                    <FormStatusBadge status={form.status} />

                    <span className="hidden min-w-[55px] text-right text-[11px] text-gray-700 md:block">
                      {formatRelativeDate(
                        form.updated_at,
                      )}
                    </span>


                    <div
                      ref={
                        menuOpen
                          ? menuRef
                          : undefined
                      }
                      className="relative"
                    >
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();

                          setOpenMenu(
                            menuOpen
                              ? null
                              : form.id,
                          );
                        }}
                        className={`
                          flex h-8 w-8 shrink-0
                          items-center justify-center
                          rounded-lg
                          transition-all duration-200
                          ${
                            menuOpen
                              ? "bg-white/[0.07] text-gray-300"
                              : "text-gray-700 hover:bg-white/[0.06] hover:text-gray-300"
                          }
                        `}
                        aria-label={`More options for ${form.title}`}
                        aria-expanded={menuOpen}
                      >
                        <Ellipsis className="h-4 w-4" />
                      </button>

                      {menuOpen && (
                        <FormMenu
                          form={form}
                          onClose={() =>
                            setOpenMenu(null)
                          }
                          onCopy={() =>
                            handleCopyLink(form)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   FORM MENU
========================================================= */

interface FormMenuProps {
  form: DashboardForm;
  onClose: () => void;
  onCopy: () => void;
}

function FormMenu({
  form,
  onClose,
  onCopy,
}: FormMenuProps) {
  return (
    <div
      className="
        absolute right-0 top-full z-50 mt-2
        w-52
        overflow-hidden
        rounded-xl
        border border-white/[0.08]
        bg-ink-light
        p-1
        shadow-2xl shadow-black/40
      "
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      {/* Edit */}
      <MenuLink
        href={`/forms/${form.id}/edit`}
        icon={Pencil}
        label="Edit form"
        onClick={onClose}
      />

      {/* Responses */}
      <MenuLink
        href={`/forms/${form.id}/responses`}
        icon={MessageSquare}
        label="View responses"
        onClick={onClose}
      />

      {/* Copy link */}
      <MenuButton
        icon={Copy}
        label="Copy share link"
        onClick={onCopy}
      />
    </div>
  );
}


function MenuLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: typeof ExternalLink;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex h-9 items-center gap-2.5
        rounded-lg px-2.5
        text-xs text-gray-400
        transition-colors
        hover:bg-white/[0.05]
        hover:text-white
      "
    >
      <Icon className="h-3.5 w-3.5 text-gray-600" />

      {label}
    </Link>
  );
}


function MenuButton({
  icon: Icon,
  label,
  onClick,
  destructive = false,
}: {
  icon: typeof Copy;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex h-9 w-full items-center gap-2.5
        rounded-lg px-2.5
        text-left text-xs
        transition-colors
        ${
          destructive
            ? "text-red-400 hover:bg-red-400/[0.07]"
            : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
        }
      `}
    >
      <Icon
        className={`
          h-3.5 w-3.5
          ${
            destructive
              ? "text-red-400"
              : "text-gray-600"
          }
        `}
      />

      {label}
    </button>
  );
}