"use client";

import { useCallback, useEffect, useState } from "react";
import type { Form, FormStatus } from "@/types";
import { supabase } from "@/lib/supabase/client";

type CreateFormData = {
  title: string;
  description?: string | null;
};

export function useForms() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      });

    if (error) {
      console.error("Failed to fetch forms:", error);
      setError(error.message);
      setForms([]);
    } else {
      setForms(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const createForm = useCallback(
    async ({
      title,
      description = null,
    }: CreateFormData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return {
          form: null,
          error: new Error("You must be signed in."),
        };
      }

      const { data, error } = await supabase
        .from("forms")
        .insert({
          user_id: user.id,
          title,
          description,
          status: "draft" as FormStatus,
        })
        .select()
        .single();

      if (!error && data) {
        setForms((current) => [data, ...current]);
      }

      return {
        form: data ?? null,
        error,
      };
    },
    [],
  );

  const deleteForm = useCallback(async (id: string) => {
    const { error } = await supabase
      .from("forms")
      .delete()
      .eq("id", id);

    if (!error) {
      setForms((current) =>
        current.filter((form) => form.id !== id),
      );
    }

    return { error };
  }, []);

  return {
    forms,
    loading,
    error,
    refetch: fetchForms,
    createForm,
    deleteForm,
  };
}