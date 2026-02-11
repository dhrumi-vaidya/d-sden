import { useState } from "react";
import { motion } from "framer-motion";
import { Command } from "@/lib/types";
import { Check, Cpu, Server, Layers, Zap } from "lucide-react";

// --- Specialized Result Components ---

const StatusBlock = () => {
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <div className="my-4 p-4 border border-terminal-border bg-terminal-dim/5 rounded-md max-w-2xl space-y-4">
      {/* Phase 1 — Identity */}
      <div>
        <h3 className="text-terminal-accent font-bold uppercase tracking-wider text-xs mb-2">
          System Status
        </h3>
        <div className="text-terminal-dim text-xs mb-1">Identity</div>
        <div className="space-y-1 text-sm">
          <div className="flex gap-3">
            <span className="w-16 text-terminal-dim">Role</span>
            <span className="text-terminal-fg">Frontend Engineer (Angular)</span>
          </div>
          <div className="flex gap-3">
            <span className="w-16 text-terminal-dim">Focus</span>
            <span className="text-terminal-fg">
              UI systems / architecture / responsiveness
            </span>
          </div>
          <div className="flex gap-3">
            <span className="w-16 text-terminal-dim">Status</span>
            <span className="text-terminal-fg">Available for opportunities</span>
          </div>
        </div>
      </div>

      {/* Phase 2 — Capabilities */}
      <div>
        <div className="text-terminal-dim text-xs mb-2">Core domains</div>
        <div className="space-y-2 text-xs">
          <Metric
            label="Rendering & UI systems"
            value="Strong"
            icon={<Layers className="w-3 h-3" />}
            tooltip="Component-driven UIs and layout structure in Angular."
          />
          <Metric
            label="API-driven interfaces"
            value="Strong"
            icon={<Server className="w-3 h-3" />}
            tooltip="REST API integration and state handling in production UIs."
          />
          <Metric
            label="Responsiveness & polish"
            value="Growing"
            icon={<Zap className="w-3 h-3" />}
            tooltip="Responsive layouts and small interaction details."
          />
        </div>
      </div>

      {/* Phase 3 — Evidence */}
      <div className="border-t border-terminal-border/60 pt-3">
        <button
          type="button"
          className="flex items-center gap-2 text-xs text-terminal-accent cursor-pointer hover:text-terminal-success"
          onClick={() => setShowEvidence((v) => !v)}
        >
          <span>{showEvidence ? "▾" : "▸"}</span>
          <span>Evidence of real work (expand)</span>
        </button>
        {showEvidence && (
          <ul className="mt-2 text-xs text-terminal-dim space-y-1">
            <li>• Production Angular apps at Theta Technolabs</li>
            <li>• Internal tools and multi-module UI flows</li>
            <li>• API-driven workflows and UI integrations</li>
            <li>• Focus on maintainable, structured frontend code</li>
          </ul>
        )}
      </div>
    </div>
  );
};

