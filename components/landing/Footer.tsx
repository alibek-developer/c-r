"use client"
"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { useLanguage } from "@/lib/i18n/LanguageContext"

// Navigation links moved inside the component

const socialLinks = [
  { label: "TG", href: "https://t.me/sovacrm" },
  { label: "IG", href: "https://instagram.com/sovacrm" },
  { label: "WA", href: "https://wa.me/998901234567" },
];

export function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: "Bosh sahifa", href: "#about" },
    { label: t.footer.pages, href: "#about" },
    { label: t.pricing.eyebrow, href: "#pricing" },
    { label: "FAQ",         href: "#faq" },
    { label: t.footer.contact, href: "#contacts" },
  ];

  return (
    <AnimatedSection className="border-t border-white/[0.06] bg-zinc-50 dark:bg-[#09090B] pt-14 pb-8">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">

        {/* Top section */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between mb-14">

          {/* Brand */}
          <div className="max-w-[260px]">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#8B5CF6]">
                <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-white/15 to-transparent" />
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <path d="M4 14C4 11.5 5.5 9.5 8 8.5L10 7C12 6 13.5 4.5 13.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M16 6C16 8.5 14.5 10.5 12 11.5L10 13C8 14 6.5 15.5 6.5 17.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.3px] text-zinc-900 dark:text-white">Sova CRM</span>
            </div>

            <p className="text-[13.5px] text-zinc-500 font-light leading-[1.75]">
              {t.footer.desc}
            </p>

            {/* Socials */}
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] text-[11px] font-semibold text-zinc-500 hover:border-white/[0.15] hover:text-white transition-all duration-150"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav + Contacts — two columns */}
          <div className="flex gap-16 sm:gap-20">

            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]/80 mb-1">
                {t.footer.pages}
              </p>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13.5px] text-zinc-500 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]/80 mb-1">
                {t.footer.contact}
              </p>
              <a
                href="mailto:support@sovacrm.com"
                className="text-[13.5px] text-zinc-500 hover:text-white transition-colors duration-150"
              >
                support@sovacrm.com
              </a>
              <a
                href="tel:+998901234567"
                className="text-[13.5px] text-zinc-500 hover:text-white transition-colors duration-150"
              >
                +998 90 123 45 67
              </a>
              <span className="text-[13.5px] text-zinc-600 dark:text-zinc-400">
                {t.footer.address}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/[0.05] mb-7" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[12px] text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Sova CRM. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-zinc-600 hover:text-zinc-600 dark:text-zinc-400 transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-[12px] text-zinc-600 hover:text-zinc-600 dark:text-zinc-400 transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}