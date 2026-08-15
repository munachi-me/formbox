"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Form, FormStatus } from "@/types";

export type FormSort =
  | "updated"
  | "created"
  | "title"
  | "responses";

export type FormWithResponseCount = Form & {
  response_count: number;
};

export function useForms() {
  const [forms, setForms] = useState<FormWithResponseCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FormStatus | "all">("all");
  const [sort, setSort] = useState<FormSort>("updated");

  const fetchForms = useCallback(async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setForms([]);
      setLoading(false);
      return;
    }

    const { data, error: formsError } = await supabase
      .from("forms")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      });

    if (formsError) {
      console.error(formsError);
      setError(formsError.message);
      setLoading(false);
      return;
    }

    const userForms = (data ?? []) as Form[];

    const formIds = userForms.map((form) => form.id);

    let responseCounts: Record<string, number> = {};

    if (formIds.length > 0) {
      const { data: responses, error: responsesError } =
        await supabase
          .from("responses")
          .select("id, form_id")
          .in("form_id", formIds);

      if (responsesError) {
        console.error(responsesError);
      } else {
        responseCounts = (responses ?? []).reduce<
          Record<string, number>
        >((counts, response) => {
          counts[response.form_id] =
            (counts[response.form_id] ?? 0) + 1;

          return counts;
        }, {});
      }
    }

    const formsWithCounts = userForms.map((form) => ({
      ...form,
      response_count: responseCounts[form.id] ?? 0,
    }));

    setForms(formsWithCounts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const filteredForms = useMemo(() => {
    let result = [...forms];

    /*
     * Search
     */
    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (form) =>
          form.title.toLowerCase().includes(query) ||
          form.description?.toLowerCase().includes(query),
      );
    }

    /*
     * Status
     */
    if (status !== "all") {
      result = result.filter(
        (form) => form.status === status,
      );
    }

    /*
     * Sort
     */
    result.sort((a, b) => {
      switch (sort) {
        case "title":
          return a.title.localeCompare(b.title);

        case "created":
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          );

        case "responses":
          return b.response_count - a.response_count;

        case "updated":
        default:
          return (
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
          );
      }
    });

    return result;
  }, [forms, search, status, sort]);

  const deleteForm = useCallback(
    async (formId: string) => {
      const { error } = await supabase
        .from("forms")
        .delete()
        .eq("id", formId);

      if (error) {
        return {
          error,
        };
      }

      setForms((current) =>
        current.filter((form) => form.id !== formId),
      );

      return {
        error: null,
      };
    },
    [],
  );

  return {
    forms: filteredForms,
    allForms: forms,

    search,
    setSearch,

    status,
    setStatus,

    sort,
    setSort,

    loading,
    error,

    deleteForm,
    refetch: fetchForms,
  };
}