const RecruiterView = ({
  onCommandClick,
  onPreviewProject,
}: {
  onCommandClick?: (cmd: string) => void;
  onPreviewProject?: (key: string) => void;
}) => {
  const openLinkedIn = () => {
    if (typeof window !== "undefined") {
      window.open("https://www.linkedin.com/in/dhrumi-vaidya", "_blank", "noopener,noreferrer");
    }
  };

  const copyLinkedIn = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://www.linkedin.com/in/dhrumi-vaidya");
    }
  };

  const ProjectCard = ({ project }: { project: ProjectEvidence }) => (
    <div className="border border-terminal-border/70 rounded-md px-3 py-2 text-xs flex flex-col gap-1 bg-terminal-bg/40">
      <div className="font-semibold text-terminal-fg">{project.name}</div>
      <div className="text-terminal-dim">{project.summary}</div>
      <div className="mt-1 flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/10 text-terminal-success hover:border-terminal-success/70 hover:bg-terminal-success/10 text-[11px] cursor-pointer"
          onClick={() => onCommandClick?.(`project ${project.key}`)}
        >
          View Project
        </button>
        <button
          type="button"
          className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/10 text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/10 text-[11px] cursor-pointer"
          onClick={() => onPreviewProject?.(project.key)}
          disabled={project.images.length === 0}
        >
          Preview
        </button>
        {project.githubUrl && (
          <button
            type="button"
            className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/10 text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/10 text-[11px] cursor-pointer"
            onClick={() =>
              window.open(project.githubUrl as string, "_blank", "noopener,noreferrer")
            }
          >
            GitHub
          </button>
        )}
        {project.liveUrl && (
          <button
            type="button"
            className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/10 text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/10 text-[11px] cursor-pointer"
            onClick={() => {
              if (project.accessNote) {
                alert(project.accessNote);
              }
              window.open(project.liveUrl as string, "_blank", "noopener,noreferrer");
            }}
          >
            Live
          </button>
        )}
      </div>
    </div>
  );

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-terminal-dim/40 text-[11px] text-terminal-fg bg-terminal-bg/40">
      {children}
    </span>
  );

  return (
    <div className="max-w-3xl space-y-4 text-xs md:text-sm">
      {/* Header / Profile card */}
      <div className="border border-terminal-border rounded-md p-4 bg-terminal-bg/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="text-terminal-accent font-semibold text-sm">Recruiter Profile View</div>
          <div className="h-px w-32 bg-terminal-border/80 my-2" />
          <div className="text-terminal-fg font-semibold">Dhrumi Vaidya</div>
          <div className="text-terminal-dim">
            Frontend Engineer (Angular) · Ahmedabad, India
          </div>
          <div className="text-terminal-dim mt-1">
            Associate Software Engineer @ Theta Technolabs
          </div>
          <div className="text-terminal-dim">
            Experience: ~1 year (production + internships)
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <button
            type="button"
            onClick={openLinkedIn}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-terminal-accent/60 bg-terminal-bg/60 text-terminal-accent hover:bg-terminal-accent/10 text-xs cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-terminal-success" />
            Open LinkedIn
          </button>
          <button
            type="button"
            onClick={copyLinkedIn}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-terminal-dim/50 bg-terminal-bg/40 text-terminal-dim hover:bg-terminal-dim/10 text-[11px] cursor-pointer"
          >
            Copy LinkedIn URL
          </button>
        </div>
      </div>

      {/* About */}
      <div className="border border-terminal-border/70 rounded-md p-3 bg-terminal-bg/40 space-y-1">
        <div className="text-terminal-accent text-xs font-semibold tracking-wide uppercase">
          About
        </div>
        <div className="text-terminal-fg text-xs md:text-sm leading-relaxed">
          Frontend engineer working with Angular on production web applications. Focused on clean
          UI systems, API-driven interfaces, and scalable frontend structure that is easy to
          maintain and reason about.
        </div>
      </div>

      {/* Experience */}
      <div className="border border-terminal-border/70 rounded-md p-3 bg-terminal-bg/40 space-y-3">
        <div className="text-terminal-accent text-xs font-semibold tracking-wide uppercase">
          Experience
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold text-terminal-fg">
              Associate Software Engineer — Theta Technolabs
            </div>
            <div className="text-terminal-dim text-[11px]">Jan 2025 – Present</div>
            <div className="text-terminal-dim text-xs">
              Angular-based production frontend work, REST API integration, UI improvements, and
              bug fixes in real applications.
            </div>
          </div>
          <div>
            <div className="font-semibold text-terminal-fg">
              Frontend Intern — Theta Technolabs
            </div>
            <div className="text-terminal-dim text-xs">
              Job portal UI with reusable Angular components and responsive layouts.
            </div>
          </div>
          <div>
            <div className="font-semibold text-terminal-fg">Intern — Tatvasoft</div>
            <div className="text-terminal-dim text-xs">
              Exposure to .NET fundamentals, C#, SQL, and SDLC practices.
            </div>
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <div className="border border-terminal-border/70 rounded-md p-3 bg-terminal-bg/40 space-y-3">
        <div className="text-terminal-accent text-xs font-semibold tracking-wide uppercase">
          Featured Work
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {PROJECTS_DATA.map((p) => (
            <ProjectCard key={p.key} project={p} />
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="border border-terminal-border/70 rounded-md p-3 bg-terminal-bg/40 space-y-2">
        <div className="text-terminal-accent text-xs font-semibold tracking-wide uppercase">
          Skills
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Pill>Angular</Pill>
          <Pill>TypeScript</Pill>
          <Pill>JavaScript</Pill>
          <Pill>HTML</Pill>
          <Pill>CSS</Pill>
          <Pill>REST APIs</Pill>
          <Pill>Responsive UI</Pill>
          <Pill>Git</Pill>
          <Pill>GitHub</Pill>
        </div>
      </div>

      {/* Recent activity */}
      <div className="border border-terminal-border/70 rounded-md p-3 bg-terminal-bg/40 space-y-2">
        <div className="text-terminal-accent text-xs font-semibold tracking-wide uppercase">
          Recent Activity
        </div>
        <ul className="list-none space-y-1 text-xs text-terminal-dim">
          <li>• Built a terminal-based developer portfolio to reflect system thinking.</li>
          <li>
            • Working on Kutumb OS — a family management platform using Angular with modular UI.
          </li>
          <li>• Exploring UI systems and low-code workflows for faster delivery.</li>
        </ul>
        <button
          type="button"
          onClick={openLinkedIn}
          className="mt-2 inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-bg/40 text-terminal-accent hover:bg-terminal-accent/10 text-[11px] cursor-pointer"
        >
          View more on LinkedIn
        </button>
      </div>

      {/* Contact */}
      <div className="border border-terminal-border/70 rounded-md p-3 bg-terminal-bg/40 space-y-1">
        <div className="text-terminal-accent text-xs font-semibold tracking-wide uppercase">
          Contact
        </div>
        <div className="text-terminal-fg text-xs md:text-sm">
          Email:{" "}
          <button
            type="button"
            className="underline underline-offset-2 decoration-terminal-dim hover:text-terminal-accent cursor-pointer"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "mailto:dhrumi.vaidy@gmail.com";
              }
            }}
          >
            dhrumi.vaidy@gmail.com
          </button>
        </div>
        <div className="text-terminal-fg text-xs md:text-sm">
          LinkedIn:{" "}
          <button
            type="button"
            className="underline underline-offset-2 decoration-terminal-dim hover:text-terminal-accent cursor-pointer"
            onClick={openLinkedIn}
          >
            linkedin.com/in/dhrumi-vaidya
          </button>
        </div>
        <div className="text-terminal-dim text-xs mt-1">
          Tip: Open LinkedIn for full profile and recommendations.
        </div>
      </div>
    </div>
  );
};

