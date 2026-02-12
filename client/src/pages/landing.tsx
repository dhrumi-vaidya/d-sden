import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { profileMeta } from "@/lib/profile-data";

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
  const handleEnterDeveloperMode = () => {
    setLocation("/terminal");
  };

  const handleRecruiterView = () => {
    setLocation("/recruiter");
  };

  const handleNonTechView = () => {
    setLocation("/non-tech");
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
      <main className="mx-auto max-w-4xl space-y-12 px-6 pt-16 pb-24">
        {/* Header / Identity */}
        <header className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Multi-mode portfolio
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {profileMeta.name}
            </h1>
            <p
              className={cn(
                "text-sm",
                theme === "dark" ? "text-zinc-400" : "text-zinc-600",
              )}
            >
              {profileMeta.headline}
            </p>
          </div>
          <button
            type="button"
            className={cn(
              "ml-4 rounded-full border px-3 py-1 text-xs",
              theme === "dark"
                ? "border-zinc-700 text-zinc-300 hover:border-zinc-400"
                : "border-zinc-300 text-zinc-600 hover:border-zinc-500",
            )}
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </button>
        </header>

        {/* Hero copy */}
        <section className="max-w-3xl space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "text-base font-medium",
              theme === "dark" ? "text-zinc-50" : "text-zinc-900",
            )}
          >
            One portfolio, three views for different audiences.
          </motion.p>
          <p
            className={cn(
              "text-sm leading-relaxed",
              theme === "dark" ? "text-zinc-400" : "text-zinc-600",
            )}
          >
            Choose the view that matches how you want to read this profile. All
            three show the same underlying work, but with different levels of
            technical depth.
          </p>
        </section>

        {/* Mode cards */}
        <section className="grid gap-4 md:grid-cols-3">
          {/* Developer mode */}
          <motion.article
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className={cn(
              "flex flex-col justify-between rounded-2xl border p-4",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900/40"
                : "border-zinc-200 bg-zinc-50",
            )}
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Developer mode
              </p>
              <h2
                className={cn(
                  "text-sm font-semibold",
                  theme === "dark" ? "text-zinc-50" : "text-zinc-900",
                )}
              >
                Terminal / System View
              </h2>
              <p
                className={cn(
                  "text-xs leading-relaxed",
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600",
                )}
              >
                For engineers and technical reviewers. Explore commands, system
                thinking, and implementation details in a terminal interface.
              </p>
            </div>
            <button
              type="button"
              onClick={handleEnterDeveloperMode}
              className={cn(
                "mt-4 inline-flex items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium transition-colors border",
                theme === "dark"
                  ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-zinc-400"
                  : "bg-white text-zinc-900 hover:bg-zinc-50 border-zinc-300",
              )}
            >
              Open developer mode
              <ArrowRight className="h-3 w-3" />
            </button>
          </motion.article>

          {/* Recruiter mode */}
          <motion.article
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className={cn(
              "flex flex-col justify-between rounded-2xl border p-4 shadow-sm",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900"
                : "border-zinc-200 bg-white",
            )}
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Recruiter mode
              </p>
              <h2 className="text-sm font-semibold text-zinc-900">
                Recruiter Profile
              </h2>
              <p className="text-xs leading-relaxed text-zinc-600">
                For hiring managers and recruiters. A fast, familiar overview of
                role, experience, projects, and skills.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRecruiterView}
              className={cn(
                "mt-4 inline-flex items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium shadow-sm transition-colors border",
                theme === "dark"
                  ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-zinc-400"
                  : "bg-white text-zinc-900 hover:bg-zinc-50 border-zinc-300",
              )}
            >
              Open recruiter mode
              <ArrowRight className="h-3 w-3" />
            </button>
          </motion.article>

          {/* Non-tech mode */}
          <motion.article
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className={cn(
              "flex flex-col justify-between rounded-2xl border p-4 shadow-sm",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900"
                : "border-zinc-200 bg-white",
            )}
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Non‑technical mode
              </p>
              <h2 className="text-sm font-semibold text-zinc-900">
                Simple Overview
              </h2>
              <p className="text-xs leading-relaxed text-zinc-600">
                For non-technical readers. A calm, plain-language view of what I
                do and why it matters, without jargon.
              </p>
            </div>
            <button
              type="button"
              onClick={handleNonTechView}
              className="mt-4 inline-flex items-center justify-between rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
            >
              Open simple overview
              <ArrowRight className="h-3 w-3" />
            </button>
          </motion.article>
        </section>

        {/* Small reassurance for all audiences */}
        <section
          className={cn(
            "max-w-3xl rounded-2xl border border-dashed p-4 text-xs",
            theme === "dark"
              ? "border-zinc-700/80 bg-zinc-900/40 text-zinc-400"
              : "border-zinc-300/80 bg-zinc-50/80 text-zinc-600",
          )}
        >
          <p>
            All three modes point to the same underlying work. The only thing
            that changes is how it&apos;s presented—so you can choose the view
            that feels most natural to you.
          </p>
        </section>
      </main>
    </div>
  );
}
