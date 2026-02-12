import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileDown, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { experience, profileMeta, projects, skillGroups } from "@/lib/profile-data";

export default function RecruiterView() {
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

  const handleOpenLinkedIn = () => {
    window.open(profileMeta.linkedIn, "_blank", "noreferrer");
  };

  const handleDownloadResume = () => {
    if (profileMeta.resumeUrl) {
      const link = document.createElement("a");
      link.href = profileMeta.resumeUrl;
      link.download = "Dhrumi-Vaidya-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleContact = () => {
    window.location.href = `mailto:${profileMeta.email}`;
  };

  return (
    <div
      className={cn(
        "min-h-screen font-sans selection:bg-zinc-200 transition-colors",
        theme === "dark"
          ? "bg-zinc-950 text-zinc-50"
          : "bg-zinc-50 text-zinc-900",
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
              Recruiter profile
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
              current="recruiter"
              onChangeMode={setLocation}
              theme={theme}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10 pb-16">
        {/* Profile header */}
        <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2
              className={cn(
                "text-2xl font-semibold leading-snug tracking-tight",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900",
              )}
            >
              {profileMeta.name}
            </h2>
            <p
              className={cn(
                "text-sm font-medium",
                theme === "dark" ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              Frontend Engineer (Angular / UI Systems)
            </p>
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 text-xs",
                theme === "dark" ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              {profileMeta.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  {profileMeta.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                {profileMeta.email}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={handleOpenLinkedIn}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-medium shadow-sm transition active:scale-95 border",
                theme === "dark"
                  ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-zinc-400"
                  : "bg-white text-zinc-900 hover:bg-zinc-50 border-zinc-300",
              )}
            >
              Open LinkedIn
              <ExternalLink className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={handleDownloadResume}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 font-medium active:scale-95 transition-colors",
                theme === "dark"
                  ? "border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50",
              )}
            >
              Download Resume
              <FileDown className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={handleContact}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 font-medium active:scale-95 transition-colors",
                theme === "dark"
                  ? "border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                  : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50",
              )}
            >
              Contact
            </button>
          </div>
        </section>

        {/* About */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "rounded-xl border p-5 shadow-sm",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900"
                : "border-zinc-200 bg-white",
            )}
          >
            <h3
              className={cn(
                "text-sm font-semibold tracking-tight",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900",
              )}
            >
              About
            </h3>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed",
                theme === "dark" ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              I work on frontend systems for real products, with a focus on
              clear user interfaces, predictable behaviour, and maintainable
              code over time. Most of my experience is in Angular-based
              applications, working closely with designers and backend engineers
              to ship features that feel polished but are still practical to
              maintain.
            </p>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed",
                theme === "dark" ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              I enjoy owning pieces of the interface end to end: from breaking
              down requirements, to designing flows, to implementing components
              and handling data, and finally refining details based on feedback.
            </p>
          </motion.article>

          {/* Skills summary */}
          <article
            className={cn(
              "rounded-xl border p-5 shadow-sm",
              theme === "dark"
                ? "border-zinc-800 bg-zinc-900"
                : "border-zinc-200 bg-white",
            )}
          >
            <h3
              className={cn(
                "text-sm font-semibold tracking-tight",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900",
              )}
            >
              Skills snapshot
            </h3>
            <div
              className={cn(
                "mt-3 grid gap-3 text-xs",
                theme === "dark" ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              {skillGroups.map((group) => (
                <div key={group.label} className="space-y-1">
                  <p
                    className={cn(
                      "font-medium",
                      theme === "dark" ? "text-zinc-50" : "text-zinc-900",
                    )}
                  >
                    {group.label}
                  </p>
                  <p
                    className={cn(
                      "leading-relaxed",
                      theme === "dark" ? "text-zinc-300" : "text-zinc-600",
                    )}
                  >
                    {group.items.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Experience */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3
              className={cn(
                "text-sm font-semibold tracking-tight",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900",
              )}
            >
              Experience
            </h3>
            <p
              className={cn(
                "text-xs",
                theme === "dark" ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              Results-focused summary, not an exhaustive CV.
            </p>
          </div>
          <div className="space-y-3">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}-${item.duration}`}
                className={cn(
                  "rounded-xl border p-5 shadow-sm",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900"
                    : "border-zinc-200 bg-white",
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        theme === "dark" ? "text-zinc-50" : "text-zinc-900",
                      )}
                    >
                      {item.company}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        theme === "dark" ? "text-zinc-300" : "text-zinc-600",
                      )}
                    >
                      {item.role}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-xs",
                      theme === "dark" ? "text-zinc-400" : "text-zinc-500",
                    )}
                  >
                    {item.duration}
                  </p>
                </div>
                <ul
                  className={cn(
                    "mt-3 space-y-1.5 text-xs",
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700",
                  )}
                >
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

        {/* Projects */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3
              className={cn(
                "text-sm font-semibold tracking-tight",
                theme === "dark" ? "text-zinc-50" : "text-zinc-900",
              )}
            >
              Selected projects
            </h3>
            <p
              className={cn(
                "text-xs",
                theme === "dark" ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              Links and brief context for quick review.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className={cn(
                  "flex flex-col overflow-hidden rounded-xl border shadow-sm",
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-900"
                    : "border-zinc-200 bg-white",
                )}
              >
                <div
                  className={cn(
                    "relative h-32 w-full",
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-100",
                  )}
                >
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
                  <h4
                    className={cn(
                      "text-sm font-semibold",
                      theme === "dark" ? "text-zinc-50" : "text-zinc-900",
                    )}
                  >
                    {project.name}
                  </h4>
                  <p
                    className={cn(
                      "text-xs leading-relaxed",
                      theme === "dark" ? "text-zinc-300" : "text-zinc-600",
                    )}
                  >
                    {project.shortDescription}
                  </p>
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
                        >
                          GitHub
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
                        >
                          Live demo
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Optional recent activity */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
            Recent activity (selected)
          </h3>
          <div
            className={cn(
              "space-y-2 rounded-xl border border-dashed p-4 text-xs",
              theme === "dark"
                ? "border-zinc-700 bg-zinc-900/70 text-zinc-300"
                : "border-zinc-200 bg-white/60 text-zinc-600",
            )}
          >
            <p>
              • Built this multi-mode portfolio to demonstrate frontend systems
              thinking and audience-aware UX.
            </p>
            <p>
              • Ongoing work on Kutumb OS, a family management interface focused
              on clear navigation and shared views.
            </p>
            <p>
              • Continuous learning around frontend performance, maintainable
              architectures, and design collaboration.
            </p>
          </div>
        </section>
      </main>
    </div>
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

