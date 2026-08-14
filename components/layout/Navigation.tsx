"use client";

import Logo from '@/components/ui/logo'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const navLinks = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "How it works",
    href: "/#how-it-works",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
  },
];


export function Navigation() {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false)

  useGSAP(
    () => {
      if (!navRef.current) return;

      gsap.fromTo(
        navRef.current,
        {
          opacity: 0,
          y: -15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
      );
    },
    {
      scope: navRef,
    },
  );

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;

      if (mobileOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          {
            opacity: 0,
            height: 0,
          },
          {
            opacity: 1,
            height: "auto",
            duration: 0.35,
            ease: "power3.out",
          },
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.25,
          ease: "power2.inOut",
        });
      }
    },
    {
      dependencies: [mobileOpen],
      scope: mobileMenuRef,
    },
  );

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header
      ref={navRef}
      className='bg-ink/80 backdrop-blur-md border-b border-ink-muted fixed top-0 left-0 right-0 z-50 w-full'
    >
      <nav className="container-custom">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="FormBox home"
            onClick={closeMobileMenu}
            className="shrink-0"
          >
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative rounded-lg px-4 py-2 text-sm transition ${
                    active
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {link.label}

                  {active && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-purple" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-xl bg-purple px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple/15 transition hover:bg-purple-light"
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-400 transition hover:border-white/15 hover:text-white md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          ref={mobileMenuRef}
          className="h-0 overflow-hidden opacity-0 md:hidden"
        >
          <div className="border-t border-white/[0.06] py-5">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                      active
                        ? "bg-purple/10 text-white"
                        : "text-gray-500 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    {link.label}

                    <ChevronDown
                      className={`h-4 w-4 -rotate-90 transition ${
                        active ? "text-purple-light" : "text-gray-700"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex h-11 items-center justify-center rounded-xl border border-white/[0.08] text-sm font-medium text-gray-400 transition hover:border-white/15 hover:text-white"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="flex h-11 items-center justify-center rounded-xl bg-purple text-sm font-medium text-white shadow-lg shadow-purple/15 transition hover:bg-purple-light"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}