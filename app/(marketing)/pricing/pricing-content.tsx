"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
  Sparkles,
} from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const plans = [
  {
    name: "Free",
    description: "Everything you need to start building forms.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    cta: "Get started",
    features: [
      "Up to 5 forms",
      "100 responses per month",
      "Unlimited form views",
      "Basic form customization",
      "Shareable form links",
      "Response dashboard",
    ],
  },
  {
    name: "Pro",
    description: "More power for creators, freelancers, and teams.",
    monthlyPrice: 12,
    yearlyPrice: 9,
    popular: true,
    cta: "Start Pro",
    features: [
      "Unlimited forms",
      "10,000 responses per month",
      "Advanced customization",
      "File uploads",
      "Custom form URLs",
      "Response exports",
      "Advanced analytics",
      "Remove FormBox branding",
    ],
  },
  {
    name: "Business",
    description: "Advanced tools for teams and growing businesses.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    popular: false,
    cta: "Choose Business",
    features: [
      "Everything in Pro",
      "Unlimited responses",
      "Team collaboration",
      "Multiple team members",
      "Priority support",
      "Advanced permissions",
      "Custom branding",
      "Team analytics",
    ],
  },
];

const comparisonRows = [
  {
    feature: "Forms",
    free: "5",
    pro: "Unlimited",
    business: "Unlimited",
  },
  {
    feature: "Responses",
    free: "100 / month",
    pro: "10,000 / month",
    business: "Unlimited",
  },
  {
    feature: "Form customization",
    free: true,
    pro: true,
    business: true,
  },
  {
    feature: "Shareable links",
    free: true,
    pro: true,
    business: true,
  },
  {
    feature: "Response exports",
    free: false,
    pro: true,
    business: true,
  },
  {
    feature: "File uploads",
    free: false,
    pro: true,
    business: true,
  },
  {
    feature: "Advanced analytics",
    free: false,
    pro: true,
    business: true,
  },
  {
    feature: "Remove FormBox branding",
    free: false,
    pro: true,
    business: true,
  },
  {
    feature: "Team collaboration",
    free: false,
    pro: false,
    business: true,
  },
  {
    feature: "Custom branding",
    free: false,
    pro: false,
    business: true,
  },
  {
    feature: "Priority support",
    free: false,
    pro: false,
    business: true,
  },
];

const faqs = [
  {
    question: "Can I use FormBox for free?",
    answer:
      "Yes. The Free plan gives you everything you need to create your first forms and start collecting responses without a credit card.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan whenever you need. Your forms and responses remain yours.",
  },
  {
    question: "What happens if I reach my response limit?",
    answer:
      "Your existing responses remain available. You simply won't be able to collect additional responses until your limit resets or you upgrade your plan.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can cancel at any time. Your Pro or Business features remain available until the end of your current billing period.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. You can start with the Free plan without entering payment information.",
  },
];

