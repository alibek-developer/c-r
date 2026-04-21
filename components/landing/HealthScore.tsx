import { Card, CardContent } from "@/components/ui/card";

export function HealthScore() {
  return (
    <section className="mt-14">
      <Card className="border-black/5 dark:border-white/5 bg-zinc-950/40 backdrop-blur-2xl">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-xl font-semibold tracking-[-0.01em] text-zinc-100">Predictive Client Health</h4>
            <p className="mt-1 text-sm tracking-[0.01em] text-zinc-600 dark:text-zinc-400">
              Sova AI tracks retention signals and surfaces priority accounts before churn risk rises.
            </p>
          </div>
          <div className="rounded-full border border-[#10B981]/35 bg-[#10B981]/10 px-6 py-4 text-center backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Health Score</p>
            <p className="text-3xl font-semibold tracking-[-0.02em] text-[#10B981] [text-shadow:0_0_18px_rgba(16,185,129,0.55)]">
              91
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
