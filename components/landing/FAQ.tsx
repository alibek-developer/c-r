"use client";

import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { useState } from "react"

const faqs = [
  {
    question: "Sova CRM dan qanday boshlash mumkin?",
    answer: "Biz bilan bog'laning — mutaxassislarimiz biznesingizga mos xizmatlarni tanlab berishadi. Integratsiya bir necha soat ichida amalga oshiriladi.",
  },
  {
    question: "Faqat bitta modul ulash mumkinmi?",
    answer: "Ha, arxitekturamiz modulli tuzilgan. Hozir kerak bo'lgan xizmatlarni ulaysiz, keyinchalik kengaytirish osон.",
  },
  {
    question: "Texnik yordam mavjudmi?",
    answer: "Pro va Enterprise tariflarida 24/7 texnik qo'llab-quvvatlash mavjud. O'tish jarayonida ham mutaxassislarimiz yoningizda bo'ladi.",
  },
  {
    question: "Ma'lumotlarim xavfsizmi?",
    answer: "Barcha ma'lumotlar shifrlangan holda saqlanadi. Enterprise tarifda dedicated server va xavfsizlik auditi ham kiritilgan.",
  },
  {
    question: "Mavjud tizimlar bilan integratsiya qilish mumkinmi?",
    answer: "Ha, Sova CRM ko'plab mashhur xizmatlar bilan integratsiya qiladi: 1C, Telegram, WhatsApp, va boshqalar.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: { question: string, answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className={`border-b transition-colors duration-200 ${
        isOpen ? "border-[#8B5CF6]/20" : "border-white/[0.07]"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left group"
      >
        <span
          className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
            isOpen ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 group-hover:text-white"
          }`}
        >
          {faq.question}
        </span>

        {/* Chevron — rotates smoothly */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0"
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-colors duration-200 ${isOpen ? "text-[#8B5CF6]" : "text-zinc-600"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      {/* Answer — smooth height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-[15px] font-light leading-[1.8] text-zinc-600 dark:text-zinc-400">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

  return (
    <AnimatedSection
      id="faq"
      className="relative w-full py-28 border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-[#09090b] overflow-hidden px-6 lg:px-8"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8B5CF6]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-[2.2rem] sm:text-[2.8rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1.12]">
            {t.faq.title1}{" "}
            <span className="text-[#8B5CF6]">{t.faq.title2}</span>
          </h2>
          <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.faq.desc}
          </p>
        </motion.div>

        {/* Accordion container — matches reference screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-[#0A0A0E] px-8 py-2"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}