"use client";

import {
  CheckCircle2,
  FilePlus2,
  MessageSquare,
  Send,
} from "lucide-react";

interface Activity {
  id: string;
  type: "created" | "response" | "published";
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "response",
    title: "New responses received",
    description: "Customer Feedback received 3 new responses.",
    time: "12 minutes ago",
  },
  {
    id: "2",
    type: "published",
    title: "Form published",
    description: "Contact Form is now accepting responses.",
    time: "2 hours ago",
  },
  {
    id: "3",
    type: "created",
    title: "Form created",
    description: 'You created "Job Application".',
    time: "Yesterday",
  },
];

const activityIcons = {
  created: FilePlus2,
  response: MessageSquare,
  published: Send,
};

export function RecentActivity() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Recent activity
        </h2>

        <p className="mt-1 text-xs text-gray-600">
          Keep track of what's happening in your workspace.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-white/[0.015]">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];

          return (
            <div
              key={activity.id}
              className={`
                flex gap-3 p-4
                ${
                  index !== activities.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }
              `}
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple-light">
                <Icon className="h-3.5 w-3.5" />

                {index !== activities.length - 1 && (
                  <span className="absolute left-1/2 top-full h-4 w-px bg-white/[0.06]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-300">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  {activity.description}
                </p>
              </div>

              <span className="shrink-0 text-[10px] text-gray-700">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}