"use client";

import Logo from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  FileText,
  LockKeyhole,
  Mail,
  Loader2,
  Sparkles,
  User,
} from "lucide-react";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type AuthMode = "login" | "register";

interface AuthPageProps {
  mode: AuthMode;
}

export default function AuthContent({
  mode,
}: AuthPageProps) {
  const router = useRouter();
  const { toast } = useToast();

  const isLogin = mode === "login";

  const {
    user,
    loading: authLoading,
    signIn,
    signUp,
  } = useAuth();

  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  /* --------------------------------
     FORM STATE
  -------------------------------- */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  /* --------------------------------
     REDIRECT IF ALREADY AUTHENTICATED
  -------------------------------- */

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  /* --------------------------------
     GSAP
  -------------------------------- */

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

  /* --------------------------------
     SUBMIT
  -------------------------------- */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    /*
     * LOGIN
     */

    if (isLogin) {
      if (!email.trim() || !password) {
        toast.warning({
          title: "Missing information",
          message:
            "Please enter your email and password.",
        });

        return;
      }

      setSubmitting(true);

      const { error } = await signIn(
        email.trim(),
        password,
      );

      if (error) {
        toast.error({
          title: "Sign in failed",
          message: getAuthErrorMessage(
            error.message,
          ),
        });

        setSubmitting(false);
        return;
      }

      toast.success({
        title: "Welcome back",
        message:
          "You have successfully signed in.",
      });

      router.replace("/dashboard");

      return;
    }

    /*
     * REGISTER
     */

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      toast.warning({
        title: "Missing information",
        message:
          "Please fill in all the required fields.",
      });

      return;
    }

    if (name.trim().length < 2) {
      toast.warning({
        title: "Invalid name",
        message:
          "Your name must be at least 2 characters.",
      });

      return;
    }

    if (password.length < 8) {
      toast.warning({
        title: "Weak password",
        message:
          "Your password must be at least 8 characters.",
      });

      return;
    }

    if (password !== confirmPassword) {
      toast.error({
        title: "Passwords don't match",
        message:
          "Make sure both password fields contain the same password.",
      });

      return;
    }

    setSubmitting(true);

    const {
      error,
      needsConfirmation,
    } = await signUp(
      email.trim(),
      password,
      name.trim(),
    );

    if (error) {
      toast.error({
        title: "Registration failed",
        message: getAuthErrorMessage(
          error.message,
        ),
      });

      setSubmitting(false);
      return;
    }

    if (needsConfirmation) {
      toast.success({
        title: "Account created",
        message:
          "Check your email to confirm your account.",
      });

      setSubmitting(false);

      return;
    }

    toast.success({
      title: "Account created",
      message:
        "Welcome to FormBox. Your account is ready.",
    });

    router.replace("/dashboard");
  };

  /* --------------------------------
     MAIN
  -------------------------------- */

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-background"
    >
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

        {/* =================================
            LEFT VISUAL
        ================================= */}

        <section
          ref={visualRef}
          className="relative hidden overflow-hidden border-r border-white/[0.06] bg-[#0E0E13] lg:flex"
        >
          {/* Purple glow */}
          <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-purple/10 blur-[130px]" />

          {/* Green glow */}
          <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-green/5 blur-[130px]" />

          <div className="relative flex w-full flex-col justify-between gap-8 p-12 xl:p-16">

            <Logo />

            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/10 px-3 py-1.5 text-[11px] font-medium text-purple-light">
                <Sparkles className="h-3 w-3" />
                Forms without the fuss.
              </div>

              <h1 className="max-w-lg text-4xl font-semibold leading-[1.1] tracking-tight text-white xl:text-5xl">
                Build forms.
                <br />

                <span className="gradient-text">
                  Collect responses.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                Create beautiful forms, share them
                anywhere, and keep every response
                organized in one simple workspace.
              </p>

              {/* FORM MOCKUP */}

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

                    <span className="text-[9px] text-green">
                      Published
                    </span>
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

              <span>
                © 2026 FormBox
              </span>

              <span className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-green" />

                Simple. Fast. Focused.

              </span>

            </div>

          </div>
        </section>

        {/* =================================
            AUTH
        ================================= */}

        <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

          {/* Mobile logo */}

          <div className="absolute left-5 top-6 sm:left-8 lg:hidden">
            <Logo />
          </div>

          {/* Back home */}

          <Link
            href="/"
            className="absolute right-5 top-7 inline-flex items-center gap-2 text-xs text-gray-600 transition hover:text-gray-300 sm:right-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>

          <div
            ref={cardRef}
            className="w-full max-w-[420px] pt-14 lg:pt-0"
          >

            {/* HEADER */}

            <div className="mb-8">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10">

                {isLogin ? (
                  <LockKeyhole className="h-5 w-5 text-purple-light" />
                ) : (
                  <User className="h-5 w-5 text-purple-light" />
                )}

              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {isLogin
                  ? "Welcome back."
                  : "Create your account."}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {isLogin
                  ? "Sign in to continue building and managing your forms."
                  : "Start creating beautiful forms and collecting responses."}
              </p>

            </div>

            {/* GOOGLE */}

            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="h-12 w-full"
              disabled={submitting}
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            {/* DIVIDER */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/[0.07]" />

              <span className="text-[10px] uppercase tracking-wider text-gray-700">
                or
              </span>

              <div className="h-px flex-1 bg-white/[0.07]" />

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}

              {!isLogin && (
                <Input
                  id="name"
                  label="Full name"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  disabled={submitting}
                  autoComplete="name"
                  leftElement={
                    <User className="h-4 w-4 text-gray-600" />
                  }
                />
              )}

              {/* EMAIL */}

              <Input
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                disabled={submitting}
                autoComplete="email"
                leftElement={
                  <Mail className="h-4 w-4 text-gray-600" />
                }
              />

              {/* PASSWORD */}

              <Input
                id="password"
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder={
                  isLogin
                    ? "Enter your password"
                    : "Create a password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                disabled={submitting}
                autoComplete={
                  isLogin
                    ? "current-password"
                    : "new-password"
                }
                leftElement={
                  <LockKeyhole className="h-4 w-4 text-gray-600" />
                }
                rightElement={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    disabled={submitting}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white/5 hover:text-gray-300 disabled:opacity-50"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
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

              {/* CONFIRM PASSWORD */}

              {!isLogin && (
                <Input
                  id="confirm-password"
                  label="Confirm password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value,
                    )
                  }
                  required
                  disabled={submitting}
                  autoComplete="new-password"
                  leftElement={
                    <LockKeyhole className="h-4 w-4 text-gray-600" />
                  }
                  rightElement={
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current,
                        )
                      }
                      disabled={submitting}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white/5 hover:text-gray-300 disabled:opacity-50"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
              )}

              {/* FORGOT PASSWORD */}

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

              {/* TERMS */}

              {!isLogin && (
                <div className="flex items-start gap-2 pt-1">

                  <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.025]">
                    <Check className="h-2.5 w-2.5 text-purple" />
                  </div>

                  <p className="text-[11px] leading-5 text-gray-600">
                    By creating an account, you agree
                    to our{" "}

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

              {/* SUBMIT */}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="h-12 w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />

                    {isLogin
                      ? "Signing in..."
                      : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLogin
                      ? "Sign in"
                      : "Create account"}

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>

            </form>

            {/* SWITCH */}

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

            {/* SECURITY */}

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

/* =================================
   GOOGLE ICON
================================= */

function GoogleIcon() {
  return (
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
  );
}

/* =================================
   AUTH ERROR MESSAGES
================================= */

function getAuthErrorMessage(
  message: string,
): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes(
      "invalid login credentials",
    )
  ) {
    return "The email or password you entered is incorrect.";
  }

  if (
    normalized.includes("email not confirmed")
  ) {
    return "Please confirm your email address before signing in.";
  }

  if (
    normalized.includes("user already registered")
  ) {
    return "An account with this email already exists.";
  }

  if (
    normalized.includes("invalid email")
  ) {
    return "Please enter a valid email address.";
  }

  if (
    normalized.includes("too many requests")
  ) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  if (
    normalized.includes("password")
  ) {
    return "Your password does not meet the required requirements.";
  }

  return "Something went wrong. Please try again.";
}