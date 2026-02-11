import { useState } from "react";
import { motion } from "framer-motion";
import { Command } from "@/lib/types";
import { Check, Cpu, Server, Layers, Zap } from "lucide-react";

// --- Specialized Result Components ---

const StatusBlock = () => (
  <div className="my-4 p-4 border border-terminal-border bg-terminal-dim/5 rounded-md max-w-2xl">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-2">
        <h3 className="text-terminal-accent font-bold uppercase tracking-wider text-sm mb-3">System Status: ONLINE</h3>

        <div className="grid grid-cols-1 gap-2 text-sm">
           <div className="flex items-center gap-2">
              <span className="text-terminal-dim w-24">ROLE_FOCUS</span>
              <span className="text-terminal-fg font-semibold">Frontend Engineer (Angular)</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-terminal-dim w-24">DOMAINS</span>
              <span className="text-terminal-fg">UI development, REST API integration, responsive layouts</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-terminal-dim w-24">UPTIME</span>
              <span className="text-terminal-fg">Early-career (~1 year experience)</span>
           </div>
        </div>
      </div>

      <div className="flex-1 border-t md:border-t-0 md:border-l border-terminal-border pt-4 md:pt-0 md:pl-6">
         <h4 className="text-terminal-dim text-xs uppercase mb-3">Core Metrics</h4>
         <div className="space-y-3">
            <Metric label="Primary Stack" value="Angular · TypeScript · HTML/CSS" icon={<Layers className="w-3 h-3" />} />
            <Metric label="Experience Level" value="Associate Software Engineer" icon={<Zap className="w-3 h-3" />} />
            <Metric label="Focus Areas" value="UI structure, integration, responsiveness" icon={<Server className="w-3 h-3" />} />
         </div>
      </div>
    </div>
  </div>
);

const Metric = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="flex items-center justify-between text-sm">
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
}: {
  history: Command[];
  onCommandClick?: (cmd: string) => void;
}) {
  return (
    <div className="space-y-4">
      {history.map((cmd) => (
        <div key={cmd.id} className="mb-2">
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
            ) : (
              <FormattedText
                text={cmd.output as string}
                onCommandClick={onCommandClick}
              />
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
