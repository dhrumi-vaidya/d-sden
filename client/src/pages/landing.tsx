import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-32">
        {/* Header / Identity */}
        <header className="mb-16">
          <h1 className="text-xl font-medium tracking-tight mb-1">Name</h1>
          <p className="text-zinc-500 text-sm">
            Frontend Infrastructure / UI Platform / Systems-leaning Frontend
          </p>
        </header>

        {/* What This Is */}
        <section className="mb-12">
          <p className="text-zinc-800 leading-relaxed">
            This is my developer portfolio. It’s built as an interactive system 
            rather than a static website.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-12 space-y-4">
          <div className="flex gap-4">
            <span className="text-zinc-300 font-mono text-xs mt-1">01</span>
            <p className="text-sm text-zinc-600">
              Explore projects, architecture, and impact through a terminal interface.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-300 font-mono text-xs mt-1">02</span>
            <p className="text-sm text-zinc-600">
              Commands reveal depth (projects, arch, perf).
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-300 font-mono text-xs mt-1">03</span>
            <p className="text-sm text-zinc-600">
              Designed for engineers and technical reviewers.
            </p>
          </div>
        </section>

        {/* Intent Signal */}
        <section className="mb-24">
          <p className="text-zinc-500 text-sm italic italic-none">
            “The terminal reflects how I think about frontend systems: structure, 
            constraints, and trade-offs.”
          </p>
        </section>

        {/* CTA */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setLocation("/terminal")}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors active:scale-95 group"
          >
            Enter Terminal Mode
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>
    </div>
  );
}
