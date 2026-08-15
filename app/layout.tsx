import type { Metadata } from "next";
import {
  Poppins,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/providers/auth-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FormBox — Build forms. Collect responses.",
    template: "%s — FormBox",
  },

  description:
    "Create beautiful forms, share them anywhere, and collect responses with FormBox.",

  icons: {
    icon: "/formbox.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}