import { Bot, MessageSquareText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const bentoCards = [
  {
    title: "Weighted Pipeline",
    label: "Revenue",
    metric: "$91.4k",
    stat: "Active opportunities",
    className: "md:col-span-2"
  },
  {
    title: "Modular Inventory",
    label: "Stock",
    metric: "1.2m",
    stat: "Tracked units",
    className: "md:col-span-1"
  },
  {
    title: "Order Flow",
    label: "Ops",
    metric: "479",
    stat: "Orders this week",
    className: "md:col-span-1"
  },
  {
    title: "Predictive Client Health",
    label: "AI",
    metric: "92%",
    stat: "Retention forecast",
    className: "md:col-span-2"
  }
];

export function BentoGrid() {
  return (
    <section id="features" className="mt-11">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-[-0.01em] text-zinc-100 sm:text-2xl">Unified Intelligence Stream</h2>
        <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Bento Grid</span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="md:col-span-2 relative group overflow-hidden border-black/5 dark:border-white/5 bg-zinc-950/40 backdrop-blur-2xl transition-all duration-500 hover:border-[#8B5CF6]/40 hover:shadow-[0_0_45px_-20px_rgba(139,92,246,0.5)] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-zinc-900/80 shadow-inner">
              <MessageSquareText className="h-5 w-5 text-[#10B981]" />
            </div>
            <CardTitle className="text-lg tracking-[-0.01em] text-zinc-100 group-hover:text-white transition-colors">Live Conversation Mesh</CardTitle>
            <CardDescription className="tracking-[0.01em] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-300 transition-colors">
              Cross-channel dialogue stream with AI summaries and internal notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-2">
            <div className="rounded-md border border-zinc-800/50 bg-zinc-950/80 p-3 text-xs tracking-[0.01em] text-zinc-700 dark:text-zinc-300 shadow-sm">
              Customer: How soon can we get this delivered by tomorrow?
            </div>
            <div className="rounded-md border border-[#10B981]/30 bg-[#10B981]/10 p-3 text-xs tracking-[0.01em] text-[#7ee9c7] shadow-sm transform transition-transform group-hover:translate-x-1">
              AI Whisper: Suggest offering premium delivery with upsell bundle.
            </div>
            <div className="rounded-md border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 p-3 text-xs tracking-[0.01em] text-[#d6bcfa] shadow-sm transform transition-transform group-hover:translate-x-1 duration-300">
              Agent Reply Draft: We can deliver by 11AM with express dispatch.
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 dark:border-white/5 relative group overflow-hidden bg-zinc-950/40 backdrop-blur-2xl transition-all duration-500 hover:border-[#10B981]/40 hover:shadow-[0_0_45px_-20px_rgba(16,185,129,0.5)] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-zinc-900/80 shadow-inner">
              <Bot className="h-5 w-5 text-[#8B5CF6]" />
            </div>
            <CardTitle className="text-lg tracking-[-0.01em] text-zinc-100 group-hover:text-white transition-colors">Growth Security</CardTitle>
            <CardDescription className="tracking-[0.01em] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-300 transition-colors">
              Operational confidence and protection at scale.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/80 p-5 shadow-sm">
              <p className="text-xs uppercase font-medium tracking-[0.1em] text-zinc-600 dark:text-zinc-400">Client Health</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-[#10B981] group-hover:scale-105 transition-transform origin-left">91</p>
              <div className="mt-4 h-2 rounded-full bg-zinc-800/70 overflow-hidden">
                <div className="h-2 w-[0%] group-hover:w-[91%] rounded-full bg-gradient-to-r from-[#10B981] to-[#8B5CF6] transition-all duration-1000 ease-out" />
              </div>
            </div>
          </CardContent>
        </Card>

        {bentoCards.map((card, idx) => (
          <Card
            key={card.title}
            className={`${card.className} relative group overflow-hidden border-black/5 dark:border-white/5 bg-zinc-950/40 backdrop-blur-2xl transition-all duration-500 hover:border-zinc-500/30 hover:bg-zinc-900/40 opacity-0 animate-fade-in-up`}
            style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-2 relative z-10">
              <div className="mb-3 inline-flex w-fit items-center rounded-full border border-black/10 dark:border-white/10 bg-zinc-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                {card.label}
              </div>
              <CardTitle className="text-base tracking-[-0.01em] text-zinc-100 group-hover:text-white transition-colors">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-4xl font-semibold tracking-[-0.02em] text-zinc-100 group-hover:scale-105 transition-transform origin-left">{card.metric}</p>
              <p className="mt-2 text-xs font-light tracking-[0.02em] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-300 transition-colors">{card.stat}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
