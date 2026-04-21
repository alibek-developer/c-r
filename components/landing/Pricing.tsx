"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { MouseEvent, useRef } from "react"



// Cursor tracking tilt card
function PricingCard({ tier, index, recommendedText }: { tier: any; index: number; recommendedText: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-8, 8]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-1, 1], [20, 80]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-1, 1], [20, 80]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className={tier.featured ? "lg:-mt-5 lg:mb-5 z-20 relative" : "relative z-10"}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl overflow-hidden cursor-default"
      >
        {/* Card background — dark glass */}
        <div
          className={`absolute inset-0 rounded-2xl ${
            tier.featured
              ? "bg-[#0D0D12] border border-[#8B5CF6]/30"
              : "bg-white dark:bg-[#0A0A0E] border border-black/[0.07] dark:border-white/[0.07]"
          }`}
        />

        {/* Cursor-following glow inside card */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(280px circle at ${x}% ${y}%, ${tier.color}18, transparent 70%)`
            ),
          }}
        />

        {/* Top edge highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${tier.color}50, transparent)`,
          }}
        />

        {/* Featured badge */}
        {tier.featured && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8B5CF6]/40 bg-[#0D0D12] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A78BFA]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
              {recommendedText}
            </span>
          </div>
        )}

        {/* Card content */}
        <div className="relative z-10 flex flex-col h-full p-8 pt-10">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-3">
              {tier.name}
            </p>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-[2.8rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-none">
                {tier.price}
              </span>
              {tier.period && (
                <span className="text-[14px] text-zinc-500 mb-1">{tier.period}</span>
              )}
            </div>
            <p className="text-[14px] text-zinc-500 leading-relaxed">
              {tier.description}
            </p>
          </div>

          {/* Divider */}
          <div
            className="mb-8 h-px w-full"
            style={{ background: `linear-gradient(90deg, ${tier.color}30, transparent)` }}
          />

          {/* Features */}
          <ul className="flex flex-col gap-4 flex-1 mb-10">
            {tier.points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: tier.color, opacity: 0.8 }}
                />
                <span className="text-[14px] text-zinc-700 dark:text-zinc-300">{point}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className={`w-full h-12 rounded-xl text-[14px] font-semibold transition-all duration-150 active:scale-[0.98] ${
              tier.featured
                ? "bg-[#8B5CF6] text-zinc-900 dark:text-white hover:bg-[#7C3AED] shadow-lg shadow-violet-500/20"
                : "bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] text-zinc-700 dark:text-zinc-300 hover:bg-white/[0.09] hover:text-white"
            }`}
          >
            {tier.cta}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Pricing() {
  const { t } = useLanguage();

  const tiers = [
    {
      name: "Starter",
      price: "$499",
      period: "/oy", // you can define this in dict too, but it's okay hardcoded for now, or use t
      description: t.pricing.starterDesc,
      cta: t.pricing.starterCta,
      featured: false,
      color: "#10B981",
      points: [t.pricing.starterP1, t.pricing.starterP2, t.pricing.starterP3],
    },
    {
      name: "Pro",
      price: "$1,299",
      period: "/oy",
      description: t.pricing.proDesc,
      cta: t.pricing.proCta,
      featured: true,
      color: "#8B5CF6",
      points: [t.pricing.proP1, t.pricing.proP2, t.pricing.proP3],
    },
    {
      name: "Enterprise",
      price: t.pricing.entPrice,
      period: "",
      description: t.pricing.entDesc,
      cta: t.pricing.entCta,
      featured: false,
      color: "#ffffff",
      points: [t.pricing.entP1, t.pricing.entP2, t.pricing.entP3],
    },
  ];

  return (
    <AnimatedSection
      id="pricing"
      className="relative w-full py-28 bg-zinc-50 dark:bg-[#09090b] overflow-hidden px-6 lg:px-8"
    >
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B5CF6]/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-[#10B981]/[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mb-16 max-w-xl text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#8B5CF6]/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B5CF6]/70">
            {t.pricing.eyebrow}
          </span>
          <span className="h-px w-8 bg-[#8B5CF6]/60" />
        </div>
        <h2 className="text-[2.2rem] sm:text-[2.8rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1.12]">
          {t.pricing.title1}{" "}
          <span className="text-[#8B5CF6]">{t.pricing.title2}</span>
        </h2>
        <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.pricing.desc}
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="mx-auto max-w-5xl grid items-stretch gap-5 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} index={i} recommendedText={t.pricing.recom} />
        ))}
      </div>
    </AnimatedSection>
  );
}