export default function PricingContent() {
  const pageRef = useRef<main>(null);
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        heroTimeline
          .from(".pricing-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.6,
          })
          .from(
            ".pricing-title",
            {
              opacity: 0,
              y: 35,
              duration: 0.8,
            },
            "-=0.3",
          )
          .from(
            ".pricing-description",
            {
              opacity: 0,
              y: 20,
              duration: 0.7,
            },
            "-=0.45",
          )
          .from(
            ".billing-toggle",
            {
              opacity: 0,
              y: 15,
              duration: 0.5,
            },
            "-=0.35",
          );

        gsap.utils
          .toArray<HTMLElement>(".pricing-card")
          .forEach((card, index) => {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
              opacity: 0,
              y: 40,
              duration: 0.7,
              delay: index * 0.08,
              ease: "power3.out",
            });
          });

        gsap.utils
          .toArray<HTMLElement>(".pricing-reveal")
          .forEach((element) => {
            gsap.from(element, {
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
              },
              opacity: 0,
              y: 35,
              duration: 0.8,
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
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-purple/10 blur-[140px]"
        />

        <div className="container-custom relative">
          <div className="mx-auto max-w-3xl py-24 text-center sm:py-28 lg:py-32">
            <div className="pricing-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/[0.07] px-4 py-2 text-xs font-medium text-purple-lighter">
              <Sparkles className="h-3.5 w-3.5" />
              Simple pricing
            </div>

            <h1 className="pricing-title text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Plans that grow with your{" "}
              <span className="gradient-text">forms.</span>
            </h1>

            <p className="pricing-description mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              Start for free, upgrade when you need more, and only pay for
              the features that help you build better forms.
            </p>

            {/* Billing toggle */}
            <div className="billing-toggle mt-9 inline-flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                  billingCycle === "monthly"
                    ? "bg-white/[0.08] text-white"
                    : "text-gray-600 hover:text-gray-300"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                  billingCycle === "yearly"
                    ? "bg-white/[0.08] text-white"
                    : "text-gray-600 hover:text-gray-300"
                }`}
              >
                Yearly

                <span className="rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green-light">
                  Save 25%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING CARDS
      ====================================================== */}
      <section className="relative pb-24 sm:pb-28 lg:pb-32">
        <div className="container-custom">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const price =
                billingCycle === "monthly"
                  ? plan.monthlyPrice
                  : plan.yearlyPrice;

              return (
                <div
                  key={plan.name}
                  className={`pricing-card relative flex flex-col rounded-2xl border p-7 transition duration-300 ${
                    plan.popular
                      ? "border-purple/40 bg-purple/[0.045] shadow-[0_0_70px_rgba(124,58,237,0.1)]"
                      : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.14]"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-purple/30 bg-background px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-purple-lighter">
                      Most popular
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {plan.name}
                    </h2>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-7">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-semibold tracking-[-0.04em] text-white">
                        ${price}
                      </span>

                      <span className="mb-1.5 text-sm text-gray-600">
                        / month
                      </span>
                    </div>

                    {billingCycle === "yearly" &&
                      plan.yearlyPrice > 0 && (
                        <p className="mt-2 text-xs text-green">
                          Billed annually
                        </p>
                      )}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/register"
                    className={`mt-7 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition ${
                      plan.popular
                        ? "bg-purple text-white shadow-lg shadow-purple/15 hover:bg-purple-light"
                        : "border border-white/[0.08] bg-white/[0.03] text-gray-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {plan.cta}

                    {plan.popular && (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </Link>

                  {/* Features */}
                  <div className="mt-8 border-t border-white/[0.06] pt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                      Includes
                    </p>

                    <ul className="mt-5 space-y-3.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-gray-500"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                            <Check className="h-2.5 w-2.5" />
                          </span>

                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-7 text-center text-xs text-gray-700">
            No credit card required to start with the Free plan.
          </p>
        </div>
      </section>

      {/* =====================================================
          COMPARISON
      ====================================================== */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28">
        <div className="container-custom">
          <div className="pricing-reveal mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-light">
              Compare plans
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Everything side by side.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
              See exactly what's included in each FormBox plan.
            </p>
          </div>

          <div className="pricing-reveal mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/[0.07] bg-background">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="w-[40%] px-6 py-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-600">
                      Feature
                    </th>

                    <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                      Free
                    </th>

                    <th className="bg-purple/[0.025] px-6 py-5 text-center text-sm font-semibold text-purple-lighter">
                      Pro
                    </th>

                    <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                      Business
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={
                        index !== comparisonRows.length - 1
                          ? "border-b border-white/[0.05]"
                          : ""
                      }
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {row.feature}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        <ComparisonValue value={row.free} />
                      </td>

                      <td className="bg-purple/[0.025] px-6 py-4 text-center text-sm text-gray-500">
                        <ComparisonValue value={row.pro} />
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        <ComparisonValue value={row.business} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div className="pricing-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-green-light">
                FAQ
              </span>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Questions?
                <br />
                We've got answers.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
                Everything you need to know about FormBox plans and billing.
              </p>
            </div>

            <div className="pricing-reveal divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.015]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-medium text-gray-300 transition hover:text-white">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] text-gray-600 transition ${
                          isOpen
                            ? "rotate-180 border-purple/20 bg-purple/10 text-purple-light"
                            : ""
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <HelpCircle className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 pr-16 text-sm leading-6 text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[130px]"
        />

        <div className="container-custom relative">
          <div className="pricing-reveal mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Start building for free.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              No complicated setup. No credit card. Just create your first
              form and start collecting responses.
            </p>

            <Link
              href="/register"
              className="group mx-auto mt-8 inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-purple/20 transition hover:bg-purple-light"
            >
              Create your first form

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ComparisonValue({
  value,
}: {
  value: string | boolean;
}) {
  if (typeof value === "string") {
    return <span>{value}</span>;
  }

  if (value) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green/10 text-green">
        <Check className="h-3 w-3" />
      </span>
    );
  }

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.03] text-gray-700">
      <Minus className="h-3 w-3" />
    </span>
  );
}