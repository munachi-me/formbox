"use client";

import Logo from '@/components/ui/logo'
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  FileText,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";

type AuthMode = "login" | "register";

interface AuthPageProps {
  mode: AuthMode;
}

function InputField({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightElement,
}: {
  icon: LucideIcon;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rightElement?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-300">
        {label}
      </label>

      <div className="group relative">
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600 transition group-focus-within:text-purple-light" />

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-purple/50 focus:bg-purple/[0.03] focus:ring-1 focus:ring-purple/20"
        />

        {rightElement}
      </div>
    </div>
  );
}

export default function AuthContent({ mode }: AuthPageProps) {
  const isLogin = mode === "login";

  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      if (cardRef.current) {
        timeline.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 25,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
          },
        );
      }

      if (visualRef.current) {
        timeline.fromTo(
          visualRef.current,
          {
            opacity: 0,
            x: 35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
          },
          "-=0.5",
        );
      }
    },
    {
      scope: pageRef,
    },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Connect this to Supabase Auth later.
    console.log({
      mode,
      name,
      email,
      password,
    });
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-background"
    >
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT VISUAL */}
        <section
          ref={visualRef}
          className="relative hidden overflow-hidden border-r border-white/[0.06] bg-[#0E0E13] lg:flex"
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-purple/10 blur-[130px]" />

          <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-green/5 blur-[130px]" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16 gap-8">            
            <Logo />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/10 px-3 py-1.5 text-[11px] font-medium text-purple-light">
                <Sparkles className="h-3 w-3" />
                Forms without the fuss.
              </div>

              <h1 className="max-w-lg text-4xl font-semibold leading-[1.1] tracking-tight text-white xl:text-5xl">
                Build forms.
                <br />
                <span className="gradient-text">Collect responses.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                Create beautiful forms, share them anywhere, and keep every
                response organized in one simple workspace.
              </p>

              {/* Mini form mockup */}
              <div className="mt-12 max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple/15">
                      <FileText className="h-4 w-4 text-purple-light" />
                    </div>

                    <div>
                      <div className="h-2 w-24 rounded bg-white/15" />
                      <div className="mt-2 h-1.5 w-16 rounded bg-white/5" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" />
                    <span className="text-[9px] text-green">Published</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5">
                    <div className="mb-2 h-2 w-28 rounded bg-white/10" />
                    <div className="h-9 rounded-lg border border-white/[0.06]" />
                  </div>

                  <div className="rounded-xl border border-purple/20 bg-purple/[0.025] p-3.5">
                    <div className="mb-3 h-2 w-36 rounded bg-white/10" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full border border-purple bg-purple/30" />
                        <div className="h-1.5 w-16 rounded bg-white/10" />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full border border-white/10" />
                        <div className="h-1.5 w-12 rounded bg-white/5" />
                      </div>
                    </div>
                  </div>

                  <div className="h-10 rounded-xl bg-purple/80" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-600">
              <span>© 2026 FormBox</span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green" />
                Simple. Fast. Focused.
              </span>
            </div>
          </div>
        </section>

        {/* AUTH */}
        <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          {/* Mobile brand */}
          <div className="absolute left-5 top-6 flex items-center gap-3 sm:left-8 lg:hidden">
            <Logo />
          </div>

          <Link
            href="/"
            className="absolute right-5 top-7 inline-flex items-center gap-2 text-xs text-gray-600 transition hover:text-gray-300 sm:right-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>

          <div ref={cardRef} className="w-full max-w-[420px] pt-14 lg:pt-0">
            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10">
                {isLogin ? (
                  <LockKeyhole className="h-5 w-5 text-purple-light" />
                ) : (
                  <User className="h-5 w-5 text-purple-light" />
                )}
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {isLogin ? "Welcome back." : "Create your account."}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {isLogin
                  ? "Sign in to continue building and managing your forms."
                  : "Start creating beautiful forms and collecting responses."}
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
                />
                <path
                  fill="#34A853"
                  d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.6Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.53 13.7A5.85 5.85 0 0 1 6.23 12c0-.59.1-1.17.3-1.7V7.77H3.29A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.05 1.02 4.23l3.24-2.53Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 6.27c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.37 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.71 5.37l3.24 2.53C7.3 7.99 9.46 6.27 12 6.27Z"
                />
              </svg>

              Continue with Google
            </button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.07]" />

              <span className="text-[10px] uppercase tracking-wider text-gray-700">
                or
              </span>

              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <InputField
                  icon={User}
                  label="Full name"
                  placeholder="Your name"
                  value={name}
                  onChange={setName}
                />
              )}

              <InputField
                icon={Mail}
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />

              <InputField
                icon={LockKeyhole}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder={
                  isLogin ? "Enter your password" : "Create a password"
                }
                value={password}
                onChange={setPassword}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white/5 hover:text-gray-300"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              {isLogin && (
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-purple-light transition hover:text-purple-lighter"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-start gap-2 pt-1">
                  <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.025]">
                    <Check className="h-2.5 w-2.5 text-purple" />
                  </div>

                  <p className="text-[11px] leading-5 text-gray-600">
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-gray-400 hover:text-white"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-gray-400 hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple text-sm font-medium text-white shadow-lg shadow-purple/20 transition hover:bg-purple-light"
              >
                {isLogin ? "Sign in" : "Create account"}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-gray-600">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-purple-light transition hover:text-purple-lighter"
                  >
                    Create one
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-purple-light transition hover:text-purple-lighter"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              Your data is securely protected
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}