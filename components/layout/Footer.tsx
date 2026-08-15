import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/ui/logo'
import {
  ArrowUpRight,
} from "lucide-react"


const productLinks = [
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
];

const companyLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const legalLinks = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/munachi-me/formbox.git",
    icon: "/github.png",
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: "/x.png",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: "/linkedin.png",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090C]">
      <div className="container-custom">
        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex">
              <Logo />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-600">
              A simple way to build beautiful forms, share them anywhere, and
              collect responses without the clutter.
            </p>

            <Link
              href="/register"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-purple-light transition hover:text-purple-lighter"
            >
              Start building
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-content w-content overflow-hidden items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] text-gray-600 transition hover:border-purple/30 hover:bg-purple/10 hover:text-purple-light"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={25}
                    height={25}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} FormBox. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            <span>Built with simplicity in mind.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}




const links = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function UserFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-custom">
        <div className="flex min-h-16 flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} FormBox
          </p>

          {/* Links */}
          <nav className="flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-gray-600 transition-colors hover:text-gray-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}