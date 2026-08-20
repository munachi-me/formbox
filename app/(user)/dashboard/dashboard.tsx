"use client";

import { useProfile } from "@/hooks/useProfile";
import { useDashboard } from "@/hooks/useDashboard";

import { DashboardHeader } from "@/components/users/headers";
import { QuickActions } from "@/components/users/quick-actions";
import { RecentForms } from "@/components/users/recent-forms";
import { TemplateSection } from "@/components/users/template-section";
import { TemplateGridSkeleton } from "@/components/skeletons/template-grid-skeleton";
import { Skeleton } from "@/components/skeletons/skeleton";
import { RecentActivity } from "@/components/users/recent-activity";
import { GettingStarted } from "@/components/users/getting-started";
import { Loading } from "@/components/skeletons/loading"
import { FormsEmptyState } from "@/components/users/forms-empty-state";


import {
  type crumb,
  Crumbs,
} from "@/components/ui/crumbs";

const crumbs: crumb[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Dashboard() {
  const {
    profile,
    loading: profileLoading,
  } = useProfile();

  const {
    forms,
    templates,
    activities,
    gettingStarted,
    loading: dashboardLoading,
    error,
  } = useDashboard();

  const loading = profileLoading || dashboardLoading;

  const firstName = profile?.fullname?.split(' ')[0] ?? "there";

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-red-500">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm text-red-400/80">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <main className="min-h-screen">
      <Crumbs crumbs={crumbs} />
      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        <DashboardHeader name={firstName} />

        <div className="mt-10 space-y-10">
          <QuickActions />

          {dashboardLoading ? (<>
            <FormsEmptyState searching="Recent forms..." />
            <TemplateGridSkeleton />

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <Skeleton />
              <Skeleton />
            </div>

          </>) : (<>
            <RecentForms forms={forms} />
            <TemplateSection templates={templates} />
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <RecentActivity activities={activities} />
              <GettingStarted data={gettingStarted} />
            </div>
          </>)}          

        </div>
      </div>
    </main>
  );
}