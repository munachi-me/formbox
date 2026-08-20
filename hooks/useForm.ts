"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import type {
  FormWithQuestions,
  Response,
  FormStatus,
} from "@/types";

export type FormStats = {
  responses: number;
  questions: number;
};

export function useForm(id: string) {
  const [form, setForm] =
    useState<FormWithQuestions | null>(null);

  const [responses, setResponses] =
    useState<Response[]>([]);

  const [stats, setStats] = useState<FormStats>({
    responses: 0,
    questions: 0,
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchForm = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error(
          "You must be signed in to view this form.",
        );
      }

      /*
       * Fetch form.
       *
       * user_id ensures a user cannot
       * load another user's form through
       * the client.
       */
      const {
        data: formData,
        error: formError,
      } = await supabase
        .from("forms")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (formError) {
        throw formError;
      }

      /*
       * Fetch questions.
       */
      const {
        data: questionData,
        error: questionError,
      } = await supabase
        .from("questions")
        .select("*")
        .eq("form_id", id)
        .order("position", {
          ascending: true,
        });

      if (questionError) {
        throw questionError;
      }

      /*
       * Fetch responses.
       *
       * We only need the response metadata
       * on this page.
       */
      const {
        data: responseData,
        error: responseError,
      } = await supabase
        .from("responses")
        .select("id, form_id, submitted_at")
        .eq("form_id", id)
        .order("submitted_at", {
          ascending: false,
        })
        .limit(10);

      if (responseError) {
        throw responseError;
      }

      const questions = questionData ?? [];
      const responseRows = responseData ?? [];

      setForm({
        ...formData,
        questions,
      });

      setResponses(responseRows);

      /*
       * Get the total response count.
       *
       * The page only displays the latest
       * responses, so count separately.
       */
      const {
        count,
        error: countError,
      } = await supabase
        .from("responses")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("form_id", id);

      if (countError) {
        throw countError;
      }

      setStats({
        responses: count ?? 0,
        questions: questions.length,
      });
    } catch (err) {
      console.error(
        "Failed to fetch form:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load form.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateStatus = useCallback(
    async (status: FormStatus) => {
      const { error } = await supabase
        .from("forms")
        .update({
          status,
          published_at: status === "published" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) {
        return {
          error,
        };
      }      

      fetchForm()

      return {
        error: null,
      };
    },
    [],
  );

  const deleteForm = useCallback(
    async () => {
      const { error } = await supabase
        .from("forms")
        .delete()
        .eq("id", id);

      if (error) {
        return {
          error,
        };
      }

      fetchForm()

      return {
        error: null,
      };
    },
    [],
  );

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  return {
    form,
    responses,
    stats,
    loading,
    error,
    updateStatus,
    deleteForm,
    refetch: fetchForm,
  };
}