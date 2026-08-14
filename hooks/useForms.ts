"use client";

import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import type { Form, FormStatus } from "@/types";

export function useForms() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

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
    async (form: {
      title: string;
      description?: string | null;
      status?: FormStatus;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return {
          data: null,
          error: new Error("You must be logged in"),
        };
      }

      const shareId = crypto.randomUUID()
        .replaceAll("-", "")
        .slice(0, 12);

      const { data, error } = await supabase
        .from("forms")
        .insert({
          user_id: user.id,
          title: form.title,
          description: form.description ?? null,
          status: form.status ?? "draft",
          share_id: shareId,
        })
        .select()
        .single();

      if (!error && data) {
        setForms((current) => [data, ...current]);
      }

      return {
        data,
        error,
      };
    },
    [],
  );

  const deleteForm = useCallback(
    async (id: string) => {
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
    },
    [],
  );

  return {
    forms,
    loading,
    error,
    createForm,
    deleteForm,
    refreshForms: fetchForms,
  };
}