"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useAuth } from "@/providers/auth-provider";
import { UserNavigation } from "@/components/layout/user-navigation";
import { UserFooter } from "@/components/layout/footer";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement>(null);

  const {
    user,
    loading,
  } = useAuth();

  /*
   * ==========================================
   * AUTH GUARD
   * ==========================================
   */

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  /*
   * ==========================================
   * LOADING ANIMATION
   * ==========================================
   */

  useGSAP(
    () => {
      if (!loading) return;

      gsap.to(".loader-dot", {
        opacity: 0.25,
        scale: 0.75,
        duration: 0.6,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    },
    {
      scope: loaderRef,
      dependencies: [loading],
    },
  );

  /*
   * ==========================================
   * LOADING / REDIRECT STATE
   * ==========================================
   */

  if (loading || !user) {
    return (
      <main
        ref={loaderRef}
        className="flex min-h-screen items-center justify-center bg-background"
      >
        <div className="flex items-center gap-1.5">
          <span className="loader-dot h-2 w-2 rounded-full bg-purple" />

          <span className="loader-dot h-2 w-2 rounded-full bg-purple-light" />

          <span className="loader-dot h-2 w-2 rounded-full bg-green" />
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * PROTECTED APP
   * ==========================================
   */

  return (
    <div className="min-h-screen bg-background">
      <UserNavigation />

      <main className="pt-16 lg:pl-64 lg:pt-0">
        {children}
        <UserFooter />
      </main>
    </div>
  );
}