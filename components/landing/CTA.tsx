"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export function CTA() {
  const { t } = useLanguage();

  return (
    <AnimatedSection className="relative w-full py-32 flex justify-center px-6 lg:px-8 overflow-hidden bg-zinc-50 dark:bg-[#09090b]">

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12)_0%,rgba(250,250,250,1) dark:rgba(9,9,11,0)_65%)] pointer-events-none" />

      {/* Circuit node accents — top corners */}
      <div className="absolute top-10 left-12 flex items-center gap-2 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        <div className="w-10 h-px bg-[#8B5CF6]/60" />
      </div>
      <div className="absolute top-10 right-12 flex items-center gap-2 opacity-20">
        <div className="w-10 h-px bg-[#8B5CF6]/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
      >

        {/* Heading */}
        <h2 className="mb-5 text-[2.4rem] sm:text-[3.2rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1.1]">
          {t.cta.title1}{" "}
          <span className="text-[#8B5CF6]">{t.cta.title2}</span>
        </h2>

        {/* Body */}
        <p className="mb-10 max-w-[500px] text-[16px] font-light text-zinc-600 dark:text-zinc-400 leading-[1.8]">
          {t.cta.desc}
        </p>

        {/* Buttons — rectangular */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

          {/* Primary */}
          <button className="group relative flex h-[50px] w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#8B5CF6] px-9 text-[15px] font-semibold text-zinc-900 dark:text-white shadow-lg shadow-violet-500/20 transition-all duration-150 hover:bg-[#7C3AED] hover:shadow-violet-500/30 active:scale-[0.98]">
            <span className="absolute inset-x-0 top-0 h-px bg-white/15" />
            {t.cta.btnPrimary}
            <motion.span
              className="inline-flex"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight />
            </motion.span>
          </button>

          {/* Secondary */}
          <button className="flex h-[50px] w-full sm:w-auto items-center justify-center rounded-xl border border-black/[0.12] dark:border-white/[0.12] bg-black/[0.03] dark:bg-white/[0.03] px-9 text-[15px] font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-150 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:text-zinc-900 dark:hover:text-white active:scale-[0.98]">
            {t.cta.btnSecondary}
          </button>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-[12px] text-zinc-600 tracking-wide"
        >
          {t.cta.trust}
          <span className="mx-2 text-zinc-700">·</span>
          {t.cta.free}
          <span className="mx-2 text-zinc-700">·</span>
          {t.cta.nocontract}
        </motion.p>

      </motion.div>
    </AnimatedSection>
  );
}