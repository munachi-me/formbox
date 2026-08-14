import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-green/5 blur-[130px]"
        />

        <div className="container-custom relative">
          <div className="mx-auto max-w-4xl py-20 sm:py-24 lg:py-28">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to FormBox
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/10 text-green">
                <FileText className="h-5 w-5" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-green-light">
                Legal
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 text-sm text-gray-600">
              Last updated: August 14, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 sm:p-10 lg:p-12">
              <div className="prose-formbox">
                <p className="lead">
                  These Terms of Service govern your access to and use of
                  FormBox. By creating an account or using FormBox, you agree
                  to these terms.
                </p>

                <LegalSection title="1. Using FormBox">
                  <p>
                    FormBox provides tools for creating forms, publishing them,
                    collecting responses, and managing submitted information.
                  </p>

                  <p>
                    You agree to use FormBox only for lawful purposes and in
                    accordance with these Terms.
                  </p>
                </LegalSection>

                <LegalSection title="2. Accounts">
                  <p>
                    Some FormBox features require an account. You are
                    responsible for providing accurate information and keeping
                    your account credentials secure.
                  </p>

                  <p>
                    You are responsible for activity that occurs through your
                    account. If you believe your account has been compromised,
                    you should contact FormBox as soon as possible.
                  </p>
                </LegalSection>

                <LegalSection title="3. Your Content">
                  <p>
                    You retain ownership of content that you submit to FormBox,
                    including forms, questions, descriptions, and other
                    materials you create.
                  </p>

                  <p>
                    By using FormBox, you grant us the limited rights necessary
                    to host, process, display, transmit, and otherwise provide
                    the service to you.
                  </p>

                  <p>
                    You are responsible for ensuring that your content does not
                    violate applicable laws or the rights of others.
                  </p>
                </LegalSection>

                <LegalSection title="4. Prohibited Uses">
                  <p>
                    You may not use FormBox to:
                  </p>

                  <ul>
                    <li>
                      Violate applicable laws or regulations.
                    </li>

                    <li>
                      Collect information unlawfully or without appropriate
                      authorization.
                    </li>

                    <li>
                      Distribute malware, malicious code, or harmful content.
                    </li>

                    <li>
                      Attempt to gain unauthorized access to FormBox or another
                      user's account.
                    </li>

                    <li>
                      Interfere with the operation or security of the service.
                    </li>

                    <li>
                      Abuse the service through excessive automated requests or
                      other activity that places unreasonable load on our
                      infrastructure.
                    </li>

                    <li>
                      Use FormBox for fraudulent, deceptive, or abusive
                      activities.
                    </li>
                  </ul>
                </LegalSection>

                <LegalSection title="5. Form Responses and End Users">
                  <p>
                    If you use FormBox to collect information from other
                    people, you are responsible for how that information is
                    collected and used.
                  </p>

                  <p>
                    You must provide appropriate notices and obtain any
                    permissions required by applicable laws.
                  </p>

                  <p>
                    FormBox is a platform for collecting information. We do not
                    control the purposes for which you use the information
                    submitted to your forms.
                  </p>
                </LegalSection>

                <LegalSection title="6. Plans and Payments">
                  <p>
                    Certain FormBox features may require a paid subscription.
                    Pricing and feature availability are displayed on the
                    FormBox pricing page.
                  </p>

                  <p>
                    If paid plans are introduced, subscriptions may
                    automatically renew according to the billing period
                    selected unless cancelled before the renewal date.
                  </p>

                  <p>
                    We reserve the right to change pricing in the future. Any
                    material pricing changes will be communicated appropriately
                    before they affect an existing subscription.
                  </p>
                </LegalSection>

                <LegalSection title="7. Availability">
                  <p>
                    We aim to keep FormBox available and reliable, but we do
                    not guarantee that the service will always be available,
                    uninterrupted, or error-free.
                  </p>

                  <p>
                    FormBox may occasionally be unavailable because of
                    maintenance, updates, infrastructure failures, or events
                    outside our reasonable control.
                  </p>
                </LegalSection>

                <LegalSection title="8. Suspension and Termination">
                  <p>
                    You may stop using FormBox at any time.
                  </p>

                  <p>
                    We may suspend or terminate accounts that violate these
                    Terms, create security risks, abuse the service, or engage
                    in unlawful activity.
                  </p>

                  <p>
                    Where appropriate, we will attempt to provide notice before
                    taking action, except where immediate action is necessary
                    to protect the service, users, or others.
                  </p>
                </LegalSection>

                <LegalSection title="9. Intellectual Property">
                  <p>
                    FormBox and its underlying software, design, branding,
                    interfaces, and other materials are owned by or licensed
                    to FormBox and are protected by applicable intellectual
                    property laws.
                  </p>

                  <p>
                    These Terms do not grant you ownership of FormBox's
                    intellectual property.
                  </p>
                </LegalSection>

                <LegalSection title="10. Disclaimer">
                  <p>
                    FormBox is provided on an "as is" and "as available" basis
                    to the extent permitted by applicable law.
                  </p>

                  <p>
                    We do not guarantee that FormBox will meet every specific
                    requirement, operate without interruption, or be completely
                    free from errors.
                  </p>
                </LegalSection>

                <LegalSection title="11. Limitation of Liability">
                  <p>
                    To the maximum extent permitted by applicable law, FormBox
                    will not be liable for indirect, incidental, special,
                    consequential, or punitive damages arising from your use of
                    the service.
                  </p>

                  <p>
                    Nothing in these Terms is intended to exclude liability
                    that cannot legally be excluded or limited.
                  </p>
                </LegalSection>

                <LegalSection title="12. Changes to These Terms">
                  <p>
                    We may update these Terms from time to time as FormBox
                    evolves.
                  </p>

                  <p>
                    When material changes are made, we will update the date at
                    the top of this page and may provide additional notice where
                    appropriate.
                  </p>
                </LegalSection>

                <LegalSection title="13. Governing Law">
                  <p>
                    These Terms will be governed by the laws applicable to
                    FormBox and its operating jurisdiction, except where
                    applicable law requires otherwise.
                  </p>
                </LegalSection>

                <LegalSection title="14. Contact">
                  <p>
                    If you have questions about these Terms, contact us at:
                  </p>

                  <a
                    href="mailto:munachinedu4jesus123@gmail.com"
                    className="inline-flex items-center gap-2 text-purple-light transition hover:text-purple-lighter"
                  >
                    Munachi
                  </a>
                </LegalSection>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-purple-light" />

              <p className="text-xs leading-5 text-gray-600">
                This document is provided as a general terms template. It
                should be reviewed and adapted to FormBox's actual business
                structure, jurisdiction, payment model, and applicable laws
                before production use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>

      <div className="legal-content">
        {children}
      </div>
    </section>
  );
}