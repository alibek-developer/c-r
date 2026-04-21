"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { useRef } from "react"

// S harfining asosiy tashqi konturi — logoga mos S shakli
// Bitta uzluksiz path sifatida draw-on animatsiyasi uchun
const S_PATH =
  "M 210 60 L 310 60 Q 360 60 360 110 L 360 155 Q 360 195 320 210 L 200 240 Q 155 255 155 295 L 155 345 Q 155 395 205 395 L 310 395";

// Ichki paralel chiziqlar (3D effekti uchun)
const S_INNER_1 =
  "M 225 75 L 295 75 Q 340 75 342 118 L 342 155 Q 340 182 308 196 L 188 227 Q 170 235 170 268";

const S_INNER_2 =
  "M 188 268 Q 170 295 170 312 L 170 345 Q 170 378 205 380 L 295 380";

// Node positions — logodagi yashil nuqtalar
const NODES = [
  { x: 210, y: 60  },  // top-left
  { x: 310, y: 60  },  // top-right
  { x: 155, y: 210 },  // mid-left
  { x: 310, y: 210 },  // mid-right
  { x: 155, y: 295 },  // lower-left
  { x: 360, y: 155 },  // right-top-corner
  { x: 205, y: 395 },  // bottom-left
  { x: 310, y: 395 },  // bottom-right
  { x: 240, y: 240 },  // center
];

export function About() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const features = [
    { label: t.about.f1_label, desc: t.about.f1_desc },
    { label: t.about.f2_label, desc: t.about.f2_desc },
    { label: t.about.f3_label, desc: t.about.f3_desc },
    { label: t.about.f4_label, desc: t.about.f4_desc },
  ];

  return (
    <AnimatedSection
      id="about"
      className="relative w-full py-28 border-b border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-[#09090b] overflow-hidden px-6 lg:px-8"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-transparent via-[#8B5CF6]/[0.04] to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-20 lg:flex-row">

        {/* ── Left: Logo draws itself ── */}
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="relative flex items-center justify-center w-[340px] h-[440px]">

            {/* Soft glow behind logo */}
            <motion.div
              className="absolute w-[260px] h-[340px] rounded-full bg-[#8B5CF6]/[0.08] blur-[60px]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
            />

            <svg
              ref={svgRef}
              viewBox="120 30 280 390"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow-s">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="node-glow-s">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Inner parallel lines — draw first, subtle */}
              <motion.path
                d={S_INNER_1}
                stroke="#8B5CF6"
                strokeWidth="1"
                strokeLinecap="round"
                opacity={0.25}
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.path
                d={S_INNER_2}
                stroke="#8B5CF6"
                strokeWidth="1"
                strokeLinecap="round"
                opacity={0.25}
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Main S path — draws with glow */}
              <motion.path
                d={S_PATH}
                stroke="#8B5CF6"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow-s)"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Highlight stroke overlay — brighter center */}
              <motion.path
                d={S_PATH}
                stroke="#A78BFA"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.6}
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Nodes — appear after path is drawn */}
              {NODES.map((node, i) => (
                <motion.g
                  key={i}
                  filter="url(#node-glow-s)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: 1.6 + i * 0.08,
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  {/* Pulsing outer ring */}
                  <motion.circle
                    cx={node.x} cy={node.y} r={7}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1"
                    opacity={0.35}
                    animate={inView ? {
                      r: [7, 11, 7],
                      opacity: [0.35, 0.08, 0.35],
                    } : {}}
                    transition={{
                      duration: 2.4 + (i % 3) * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.6 + (i % 4) * 0.3,
                    }}
                  />
                  {/* Solid green dot */}
                  <circle cx={node.x} cy={node.y} r={3.5} fill="#10B981" />
                </motion.g>
              ))}

              {/* Travelling signal dot along S path — after draw completes */}
              {inView && (
                <motion.circle
                  r={4}
                  fill="#10B981"
                  filter="url(#node-glow-s)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                  }}
                  style={{
                    offsetPath: `path("${S_PATH}")`,
                  }}
                  transition={{ duration: 2.5, delay: 2.3, repeat: Infinity, ease: "linear" }}
                >
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin="2.3s"
                    path={S_PATH}
                  />
                </motion.circle>
              )}
            </svg>
          </div>
        </div>

        {/* ── Right: Readable text ── */}
        <motion.div
          className="flex w-full flex-1 flex-col items-start text-left"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#8B5CF6]/60" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8B5CF6]/70">
              {t.about.eyebrow}
            </span>
          </div>

          <h2 className="mb-6 text-[2.2rem] sm:text-[2.6rem] font-bold tracking-[-0.025em] text-zinc-900 dark:text-white leading-[1.15]">
            {t.about.title1}<br />
            <span className="text-[#8B5CF6]">{t.about.title2}</span>
          </h2>

          <p className="mb-12 max-w-[460px] text-[16px] leading-[1.85] text-zinc-600 dark:text-zinc-400 font-light">
            {t.about.desc}
          </p>

          {/* Features */}
          <div className="w-full flex flex-col gap-7">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-4"
              >
                <div className="mt-[6px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <div>
                  <p className="text-[16px] font-semibold text-zinc-900 dark:text-white leading-snug">{f.label}</p>
                  <p className="mt-1 text-[14px] text-zinc-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12"
          >
            <button className="group flex items-center gap-2 text-[14px] font-semibold text-[#8B5CF6] hover:text-white transition-colors duration-150">
              {t.about.cta}
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

      </div>
    </AnimatedSection>
  );
}