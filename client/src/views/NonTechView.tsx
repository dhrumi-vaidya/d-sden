import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, LayoutGrid, Users } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { experience, profileMeta, projects } from "@/lib/profile-data";

export default function NonTechView() {
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

  return (
    <div
      className={cn(
        "min-h-screen font-sans selection:bg-zinc-200 transition-colors",
        theme === "dark"
          ? "bg-zinc-950 text-zinc-50"
          : "bg-white text-zinc-900",
      )}
    >
      <header
        className={cn(
          "border-b backdrop-blur",
          theme === "dark"
            ? "border-zinc-800 bg-zinc-900/80"
            : "border-zinc-200 bg-white/80",
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="space-y-0.5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Plain-language view
            </p>
            <h1 className="text-base font-semibold tracking-tight">
              {profileMeta.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={cn(
                "rounded-full border px-3 py-1 text-[11px]",
                theme === "dark"
                  ? "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  : "border-zinc-300 text-zinc-600 hover:border-zinc-500",
              )}
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            >
              Theme: {theme === "dark" ? "Dark" : "Light"}
            </button>
            <ModeSwitcher
              current="nonTech"
              onChangeMode={setLocation}
              theme={theme}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10 pb-16">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          <div className="space-y-4">
            <p className="text-sm font-medium text-zinc-500">In simple terms</p>
            <h2
              className={cn(
                "text-2xl font-semibold leading-snug tracking-tight",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900",
              )}
            >
              {profileMeta.nonTechIdentity}
            </h2>
            <p
              className={cn(
                "max-w-xl text-sm leading-relaxed",
                theme === "dark" ? "text-zinc-300" : "text-zinc-600",
              )}
            >
              {profileMeta.nonTechSubtext}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLocation("/recruiter")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium shadow-sm transition active:scale-95 border",
                  theme === "dark"
                    ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-zinc-400"
                    : "bg-white text-zinc-900 hover:bg-zinc-50 border-zinc-300",
                )}
              >
                View Professional Profile
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setLocation("/terminal")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition active:scale-95 border",
                  theme === "dark"
                    ? "border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                    : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50",
                )}
              >
                Explore Technical Portfolio
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "rounded-2xl border p-5 shadow-sm",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900"
                : "border-zinc-200 bg-white",
            )}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              At a glance
            </p>
            <div
              className={cn(
                "mt-4 space-y-2 text-sm",
                theme === "dark" ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              <p>
                I work as a frontend engineer, turning product ideas into clear screens that real
                people can use every day.
              </p>
              <p>
                Most of my work sits between design and engineering: making sure the details feel
                right while the system stays simple to maintain.
              </p>
            </div>
          </motion.div>
        </section>

        {/* What I do */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
            What I do
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={<LayoutGrid className="h-5 w-5" />}
              title="Build User Interfaces"
              body="I create the screens and interactions people use every day."
            />
            <InfoCard
              icon={<Users className="h-5 w-5" />}
              title="Make Products Fast & Reliable"
              body="I make sure apps load quickly, feel smooth, and behave in a predictable way."
            />
            <InfoCard
              icon={<span className="inline-block h-5 w-5 rounded-full bg-zinc-900" />}
              title="Think in Systems"
              body="I design things so they stay organised and don’t fall apart as products grow."
            />
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
              Selected projects
            </h3>
            <p className="text-xs text-zinc-500">
              A visual first look at some of the work I&apos;ve done.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "flex flex-col overflow-hidden rounded-xl border shadow-sm",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900"
                    : "border-zinc-200 bg-white",
                )}
              >
                <div
                  className={cn(
                    "relative h-40 w-full",
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-100",
                  )}
                >
                  {/* Placeholder imagery keeps things visual without needing real screenshots */}
                  {project.imageSrc ? (
                    <img
                      src={project.imageSrc}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                      Project preview
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.name}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {project.nonTechDescription}
                  </p>
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                            theme === "dark"
                              ? "border-zinc-700 text-zinc-100 hover:bg-zinc-800"
                              : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
                          )}
                        >
                          Live demo
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                            theme === "dark"
                              ? "border-zinc-700 text-zinc-100 hover:bg-zinc-800"
                              : "border-zinc-300 text-zinc-800 hover:bg-zinc-50",
                          )}
                        >
                          Learn more
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Experience summary */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
            Experience summary
          </h3>
          <div className="space-y-3">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}-${item.duration}`}
                className={cn(
                  "rounded-xl border p-4 shadow-sm",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900"
                    : "border-zinc-200 bg-white",
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {item.company}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">
                      {item.role}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">{item.duration}</p>
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Footer CTAs */}
        <footer
          className={cn(
            "mt-4 border-t pt-6",
            theme === "dark" ? "border-zinc-800" : "border-zinc-200",
          )}
        >
          <div className="flex flex-wrap gap-3 text-xs text-zinc-600 dark:text-zinc-300">
            <button
              type="button"
              onClick={() => setLocation("/recruiter")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-medium transition-colors",
                theme === "dark"
                  ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white hover:bg-zinc-50",
              )}
            >
              Recruiter View
            </button>
            <button
              type="button"
              onClick={() => setLocation("/terminal")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-medium transition-colors",
                theme === "dark"
                  ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white hover:bg-zinc-50",
              )}
            >
              Technical Terminal Mode
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function InfoCard({ icon, title, body }: InfoCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/5 text-zinc-900 dark:bg-zinc-100/10 dark:text-zinc-50">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h4>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          {body}
        </p>
      </div>
    </article>
  );
}

interface ModeSwitcherProps {
  current: "developer" | "recruiter" | "nonTech";
  onChangeMode: (path: string) => void;
  theme: "dark" | "light";
}

function ModeSwitcher({ current, onChangeMode, theme }: ModeSwitcherProps) {
  const options: { id: ModeSwitcherProps["current"]; label: string; path: string }[] = [
    { id: "developer", label: "Developer", path: "/terminal" },
    { id: "recruiter", label: "Recruiter", path: "/recruiter" },
    { id: "nonTech", label: "Simple", path: "/non-tech" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 text-xs",
        theme === "dark"
          ? "border-zinc-700 bg-zinc-900"
          : "border-zinc-200 bg-white",
      )}
    >
      {options.map((option) => {
        const isActive = option.id === current;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChangeMode(option.path)}
            className={cn(
              "rounded-full px-3 py-1 font-medium transition-colors",
              isActive
                ? "bg-zinc-900 text-white"
                : "text-zinc-700 hover:bg-zinc-100",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

