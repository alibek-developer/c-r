"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// SF Symbols-inspired SVG icons (Apple style — thin stroke, geometric)
const Icons = {
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.64" y2="6.64" />
      <line x1="17.36" y1="17.36" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.64" y2="17.36" />
      <line x1="17.36" y1="6.64" x2="19.07" y2="4.93" />
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  ),
  Menu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" strokeLinecap="round">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" stroke="currentColor" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

const navLinks = [
  { label: { UZ: "Haqida", RU: "О нас", EN: "About" }, id: "about" },
  { label: { UZ: "Narxlar", RU: "Цены", EN: "Pricing" }, id: "pricing" },
  { label: { UZ: "Aloqa", RU: "Контакт", EN: "Contact" }, id: "contacts" },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-0" : "py-2"}`}>

        {/* ── Main bar — floats when not scrolled, full-width when scrolled ── */}
        <div
          className={`mx-auto transition-all duration-300 ${
            isScrolled
              ? "max-w-full rounded-none border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-2xl shadow-sm"
              : "max-w-5xl mx-4 lg:mx-auto rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white/75 dark:bg-[#09090B]/75 backdrop-blur-2xl shadow-xl shadow-black/[0.05]"
          }`}
        >
          <div className="flex h-[56px] items-center justify-between px-5 lg:px-6">

            {/* Logo */}
            <button
              onClick={(e) => scrollToSection(e, "about")}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#8B5CF6] shadow-md shadow-violet-500/30 transition-all duration-200 group-hover:scale-[1.06] group-hover:shadow-violet-500/45">
                {/* Top gloss */}
                <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                {/* Custom "S" curve mark */}
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <path d="M4 14C4 11.5 5.5 9.5 8 8.5L10 7C12 6 13.5 4.5 13.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M16 6C16 8.5 14.5 10.5 12 11.5L10 13C8 14 6.5 15.5 6.5 17.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.3px] text-zinc-900 dark:text-white">
                Sova CRM
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="px-3.5 py-1.5 text-[13.5px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-150"
                >
                  {link.label[language as keyof typeof link.label]}
                </a>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-2">

              {/* Language — segmented pill */}
              <div className="flex items-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 p-[3px] gap-0.5">
                {(["UZ", "RU", "EN"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-[5px] rounded-[9px] text-[12px] font-semibold transition-all duration-150 ${
                      language === lang
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm shadow-black/10"
                        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 transition-all duration-150"
                >
                  {isDark ? <Icons.Sun /> : <Icons.Moon />}
                </button>
              )}

              {/* CTA */}
              <button className="flex items-center gap-1 rounded-xl bg-[#8B5CF6] px-4 py-[7px] text-[13px] font-semibold text-white shadow-md shadow-violet-500/25 hover:bg-[#7C3AED] hover:shadow-violet-500/35 active:scale-[0.97] transition-all duration-150">
                Boshlash
                <Icons.ChevronRight />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-all md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ rotate: isMobileMenuOpen ? -45 : 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: isMobileMenuOpen ? 45 : -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex" }}
                >
                  {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mx-4 mt-2 overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-2xl shadow-xl shadow-black/[0.08] md:hidden"
            >
              <div className="p-3">
                {/* Nav links */}
                <nav className="flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors"
                    >
                      {link.label[language as keyof typeof link.label]}
                      <span className="text-zinc-300 dark:text-zinc-600">
                        <Icons.ChevronRight />
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="my-3 h-px bg-zinc-100 dark:bg-zinc-800/60" />

                {/* Bottom row */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900 p-[3px] gap-0.5">
                    {(["UZ", "RU", "EN"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }}
                        className={`px-3 py-1.5 rounded-[9px] text-[12px] font-semibold transition-all duration-150 ${
                          language === lang
                            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                            : "text-zinc-400 dark:text-zinc-500"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  {mounted && (
                    <button
                      onClick={() => { setTheme(isDark ? "light" : "dark"); setIsMobileMenuOpen(false); }}
                      className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
                    >
                      {isDark ? <Icons.Sun /> : <Icons.Moon />}
                    </button>
                  )}
                </div>

                {/* Mobile CTA */}
                <button className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#8B5CF6] py-2.5 text-[14px] font-semibold text-white shadow-md shadow-violet-500/20 hover:bg-[#7C3AED] active:scale-[0.98] transition-all">
                  Boshlash
                  <Icons.ChevronRight />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Height spacer so content doesn't hide under header */}
      <div className="h-[72px]" />
    </>
  );
}