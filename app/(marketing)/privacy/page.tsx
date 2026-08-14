import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-purple/10 blur-[130px]"
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple-light">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-light">
                Legal
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Privacy Policy
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
                  At FormBox, we believe collecting information should not
                  mean giving up control of your own information. This Privacy
                  Policy explains what information we collect, how we use it,
                  and the choices available to you when you use FormBox.
                </p>

                <LegalSection title="1. Information We Collect">
                  <p>
                    We may collect information that you provide directly when
                    you create an account, build forms, contact us, or use
                    features of the FormBox platform.
                  </p>

                  <h3>Account information</h3>

                  <p>
                    When you create an account, we may collect information such
                    as your name, email address, and authentication details.
                  </p>

                  <h3>Form and response data</h3>

                  <p>
                    When you create a form, FormBox stores the form information
                    and configuration necessary to provide the service.
                    Responses submitted through your forms may also be stored
                    so that you can access and manage them through your
                    account.
                  </p>

                  <h3>Usage information</h3>

                  <p>
                    We may collect technical and usage information such as
                    browser type, device information, approximate location,
                    pages visited, and interactions with the service.
                  </p>
                </LegalSection>

                <LegalSection title="2. How We Use Information">
                  <p>
                    We use collected information to provide, maintain, and
                    improve FormBox and its features.
                  </p>

                  <ul>
                    <li>Creating and managing your FormBox account.</li>
                    <li>Creating, publishing, and managing forms.</li>
                    <li>Storing and displaying form responses.</li>
                    <li>Providing customer support.</li>
                    <li>Monitoring and improving service performance.</li>
                    <li>Detecting abuse, fraud, and security threats.</li>
                    <li>Communicating important service updates.</li>
                  </ul>
                </LegalSection>

                <LegalSection title="3. How We Share Information">
                  <p>
                    We do not sell your personal information.
                  </p>

                  <p>
                    We may share information with service providers that help
                    us operate FormBox, such as hosting, database, analytics,
                    authentication, email, and payment providers.
                  </p>

                  <p>
                    These providers only receive information necessary to
                    perform their services and are expected to handle that
                    information appropriately.
                  </p>

                  <p>
                    We may also disclose information where required by law,
                    legal process, or to protect the rights, safety, and
                    security of FormBox, our users, or others.
                  </p>
                </LegalSection>

                <LegalSection title="4. Your Forms and Responses">
                  <p>
                    You retain responsibility for the information you collect
                    through your forms. You should only collect information
                    that you have a legitimate reason to collect and should
                    provide appropriate notices to people submitting responses.
                  </p>

                  <p>
                    FormBox does not determine the purposes for which you
                    collect information through your forms. You are responsible
                    for ensuring that your forms comply with applicable laws
                    and regulations.
                  </p>
                </LegalSection>

                <LegalSection title="5. Cookies and Similar Technologies">
                  <p>
                    FormBox may use cookies and similar technologies to keep
                    users authenticated, remember preferences, maintain
                    security, and understand how the service is used.
                  </p>

                  <p>
                    You can control cookies through your browser settings.
                    Disabling certain cookies may affect the functionality of
                    the service.
                  </p>
                </LegalSection>

                <LegalSection title="6. Data Security">
                  <p>
                    We use reasonable technical and organizational measures
                    designed to protect information stored by FormBox against
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <p>
                    However, no internet service can guarantee absolute
                    security. You should use strong passwords and protect your
                    account credentials.
                  </p>
                </LegalSection>

                <LegalSection title="7. Data Retention">
                  <p>
                    We retain information for as long as necessary to provide
                    the service, comply with legal obligations, resolve
                    disputes, enforce agreements, and maintain legitimate
                    business records.
                  </p>

                  <p>
                    Retention periods may vary depending on the type of
                    information and how it is used.
                  </p>
                </LegalSection>

                <LegalSection title="8. Your Rights">
                  <p>
                    Depending on where you live, you may have rights regarding
                    your personal information, including the right to access,
                    correct, delete, or request a copy of certain information.
                  </p>

                  <p>
                    To make a privacy-related request, contact us using the
                    contact information provided below.
                  </p>
                </LegalSection>

                <LegalSection title="9. Children's Privacy">
                  <p>
                    FormBox is not intended for children who are not legally
                    permitted to use online services in their jurisdiction.
                    We do not knowingly collect personal information from
                    children in violation of applicable law.
                  </p>
                </LegalSection>

                <LegalSection title="10. Changes to This Policy">
                  <p>
                    We may update this Privacy Policy from time to time. When
                    we make changes, we will update the date at the top of this
                    page.
                  </p>

                  <p>
                    Your continued use of FormBox after changes become
                    effective means that you acknowledge the updated policy.
                  </p>
                </LegalSection>

                <LegalSection title="11. Contact Us">
                  <p>
                    If you have questions about this Privacy Policy or how
                    FormBox handles information, contact us at:
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

            {/* Bottom notice */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-green" />

              <p className="text-xs leading-5 text-gray-600">
                This document is provided as a general product privacy policy
                template. It should be reviewed and adapted to FormBox's
                actual data practices and applicable laws before production
                use.
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