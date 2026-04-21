"use client";

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

// Circuit node positions — mimics the logo's S-shaped node layout
const NODES = [
  { x: 320, y: 120 }, { x: 520, y: 120 }, { x: 720, y: 120 },
  { x: 280, y: 280 }, { x: 520, y: 280 }, { x: 760, y: 280 },
  { x: 240, y: 440 }, { x: 480, y: 440 }, { x: 720, y: 440 },
  { x: 200, y: 600 }, { x: 440, y: 600 }, { x: 680, y: 600 }, { x: 920, y: 600 },
  // Wider spread nodes
  { x: 100, y: 200 }, { x: 980, y: 180 }, { x: 1100, y: 380 },
  { x: 80, y: 500 },  { x: 1050, y: 520 }, { x: 160, y: 680 },
  { x: 1200, y: 640 }, { x: 600, y: 700 }, { x: 360, y: 760 },
  { x: 840, y: 760 }, { x: 1300, y: 300 }, { x: 60, y: 360 },
];

// Edges between nodes — circuit-like connections
const EDGES = [
  [0,1],[1,2],[0,3],[2,5],[3,4],[4,5],
  [3,6],[5,8],[6,7],[7,8],
  [6,9],[8,11],[9,10],[10,11],[11,12],
  [0,13],[2,14],[14,15],[5,15],
  [13,16],[16,9],[15,17],[17,12],
  [9,18],[18,21],[12,19],[11,20],[20,22],
  [1,4],[4,7],[7,10],[10,20],
  [13,24],[16,24],[14,23],[23,15],
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-[#09090B] pt-20">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Top violet glow */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[#8B5CF6]/[0.10] blur-[130px]" />
        {/* Bottom subtle glow */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#6D28D9]/[0.07] blur-[120px]" />

        {/* ── Circuit Network SVG ── */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewBox="0 0 1440 800"
          className="absolute inset-0 w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Edge gradient */}
            <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.0" />
              <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
            </linearGradient>

            {/* Animated pulse gradient for highlight edges */}
            <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>

            {/* Node glow filter */}
            <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Static edges */}
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="url(#edge-grad)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          ))}

          {/* Animated pulse lines — data flowing through circuit */}
          {[
            [0,1,2], [3,4,5], [6,7,8], [9,10,11,12],
            [0,3,6,9], [2,5,8,11],
          ].map((path, pi) => {
            const points = path.map(i => `${NODES[i].x},${NODES[i].y}`).join(" ");
            return (
              <motion.polyline
                key={`pulse-${pi}`}
                points={points}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 40"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: -200 }}
                transition={{
                  duration: 3 + pi * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: pi * 0.6,
                }}
                opacity={0.4}
              />
            );
          })}

          {/* Nodes — violet rings with green center dot (logo style) */}
          {NODES.map((node, i) => (
            <motion.g
              key={i}
              filter="url(#node-glow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i + 0.3, duration: 0.4, ease: "easeOut" }}
            >
              {/* Outer ring */}
              <motion.circle
                cx={node.x} cy={node.y} r="5"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1"
                opacity={0.5}
                animate={{ r: [5, 7, 5], opacity: [0.5, 0.2, 0.5] }}
                transition={{
                  duration: 2.5 + (i % 4) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 5) * 0.4,
                }}
              />
              {/* Inner green dot */}
              <circle
                cx={node.x} cy={node.y} r="2.5"
                fill="#10B981"
                opacity={0.85}
              />
            </motion.g>
          ))}

          {/* Bright travelling dot along main S-path */}
          {[[0,3,6,9], [2,5,8,11,12]].map((path, pi) => {
            const pts = path.map(i => ({ x: NODES[i].x, y: NODES[i].y }));
            return (
              <motion.circle
                key={`traveller-${pi}`}
                r="3"
                fill="#10B981"
                filter="url(#node-glow)"
                animate={{
                  cx: pts.map(p => p.x),
                  cy: pts.map(p => p.y),
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 4 + pi,
                  repeat: Infinity,
                  ease: "linear",
                  delay: pi * 2,
                  times: [0, 0.1, 0.5, 0.9, 1],
                }}
              />
            );
          })}
        </motion.svg>

        {/* Dark radial mask — keeps center readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_42%,rgba(250,250,250,0.82)_0%,rgba(250,250,250,0.3)_60%,rgba(250,250,250,0)_100%)] dark:bg-[radial-gradient(ellipse_65%_60%_at_50%_42%,rgba(9,9,11,0.82)_0%,rgba(9,9,11,0.3)_60%,rgba(9,9,11,0)_100%)]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-zinc-50 dark:from-[#09090B] to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex w-full max-w-[960px] flex-col items-center px-6 text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] px-4 py-1.5"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400 tracking-wide">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          className="text-[2.6rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-white sm:text-[3.8rem] md:text-[5rem] leading-[1.08] max-w-[840px]"
        >
          {t.hero.titlePrefix}{" "}
          <span className="text-[#8B5CF6]">—</span>{" "}
          <span className="hidden sm:inline">{t.hero.titleHighlight.split(' ')[0]}</span> <br className="hidden sm:block" />
          {t.hero.titleHighlight.split(' ').slice(1).join(' ')}
          <span className="sm:hidden">{t.hero.titleHighlight}</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-[580px] text-[15px] sm:text-[17px] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed tracking-[-0.01em]"
        >
          {t.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.36, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row w-full sm:w-auto"
        >
          <button className="relative flex h-[48px] w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl bg-[#8B5CF6] px-8 text-[14.5px] font-semibold text-zinc-900 dark:text-white transition-all duration-150 hover:bg-[#7C3AED] hover:shadow-[0_8px_28px_rgba(139,92,246,0.28)] active:scale-[0.98]">
            <span className="absolute inset-x-0 top-0 h-px bg-white/20" />
            {t.hero.requestDemo}
          </button>

          <button className="group flex h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-black/[0.12] dark:border-white/[0.12] bg-black/[0.03] dark:bg-white/[0.03] px-8 text-[14.5px] font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-150 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:text-zinc-900 dark:hover:text-white active:scale-[0.98]">
            {t.hero.viewEcosystem}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.54, ease: "easeOut" }}
          className="mt-16 flex items-center justify-center gap-8 sm:gap-14"
        >
          {[
            { value: "3x", label: t.hero.stats.fasterSales },
            { value: "98%", label: t.hero.stats.satisfaction },
            { value: "500+", label: t.hero.stats.activeCompanies },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-[1.6rem] font-bold tracking-tight text-zinc-900 dark:text-white">{stat.value}</span>
              <span className="text-[12px] text-zinc-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}