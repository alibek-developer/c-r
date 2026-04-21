"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/LanguageContext"



export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t.testimonials.q1,
      author: "Elena Rostova",
      role: "VP of Sales",
      company: "Velocity",
      initial: "E",
      color: "#10B981",
    },
    {
      quote: t.testimonials.q2,
      author: "Marcus Chen",
      role: "Director of Operations",
      company: "Nexus Partners",
      initial: "M",
      color: "#8B5CF6",
    },
    {
      quote: t.testimonials.q3,
      author: "Sarah Jenkins",
      role: "Founder",
      company: "Apex Capital",
      initial: "S",
      color: "#ffffff",
    },
  ];

  return (
    <AnimatedSection
      id="testimonials"
      className="relative w-full py-28 bg-zinc-50 dark:bg-[#09090b] overflow-hidden px-6 lg:px-8"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8B5CF6]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#8B5CF6]/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B5CF6]/70">
              {t.testimonials.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#8B5CF6]/60" />
          </div>
          <h2 className="text-[2.2rem] sm:text-[2.8rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1.12]">
            {t.testimonials.title1}{" "}
            <span className="text-[#8B5CF6]">{t.testimonials.title2}</span>
          </h2>
          <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            {t.testimonials.desc}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#0A0A0E] border border-black/[0.07] dark:border-white/[0.07] p-8 transition-all duration-300 hover:border-black/[0.12] dark:border-white/[0.12] hover:bg-zinc-50 dark:hover:bg-[#0D0D12]"
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)`,
                }}
              />

              {/* Quote mark */}
              <div
                className="mb-6 text-[3rem] leading-none font-serif select-none"
                style={{ color: t.color, opacity: 0.25 }}
              >
                "
              </div>

              {/* Quote text — bigger, more readable */}
              <p className="flex-1 text-[15px] leading-[1.8] text-zinc-700 dark:text-zinc-300 font-light mb-8">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="mb-6 h-px w-full bg-black/[0.06] dark:bg-white/[0.06]" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold"
                  style={{
                    background: `${t.color}15`,
                    border: `1px solid ${t.color}30`,
                    color: t.color,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-zinc-900 dark:text-white leading-tight">{t.author}</p>
                  <p className="text-[12px] text-zinc-500 mt-0.5">
                    {t.role}
                    <span className="mx-1.5 text-zinc-700">·</span>
                    {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}