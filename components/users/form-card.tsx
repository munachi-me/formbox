"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Ellipsis,
  FileText,
  MessageSquare,
  Pencil,
  Copy,
  ExternalLink,
  Trash2,
  CopyPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { useToast } from "@/components/ui/toast";

import type { FormWithResponseCount } from "@/hooks/useForms";
import {FormStatusBadge} from "./form-status-badge"

interface FormCardProps {
  form: FormWithResponseCount;
  onDelete: (id: string) => void;
}

import {formatDate, copyLink} from "@/lib/utils"

export function FormCard({
  form,
  onDelete,
}: FormCardProps) {

  const {toast} = useToast()

  async function handleCopyLink() {
    const result = await copyLink(`${window.location.origin}/f/${form.share_id}`)
    result.success ? toast.success(result.toast) : toast.error(result.toast);
  }

  async function handleDelete(id: string) {

    const {error} = await onDelete(id)

    if(error){
      toast.error({
        title: "Couldn't delete form",
        message: error,
      });
    }

    toast.success({
      title: "Form deleted",
      message: "Your form has been deleted with its responses.",
    });
  }


  return (
    <article
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/[0.07]
        bg-white/[0.015]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-white/[0.12]
        hover:bg-white/[0.025]
      "
    >
      {/* =====================================================
          TOP
      ====================================================== */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Icon + title */}
          <div className="flex min-w-0 items-start gap-3.5">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl
                border border-purple/10
                bg-purple/10
                text-purple-light
                transition-colors
                group-hover:bg-purple/15
              "
            >
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0 pt-0.5">
              <Link
                href={`/forms/${form.id}`}
                className="
                  block truncate
                  text-sm font-semibold
                  text-gray-200
                  transition-colors
                  hover:text-white
                "
              >
                {form.title}
              </Link>

              {form.description ? (
                <p className="line-clamp-2 text-xs leading-5 text-gray-600 truncate">
                  {form.description}
                </p>
              ) : (
                <p className="text-xs text-gray-700 truncate">
                  No description
                </p>
              )}
            </div>
          </div>

          {/* Menu */}
          <DropdownMenu
            trigger={
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`More options for ${form.title}`}
                className="!h-8 !w-8 !px-0"
              >
                <Ellipsis className="h-4 w-4" />
              </Button>
            }
          >
            <DropdownMenuItem
              href={`/forms/${form.id}`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open form
            </DropdownMenuItem>

            {form.status != "published" &&
              <DropdownMenuItem
                href={`/forms/${form.id}/edit`}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit form
              </DropdownMenuItem>
            }

            <DropdownMenuItem
              onClick={handleCopyLink}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy share link
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              destructive
              onClick={() => handleDelete(form.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete form
            </DropdownMenuItem>
          </DropdownMenu>
        </div>

        {/* =====================================================
            RESPONSE STAT
        ====================================================== */}
        <div
          className="
            mt-6 flex items-center justify-between
            rounded-xl
            border border-white/[0.05]
            bg-white/[0.02]
            px-4 py-3
          "
        >
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                bg-green/10
                text-green-light
              "
            >
              <MessageSquare className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-700">
                Responses
              </p>

              <p className="mt-0.5 text-sm font-semibold text-gray-200">
                {form.response_count}
              </p>
            </div>
          </div>

          <FormStatusBadge status={form.status} />

        </div>

        {/* =====================================================
            META
        ====================================================== */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-700">
          <CalendarDays className="h-3.5 w-3.5" />

          <span>
            Updated {formatDate(form.updated_at)}
          </span>
        </div>
      </div>

      {/* =====================================================
          FOOTER ACTIONS
      ====================================================== */}
      <div className="flex border-t border-white/[0.05]">
        <Link
          href={`/forms/${form.id}`}
          className="
            group/view flex flex-1 items-center justify-center
            gap-2 py-3
            text-xs font-medium text-gray-600
            transition
            hover:bg-white/[0.025]
            hover:text-white
          "
        >
          View form

          <ArrowUpRight
            className="
              h-3.5 w-3.5
              transition-transform
              group-hover/view:-translate-y-0.5
              group-hover/view:translate-x-0.5
            "
          />
        </Link>

        <Link
          href={`/forms/${form.id}/edit`}
          className="
            flex items-center gap-2
            border-l border-white/[0.05]
            px-5 py-3
            text-xs font-medium text-gray-600
            transition
            hover:bg-white/[0.025]
            hover:text-white
          "
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Link>
      </div>
    </article>
  );
}