"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { animate, motion, useInView } from "framer-motion"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  suffix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(decimals) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, decimals, suffix, inView]);

  return <span ref={nodeRef}>{from.toFixed(decimals)}{suffix}</span>;
}

export function Stats() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const stats = [
    {
      to: 25,
      suffix: "+",
      decimals: 0,
      label: t.stats.companies,
      sublabel: t.stats.companiesSub,
      color: "#10B981",
    },
    {
      to: 99.9,
      suffix: "%",
      decimals: 1,
      label: t.stats.uptime,
      sublabel: t.stats.uptimeSub,
      color: "#8B5CF6",
    },
    {
      to: 24,
      suffix: "/7",
      decimals: 0,
      label: t.stats.support,
      sublabel: t.stats.supportSub,
      color: isMounted && theme === "light" ? "#09090B" : "#ffffff",
    },
  ];

  return (
    <AnimatedSection className="relative py-12 md:py-24 border-t border-b border-[#8B5CF6]/20 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">

      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-[#8B5CF6]/20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="group flex flex-col items-center text-center px-4 pt-8 md:pt-0"
            >
              <span
                className="mb-2 text-5xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105"
                style={{
                  color: stat.color,
                  textShadow: `0 0 30px ${stat.color}40`,
                }}
              >
                <AnimatedCounter
                  to={stat.to}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  duration={2}
                />
              </span>

              <span
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-1"
                style={{ color: stat.color, opacity: 0.7 }}
              >
                {stat.label}
              </span>

              <span className="text-sm text-zinc-500">
                {stat.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}