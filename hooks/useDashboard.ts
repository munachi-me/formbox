"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type {
  Form,
  Template,
} from "@/types";

export type DashboardForm = Form & {
  response_count: number;
};

export type DashboardActivity = {
  id: string;
  type: "created" | "response" | "published";
  title: string;
  description: string;
  time: string;
};

export type GettingStartedData = {
  hasForm: boolean;
  hasPublishedForm: boolean;
  hasResponse: boolean;
};

export function useDashboard() {
  const [forms, setForms] = useState<DashboardForm[]>([]);

  const [templates, setTemplates] =
    useState<Template[]>([]);

  const [activities, setActivities] = useState<
    DashboardActivity[]
  >([]);

  const [gettingStarted, setGettingStarted] =
    useState<GettingStartedData>({
      hasForm: false,
      hasPublishedForm: false,
      hasResponse: false,
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      /* =====================================================
         AUTHENTICATED USER
      ====================================================== */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setForms([]);
        setTemplates([]);
        setActivities([]);

        setGettingStarted({
          hasForm: false,
          hasPublishedForm: false,
          hasResponse: false,
        });

        return;
      }

      /* =====================================================
         FORMS
      ====================================================== */

      const {
        data: formData,
        error: formsError,
      } = await supabase
        .from("forms")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", {
          ascending: false,
        });

      if (formsError) {
        throw formsError;
      }

      const userForms = formData ?? [];

      /* =====================================================
         RESPONSE COUNTS
      ====================================================== */

      const formIds = userForms.map(
        (form) => form.id,
      );

      const responseCounts: Record<string, number> =
        {};

      if (formIds.length > 0) {
        const {
          data: responses,
          error: responsesError,
        } = await supabase
          .from("responses")
          .select("form_id")
          .in("form_id", formIds);

        if (responsesError) {
          throw responsesError;
        }

        for (const response of responses ?? []) {
          responseCounts[response.form_id] =
            (responseCounts[response.form_id] ?? 0) + 1;
        }
      }

      const dashboardForms: DashboardForm[] =
        userForms.map((form) => ({
          ...form,
          response_count:
            responseCounts[form.id] ?? 0,
        }));

      setForms(dashboardForms);

      /* =====================================================
         GETTING STARTED
      ====================================================== */

      const hasForm = userForms.length > 0;

      const hasPublishedForm = userForms.some(
        (form) => form.status === "published",
      );

      const hasResponse = Object.values(
        responseCounts,
      ).some((count) => count > 0);

      setGettingStarted({
        hasForm,
        hasPublishedForm,
        hasResponse,
      });

      /* =====================================================
         TEMPLATES
      ====================================================== */

      const {
        data: templateData,
        error: templatesError,
      } = await supabase
        .from("templates")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", {
          ascending: false,
        })
        .order("created_at", {
          ascending: false,
        });

      if (templatesError) {
        throw templatesError;
      }

      setTemplates(templateData ?? []);

      /* =====================================================
         ACTIVITY
      ====================================================== */

      const generatedActivities: DashboardActivity[] =
        [];

      userForms.forEach((form) => {
        generatedActivities.push({
          id: `created-${form.id}`,
          type: "created",
          title: "Form created",
          description: `You created "${form.title}".`,
          time: form.created_at,
        });

        if (form.status === "published") {
          generatedActivities.push({
            id: `published-${form.id}`,
            type: "published",
            title: "Form published",
            description: `"${form.title}" is accepting responses.`,
            time:
              form.published_at ??
              form.updated_at,
          });
        }

        const responseCount =
          responseCounts[form.id] ?? 0;

        if (responseCount > 0) {
          generatedActivities.push({
            id: `response-${form.id}`,
            type: "response",
            title: "Responses received",
            description:
              `"${form.title}" has ${responseCount} response${
                responseCount === 1 ? "" : "s"
              }.`,
            time: form.updated_at,
          });
        }
      });

      generatedActivities.sort(
        (a, b) =>
          new Date(b.time).getTime() -
          new Date(a.time).getTime(),
      );

      setActivities(
        generatedActivities.slice(0, 5),
      );
    } catch (err) {
      console.error(
        "Failed to fetch dashboard:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    forms,
    templates,
    activities,
    gettingStarted,
    loading,
    error,
    refetch: fetchDashboard,
  };
}