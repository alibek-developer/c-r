import { About } from "@/components/landing/About";
import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100 font-sans">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
