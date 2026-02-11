import { useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isEntering, setIsEntering] = useState(false);

  const steps = [
    {
      id: 1,
      label: "Explore projects, architecture, and impact through a terminal interface.",
      preview: `> projects
1. Job Portal Web Application
2. Internal Company Web Applications
3. Kutumb OS
4. Finance Tracker`,
    },
    {
      id: 2,
      label: "Commands reveal depth (projects, arch, recruiter).",
      preview: `> project kutumb-os --deep
Type: Family management platform
Focus: modular UI, role-aware screens, shared views`,
    },
    {
      id: 3,
      label: "Designed for engineers and technical reviewers.",
      preview: `> arch
How I structure Angular apps for maintainability and clear separation of concerns.`,
    },
  ];

  const handleEnterTerminal = () => {
    if (isEntering) return;
    setIsEntering(true);
    setTimeout(() => {
      setLocation("/terminal");
    }, 350);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-32">
        {/* Header / Identity */}
        <header className="mb-16">
          <h1 className="text-xl font-medium tracking-tight mb-1">Dhrumi Vaidya</h1>
          <p className="text-zinc-500 text-sm">
            Frontend Engineer (Angular) · Ahmedabad, India
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
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                className="flex flex-col gap-2 cursor-pointer"
                onClick={() => setActiveStep(isActive ? null : step.id)}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep((current) => (current === step.id ? null : current))}
              >
                <div className="flex gap-4 items-start">
                  <span className="text-zinc-300 font-mono text-xs mt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-600">{step.label}</p>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="ml-10 mt-1 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-xs text-zinc-700 whitespace-pre-line"
                  >
                    {step.preview}
                  </motion.div>
                )}
              </div>
            );
          })}
        </section>

        {/* Intent Signal / Hint */}
        <section className="mb-24">
          <p className="text-zinc-600 text-sm">
            Try this first inside the terminal:
            <span className="font-mono text-xs ml-1 bg-zinc-100 px-2 py-1 rounded">
              overview, projects, recruiter
            </span>
          </p>
        </section>

        {/* CTA */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleEnterTerminal}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors active:scale-95 group"
          >
            {isEntering ? "Initializing…" : "Enter Terminal Mode"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>

      {/* Subtle mode-switch overlay */}
      {isEntering && (
        <div className="fixed inset-0 bg-black/30 pointer-events-none transition-opacity" />
      )}
    </div>
  );
}
