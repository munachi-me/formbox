"use client";

import Logo from '@/components/ui/logo'
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  FilePlus2,
  FileText,
  FolderOpen,
  LayoutTemplate,
  Menu,
  Settings,
  Sparkles,
  X,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const mainNavigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Forms",
    href: "/forms",
    icon: FileText,
  },
  {
    label: "Templates",
    href: "/templates",
    icon: LayoutTemplate,
  },
];

const secondaryNavigation = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function UsersNavigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /*
   * Close mobile navigation whenever the route changes.
   */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /*
   * Prevent the page from scrolling while the mobile
   * navigation drawer is open.
   */
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.06] bg-background lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/[0.06] px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
          >
            <Logo />
          </Link>
        </div>

        {/* Create form */}
        <div className="px-4 pt-5">
          <Link
            href="/forms/new"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-purple px-4 text-sm font-medium text-white shadow-lg shadow-purple/10 transition-all duration-200 hover:bg-purple-light hover:shadow-purple/20"
          >
            <FilePlus2 className="h-4 w-4" />
            Create form
          </Link>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
            Workspace
          </p>

          <div className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex h-10 items-center gap-3 rounded-lg px-3
                    text-sm transition-all duration-200
                    ${
                      active
                        ? "bg-purple/10 text-white"
                        : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 h-5 w-[2px] rounded-r-full bg-purple-light" />
                  )}

                  <Icon
                    className={`
                      h-[17px] w-[17px] shrink-0
                      ${
                        active
                          ? "text-purple-light"
                          : "text-gray-600 group-hover:text-gray-400"
                      }
                    `}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
            Account
          </p>

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex h-10 items-center gap-3 rounded-lg px-3
                    text-sm transition-all duration-200
                    ${
                      active
                        ? "bg-purple/10 text-white"
                        : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 h-5 w-[2px] rounded-r-full bg-purple-light" />
                  )}

                  <Icon
                    className={`
                      h-[17px] w-[17px]
                      ${
                        active
                          ? "text-purple-light"
                          : "text-gray-600 group-hover:text-gray-400"
                      }
                    `}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Profile */}
        <div className="relative border-t border-white/[0.06] p-3">
          <button
            type="button"
            onClick={() => setProfileOpen((value) => !value)}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-white/[0.04]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple to-green text-xs font-semibold text-white">
              FC
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-gray-200">
                Favour Chinedu
              </p>

              <p className="truncate text-[10px] text-gray-700">
                favour@example.com
              </p>
            </div>

            <ChevronDown
              className={`
                h-4 w-4 shrink-0 text-gray-700 transition-transform
                ${profileOpen ? "rotate-180" : ""}
              `}
            />
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-xl border border-white/[0.07] bg-ink-light shadow-2xl shadow-black/30">
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 text-xs text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                <User className="h-3.5 w-3.5" />
                Account settings
              </Link>

              <button
                type="button"
                className="flex w-full items-center gap-3 border-t border-white/[0.05] px-3 py-2.5 text-xs text-gray-400 transition hover:bg-red-400/[0.05] hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/[0.06] bg-background/90 px-4 backdrop-blur-xl lg:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5"
        >
          <Logo />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-[60] flex w-[280px] flex-col
          border-r border-white/[0.07]
          bg-background
          shadow-2xl shadow-black/40
          transition-transform duration-300 ease-out
          lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >
            <Logo />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white/[0.05] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Create */}
        <div className="px-4 pt-5">
          <Link
            href="/forms/new"
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-purple px-4 text-sm font-medium text-white shadow-lg shadow-purple/10 transition hover:bg-purple-light"
          >
            <FilePlus2 className="h-4 w-4" />
            Create form
          </Link>
        </div>

        {/* Mobile navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
            Workspace
          </p>

          <div className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex h-11 items-center gap-3 rounded-lg px-3
                    text-sm transition
                    ${
                      active
                        ? "bg-purple/10 text-white"
                        : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-[18px] w-[18px]
                      ${
                        active
                          ? "text-purple-light"
                          : "text-gray-600"
                      }
                    `}
                  />

                  {item.label}
                </Link>
              );
            })}
          </div>

          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
            Account
          </p>

          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex h-11 items-center gap-3 rounded-lg px-3
                  text-sm transition
                  ${
                    active
                      ? "bg-purple/10 text-white"
                      : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                  }
                `}
              >
                <Icon
                  className={`
                    h-[18px] w-[18px]
                    ${
                      active
                        ? "text-purple-light"
                        : "text-gray-600"
                    }
                  `}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile profile */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple to-green text-xs font-semibold text-white">
              FC
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-gray-200">
                Favour Chinedu
              </p>

              <p className="truncate text-[10px] text-gray-700">
                favour@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}