import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sova CRM",
  description: "Multi-tenant B2B SaaS CRM for modern operators"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-[#09090B] dark:text-zinc-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
