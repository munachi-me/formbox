"use client";

import Link from "next/link";
import Image from 'next/image'
import { FormEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
} from "lucide-react";


const socials = [
  {
    label: "GitHub",
    href: "https://github.com/munachi-me/formbox.git",
    icon: "https://img.icons8.com/?size=100&id=62856&format=png&color=ffffff",
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: "https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=ffffff",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: "https://img.icons8.com/?size=100&id=98960&format=png&color=ffffff",
  },
];


export default function ContactContent() {
  const pageRef = useRef<main>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        heroTimeline
          .from(".contact-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.6,
          })
          .from(
            ".contact-title",
            {
              opacity: 0,
              y: 35,
              duration: 0.8,
            },
            "-=0.3",
          )
          .from(
            ".contact-description",
            {
              opacity: 0,
              y: 20,
              duration: 0.7,
            },
            "-=0.45",
          )
          .from(
            ".contact-grid",
            {
              opacity: 0,
              y: 30,
              duration: 0.8,
            },
            "-=0.35",
          );
      }, pageRef);

      return () => ctx.revert();
    },
    {
      scope: pageRef,
    },
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Backend/API integration will be added later.
    setSubmitted(true);
  }

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
            <div className="contact-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/[0.07] px-4 py-2 text-xs font-medium text-purple-lighter">
              <MessageSquare className="h-3.5 w-3.5" />
              Get in touch
            </div>

            <h1 className="contact-title text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Let's talk about{" "}
              <span className="gradient-text">FormBox.</span>
            </h1>

            <p className="contact-description mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              Have a question, found a problem, or just want to say hello?
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}
      <section className="relative pb-24 sm:pb-28 lg:pb-32">
        <div className="container-custom">
          <div className="contact-grid mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            {/* =================================================
                LEFT SIDE
            ================================================== */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple-light">
                <Mail className="h-5 w-5" />
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
                We'd love to hear from you.
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Whether you're using FormBox, thinking about using it, or just
                have an idea you'd like to share, send us a message.
              </p>

              {/* Email */}
              <div className="mt-8 border-t border-white/[0.06] pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-600">
                  Email
                </p>

                <a
                  href="mailto:hello@formbox.dev"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-light"
                >
                  hello@formbox.dev
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Response time */}
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-600">
                  Response time
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Usually within 1–2 business days.
                </p>
              </div>

              {/* Socials */}
              <div className="mt-8 border-t border-white/[0.06] pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-600">
                  Follow FormBox
                </p>

                <div className="mt-4 flex items-center gap-2">
                  {socials.map((social) => (
                    <SocialLink
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-600 transition hover:border-purple/30 hover:bg-purple/10 hover:text-purple-light"
                    >
                      <Image
                        src={social.icon}
                        alt={social.label}
                        width={4}
                        height={4}
                      />
                    </SocialLink>
                  ))}                  
                </div>
              </div>
            </div>

            {/* =================================================
                CONTACT FORM
            ================================================== */}
            <div className="rounded-2xl border border-white/[0.07] bg-ink-light p-7 sm:p-8">
              {submitted ? (
                <SuccessMessage
                  onReset={() => setSubmitted(false)}
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Send us a message
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      Fill out the form below and we'll get back to you.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-400"
                      >
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="h-11 w-full rounded-xl border border-white/[0.08] bg-background px-4 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-purple/50 focus:ring-2 focus:ring-purple/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-400"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="h-11 w-full rounded-xl border border-white/[0.08] bg-background px-4 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-purple/50 focus:ring-2 focus:ring-purple/10"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-400"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="h-11 w-full appearance-none rounded-xl border border-white/[0.08] bg-background px-4 text-sm text-gray-400 outline-none transition focus:border-purple/50 focus:ring-2 focus:ring-purple/10"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>

                      <option value="general">
                        General question
                      </option>

                      <option value="support">
                        Technical support
                      </option>

                      <option value="billing">
                        Billing
                      </option>

                      <option value="feedback">
                        Feedback
                      </option>

                      <option value="bug">
                        Report a bug
                      </option>

                      <option value="other">
                        Something else
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-400"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what's on your mind..."
                      required
                      rows={7}
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-background px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-700 transition focus:border-purple/50 focus:ring-2 focus:ring-purple/10"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple text-sm font-medium text-white shadow-lg shadow-purple/15 transition hover:bg-purple-light"
                  >
                    Send message

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-[11px] leading-5 text-gray-700">
                    By sending this message, you agree to be contacted
                    regarding your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/5 blur-[120px]"
        />

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Haven't tried FormBox yet?
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Create your first form and start collecting responses today.
            </p>

            <Link
              href="/register"
              className="group mx-auto mt-7 inline-flex items-center gap-2 rounded-xl bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.09]"
            >
              Get started

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-600 transition hover:border-purple/30 hover:bg-purple/10 hover:text-purple-light"
    >
      {children}
    </a>
  );
}

/* =========================================================
   SUCCESS MESSAGE
========================================================= */

function SuccessMessage({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green/10 text-green">
        <CheckCircle2 className="h-7 w-7" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-white">
        Message sent.
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
        Thanks for reaching out. We've received your message and will get
        back to you as soon as possible.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
      >
        Send another message
      </button>
    </div>
  );
}