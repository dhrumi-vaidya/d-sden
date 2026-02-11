import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { TerminalInput } from "./TerminalInput";
import { TerminalOutput } from "./TerminalOutput";
import { processCommand } from "@/lib/terminal-logic";
import { Command } from "@/lib/types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Terminal({ initialCommand }: { initialCommand?: string } = {}) {
  const [history, setHistory] = useState<Command[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [showIdleSuggestions, setShowIdleSuggestions] = useState(false);
  const [sessionId] = useState(() =>
    Math.random().toString(36).slice(2, 6)
  );
  const [sessionStartedAt] = useState(() => Date.now());
  const [activeTime, setActiveTime] = useState("0:00");
  const [isPulsing, setIsPulsing] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [recommendedCmd, setRecommendedCmd] = useState<string | null>("overview");
  const [visited, setVisited] = useState({
    overview: false,
    projects: false,
    arch: false,
    recruiter: false,
  });
  const [systemFlags, setSystemFlags] = useState({
    contextInit: false,
    recruiter: false,
    projectEvidence: false,
  });
  const [previewProjectKey, setPreviewProjectKey] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const forceScrollNext = useRef(false);
  const [, setLocation] = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("fsi-theme");
    return stored === "light" ? "light" : "dark";
  });

  // Focus input on click anywhere
  const handleContainerClick = () => {
    // Only focus if user isn't selecting text
    if (window.getSelection()?.toString().length === 0) {
      inputRef.current?.focus();
    }
  };

  // Session active time (updates every second)
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedMs = Date.now() - sessionStartedAt;
      const totalSeconds = Math.floor(elapsedMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setActiveTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartedAt]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    const el = outputRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    forceScrollNext.current = false;
  }, [history, bootSequence]);

  const handleCommand = useCallback(async (input: string) => {
    if (!input.trim()) return;

    const primary = input.trim().split(" ")[0].toLowerCase();

    // Normalize aliases for exploration and recommendations
    const base =
      primary === "o"
        ? "overview"
        : primary === "p"
        ? "projects"
        : primary === "a"
        ? "arch"
        : primary === "r"
        ? "recruiter"
        : primary;

    setLastCommand(base);

    // Mark major sections as visited
    if (base === "overview" || base === "projects" || base === "arch" || base === "recruiter") {
      setVisited((prev) => ({ ...prev, [base]: true }));
    }

    // Context-aware next suggestion
    if (base === "overview") {
      setRecommendedCmd("projects");
    } else if (base === "projects") {
      setRecommendedCmd("arch");
    } else if (base === "arch") {
      setRecommendedCmd("recruiter");
    } else if (base === "recruiter") {
      setRecommendedCmd("projects");
    }

    // One-time system messages
    setSystemFlags((prev) => {
      const next = { ...prev };
      if (!next.contextInit) {
        setSystemMessage("[sys] Initializing frontend system interface…");
        next.contextInit = true;
      } else if (base === "recruiter" && !next.recruiter) {
        setSystemMessage("[sys] switching to recruiter view");
        next.recruiter = true;
      }
      return next;
    });

    // System feedback pulse
    setIsPulsing(true);
    setIsProcessing(true);
    setShowIdleSuggestions(false);
    
    // Simulate slight processing delay for "realism"
    await new Promise(r => setTimeout(r, 150));

    const result = processCommand(input);

    if (result === "NAVIGATE_HOME") {
      setIsProcessing(false);
      setTimeout(() => {
        setIsPulsing(false);
        setSystemMessage(null);
        setLocation("/");
      }, 150);
      return;
    }

    if (result === "CLEAR_SIGNAL") {
      setHistory([]);
    } else {
      const newCommand: Command = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        input,
        output: result || "Command not found",
      };
      setHistory(prev => [...prev, newCommand]);
    }

    setIsProcessing(false);
    // Stop pulse and clear system message after a short delay
    setTimeout(() => {
      setIsPulsing(false);
      setSystemMessage(null);
    }, 600);
    
    // Keep focus
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  // Boot Sequence + initial overview
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootSequence(false);
      // Automatically show overview or an alternate initial command on first load
      handleCommand(initialCommand || "overview");
    }, 1500);
    return () => clearTimeout(timer);
  }, [handleCommand, initialCommand]);

  // Idle suggestions near prompt (first-time guidance)
  useEffect(() => {
    if (bootSequence) return;
    if (history.length === 0) return;
    const timer = setTimeout(() => {
      setShowIdleSuggestions(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [history, bootSequence]);

  // Keyboard navigation for image preview
  useEffect(() => {
    if (!previewProjectKey) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewProjectKey(null);
      } else if (e.key === "ArrowRight") {
        setPreviewIndex((idx) => idx + 1);
      } else if (e.key === "ArrowLeft") {
        setPreviewIndex((idx) => (idx > 0 ? idx - 1 : 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [previewProjectKey]);

  const SuggestionChip = ({
    cmd,
    alias,
  }: {
    cmd: string;
    alias?: string;
  }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        // When user clicks a suggestion, always scroll to newest output.
        forceScrollNext.current = true;
        handleCommand(cmd);
      }} 
      className={cn(
        "px-3 py-1 text-xs border rounded bg-terminal-dim/10",
        recommendedCmd === cmd
          ? "border-terminal-accent/70 text-terminal-accent bg-terminal-accent/10"
          : "border-terminal-dim/30 text-terminal-fg hover:text-terminal-accent hover:border-terminal-accent/50 hover:bg-terminal-accent/10",
        "transition-colors cursor-pointer active:scale-95"
      )}
      title={alias ? `${cmd} (${alias})` : cmd}
    >
      <span>{cmd}</span>
      {alias && (
        <span className="ml-1 text-[10px] text-terminal-dim">({alias})</span>
      )}
    </button>
  );

  if (bootSequence) {
    return (
      <div
        className={cn(
          "h-screen w-full flex flex-col items-center justify-center font-mono terminal-theme",
          theme === "light" ? "terminal-theme--light" : "terminal-theme--dark"
        )}
      >
        <div className="w-64 space-y-2">
            <div className="flex justify-between text-xs text-terminal-dim mb-1">
                <span>BIOS_CHECK</span>
                <span className="text-terminal-success">OK</span>
            </div>
            <div className="h-1 w-full bg-terminal-dim/20 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-terminal-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </div>
            <div className="text-center text-xs text-terminal-dim pt-2">
                INITIALIZING SYSTEM INTERFACE v1.0...
            </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "h-screen w-full font-mono scanlines overflow-hidden terminal-theme",
        theme === "light" ? "terminal-theme--light" : "terminal-theme--dark"
      )}
      onClick={handleContainerClick}
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col p-4 md:p-8 pb-4">
        {/* Global system context */}
        <div className="mb-4 flex items-center justify-between text-xs text-terminal-dim select-none">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full bg-terminal-success",
                isPulsing && "animate-pulse"
              )}
            />
            <span>system.active</span>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <span className="mr-1">session:</span>
              <span className="text-terminal-fg">{sessionId}</span>
            </div>
            <span className="text-terminal-dim">|</span>
            <div>
              <span className="mr-1">active:</span>
              <span className="text-terminal-fg">{activeTime}</span>
            </div>
            <button
              type="button"
              className="ml-3 px-2 py-0.5 rounded border border-terminal-border/60 text-terminal-dim hover:text-terminal-accent hover:border-terminal-accent/60 text-[11px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setTheme((prev) => {
                  const next = prev === "dark" ? "light" : "dark";
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("fsi-theme", next);
                  }
                  return next;
                });
              }}
            >
              Theme: {theme === "dark" ? "Dark" : "Light"}
            </button>
          </div>
        </div>

        {/* Header / Intro (sticky) */}
        <div className="mb-4 select-none sticky top-0 z-20 bg-terminal-bg pb-3 border-b border-terminal-border/60">
          <div className="mb-2">
            <h1 className="text-lg md:text-xl font-bold text-terminal-accent">
              Frontend System Interface
            </h1>
            <div className="text-terminal-dim text-xs mt-0.5">
              v1.0
            </div>
          </div>
          <div className="h-px w-full max-w-md bg-terminal-border/60 mb-3" />
          <p className="text-terminal-dim text-sm mb-2">
            Type <span className="text-terminal-success">'help'</span> or click a command to explore.
          </p>
          {systemMessage && (
            <div className="text-xs text-terminal-dim mb-2">
              {systemMessage}
            </div>
          )}
          <div className="flex flex-wrap gap-2 items-center">
             <span className="text-terminal-dim text-xs mr-2">Suggested:</span>
             <SuggestionChip cmd="status" alias="s" />
             <SuggestionChip cmd="projects" alias="p" />
             <SuggestionChip cmd="arch" alias="a" />
             <SuggestionChip cmd="recruiter" alias="r" />
          </div>

          {/* Exploration indicator */}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            {["overview", "projects", "arch", "recruiter"].map((key) => (
              <span
                key={key}
                className={cn(
                  "px-2 py-0.5 rounded-full border text-xs",
                  visited[key as keyof typeof visited]
                    ? "border-terminal-accent/70 text-terminal-accent bg-terminal-accent/10"
                    : "border-terminal-dim/40 text-terminal-dim"
                )}
              >
                {visited[key as keyof typeof visited] ? "✓ " : ""}
                {key}
              </span>
            ))}
          </div>
        </div>

        {/* Output History (scrollable middle region) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative" ref={outputRef}>
          {/* Optional fade gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-terminal-bg to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-terminal-bg to-transparent" />

          <div className="pt-2 pb-8">
            <TerminalOutput
              history={history}
              onCommandClick={handleCommand}
              onPreviewProject={(key) => {
                setPreviewProjectKey(key);
                setPreviewIndex(0);
              }}
              onSystemEvent={(event) => {
                if (event === "projectEvidence") {
                  setSystemFlags((prev) => {
                    if (prev.projectEvidence) return prev;
                    setSystemMessage("[sys] loading project evidence");
                    return { ...prev, projectEvidence: true };
                  });
                }
              }}
            />
          </div>
        </div>

        {/* Input Line (sticky bottom) */}
        <div className="sticky bottom-0 z-20 bg-terminal-bg pt-2 border-t border-terminal-border/60">
          <TerminalInput 
              onSubmit={handleCommand} 
              inputRef={inputRef} 
              isProcessing={isProcessing} 
          />

          {showIdleSuggestions && (
            <div className="pl-10 mt-2 text-xs text-terminal-dim">
              Tip: You can click commands, use shortcuts like{" "}
              <span className="text-terminal-success">p</span>,{" "}
              <span className="text-terminal-success">a</span>,{" "}
              <span className="text-terminal-success">r</span>, or type normally.
            </div>
          )}
        </div>
      </div>

      {/* Image preview overlay */}
      {previewProjectKey && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60">
          <div className="max-w-3xl w-full mx-4 border border-terminal-border bg-terminal-bg/95 rounded-md p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-terminal-dim mb-1">
              <span>Preview: {previewProjectKey}</span>
              <button
                type="button"
                className="px-2 py-0.5 rounded border border-terminal-dim/60 text-terminal-dim hover:border-terminal-accent hover:text-terminal-accent text-[11px] cursor-pointer"
                onClick={() => setPreviewProjectKey(null)}
              >
                Close (Esc)
              </button>
            </div>
            <div className="flex-1 min-h-[200px] flex items-center justify-center bg-terminal-bg border border-terminal-border/60 rounded overflow-hidden">
              {(() => {
                const imgs = ["/dummy-project.png"];
                const index = ((previewIndex % imgs.length) + imgs.length) % imgs.length;
                const src = imgs[index];
                return (
                  <img
                    src={src}
                    alt={`Screenshot ${index + 1} for ${previewProjectKey}`}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                );
              })()}
            </div>
            <div className="flex items-center justify-between text-[11px] text-terminal-dim mt-1">
              <div>
                Use ← → to switch screenshots, Esc to close.
              </div>
              <div className="space-x-2">
                <button
                  type="button"
                  className="px-2 py-0.5 rounded border border-terminal-dim/60 hover:border-terminal-accent hover:text-terminal-accent cursor-pointer"
                  onClick={() => setPreviewIndex((idx) => idx - 1)}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 rounded border border-terminal-dim/60 hover:border-terminal-accent hover:text-terminal-accent cursor-pointer"
                  onClick={() => setPreviewIndex((idx) => idx + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