type ProjectEvidence = {
  key: string;
  name: string;
  summary: string;
  focus: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  accessNote?: string;
};

const PROJECTS_DATA: ProjectEvidence[] = [
  {
    key: "job-portal",
    name: "Job Portal Web Application",
    summary:
      "Angular-based job portal UI with listings, filters, pagination, and REST API integration.",
    focus: [
      "Job and candidate listing pages",
      "Filter and search flows",
      "API-driven state and loading behaviour",
    ],
    images: ["/dummy-project.png"],
    githubUrl: "https://github.com/example/job-portal-demo",
    liveUrl: undefined,
    accessNote: "Internal application; screenshots are best for UI review.",
  },
  {
    key: "internal-apps",
    name: "Internal Company Web Applications",
    summary:
      "Internal dashboards and tools with shared UI components and API-driven data.",
    focus: [
      "Reusable UI components",
      "Production UI bug fixes and refinements",
      "Working with existing Angular codebases",
    ],
    images: ["/dummy-project.png"],
    githubUrl: "https://github.com/example/internal-apps-demo",
    liveUrl: undefined,
    accessNote: "Internal tools; direct access may require company authentication.",
  },
  {
    key: "kutumb-os",
    name: "Kutumb OS (Family Management Platform)",
    summary:
      "Personal Angular project focused on family management flows and role-aware screens.",
    focus: [
      "Modular layout structure",
      "Role-based views (e.g., parent vs. member)",
      "Shared state between related screens",
    ],
    images: ["/dummy-project.png"],
    githubUrl: "https://github.com/example/kutumb-os-demo",
    liveUrl: undefined,
  },
  {
    key: "finance-tracker",
    name: "Finance Tracker (Personal Project)",
    summary:
      "Personal Angular UI for logging expenses and viewing transactions over time.",
    focus: [
      "Form handling and validation",
      "List rendering and basic filters",
      "Clear component structure for small flows",
    ],
    images: ["/dummy-project.png"],
    githubUrl: "https://github.com/example/finance-tracker-demo",
    liveUrl: undefined,
  },
];

