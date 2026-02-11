import { useState, useRef, useEffect, useCallback } from "react";
import { TerminalInput } from "./TerminalInput";
import { TerminalOutput } from "./TerminalOutput";
import { processCommand } from "@/lib/terminal-logic";
import { Command } from "@/lib/types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Terminal() {
  const [history, setHistory] = useState<Command[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [showIdleSuggestions, setShowIdleSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on click anywhere
  const handleContainerClick = () => {
    // Only focus if user isn't selecting text
    if (window.getSelection()?.toString().length === 0) {
      inputRef.current?.focus();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, bootSequence]);

  const handleCommand = useCallback(async (input: string) => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setShowIdleSuggestions(false);
    
    // Simulate slight processing delay for "realism"
    await new Promise(r => setTimeout(r, 150));

    const result = processCommand(input);

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
    
    // Keep focus
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  // Boot Sequence + initial overview
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootSequence(false);
      // Automatically show overview on first load
      handleCommand("overview");
    }, 1500);
    return () => clearTimeout(timer);
  }, [handleCommand]);

  // Idle suggestions near prompt
  useEffect(() => {
    if (bootSequence) return;
    const timer = setTimeout(() => {
      setShowIdleSuggestions(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [history, bootSequence]);

  const SuggestionChip = ({ cmd }: { cmd: string }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        handleCommand(cmd);
      }} 
      className={cn(
        "px-3 py-1 text-xs border border-terminal-dim/30 rounded bg-terminal-dim/10",
        "text-terminal-fg hover:text-terminal-accent hover:border-terminal-accent/50 hover:bg-terminal-accent/10",
        "transition-colors cursor-pointer active:scale-95"
      )}
    >
      {cmd}
    </button>
  );

  if (bootSequence) {
    return (
      <div className="h-screen w-full bg-terminal-bg flex flex-col items-center justify-center text-terminal-accent font-mono">
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
      className="min-h-screen w-full bg-terminal-bg text-terminal-fg font-mono p-4 md:p-8 scanlines overflow-y-auto"
      onClick={handleContainerClick}
    >
      <div className="max-w-4xl mx-auto pb-32">
        {/* Header / Intro */}
        <div className="mb-8 select-none">
          <div className="mb-2">
            <h1 className="text-lg md:text-xl font-bold text-terminal-accent">
              Frontend System Interface
            </h1>
            <div className="text-terminal-dim text-xs mt-0.5">
              v1.0
            </div>
          </div>
          <div className="h-px w-full max-w-md bg-terminal-border/60 mb-3" />
          <p className="text-terminal-dim text-sm mb-4">
            Type <span className="text-terminal-success">'help'</span> or click a command to explore.
          </p>
          <div className="flex flex-wrap gap-2 items-center">
             <span className="text-terminal-dim text-xs mr-2">Suggested:</span>
             <SuggestionChip cmd="overview" />
             <SuggestionChip cmd="projects" />
             <SuggestionChip cmd="recruiter" />
          </div>
        </div>

        {/* Output History */}
        <TerminalOutput history={history} onCommandClick={handleCommand} />

        {/* Input Line */}
        <TerminalInput 
            onSubmit={handleCommand} 
            inputRef={inputRef} 
            isProcessing={isProcessing} 
        />

        {showIdleSuggestions && (
          <div className="pl-10 mt-2 text-xs text-terminal-dim">
            Tip: type <span className="text-terminal-success">recruiter</span> for a 60-second overview.
          </div>
        )}
        
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
