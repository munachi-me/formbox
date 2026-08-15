"use client";

import { useProfile } from "@/hooks/useProfile";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentForms } from "@/components/dashboard/recent-forms";
import { TemplateSection } from "@/components/dashboard/template-section";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { GettingStarted } from "@/components/dashboard/getting-started";
import { type crumb, Crumbs } from "@/components/ui/crumbs";


const crumbs: crumb[] = [
  {name: 'Dashboard', href: "/dashboard"},
]

export default function DashboardPage() {
  // const { user, loading } = useAuth();
  const { profile, loading } = useProfile();

  const name = profile?.fullname ?? "there";

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div>
              <div className="h-7 w-48 rounded bg-white/[0.05]" />
              <div className="mt-3 h-4 w-80 rounded bg-white/[0.03]" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-32 rounded-xl bg-white/[0.03]" />
              <div className="h-32 rounded-xl bg-white/[0.03]" />
            </div>

            <div className="h-64 rounded-xl bg-white/[0.03]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Crumbs crumbs={crumbs} />

        {/* Header */}
        <DashboardHeader name={name} />

        <div className="mt-10 space-y-10">

          {/* Quick actions */}
          <QuickActions />

          {/* Recent forms */}
          <RecentForms />

          {/* Templates */}
          <TemplateSection />

          {/* Activity */}
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <RecentActivity />

            {/* Optional workspace card */}
            <GettingStarted />
          </div>

        </div>
      </div>
    </main>
  );
}