const ProjectsView = ({
  onCommandClick,
  onPreviewProject,
  onSystemEvent,
}: {
  onCommandClick?: (cmd: string) => void;
  onPreviewProject?: (key: string) => void;
  onSystemEvent?: (event: "projectEvidence") => void;
}) => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleExternal = (type: "github" | "live", project: ProjectEvidence) => {
    if (type === "github" && project.githubUrl) {
      setMessage("Opening GitHub repository…");
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
    if (type === "live" && project.liveUrl) {
      setMessage(
        project.accessNote ||
          "Opening live application in a new tab (may require authentication)."
      );
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
    setTimeout(() => setMessage(null), 2000);
  };

  const ProjectRow = ({ project }: { project: ProjectEvidence }) => {
    const keyName = project.key;
    const title = project.name;
    const summary = project.summary;
    const isOpen = openKey === keyName;
    return (
      <div className="border border-terminal-border/60 rounded-md px-3 py-2 text-xs bg-terminal-bg/40">
        <button
          type="button"
          className="flex items-center justify-between w-full text-left text-terminal-fg cursor-pointer"
          onClick={() => {
            const willOpen = !isOpen;
            setOpenKey(willOpen ? keyName : null);
            if (willOpen && onSystemEvent) {
              onSystemEvent("projectEvidence");
            }
          }}
          title={summary}
        >
          <span className="flex items-center gap-2">
            <span>{isOpen ? "▾" : "▸"}</span>
            <span className="font-semibold">{title}</span>
          </span>
        </button>
        {isOpen && (
          <div className="mt-2 space-y-2 text-terminal-dim">
            <div>{summary}</div>
            {project.focus.length > 0 && (
              <div className="text-terminal-fg text-xs">
                Focus:
                <ul className="list-disc ml-4 mt-1 space-y-0.5 text-terminal-dim">
                  {project.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/10 text-[11px] text-terminal-accent hover:border-terminal-accent hover:bg-terminal-accent/10 cursor-pointer"
                onClick={() => onCommandClick?.(`project ${keyName}`)}
              >
                View project
              </button>
              <button
                type="button"
                className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/5 text-[11px] text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/5 cursor-pointer"
                onClick={() => onCommandClick?.("arch")}
              >
                arch
              </button>
              <button
                type="button"
                className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/5 text-[11px] text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/5 cursor-pointer"
                onClick={() => onCommandClick?.("recruiter")}
              >
                recruiter view
              </button>
              <button
                type="button"
                className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/5 text-[11px] text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/5 cursor-pointer"
                onClick={() => onPreviewProject?.(keyName)}
                disabled={project.images.length === 0}
              >
                preview
              </button>
              {project.githubUrl && (
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/5 text-[11px] text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/5 cursor-pointer"
                  onClick={() => handleExternal("github", project)}
                >
                  GitHub
                </button>
              )}
              {project.liveUrl && (
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-0.5 rounded border border-terminal-dim/60 bg-terminal-dim/5 text-[11px] text-terminal-fg hover:border-terminal-accent/60 hover:bg-terminal-accent/5 cursor-pointer"
                  onClick={() => handleExternal("live", project)}
                >
                  Live
                </button>
              )}
            </div>
            {project.accessNote && (
              <div className="text-[11px] text-terminal-dim">{project.accessNote}</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl space-y-3 text-xs md:text-sm">
      <div>
        <div className="text-terminal-accent font-semibold text-xs tracking-wide uppercase">
          Projects
        </div>
        <div className="h-px w-32 bg-terminal-border/80 my-1" />
      </div>
      <div className="space-y-2">
        {PROJECTS_DATA.map((p) => (
          <ProjectRow key={p.key} project={p} />
        ))}
      </div>
      {message && (
        <div className="text-[11px] text-terminal-dim pt-1">{message}</div>
      )}
    </div>
  );
};

const ArchView = () => {
  const [open, setOpen] = useState<string | null>(null);
  const Principle = ({
    id,
    title,
    body,
  }: {
    id: string;
    title: string;
    body: string;
  }) => {
    const isOpen = open === id;
    return (
      <div className="border border-terminal-border/60 rounded-md px-3 py-2 text-xs bg-terminal-bg/40">
        <button
          type="button"
          className="flex items-center gap-2 text-terminal-fg cursor-pointer"
          onClick={() => setOpen(isOpen ? null : id)}
        >
          <span>{isOpen ? "▾" : "▸"}</span>
          <span className="font-semibold">{title}</span>
        </button>
        {isOpen && (
          <div className="mt-1 text-terminal-dim text-xs">{body}</div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl space-y-3 text-xs md:text-sm">
      <div>
        <div className="text-terminal-accent font-semibold text-xs tracking-wide uppercase">
          Architecture Philosophy
        </div>
        <div className="h-px w-40 bg-terminal-border/80 my-1" />
      </div>
      <div className="space-y-2">
        <Principle
          id="concerns"
          title="Separation of concerns"
          body="Keep data fetching, state, and presentation clearly separated so components stay easy to reason about and test."
        />
        <Principle
          id="state"
          title="Predictable state flow"
          body="Prefer simple, explicit state flows over clever abstractions, especially around API-driven UI."
        />
        <Principle
          id="systems"
          title="UI systems over pages"
          body="Treat the UI as reusable systems and patterns rather than individual pages, so features compose instead of duplicate."
        />
        <Principle
          id="perf"
          title="Performance-aware components"
          body="Avoid unnecessary work in hot paths and keep components cheap to render when data changes."
        />
      </div>
    </div>
  );
};

const Metric = ({
  label,
  value,
  icon,
  tooltip,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tooltip?: string;
}) => (
  <div
    className="flex items-center justify-between text-xs md:text-sm"
    title={tooltip}
  >
    <span className="flex items-center gap-2 text-terminal-dim">
      {icon} {label}
    </span>
    <span className="text-terminal-success font-mono">{value}</span>
  </div>
);

// --- Text Formatter for Highlighting ---
interface FormattedTextProps {
  text: string;
  onCommandClick?: (cmd: string) => void;
  onSystemEvent?: (event: "projectEvidence") => void;
}

const FormattedText = ({ text, onCommandClick }: FormattedTextProps) => {
  if (!text) return null;

  const [expandedHighlights, setExpandedHighlights] = useState<Record<string, boolean>>({});
  
  return (
    <>
      {text.split('\n').map((line, i) => {
        const trimmed = line.trim();
        let className = "text-terminal-fg";

        // Section headers like [Identity], [Highlights]
        if (/^\[.*\]$/.test(trimmed)) {
          className = "text-terminal-accent font-semibold mt-3 mb-1 block text-xs tracking-wide";
        } else if (/^[─\-]{5,}$/.test(trimmed)) {
          // Soft dividers
          className = "text-terminal-border/70 my-1 block";
        } else if (trimmed.startsWith('--')) {
          className = "text-terminal-dim font-bold mt-2 block";
        } else if (trimmed.startsWith('*')) {
          className = "text-terminal-accent font-semibold mt-1 block";
        } else if (line.includes('Details:')) {
          className = "text-terminal-dim";
        }

        // Support simple [command] tokens that can be clicked
        const segments = line.split(/(\[[^\]]+\])/g);

        const tooltipMap: Record<string, string> = {
          projects: "Explore projects and systems",
          skills: "View grouped skills by domain",
          experience: "See experience and internships",
          arch: "View frontend architecture principles",
          recruiter: "Open recruiter-friendly profile view",
          contact: "Get contact information",
          "Job Portal Web Application": "Open details for the job portal UI",
          "Kutumb OS": "Open details for the family management platform",
          "Finance Tracker": "Open details for the finance tracker UI",
        };

        return (
          <motion.div
            key={i}
            className={className}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1, delay: i * 0.05 }}
          >
            {segments.map((seg, idx) => {
              const isToken = seg.startsWith('[') && seg.endsWith(']');
              if (!isToken) {
                return <span key={idx}>{seg}</span>;
              }

              const label = seg.slice(1, -1).trim();

              // Map special labels to underlying commands
              const recruiterMap: Record<string, string> = {
                "Role & experience": "experience",
                "Company work": "projects",
                "Personal system projects": "projects --deep",
                "Skills summary": "skills",
                "Contact info": "contact",
                "Job Portal Web Application": "project job-portal",
                "Kutumb OS": "project kutumb-os",
                "Finance Tracker": "project finance-tracker",
                "Job Portal Web Application (company project)": "project job-portal",
                "Internal Company Web Applications": "project internal-apps",
                "Kutumb OS (personal system project)": "project kutumb-os",
                "Finance Tracker (personal project)": "project finance-tracker",
                "projects": "projects",
                "skills": "skills",
                "experience": "experience",
                "arch": "arch",
                "recruiter": "recruiter",
                "contact": "contact",
              };

              const mapped =
                recruiterMap[label] || label.toLowerCase();

              const isRecruiterHighlight =
                label === "Job Portal Web Application (company project)" ||
                label === "Internal Company Web Applications" ||
                label === "Kutumb OS (personal system project)" ||
                label === "Finance Tracker (personal project)";

              const handleClick = () => {
                if (isRecruiterHighlight) {
                  setExpandedHighlights((prev) => ({
                    ...prev,
                    [label]: !prev[label],
                  }));
                  return;
                }

                // Special external actions
                if (label === "Open") {
                  if (typeof window !== "undefined") {
                    window.open(
                      "https://www.linkedin.com/in/dhrumi-vaidya",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                  return;
                }

                if (label === "Copy LinkedIn URL") {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(
                      "https://www.linkedin.com/in/dhrumi-vaidya"
                    );
                  }
                  return;
                }

                onCommandClick?.(mapped);
              };

              return (
                <>
                  <button
                    key={idx}
                    type="button"
                    className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded border border-terminal-dim/40 bg-terminal-dim/10 text-terminal-accent hover:border-terminal-accent hover:bg-terminal-accent/10 text-xs cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-accent/60"
                    onClick={handleClick}
                    title={tooltipMap[label] || undefined}
                  >
                    {label}
                  </button>
                  {isRecruiterHighlight && expandedHighlights[label] && (
                    <div className="mt-1 ml-4 text-terminal-dim text-xs space-y-0.5">
                      {label.startsWith("Job Portal Web Application") && (
                        <>
                          <div>Job Portal Web Application</div>
                          <div>Frontend development using Angular for job listings, filters, pagination, and REST API integration.</div>
                          <button
                            type="button"
                            className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded border border-terminal-dim/40 bg-terminal-dim/5 text-terminal-success hover:border-terminal-success/60 hover:bg-terminal-success/10 text-[11px] cursor-pointer"
                            onClick={() => onCommandClick?.("project job-portal")}
                          >
                            view project
                          </button>
                        </>
                      )}
                      {label === "Internal Company Web Applications" && (
                        <>
                          <div>Internal Company Web Applications</div>
                          <div>Worked on Angular-based internal tools, maintaining UI components, integrating APIs, and fixing UI bugs in production code.</div>
                          <button
                            type="button"
                            className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded border border-terminal-dim/40 bg-terminal-dim/5 text-terminal-success hover:border-terminal-success/60 hover:bg-terminal-success/10 text-[11px] cursor-pointer"
                            onClick={() => onCommandClick?.("project internal-apps")}
                          >
                            view project
                          </button>
                        </>
                      )}
                      {label.startsWith("Kutumb OS") && (
                        <>
                          <div>Kutumb OS</div>
                          <div>Personal family management platform built with Angular, focusing on modular UI and role-aware screens.</div>
                          <button
                            type="button"
                            className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded border border-terminal-dim/40 bg-terminal-dim/5 text-terminal-success hover:border-terminal-success/60 hover:bg-terminal-success/10 text-[11px] cursor-pointer"
                            onClick={() => onCommandClick?.("project kutumb-os")}
                          >
                            view project
                          </button>
                        </>
                      )}
                      {label.startsWith("Finance Tracker") && (
                        <>
                          <div>Finance Tracker</div>
                          <div>Simple personal finance tracker UI using Angular for logging expenses, listing transactions, and basic filters.</div>
                          <button
                            type="button"
                            className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded border border-terminal-dim/40 bg-terminal-dim/5 text-terminal-success hover:border-terminal-success/60 hover:bg-terminal-success/10 text-[11px] cursor-pointer"
                            onClick={() => onCommandClick?.("project finance-tracker")}
                          >
                            view project
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </>
              );
            })}
          </motion.div>
        );
      })}
    </>
  );
};

// --- Main Output Renderer ---

export function TerminalOutput({
  history,
  onCommandClick,
  onPreviewProject,
  onSystemEvent,
}: {
  history: Command[];
  onCommandClick?: (cmd: string) => void;
  onPreviewProject?: (key: string) => void;
  onSystemEvent?: (event: "projectEvidence") => void;
}) {
  return (
    <div className="space-y-4">
      {history.map((cmd) => {
        const isRecruiter =
          cmd.input.trim().toLowerCase().startsWith("recruiter");
        const isProjects =
          cmd.input.trim().toLowerCase().startsWith("projects");
        const isArch = cmd.input.trim().toLowerCase().startsWith("arch");

        const primary = cmd.input.trim().split(" ")[0].toLowerCase();

        const renderNextMoves = () => {
          const Item = ({
            label,
            description,
          }: {
            label: string;
            description: string;
          }) => (
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-terminal-dim/40 bg-terminal-dim/10 text-[11px] text-terminal-fg hover:border-terminal-accent hover:bg-terminal-accent/10 cursor-pointer"
              onClick={() => onCommandClick?.(label)}
            >
              <span className="text-terminal-accent">{label}</span>
              <span className="text-terminal-dim">— {description}</span>
            </button>
          );

          if (primary === "status") {
            return (
              <>
                <Item label="projects" description="explore real systems" />
                <Item label="arch" description="see how UI is structured" />
                <Item
                  label="recruiter"
                  description="recruiter-friendly summary"
                />
              </>
            );
          }
          if (primary === "projects") {
            return (
              <>
                <Item
                  label="project job-portal"
                  description="job portal UI details"
                />
                <Item
                  label="project kutumb-os"
                  description="family platform details"
                />
              </>
            );
          }
          if (primary === "recruiter") {
            return (
              <>
                <Item
                  label="projects"
                  description="see featured work in depth"
                />
                <Item
                  label="skills"
                  description="view grouped skills"
                />
              </>
            );
          }
          if (primary === "overview") {
            return (
              <>
                <Item label="projects" description="featured systems" />
                <Item label="recruiter" description="profile-style view" />
              </>
            );
          }
          return (
            <>
              <Item label="overview" description="return to overview" />
              <Item label="help" description="see all commands" />
            </>
          );
        };

        return (
        <div key={cmd.id} className="mb-3">
          {/* Echo Input */}
          <div className="flex items-center gap-3 text-terminal-dim opacity-70 mb-1">
            <span className="text-terminal-accent">➜</span>
            <span className="text-terminal-success">~</span>
            <span>{cmd.input}</span>
          </div>
          
          {/* Output */}
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="pl-6 text-terminal-fg whitespace-pre-wrap leading-relaxed text-sm"
          >
            {cmd.output === "STATUS_COMPONENT" ? (
              <StatusBlock />
            ) : isRecruiter ? (
              <RecruiterView
                onCommandClick={onCommandClick}
                onPreviewProject={onPreviewProject}
              />
            ) : isProjects ? (
              <ProjectsView
                onCommandClick={onCommandClick}
                onPreviewProject={onPreviewProject}
              />
            ) : isArch ? (
              <ArchView />
            ) : (
              <FormattedText
                text={cmd.output as string}
                onCommandClick={onCommandClick}
              />
            )}
          </motion.div>
          {/* Contextual next moves */}
          <div className="pl-6 mt-2 text-[11px] text-terminal-dim space-x-1">
            <span className="mr-1 text-terminal-dim">→ Next:</span>
            {renderNextMoves()}
          </div>
        </div>
      )})}
    </div>
  );
}
