"use client";

import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import type {
  Answer,
  Response,
  ResponseWithAnswers,
} from "@/types";

export function useResponses(
  formId: string | undefined,
) {
  const [responses, setResponses] = useState<
    ResponseWithAnswers[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const fetchResponses = useCallback(async () => {
    if (!formId) {
      setResponses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("responses")
      .select(
        `
          *,
          answers (
            id,
            response_id,
            question_id,
            value
          )
        `,
      )
      .eq("form_id", formId)
      .order("submitted_at", {
        ascending: false,
      });

    if (error) {
      setError(error.message);
      setResponses([]);
    } else {
      setResponses(
        (data ?? []) as ResponseWithAnswers[],
      );
    }

    setLoading(false);
  }, [formId]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  return {
    responses,
    loading,
    error,
    refreshResponses: fetchResponses,
  };
}