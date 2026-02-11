import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Layers, Zap } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const handleEnterTerminal = () => {
    setLocation("/terminal");
  };

  const handleRecruiterView = () => {
    setLocation("/terminal");
    // Recruiter mode is clearly suggested once inside the terminal.
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      <main className="max-w-3xl mx-auto px-6 pt-20 pb-32 space-y-16">
        {/* Header / Identity */}
        <header className="space-y-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dhrumi Vaidya</h1>
            <p className="text-zinc-600 text-sm">
              Frontend Engineer (Angular) · Ahmedabad, India
            </p>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-zinc-900 text-base font-medium">
              Building production UI systems, not demo apps.
            </p>
            <p className="text-zinc-600 text-sm">
              This portfolio is an interactive system. Explore projects, architecture, and impact
              through a terminal interface.
            </p>
          </div>
        </header>

        {/* Visual terminal preview */}
        <section className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-8 items-start">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Terminal preview</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide">
                Read-only
              </span>
            </div>
            <div className="rounded-md bg-zinc-900 text-zinc-50 font-mono text-xs p-3 space-y-2 shadow-sm">
              <div>
                <span className="text-emerald-400">➜</span>{" "}
                <span className="text-sky-400">~</span>{" "}
                <span className="text-zinc-300">overview</span>
              </div>
              <div className="text-zinc-400">
                Frontend Portfolio — Overview
                <br />
                Name: Dhrumi Vaidya
                <br />
                Role: Frontend Engineer (Angular)
              </div>
              <div className="pt-1">
                <span className="text-zinc-500">Quick access:</span>{" "}
                <span className="text-emerald-400">projects</span>{" "}
                <span className="text-emerald-400">skills</span>{" "}
                <span className="text-emerald-400">recruiter</span>
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <div>
                  <span className="text-emerald-400">➜</span>{" "}
                  <span className="text-sky-400">~</span>{" "}
                  <span className="text-zinc-300">recruiter</span>
                </div>
                <div className="text-zinc-400">
                  Compact, LinkedIn-style recruiter view rendered inside the terminal.
                </div>
              </div>
            </div>
          </div>

          {/* Why this portfolio */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900">
              Why this portfolio?
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-zinc-900/5 p-2 text-zinc-900">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-900">
                    System-first frontend thinking
                  </div>
                  <p className="text-xs text-zinc-600">
                    Built around structure, constraints, and how UI systems behave in production.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-zinc-900/5 p-2 text-zinc-900">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-900">
                    Real production experience
                  </div>
                  <p className="text-xs text-zinc-600">
                    Work from Theta Technolabs and system-level personal projects like Kutumb OS.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-zinc-900/5 p-2 text-zinc-900">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-900">
                    Recruiter-friendly navigation
                  </div>
                  <p className="text-xs text-zinc-600">
                    Dedicated recruiter mode for a 60-second view of identity, work, skills, and contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
          <button
            onClick={handleEnterTerminal}
            className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-full shadow-sm hover:bg-zinc-800 transition-colors active:scale-95 group"
          >
            Enter Terminal Mode
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleRecruiterView}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-xs font-medium rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-50 active:scale-95"
          >
            Recruiter View
          </button>
        </div>
      </main>
    </div>
  );
}
