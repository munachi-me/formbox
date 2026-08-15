"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type {
  Template,
  TemplateQuestion,
  TemplateWithQuestions,
  TemplateCategory,
} from "@/types";

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error("Failed to fetch templates:", error);
      setError(error.message);
      setTemplates([]);
      setLoading(false);
      return;
    }

    setTemplates((data ?? []) as Template[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();

    templates.forEach((template) => {
      if (template.category) {
        uniqueCategories.add(template.category);
      }
    });

    return Array.from(uniqueCategories).sort();
  }, [templates]);

  return {
    templates,
    categories,
    loading,
    error,
    refetch: fetchTemplates,
  };
}


/* =========================================================
   SINGLE TEMPLATE
========================================================= */

export function useTemplate(slug: string | null) {
  const [template, setTemplate] = useState<TemplateWithQuestions | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplate = useCallback(async () => {
    if (!slug) {
      setTemplate(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data: templateData, error: templateError } =
      await supabase
        .from("templates")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (templateError) {
      console.error(
        "Failed to fetch template:",
        templateError,
      );

      setError(templateError.message);
      setTemplate(null);
      setLoading(false);
      return;
    }

    const {
      data: questionData,
      error: questionError,
    } = await supabase
      .from("template_questions")
      .select("*")
      .eq("template_id", templateData.id)
      .order("position", {
        ascending: true,
      });

    if (questionError) {
      console.error(
        "Failed to fetch template questions:",
        questionError,
      );

      setError(questionError.message);
      setTemplate(null);
      setLoading(false);
      return;
    }

    const questions =
      (questionData ?? []) as TemplateQuestion[];

    setTemplate({
      ...(templateData as Template),
      questions,
    });

    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchTemplate();
  }, [fetchTemplate]);

  return {
    template,
    loading,
    error,
    refetch: fetchTemplate,
  };
}

/* =========================================================
   FILTER HELPERS
========================================================= */

export function filterTemplates(
  templates: Template[],
  category: TemplateCategory | "all",
  search: string,
) {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  return templates.filter((template) => {
    const matchesCategory =
      category === "all" ||
      template.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    return (
      template.name
        .toLowerCase()
        .includes(normalizedSearch) ||
      template.description
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      template.category
        .toLowerCase()
        .includes(normalizedSearch)
    );
  });
}