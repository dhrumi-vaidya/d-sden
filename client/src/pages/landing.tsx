import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("fsi-theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("fsi-theme", theme);
  }, [theme]);
  const handleEnterTerminal = () => {
    setLocation("/terminal");
  };

  const handleRecruiterView = () => {
    setLocation("/terminal?mode=recruiter");
  };

  return (
    <div
      className={cn(
        "min-h-screen font-sans selection:bg-zinc-200 transition-colors",
        theme === "dark"
          ? "bg-zinc-950 text-zinc-50"
          : "bg-white text-zinc-900"
      )}
    >
      <main className="max-w-3xl mx-auto px-6 pt-20 pb-32 space-y-16">
        {/* Header / Identity */}
        <header className="space-y-2 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dhrumi Vaidya</h1>
            <p className={cn("text-sm", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
              Frontend Engineer (Angular) · Ahmedabad, India
            </p>
          </div>
          <button
            type="button"
            className={cn(
              "ml-4 px-3 py-1 rounded-full border text-xs",
              theme === "dark"
                ? "border-zinc-700 text-zinc-300 hover:border-zinc-400"
                : "border-zinc-300 text-zinc-600 hover:border-zinc-500"
            )}
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </button>
        </header>

        <section className="space-y-1">
            <p
              className={cn(
                "text-base font-medium",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900"
              )}
            >
              Building production UI systems, not demo apps.
            </p>
            <p className={cn("text-sm", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
              This portfolio is an interactive system. Explore projects, architecture, and impact
              through a terminal interface.
            </p>
        </section>

        {/* Visual terminal preview */}
        <section className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-8 items-start">
          <div
            className={cn(
              "rounded-xl border p-4",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900/40"
                : "border-zinc-200 bg-zinc-50"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={cn(
                  "flex items-center gap-2 text-xs font-mono",
                  theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                )}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Terminal preview</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide">
                Read-only
              </span>
            </div>
            <div className="rounded-md bg-zinc-900 text-zinc-50 font-mono text-xs p-3 space-y-2">
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
            <h2
              className={cn(
                "text-sm font-semibold",
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              )}
            >
              Why this portfolio?
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 rounded-full p-2",
                    theme === "dark" ? "bg-zinc-800 text-zinc-100" : "bg-zinc-900/5 text-zinc-900"
                  )}
                >
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                    )}
                  >
                    System-first frontend thinking
                  </div>
                  <p className={cn("text-xs", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
                    Built around structure, constraints, and how UI systems behave in production.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 rounded-full p-2",
                    theme === "dark" ? "bg-zinc-800 text-zinc-100" : "bg-zinc-900/5 text-zinc-900"
                  )}
                >
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                    )}
                  >
                    Real production experience
                  </div>
                  <p className={cn("text-xs", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
                    Work from Theta Technolabs and system-level personal projects like Kutumb OS.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 rounded-full p-2",
                    theme === "dark" ? "bg-zinc-800 text-zinc-100" : "bg-zinc-900/5 text-zinc-900"
                  )}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                    )}
                  >
                    Recruiter-friendly navigation
                  </div>
                  <p className={cn("text-xs", theme === "dark" ? "text-zinc-400" : "text-zinc-600")}>
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
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-colors active:scale-95 group",
              theme === "dark"
                ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm"
            )}
          >
            Enter Terminal Mode
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleRecruiterView}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full border active:scale-95",
              theme === "dark"
                ? "bg-zinc-900 text-zinc-100 border-zinc-700 hover:bg-zinc-800"
                : "bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-50"
            )}
          >
            Recruiter View
          </button>
        </div>
      </main>
    </div>
  );
}
