"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileText,
  Inbox,
  Layers3,
  MousePointer2,
  Plus,
  Sparkles,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);


interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}


const features: Feature[] = [
  {
    icon: Layers3,
    title: "Build without the clutter",
    description:
      "Create clean, flexible forms with exactly the questions you need and nothing you don't.",
  },
  {
    icon: Zap,
    title: "Share in seconds",
    description:
      "Publish your form and get a simple link that you can share anywhere.",
  },
  {
    icon: Inbox,
    title: "Every response, organized",
    description:
      "Keep your submissions in one place and easily review what your audience has to say.",
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "Create",
    description: "Start with a blank form and add the questions you need.",
  },
  {
    number: "02",
    title: "Customize",
    description: "Arrange questions, configure options, and make the form yours.",
  },
  {
    number: "03",
    title: "Publish",
    description: "Give your form a public link and put it in front of your audience.",
  },
  {
    number: "04",
    title: "Collect",
    description: "Watch responses come in and export your data whenever you need it.",
  },
];

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple shadow-[0_0_30px_rgba(124,58,237,0.25)]">
      <div className="relative h-5 w-5">
        <div className="absolute left-0 top-0 h-3.5 w-3.5 rounded-[4px] border-2 border-white" />
        <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-[4px] border-2 border-green" />
      </div>
    </div>
  );
}

function FormPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* Glow */}
      <div className="absolute -inset-10 rounded-full bg-purple/10 blur-3xl" />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111116] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        {/* Browser-like header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-gray-500">
            formbox.app/f/feedback
          </div>

          <div className="w-10" />
        </div>

        <div className="p-7 sm:p-8">
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/10 px-3 py-1 text-[11px] font-medium text-purple-light">
              <Sparkles className="h-3 w-3" />
              Customer feedback
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Tell us what you think.
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your feedback helps us make FormBox better.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Your name
              </label>

              <div className="h-11 rounded-xl border border-white/10 bg-white/[0.025]" />
            </div>

            <div>
              <label className="mb-3 block text-xs font-medium text-gray-300">
                How was your experience?
              </label>

              <div className="space-y-2">
                {["Excellent", "Good", "Average"].map((option, index) => (
                  <div
                    key={option}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                      index === 0
                        ? "border-purple/50 bg-purple/10"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        index === 0
                          ? "border-purple bg-purple"
                          : "border-white/20"
                      }`}
                    >
                      {index === 0 && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>

                    <span className="text-xs text-gray-300">{option}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                What could we improve?
              </label>

              <div className="h-24 rounded-xl border border-white/10 bg-white/[0.025]" />
            </div>

            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple text-sm font-medium text-white shadow-lg shadow-purple/20">
              Submit response
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating response card */}
      <div className="absolute -right-5 top-16 hidden w-44 rounded-2xl border border-white/10 bg-[#17171d] p-4 shadow-2xl sm:block">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Responses</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green/10">
            <Check className="h-3 w-3 text-green" />
          </span>
        </div>

        <div className="text-2xl font-semibold text-white">248</div>

        <div className="mt-1 text-[10px] text-green">
          +18.4% this week
        </div>
      </div>

      {/* Floating published badge */}
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 shadow-2xl sm:flex">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green/10">
          <CheckCircle2 className="h-4 w-4 text-green" />
        </div>

        <div>
          <p className="text-[10px] text-gray-500">Status</p>
          <p className="text-xs font-medium text-white">Form published</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLElement>(null);
  const stepsSectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const preview = previewRef.current;

      if (!hero || !preview) return;

      const heroItems = hero.querySelectorAll("[data-hero]");
      const floatingItems = hero.querySelectorAll("[data-floating]");

      gsap.set(heroItems, {
        opacity: 0,
        y: 30,
      });

      gsap.set(preview, {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      gsap.set(floatingItems, {
        opacity: 0,
        scale: 0.85,
      });

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(heroItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
        })
        .to(
          preview,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
          },
          "-=0.45",
        )
        .to(
          floatingItems,
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.5)",
          },
          "-=0.55",
        );

      gsap.to(preview, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (featureSectionRef.current) {
        const cards =
          featureSectionRef.current.querySelectorAll("[data-feature]");

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featureSectionRef.current,
              start: "top 75%",
            },
          },
        );
      }

      if (stepsSectionRef.current) {
        const steps =
          stepsSectionRef.current.querySelectorAll("[data-step]");

        gsap.fromTo(
          steps,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsSectionRef.current,
              start: "top 75%",
            },
          },
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
            },
          },
        );
      }
    },
    {
      scope: pageRef,
    },
  );

  return (
    <main ref={pageRef} className="overflow-hidden">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-80px)] overflow-hidden"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-purple/10 blur-[140px]" />

        <div className="pointer-events-none absolute bottom-0 left-[-200px] h-[350px] w-[350px] rounded-full bg-green/5 blur-[120px]" />

        <div className="container-custom relative flex min-h-[calc(100vh-80px)] items-center py-20 lg:py-28">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            {/* Hero copy */}
            <div className="max-w-2xl">
              <div
                data-hero
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/10 px-3.5 py-2 text-xs font-medium text-purple-light"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Simple forms. Real responses.
                <ChevronRight className="h-3.5 w-3.5" />
              </div>

              <h1
                data-hero
                className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
              >
                Build forms.
                <br />
                <span className="gradient-text">Collect responses.</span>
              </h1>

              <p
                data-hero
                className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg"
              >
                Create beautiful forms, share them anywhere, and see every
                response in one place. FormBox keeps form building simple.
              </p>

              <div data-hero className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple px-6 text-sm font-medium text-white shadow-lg shadow-purple/20 transition hover:bg-purple-light"
                >
                  Create your first form
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  See how it works
                </Link>
              </div>

              <div
                data-hero
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-500"
              >
                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-green" />
                  Free to get started
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-green" />
                  No credit card
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-green" />
                  Share anywhere
                </span>
              </div>
            </div>

            {/* Preview */}
            <div ref={previewRef} className="relative">
              <FormPreview />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / MINI STATS */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="container-custom grid divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["01", "Create", "Build exactly what you need."],
            ["02", "Share", "One link. Anywhere."],
            ["03", "Collect", "Every response, organized."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex items-center gap-5 px-0 py-7 sm:px-8">
              <span className="font-mono text-xs text-purple">{number}</span>

              <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1 text-xs text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
      	id="features"
        ref={featureSectionRef}
        className="container-custom py-28 lg:py-36"
      >
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-light">
            Everything you need
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Forms should be simple.
            <br />
            <span className="text-gray-500">FormBox keeps them that way.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                data-feature
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple/30 hover:bg-white/[0.035]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple/5 blur-3xl transition group-hover:bg-purple/10" />

                <div className="relative">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-purple/20 bg-purple/10">
                    <Icon className="h-5 w-5 text-purple-light" />
                  </div>

                  <h3 className="text-lg font-medium text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-xs font-medium text-purple-light opacity-0 transition group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BUILDER SHOWCASE */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="container-custom py-28 lg:py-36">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green">
                Built for flexibility
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ask the right questions.
                <br />
                <span className="text-gray-500">Your way.</span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500">
                Add different question types, configure options, make fields
                required, and arrange everything exactly how you want it.
              </p>

              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-purple-light transition hover:text-purple-lighter"
              >
                Start building
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Builder mockup */}
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-purple/5 blur-3xl" />

              <div className="relative rounded-2xl border border-white/10 bg-[#111116] p-4 shadow-2xl sm:p-5">
                <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple">
                      <FileText className="h-4 w-4 text-white" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-white">
                        Customer feedback
                      </p>
                      <p className="text-[10px] text-gray-600">Draft</p>
                    </div>
                  </div>

                  <button className="rounded-lg bg-purple px-3 py-2 text-[10px] font-medium text-white">
                    Publish
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
                  <div className="space-y-2">
                    {[
                      "Short text",
                      "Long text",
                      "Multiple choice",
                      "Checkbox",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-lg border px-3 py-2.5 text-[10px] ${
                          index === 0
                            ? "border-purple/30 bg-purple/10 text-purple-light"
                            : "border-white/[0.06] text-gray-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5">
                    <div className="mb-5">
                      <div className="mb-2 h-2.5 w-36 rounded bg-white/10" />
                      <div className="h-2 w-52 rounded bg-white/5" />
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border border-purple/40 bg-purple/[0.04] p-4">
                        <div className="mb-3 h-2 w-28 rounded bg-white/15" />

                        <div className="h-9 rounded-lg border border-white/10 bg-white/[0.02]" />
                      </div>

                      <div className="rounded-lg border border-white/[0.06] p-4">
                        <div className="mb-3 h-2 w-40 rounded bg-white/10" />

                        <div className="space-y-2">
                          <div className="h-8 rounded-lg bg-white/[0.025]" />
                          <div className="h-8 rounded-lg bg-white/[0.025]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        ref={stepsSectionRef}
        className="container-custom scroll-mt-20 py-28 lg:py-36"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-light">
            How it works
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From idea to responses.
            <br />
            <span className="text-gray-500">Four simple steps.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} data-step className="relative">
              {index !== steps.length - 1 && (
                <div className="absolute left-[calc(100%+16px)] top-4 hidden h-px w-8 bg-gradient-to-r from-white/10 to-transparent md:block" />
              )}

              <span className="font-mono text-xs text-purple">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-medium text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={ctaRef} className="relative overflow-hidden py-24 sm:py-32">
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
              Ready to build your first form?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Create your form, share the link, and start collecting responses
              in minutes.
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