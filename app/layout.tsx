import type { Metadata } from "next";
import "./globals.css";

import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: {
    default: "FormBox — Build forms. Collect responses.",
    template: "%s — FormBox",
  },

  description:
    "Create beautiful forms, share them anywhere, and collect responses with FormBox.",

  icons: {
    icon: "/formbox.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}