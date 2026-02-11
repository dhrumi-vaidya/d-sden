import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>; // Allow null
  isProcessing: boolean;
}

export function TerminalInput({ onSubmit, inputRef, isProcessing }: TerminalInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      onSubmit(value);
      e.currentTarget.value = "";
    }
  };

  // Auto-focus logic can be handled in parent or here
  // Keeping it simple: straightforward input
  return (
    <div className="flex items-center w-full mt-2 group">
      <span className="text-terminal-accent mr-3 select-none shrink-0">➜</span>
      <span className="text-terminal-success mr-3 select-none shrink-0">~</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          className="w-full bg-transparent border-none outline-none text-terminal-fg font-mono p-0 m-0 focus:ring-0 placeholder:text-terminal-dim/30 caret-transparent"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          aria-label="Terminal input"
        />
        {/* Custom Caret Implementation to ensure it looks like a block cursor */}
        <div className="absolute inset-0 pointer-events-none flex items-center">
            {/* We rely on the native caret being transparent and finding cursor position is hard without a library.
                For a simplified MVP, we will use the native caret with a block color via CSS if possible, 
                or just a blinking block at the end if input is empty. 
                
                Actually, standard CSS caret-color works well for a bar. 
                For a BLOCK cursor, it's trickier.
                Let's stick to a custom style on the input itself.
             */}
             <style>{`
               input { caret-color: hsl(var(--terminal-accent)); }
             `}</style>
        </div>
      </div>
    </div>
  );
}
