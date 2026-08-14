"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  Check,
  Code2,
  Layers3,
  Sparkles,
  Zap,
} from "lucide-react";

export default function AboutContent() {
  const pageRef = useRef<main>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        heroTimeline
          .from(".about-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.6,
          })
          .from(
            ".about-title",
            {
              opacity: 0,
              y: 35,
              duration: 0.8,
            },
            "-=0.3",
          )
          .from(
            ".about-description",
            {
              opacity: 0,
              y: 25,
              duration: 0.7,
            },
            "-=0.45",
          )
          .from(
            ".about-hero-card",
            {
              opacity: 0,
              y: 30,
              scale: 0.97,
              duration: 0.8,
            },
            "-=0.4",
          );

        gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
          });
        });

        gsap.utils.toArray<HTMLElement>(".principle-card").forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out",
          });
        });
      }, pageRef);

      return () => ctx.revert();
    },
    {
      scope: pageRef,
    },
  );

  return (
    <main ref={pageRef} className="overflow-hidden">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple/10 blur-[140px]"
        />

        <div className="container-custom relative">
          <div className="mx-auto max-w-4xl py-24 text-center sm:py-32 lg:py-40">
            <div className="about-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/[0.07] px-4 py-2 text-xs font-medium text-purple-lighter">
              <Sparkles className="h-3.5 w-3.5" />
              About FormBox
            </div>

            <h1 className="about-title text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Forms should be{" "}
              <span className="gradient-text">simple.</span>
            </h1>

            <p className="about-description mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
              FormBox is built around a simple idea: creating and sharing a
              form shouldn't feel like setting up a complicated software
              project.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / STORY
      ========================================================== */}
      <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
        <div className="container-custom">
          <div className="grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-28">
            {/* Left */}
            <div className="about-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-light">
                Why FormBox
              </span>

              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Powerful enough to build with. Simple enough to just use.
              </h2>
            </div>

            {/* Right */}
            <div className="about-reveal space-y-6 text-sm leading-7 text-gray-500 sm:text-base">
              <p>
                Forms are everywhere. Feedback, registrations, surveys,
                applications, questionnaires, and countless other workflows
                all start with collecting information.
              </p>

              <p>
                But the tools used to create those forms can often become more
                complicated than the forms themselves. Too many settings,
                unnecessary distractions, and interfaces designed around
                complexity can get in the way.
              </p>

              <p>
                FormBox takes a different approach. It gives you the tools you
                actually need to create beautiful, functional forms and
                collect responses without making the process harder than it
                needs to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISUAL PRODUCT STATEMENT
      ========================================================== */}
      <section className="relative py-20 sm:py-28 lg:py-36">
        <div className="container-custom">
          <div className="about-hero-card relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-light p-6 shadow-[0_0_80px_rgba(124,58,237,0.08)] sm:p-10 lg:p-14">
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-purple/15 blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-green/10 blur-[100px]"
            />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              {/* Copy */}
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple-light">
                  <Layers3 className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Everything you need.
                  <br />
                  Nothing you don't.
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                  FormBox focuses on the essentials: building forms,
                  publishing them, and understanding the responses you receive.
                  The interface stays out of your way so you can focus on what
                  you're actually trying to accomplish.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "Create forms without unnecessary complexity",
                    "Share forms anywhere with a simple link",
                    "Collect and manage responses in one place",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                        <Check className="h-3 w-3" />
                      </span>

                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock form */}
              <div className="relative">
                <div className="rounded-2xl border border-white/[0.08] bg-background p-5 shadow-2xl sm:p-6">
                  {/* Mock header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                    <div>
                      <div className="h-3 w-28 rounded-full bg-white/10" />
                      <div className="mt-2 h-2 w-40 rounded-full bg-white/[0.05]" />
                    </div>

                    <div className="h-8 w-8 rounded-lg bg-purple/10" />
                  </div>

                  {/* Fields */}
                  <div className="space-y-5 pt-6">
                    <div>
                      <div className="mb-2 h-2 w-20 rounded-full bg-gray-700" />

                      <div className="h-11 rounded-xl border border-white/[0.08] bg-white/[0.02]" />
                    </div>

                    <div>
                      <div className="mb-2 h-2 w-24 rounded-full bg-gray-700" />

                      <div className="h-11 rounded-xl border border-white/[0.08] bg-white/[0.02]" />
                    </div>

                    <div>
                      <div className="mb-2 h-2 w-16 rounded-full bg-gray-700" />

                      <div className="h-24 rounded-xl border border-white/[0.08] bg-white/[0.02]" />
                    </div>

                    <div className="flex justify-end pt-1">
                      <div className="h-10 w-28 rounded-xl bg-purple/80" />
                    </div>
                  </div>
                </div>

                {/* Floating response badge */}
                <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-white/[0.08] bg-ink-light px-4 py-3 shadow-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/10 text-green">
                      <Check className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-white">
                        Response received
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-600">
                        Just now
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================== */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] py-20 sm:py-28 lg:py-32">
        <div className="container-custom">
          <div className="about-reveal mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-green-light">
              Our principles
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Built around the things that matter.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
              FormBox is guided by a few simple principles that shape how the
              product looks, feels, and works.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {/* Principle 1 */}
            <div className="principle-card group rounded-2xl border border-white/[0.07] bg-background p-7 transition duration-300 hover:-translate-y-1 hover:border-purple/20">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple-light transition group-hover:bg-purple/15">
                <Zap className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Simplicity
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                The best interface is often the one that doesn't need
                explaining. We remove friction wherever we can.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="principle-card group rounded-2xl border border-white/[0.07] bg-background p-7 transition duration-300 hover:-translate-y-1 hover:border-green/20">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green-light transition group-hover:bg-green/15">
                <Sparkles className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Thoughtful design
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Functionality doesn't have to come at the expense of good
                design. Every interaction should feel intentional.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="principle-card group rounded-2xl border border-white/[0.07] bg-background p-7 transition duration-300 hover:-translate-y-1 hover:border-purple/20">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple-light transition group-hover:bg-purple/15">
                <Code2 className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Built for the web
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Forms should work wherever your users are. FormBox is designed
                around the open, connected nature of the web.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[120px]"
        />

        <div className="container-custom relative">
          <div className="about-reveal mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-green shadow-lg shadow-purple/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <h2 className="mt-7 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Ready to build your next form?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Create your first FormBox form and see how simple collecting
              responses can be.
            </p>

            <Link
              href="/register"
              className="group mx-auto mt-8 inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-purple/20 transition hover:bg-purple-light"
            >
              Get started for free

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}